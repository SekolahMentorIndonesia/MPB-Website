// Payment Service untuk Midtrans Integration
// Support: Sandbox dan Production

import { ApiResponse, PRODUCT_TYPE, ProductFormFields } from '@/types/content';

class PaymentService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    this.isDevelopment = import.meta.env.DEV;
    this.midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
  }

  /**
   * Get produk yang tersedia
   */
  async getProducts() {
    try {
      const response = await fetch(`${this.baseURL}/api/products`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch products');
      }

      return ApiResponse.success(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      return ApiResponse.error('Failed to fetch products', 500);
    }
  }

  /**
   * Get form fields untuk produk tertentu
   */
  getFormFields(productType) {
    return ProductFormFields[productType] || [];
  }

  /**
   * Create payment order
   */
  async createOrder(orderData) {
    try {
      const response = await fetch(`${this.baseURL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      return ApiResponse.success(data);
    } catch (error) {
      console.error('Error creating order:', error);
      return ApiResponse.error('Failed to create order', 500);
    }
  }

  /**
   * Get order status
   */
  async getOrderStatus(orderId) {
    try {
      const response = await fetch(`${this.baseURL}/api/orders/${orderId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get order status');
      }

      return ApiResponse.success(data);
    } catch (error) {
      console.error('Error getting order status:', error);
      return ApiResponse.error('Failed to get order status', 500);
    }
  }

  /**
   * Initialize Midtrans payment
   */
  initializeMidtransPayment(order) {
    return new Promise((resolve, reject) => {
      // Load Midtrans Snap script
      if (!window.snap) {
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', this.midtransClientKey);
        script.onload = () => {
          this.processPayment(order, resolve, reject);
        };
        script.onerror = () => reject(new Error('Failed to load Midtrans script'));
        document.body.appendChild(script);
      } else {
        this.processPayment(order, resolve, reject);
      }
    });
  }

  /**
   * Process payment with Midtrans Snap
   */
  processPayment(order, resolve, reject) {
    const snapToken = order.paymentUrl || order.snapToken;
    
    if (!snapToken) {
      reject(new Error('No payment token available'));
      return;
    }

    window.snap.pay(snapToken, {
      onSuccess: (result) => {
        console.log('Payment success:', result);
        resolve({
          success: true,
          status: 'success',
          data: result
        });
      },
      onPending: (result) => {
        console.log('Payment pending:', result);
        resolve({
          success: true,
          status: 'pending',
          data: result
        });
      },
      onError: (result) => {
        console.error('Payment error:', result);
        reject(new Error('Payment failed'));
      },
      onClose: () => {
        console.log('Payment popup closed');
        resolve({
          success: false,
          status: 'closed',
          message: 'Payment popup was closed'
        });
      }
    });
  }

  /**
   * Validate form data
   */
  validateFormData(productType, formData) {
    const fields = this.getFormFields(productType);
    const errors = {};

    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} wajib diisi`;
      }

      // Email validation
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          errors[field.name] = 'Format email tidak valid';
        }
      }

      // Phone validation
      if (field.name === 'whatsapp' && formData[field.name]) {
        const phoneRegex = /^08[0-9]{8,12}$/;
        const cleanPhone = (formData[field.name] || '').replace(/[-\s]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
          errors[field.name] = 'Format nomor WhatsApp tidak valid (contoh: 0812-3456-7890)';
        }
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Format order data untuk API
   */
  formatOrderData(productType, product, formData) {
    return {
      productId: product.id,
      productType,
      productName: product.name,
      amount: product.price,
      userData: formData,
      // Additional metadata
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Generate unique order ID
   */
  generateOrderId() {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `SMI-${dateStr}-${random}`;
  }

  /**
   * Format currency
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  /**
   * Get payment method display name
   */
  getPaymentMethodName(paymentMethod) {
    const methods = {
      'credit_card': 'Kartu Kredit',
      'bank_transfer': 'Transfer Bank',
      'echannel': 'Mandiri Bill',
      'permata_va': 'VA Permata',
      'bca_va': 'VA BCA',
      'bni_va': 'VA BNI',
      'bri_va': 'VA BRI',
      'cimb_va': 'VA CIMB Niaga',
      'other_va': 'VA Lainnya',
      'gopay': 'GoPay',
      'shopeepay': 'ShopeePay',
      'qris': 'QRIS',
      'indomaret': 'Indomaret',
      'alfamart': 'Alfamart'
    };

    return methods[paymentMethod] || paymentMethod;
  }

  /**
   * Get product type display name
   */
  getProductTypeName(productType) {
    const types = {
      [PRODUCT_TYPE.COMMUNITY]: 'Community Premium',
      [PRODUCT_TYPE.PRIVATE_MENTORING]: 'Private Mentoring',
      [PRODUCT_TYPE.CORPORATE]: 'Corporate Mentoring'
    };

    return types[productType] || productType;
  }

  /**
   * Check if Midtrans is available
   */
  isMidtransAvailable() {
    return !!(this.midtransClientKey && window.snap);
  }

  /**
   * Upload payment proof
   */
  async uploadProof(formData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${this.baseURL}/api/payments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload payment proof');
      }

      return data;
    } catch (error) {
      console.error('Error uploading payment proof:', error);
      throw error;
    }
  }
}

export default new PaymentService();
