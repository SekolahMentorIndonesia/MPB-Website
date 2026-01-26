import { API_BASE_URL } from '../config';

// Real Backend API untuk Midtrans Token
export const createPaymentToken = async (orderData) => {
  try {
    // Generate Order ID if not present (usually handled by backend, but here we prep it)
    const orderId = `SMI-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Construct payload for /api/payment/token
    const payload = {
        orderId: orderId,
        grossAmount: orderData.product.price,
        customerDetails: {
            first_name: orderData.name,
            email: orderData.email,
            phone: orderData.phone,
        },
        itemDetails: [{
            id: orderData.product.id,
            price: orderData.product.price,
            quantity: 1,
            name: orderData.product.name,
        }]
    };

    const response = await fetch('/api/payment/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create payment token');
    }

    const data = await response.json();
    return {
      token: data.token,
      redirect_url: data.redirect_url
    };
  } catch (error) {
    console.error('Payment API Error:', error);
    throw error;
  }
};
