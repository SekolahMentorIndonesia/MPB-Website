import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MessageSquare, CreditCard } from "lucide-react";
import { useState } from "react";

export default function OrderModal({ isOpen, onClose, product, onProceedToPayment }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom CSS untuk menyembunyikan scrollbar
  const hideScrollbarStyle = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Form submitted with data:', formData);
    console.log('Product data:', product);
    
    // Simulasi API call untuk menyimpan data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Kirim data ke parent untuk proses payment
    const paymentData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      product: {
        id: product.id,
        name: product.name,
        price: product.price, // Format "Rp 50.000" akan dikonversi di backend
        period: product.period,
        description: product.description || product.name
      }
    };
    
    console.log('Sending to payment:', paymentData);
    onProceedToPayment(paymentData);
    
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{hideScrollbarStyle}</style>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-neutral-100 p-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {product.price}{product.period}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 pt-4">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <User className="w-4 h-4" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <Phone className="w-4 h-4" />
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="Nomor WhatsApp Anda"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Catatan (Opsional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Ceritakan tujuan Anda bergabung..."
                />
              </div>
            </div>

            {/* Product Summary */}
            <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">Produk</span>
                <span className="text-sm font-medium text-neutral-900">{product.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Total</span>
                <span className="text-lg font-bold text-brand-600">
                  {product.price}{product.period}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-6 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  {product?.action === 'consultation' ? 'Kirim ke WhatsApp' : 'Lanjut ke Pembayaran'}
                </>
              )}
            </button>

            {/* Security Note */}
            <p className="text-xs text-neutral-500 text-center mt-4">
              {product?.action === 'consultation' 
                ? 'Data Anda aman dan akan digunakan untuk proses konsultasi'
                : 'Data Anda aman dan akan digunakan untuk proses pemesanan'
              }
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
    </>
  );
}
