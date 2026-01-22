// Real Backend API untuk Midtrans Token
export const createPaymentToken = async (orderData) => {
  try {
    const response = await fetch('http://localhost:5000/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
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
