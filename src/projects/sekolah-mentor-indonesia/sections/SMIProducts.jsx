import { motion } from "framer-motion";
import { ArrowRight, Star, Users, UserCheck, Building, Shield, CheckCircle, XCircle, AlertCircle, X, MonitorPlay, BookOpen, HeartHandshake, Clock } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import OrderModal from "../../../components/OrderModal";
import { createPaymentToken } from "../../../services/paymentApi";

// KONFIGURASI PEMBAYARAN
// Mengontrol metode pembayaran untuk setiap tipe produk
const PAYMENT_CONFIG = {
  program: "manual", // "gateway" | "manual"
  mentoring: "manual", // "gateway" | "manual"
  coaching: "manual" // "manual" only (Redirect WA)
};

export default function SMIProducts() {
  const { t } = useTranslation('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // success, error, pending, null
  const [manualPaymentData, setManualPaymentData] = useState(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  
  // Fungsi untuk membuka modal form
  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Fungsi khusus untuk Coaching (B2B) - Redirect ke WhatsApp
  const handleCoachingClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Fungsi untuk handle submit form konsultasi (deprecated for Coaching, kept for ref)
  const handleConsultationSubmit = (formData) => {
    // ... logic moved to handleCoachingClick for direct redirect
  };
  
  // Fungsi utama pemrosesan order
  const handleProcessOrder = async (orderData) => {
    const { product } = orderData;
    
    // Handle Coaching / Consultation
    if (product.productType === 'coaching') {
        const message = `Halo Tim SMI, saya ingin konsultasi Corporate Training/Coaching.\n\n` +
            `DATA DIRI\n` +
            `Nama: ${orderData.name}\n` +
            `Email: ${orderData.email}\n` +
            `No WA: ${orderData.phone}\n` +
            `Perusahaan: ${orderData.company || '-'}\n` +
            `Kebutuhan: ${orderData.notes || '-'}\n\n` +
            `Mohon informasi lebih lanjut. Terima kasih!`;
        
        const whatsappUrl = `https://wa.me/6281915020498?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        setIsModalOpen(false);
        return;
    }

    const paymentMode = product.paymentMode; // Get selected mode
    
    if (paymentMode === 'gateway') {
        await handleGatewayPayment(orderData);
    } else {
        // Setup data for manual payment modal
        setManualPaymentData(orderData);
        setIsManualModalOpen(true);
        setIsModalOpen(false);
    }
  };

  // 1. Payment Gateway Flow
  const handleGatewayPayment = async (orderData) => {
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
      
      // 3. Validasi window.snap tersedia
      if (!window.snap) {
        throw new Error('Midtrans Snap not loaded');
      }
      
      // 4. Panggil snap.pay()
      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log('Payment Success:', result);
          // Set status based on product type
          if (orderData.product.productType === 'mentoring') {
              setPaymentStatus('review');
              sendTelegramNotification(orderData, 'MENUNGGU REVIEW (Gateway Paid)', 'Gateway');
          } else {
              setPaymentStatus('success'); // Program -> PAID
              sendTelegramNotification(orderData, 'PAID', 'Gateway');
          }
          
          setIsProcessing(false);
          setIsModalOpen(false);
        },
        onPending: (result) => {
          console.log('Payment Pending:', result);
          setPaymentStatus('pending');
          setIsProcessing(false);
          setIsModalOpen(false);
        },
        onError: (result) => {
          console.log('Payment Error:', result);
          setPaymentStatus('error');
          setIsProcessing(false);
        },
        onClose: () => {
          console.log('Customer closed the popup');
          setIsProcessing(false);
        }
      });
      
    } catch (error) {
      console.error('Payment Error:', error);
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  // 2. Manual Payment Flow
  const handleManualSubmit = async () => {
    // Construct WhatsApp Message
    const { name, email, product } = manualPaymentData;
    
    const message = `Halo Admin SMI, saya telah melakukan pembayaran untuk pesanan berikut:

DATA PEMESANAN
Nama: ${name}
Email: ${email}
Program: ${product.name}
Nominal: ${product.price}

Mohon dicek kembali. Berikut saya lampirkan FOTO BUKTI PEMBAYARAN. Terima kasih.`;

    const whatsappUrl = `https://wa.me/6281915020498?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Set status to review on website
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPaymentStatus('review');
    setIsProcessing(false);
    setIsManualModalOpen(false);
  };

  // Helper: Send Telegram Notification (Simulation)
  const sendTelegramNotification = (data, status, method) => {
    // In a real app, this would call an API endpoint that triggers the bot
    // Since we can't add backend, we'll rely on the existing enrollment flow or just log it
    // But we CAN try to open a window if it's client side, but that's annoying.
    // We'll assume the "Backend" (simulated) handles it.
    console.log(`[TELEGRAM] Sending notification to admin:
      Order: ${data.product.name}
      Customer: ${data.name} (${data.email})
      Status: ${status}
      Method: ${method}
    `);
  };

  // Manual Payment Modal Component
  const ManualPaymentModal = () => {
    if (!isManualModalOpen || !manualPaymentData) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={() => setIsManualModalOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-bold mb-4">Instruksi Pembayaran</h3>
          
          <div className="bg-neutral-50 p-4 rounded-xl mb-6">
            <p className="text-sm text-neutral-600 mb-1">Total Pembayaran:</p>
            <p className="text-2xl font-bold text-brand-600">
              {manualPaymentData.product.price}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="border border-neutral-200 rounded-xl p-4">
              <p className="font-semibold text-neutral-900 mb-1">Bank Transfer</p>
              <p className="text-sm text-neutral-600">BCA: 0661555920</p>
              <p className="text-sm text-neutral-600">A.n. Mohamad Iqbal Alhafizh</p>
            </div>
            {/* 
            <div className="border border-neutral-200 rounded-xl p-4">
              <p className="font-semibold text-neutral-900 mb-1">QRIS</p>
              <div className="bg-neutral-200 h-32 rounded-lg flex items-center justify-center text-neutral-500 text-sm">
                [QRIS Image Placeholder]
              </div>
            </div>
            */}
          </div>
          
          <div className="text-sm text-neutral-500 mb-6">
            Silakan lakukan pembayaran ke nomor rekening di atas. Setelah transfer, klik tombol di bawah untuk konfirmasi. Admin akan memverifikasi dalam 1x24 jam.
          </div>

          <button
            onClick={handleManualSubmit}
            disabled={isProcessing}
            className="w-full py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            {isProcessing ? 'Memproses...' : 'Saya Sudah Bayar'}
          </button>
        </motion.div>
      </div>
    );
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
      },
      review: {
        icon: Clock,
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        title: 'Menunggu Review',
        message: 'Data Anda sedang direview oleh admin. Kami akan menghubungi Anda via WhatsApp 1x24 jam.',
        buttonColor: 'bg-blue-600 hover:bg-blue-700'
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
      name: t('products.items.learning.name'),
      price: 'Rp 50.000',
      period: '', 
      description: t('products.items.learning.desc'),
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
      action: 'checkout',
      productType: 'program',
      paymentMode: PAYMENT_CONFIG.program
    },
    {
      id: 'private',
      name: t('products.items.mentoring.name'),
      price: 'Rp 100.000',
      period: '/jam',
      description: t('products.items.mentoring.desc'),
      features: [
        'Konsultasi langsung 1-on-1',
        'Review akun & konten',
        'Penentuan niche & strategi growth',
        'Jadwal fleksibel (by appointment)',
        'Bisa online atau offline'
      ],
      icon: HeartHandshake,
      color: 'purple',
      link: '#contact',
      action: 'checkout',
      productType: 'mentoring',
      paymentMode: PAYMENT_CONFIG.mentoring
    },
    {
      id: 'corporate',
      name: t('products.items.coaching.name'),
      price: 'Rp 5-6jt',
      period: '/sesi',
      description: t('products.items.coaching.desc'),
      features: [
        'Konsultasi awal dengan admin SMI',
        'Analisis kebutuhan perusahaan',
        'Materi custom sesuai kebutuhan',
        'Mentor profesional SMI',
        'Workshop, event, atau internal training',
        'Kontrak & kerja sama resmi'
      ],
      icon: Star,
      color: 'green',
      action: 'consultation',
      productType: 'coaching',
      paymentMode: PAYMENT_CONFIG.coaching
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
          {product.action === 'coming_soon' ? (
            <button disabled className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-neutral-200 text-neutral-500 rounded-xl font-semibold cursor-not-allowed">
              Segera Hadir
            </button>
          ) : product.action === 'consultation' ? (
            // Custom consultation button for Private Exclusive
            <div className="space-y-3">
              <button
                onClick={() => handleCoachingClick(product)}
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
                    Konsultasi Sekarang
                  </>
                )}
              </button>
              <p className="text-xs text-neutral-500 text-center">
                Hubungi kami via WhatsApp untuk diskusi kebutuhan Anda
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
            {t('products.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 font-display leading-tight">
            {t('products.title')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-sans">
            {t('products.description')}
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
        onProceedToPayment={handleProcessOrder}
      />
      
      {/* Manual Payment Modal */}
      <ManualPaymentModal />
      
      {/* Payment Status Modal */}
      <PaymentStatusModal />
    </section>
  );
}
