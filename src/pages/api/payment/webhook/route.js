import crypto from 'crypto';

export async function action({ request }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = await request.json();
    const { order_id, status_code, gross_amount, transaction_status } = body;
    const signatureKey = request.headers.get('x-signature-key') || ''; // Midtrans doesn't always send this in sandbox notification test, rely on body signature_key mostly

    // Midtrans sends signature_key inside the body usually
    const receivedSignature = body.signature_key;

    // Get Server Key
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
        console.error('MIDTRANS_SERVER_KEY missing for webhook');
        return new Response('Server Config Error', { status: 500 });
    }

    // 🛡️ TASK 4 — MIDTRANS WEBHOOK SIGNATURE VERIFICATION
    // SHA512(order_id + status_code + gross_amount + ServerKey)
    const payloadStr = order_id + status_code + gross_amount + serverKey;
    const expectedSignature = crypto
        .createHash('sha512')
        .update(payloadStr)
        .digest('hex');

    if (receivedSignature !== expectedSignature) {
        console.warn(`[WEBHOOK SECURITY] Invalid Signature for Order ${order_id}`);
        return new Response(JSON.stringify({ message: 'Invalid signature' }), { 
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // 🛡️ TASK 5 — PAYMENT STATUS TRUST POLICY & LOGGING
    console.log(`[MIDTRANS WEBHOOK] Order: ${order_id} | Status: ${transaction_status} | Amount: ${gross_amount}`);

    // In a real app, update database here based on status
    // settlement -> PAID
    // pending -> WAITING
    // expire/cancel/deny -> FAILED

    return new Response(JSON.stringify({ status: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}
