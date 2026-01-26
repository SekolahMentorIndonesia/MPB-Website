import midtransClient from 'midtrans-client';
import crypto from 'crypto';

// 🛡️ TASK 1 — SERVER-SIDE PRICE AUTHORITY (WAJIB)
const PRODUCT_PRICE_MAP = {
    'community': 50000,
    'private': 100000,
    'corporate': 5000000
};

export async function action({ request }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = await request.json();
    const { customerDetails, itemDetails } = body;

    // 🛡️ TASK 3 — REQUEST VALIDATION & RATE LIMIT
    if (!Array.isArray(itemDetails) || itemDetails.length === 0) {
        return new Response(JSON.stringify({ error: 'Invalid cart: Items must be a non-empty array' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (itemDetails.length > 10) { // Simple rate limit / abuse protection
        return new Response(JSON.stringify({ error: 'Too many items in cart' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // 🛡️ TASK 2 — ORDER ID HARDENING
    const orderId = `SMI-${crypto.randomUUID()}`;

    // 1. Sanitize & Normalize item_details with Server-Side Price Authority
    const items = [];
    for (const item of itemDetails) {
        // Validate Product ID
        if (!PRODUCT_PRICE_MAP.hasOwnProperty(item.id)) {
            console.warn(`[SECURITY] Invalid product ID attempted: ${item.id}`);
            return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const quantity = Number(item.quantity);
        if (isNaN(quantity) || quantity <= 0) {
             return new Response(JSON.stringify({ error: 'Invalid quantity' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 🛡️ FORCE PRICE FROM SERVER CONFIG
        // Ignore item.price from frontend entirely
        const officialPrice = PRODUCT_PRICE_MAP[item.id];

        items.push({
            id: item.id,
            name: item.name || 'SMI Product', // Fallback name
            price: officialPrice,
            quantity: quantity
        });
    }

    // 2. Recalculate Gross Amount (Backend Only)
    const grossAmount = items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    // 3. Debug Logging (Temporary)
    console.log('[MIDTRANS SECURE DEBUG]', {
        orderId,
        items,
        grossAmount
    });

    // Validate calculations
    if (items.length === 0 || grossAmount <= 0 || isNaN(grossAmount)) {
         return new Response(JSON.stringify({ error: 'Invalid transaction calculation' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
    }

    // Get Server Key from environment variable
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

    if (!serverKey) {
      console.error('MIDTRANS_SERVER_KEY is missing');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Snap wrapper
    const snap = new midtransClient.Snap({
      isProduction: isProduction,
      serverKey: serverKey,
      clientKey: process.env.VITE_MIDTRANS_CLIENT_KEY
    });

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount, // MUST match sum of items
      },
      credit_card: {
        secure: true,
      },
      customer_details: customerDetails,
      item_details: items, // Use sanitized items
    };

    const transaction = await snap.createTransaction(parameter);
    
    return new Response(JSON.stringify({ 
        token: transaction.token, 
        redirect_url: transaction.redirect_url 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Payment Route Error:', error);
    // Return detailed error for debugging if needed, or generic
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
