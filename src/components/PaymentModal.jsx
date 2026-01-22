import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  CreditCard,
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Building,
  Users
} from 'lucide-react';
import paymentService from '../services/paymentService';
import { toast } from 'sonner';

const PaymentModal = ({ product, onClose }) => {
  const [step, setStep] = useState('form'); // form, processing, success, error
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const formFields = paymentService.getFormFields(product.type);

  useEffect(() => {
    // Initialize form data with empty values
    const initialData = {};
    formFields.forEach(field => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
  }, [formFields]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const validation = paymentService.validateFormData(product.type, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    try {
      setLoading(true);
      setStep('processing');

      // Create order
      const orderPayload = paymentService.formatOrderData(product.type, product, formData);
      const orderResponse = await paymentService.createOrder(orderPayload);

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Gagal membuat order');
      }

      const order = orderResponse.data;
      setOrderData(order);

      // Initialize Midtrans payment
      const paymentResult = await paymentService.initializeMidtransPayment(order);

      if (paymentResult.success) {
        if (paymentResult.status === 'success') {
          setStep('success');
          toast.success('Pembayaran berhasil!');
          
          // Redirect to success page with token
          const successUrl = `/success?order=${order.orderId}&product=${product.type}&name=${formData.name || formData.companyName}`;
          setTimeout(() => {
            window.location.href = successUrl;
          }, 2000);
        } else if (paymentResult.status === 'pending') {
          setStep('success');
          toast.info('Pembayaran sedang diproses');
          
          // Redirect to success page with token
          const successUrl = `/success?order=${order.orderId}&product=${product.type}&name=${formData.name || formData.companyName}`;
          setTimeout(() => {
            window.location.href = successUrl;
          }, 2000);
        } else {
          setStep('form');
          toast.info('Pembayaran dibatalkan');
        }
      } else {
        throw new Error(paymentResult.message || 'Pembayaran gagal');
      }

    } catch (error) {
      console.error('Payment error:', error);
      setStep('error');
      toast.error(error.message || 'Terjadi kesalahan saat memproses pembayaran');
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (field) => {
    const error = errors[field.name];
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                error ? 'border-red-500' : 'border-neutral-300'
              }`}
            >
              <option value="">Pilih {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                error ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );

      case 'tel':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="tel"
                value={value}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  error ? 'border-red-500' : 'border-neutral-300'
                }`}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );

      case 'email':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="email"
                value={value}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  error ? 'border-red-500' : 'border-neutral-300'
                }`}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );

      default:
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              {field.name === 'name' && <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />}
              {field.name === 'companyName' && <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />}
              {field.name === 'participantCount' && <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />}
              <input
                type={field.type}
                value={value}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  error ? 'border-red-500' : 'border-neutral-300'
                }`}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
    }
  };

  const renderForm = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              {paymentService.getProductTypeName(product.type)}
            </h2>
            <p className="text-neutral-600 mt-1">{product.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Product Summary */}
        <div className="bg-neutral-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900">{product.name}</h3>
              <p className="text-sm text-neutral-600">Akses {product.type}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-neutral-900">
                {paymentService.formatCurrency(product.price)}
              </p>
              <p className="text-sm text-neutral-600">sekali bayar</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {formFields.map(renderFormField)}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Bayar Sekarang
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-semibold">Pembayaran Aman</p>
              <p>Data Anda dilindungi dengan enkripsi SSL dan kami tidak menyimpan informasi kartu kredit Anda.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderProcessing = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
    >
      <Loader2 className="w-16 h-16 animate-spin text-brand-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        Memproses Pembayaran
      </h2>
      <p className="text-neutral-600 mb-6">
        Mohon tunggu, kami sedang memproses pembayaran Anda...
      </p>
      <div className="bg-neutral-50 rounded-lg p-4">
        <p className="text-sm text-neutral-600">
          Jangan tutup halaman ini hingga proses selesai
        </p>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
    >
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        Pembayaran Berhasil!
      </h2>
      <p className="text-neutral-600 mb-6">
        Terima kasih! Pembayaran Anda telah berhasil diproses.
        Anda akan diarahkan ke halaman akses...
      </p>
      
      <div className="space-y-3">
        <button
          onClick={onClose}
          className="w-full bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
        >
          Tutup
        </button>
        <p className="text-sm text-neutral-600">
          Mengarahkan ke halaman akses...
        </p>
      </div>
    </motion.div>
  );

  const renderError = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
    >
      <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        Pembayaran Gagal
      </h2>
      <p className="text-neutral-600 mb-6">
        Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.
      </p>
      
      <div className="space-y-3">
        <button
          onClick={() => setStep('form')}
          className="w-full bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
        >
          Coba Lagi
        </button>
        <button
          onClick={onClose}
          className="w-full bg-neutral-200 text-neutral-700 py-3 rounded-lg font-semibold hover:bg-neutral-300 transition-colors"
        >
          Tutup
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {step === 'form' && renderForm()}
      {step === 'processing' && renderProcessing()}
      {step === 'success' && renderSuccess()}
      {step === 'error' && renderError()}
    </div>
  );
};

export default PaymentModal;
