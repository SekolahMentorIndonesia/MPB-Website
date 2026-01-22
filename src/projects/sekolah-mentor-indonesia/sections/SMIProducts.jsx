import { motion } from "framer-motion";
import { ArrowRight, Star, Users, UserCheck, Building, Shield, CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { useState } from "react";
import OrderModal from "../../../components/OrderModal";
import { createPaymentToken } from "../../../services/paymentApi";

export default function SMIProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // success, error, pending, null
  
  // Fungsi untuk membuka modal form
  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Fungsi khusus untuk Private Exclusive - langsung ke WhatsApp dengan data form
  const handleConsultationClick = (product) => {
    // Tunggu data dari form OrderModal
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Fungsi untuk handle submit form konsultasi
  const handleConsultationSubmit = (formData) => {
    // Format pesan WhatsApp dengan data yang diisi user
    const message = `Halo Tim SMI, saya tertarik dengan Private Exclusive Coaching.\n\n` +
      `Data Konsultasi:\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Layanan: Private Exclusive Coaching\n` +
      `Nama: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `WhatsApp: ${formData.phone}\n` +
      `Lokasi: ${formData.locationType}\n` +
      `Catatan: ${formData.notes || 'Tidak ada catatan'}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Mohon informasikan harga dan proses selanjutnya. Terima kasih! 🙏`;

    // Selalu kirim ke nomor WhatsApp admin SMI yang benar
    const whatsappUrl = `https://wa.me/6281915020498?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  // Fungsi untuk trigger pembayaran Midtrans (IMPLEMENTASI BENAR)
  const handleProceedToPayment = async (orderData) => {
    try {
      setIsProcessing(true);
      console.log('Starting payment process...', orderData);
      
      // 1. Fetch token dari backend API
      const response = await createPaymentToken({
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        product: orderData.product
      });
      
      console.log('API Response:', response);
      
      // 2. Validasi token adalah STRING
      if (!response.token || typeof response.token !== 'string') {
        throw new Error('Invalid token format from API');
      }
      
      const snapToken = response.token;
      console.log('Snap Token:', snapToken);
      
      // 3. Validasi window.snap tersedia
      if (!window.snap) {
        throw new Error('Midtrans Snap not loaded');
      }
      
      // 4. Panggil snap.pay() dengan TOKEN STRING MURNI
      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log('Payment Success:', result);
          setPaymentStatus('success');
          setIsProcessing(false);
        },
        onPending: (result) => {
          console.log('Payment Pending:', result);
          setPaymentStatus('pending');
          setIsProcessing(false);
        },
        onError: (result) => {
          console.log('Payment Error:', result);
          setPaymentStatus('error');
          setIsProcessing(false);
        },
        onClose: () => {
          console.log('Customer closed the popup without finishing the payment');
          setIsProcessing(false);
        }
      });
      
    } catch (error) {
      console.error('Payment Error:', error);
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  // Payment Status Modal Component
  const PaymentStatusModal = () => {
    if (!paymentStatus) return null;

    const statusConfig = {
      success: {
        icon: CheckCircle,
        iconColor: 'text-green-600',
        bgColor: 'bg-green-50',
        title: 'Pembayaran Berhasil!',
        message: 'Terima kasih telah berlangganan. Kami akan menghubungi Anda segera.',
        buttonColor: 'bg-green-600 hover:bg-green-700'
      },
      error: {
        icon: XCircle,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-50',
        title: 'Pembayaran Gagal',
        message: 'Maaf, terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.',
        buttonColor: 'bg-red-600 hover:bg-red-700'
      },
      pending: {
        icon: AlertCircle,
        iconColor: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        title: 'Pembayaran Pending',
        message: 'Pembayaran Anda sedang diproses. Silakan selesaikan pembayaran Anda.',
        buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
      }
    };

    const config = statusConfig[paymentStatus];
    const Icon = config.icon;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`${config.bgColor} rounded-2xl max-w-md w-full p-8 text-center relative`}
        >
          <button
            onClick={() => setPaymentStatus(null)}
            className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>

          <Icon className={`w-16 h-16 ${config.iconColor} mx-auto mb-4`} />
          
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            {config.title}
          </h2>
          
          <p className="text-neutral-600 mb-6 leading-relaxed">
            {config.message}
          </p>

          <div className="space-y-3">
            {paymentStatus === 'success' && selectedProduct && (
              <div className="bg-white/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">Produk</span>
                  <span className="text-sm font-medium text-neutral-900">{selectedProduct.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Total</span>
                  <span className="text-lg font-bold text-brand-600">
                    {selectedProduct.price}{selectedProduct.period}
                  </span>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setPaymentStatus(null)}
              className={`w-full py-3 px-6 ${config.buttonColor} text-white rounded-xl font-semibold transition-all duration-300`}
            >
              {paymentStatus === 'success' ? 'Tutup' : 'Coba Lagi'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  const products = [
    {
      id: 'community',
      name: 'Komunitas (Premium)',
      price: 'Rp 50.000',
      period: '', // One-time payment, no recurring
      description: 'Akses penuh seumur hidup ke komunitas kreator SMI dengan sesi sharing dan event eksklusif.',
      features: [
        'Akses komunitas kreator SMI (seumur hidup)',
        'Event online / offline tanpa batas',
        'Zoom meet sharing & diskusi',
        'Konten eksklusif premium',
        'Networking antar kreator',
        'Akses webinar dan group selamanya'
      ],
      icon: Users,
      color: 'blue',
      popular: true,
      link: '#contact',
      action: 'contact'
    },
    {
      id: 'private',
      name: 'Mentoring (Private)',
      price: 'Rp 100.000',
      period: '/jam',
      description: 'Sesi mentoring 1-on-1 online atau offline untuk kreator serius yang ingin berkembang pesat.',
      features: [
        'Konsultasi langsung 1-on-1',
        'Review akun & konten',
        'Penentuan niche & strategi growth',
        'Jadwal fleksibel (by appointment)',
        'Bisa online atau offline'
      ],
      icon: UserCheck,
      color: 'purple',
      link: '#contact',
      action: 'contact'
    },
    {
      id: 'corporate',
      name: 'Private Exclusive (Coaching)',
      price: 'Rp 5-6jt',
      period: '/sesi',
      description: 'Coaching intensif untuk perusahaan, komunitas besar, atau institusi yang ingin mengundang mentor Sekolah Mentor Indonesia. Isi form konsultasi dulu untuk diskusi kebutuhan Anda.',
      features: [
        'Konsultasi awal dengan admin SMI',
        'Analisis kebutuhan perusahaan',
        'Materi custom sesuai kebutuhan',
        'Mentor profesional SMI',
        'Workshop, event, atau internal training',
        'Kontrak & kerja sama resmi'
      ],
      icon: Building,
      color: 'green',
      action: 'consultation' // Custom action untuk form konsultasi
    }
  ];

  const ProductCard = ({ product, index }) => {
    const Icon = product.icon;
    
    return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative bg-white rounded-2xl border-2 ${
        product.popular 
          ? 'border-brand-500 shadow-lg' 
          : 'border-neutral-200'
      } overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col`}
    >
        {/* Popular Badge */}
        {product.popular && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Star className="w-3 h-3" />
              POPULER
            </span>
          </div>
        )}

        <div className="p-8 flex-1 flex flex-col">
          {/* Icon */}
          <div className={`w-16 h-16 bg-${product.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
            <Icon className={`w-8 h-8 text-${product.color}-600`} />
          </div>

          {/* Product Info */}
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">
            {product.name}
          </h3>
          <p className="text-neutral-600 mb-6">
            {product.description}
          </p>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-neutral-900">
                {product.price}
              </span>
              <span className="text-neutral-500">{product.period}</span>
            </div>
            {product.id === 'corporate' && (
              <p className="text-sm text-neutral-500 mt-1">
                *Harga tergantung scope dan kebutuhan
              </p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8 flex-1">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          {product.action === 'consultation' ? (
            // Custom consultation button for Private Exclusive
            <div className="space-y-3">
              <button
                onClick={() => handleConsultationClick(product)}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Building className="w-4 h-4" />
                    Isi Form Konsultasi
                  </>
                )}
              </button>
              <p className="text-xs text-neutral-500 text-center">
                Isi data konsultasi, kami akan follow-up via WhatsApp
              </p>
            </div>
          ) : product.external ? (
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300"
            >
              Hubungi Tim SMI
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={() => handleOrderClick(product)}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all duration-300 disabled:bg-neutral-300 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  {product.popular ? 'Gabung Komunitas Premium (One-Time)' : `Pilih ${product.name}`}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="pricing" className="py-20 lg:py-32 px-4 sm:px-6 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-4 block font-sans">
            PILIHAN PAKET
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 font-display leading-tight">
            Pilih Layanan Terbaik Untuk Anda
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Dapatkan akses ke mentorship berkualitas, komunitas eksklusif, dan resources premium
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" style={{ minHeight: '600px' }}>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-neutral-600 mb-6">
            Butuh bantuan memilih paket yang tepat?
          </p>
          <button
            onClick={() => handleOrderClick(products[0])}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors font-medium disabled:bg-neutral-300 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                Gabung Komunitas Sekarang
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.div>
      </div>
      
      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onProceedToPayment={
          selectedProduct?.action === 'consultation' 
            ? handleConsultationSubmit 
            : handleProceedToPayment
        }
      />
      
      {/* Payment Status Modal */}
      <PaymentStatusModal />
    </section>
  );
}
