import { motion } from "framer-motion";
import { ArrowRight, Star, Users, UserCheck, Building, Shield } from "lucide-react";
import { Link } from "react-router";

export default function SMIProducts() {
  const products = [
    {
      id: 'community',
      name: 'Komunitas (Premium)',
      price: 'Rp 50.000',
      period: '/bulan',
      description: 'Akses penuh ke komunitas kreator SMI dengan sesi sharing dan event eksklusif.',
      features: [
        'Akses komunitas kreator SMI (premium)',
        'Event online / offline terjadwal',
        'Zoom meet sharing & diskusi',
        'Konten eksklusif',
        'Networking antar kreator',
        'Akses webinar dan group premium'
      ],
      icon: Users,
      color: 'blue',
      popular: true,
      link: '/produk'
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
      link: '/produk'
    },
    {
      id: 'corporate',
      name: 'Private Exclusive (Coaching)',
      price: 'Rp 5-6jt',
      period: '/jam',
      description: 'Coaching intensif untuk perusahaan, komunitas besar, atau institusi yang ingin mengundang mentor Sekolah Mentor Indonesia.',
      features: [
        'Coaching kelompok / perusahaan',
        'Materi custom sesuai kebutuhan',
        'Mentor profesional SMI',
        'Workshop, event, atau internal training',
        'Kontrak & kerja sama resmi'
      ],
      icon: Building,
      color: 'green',
      link: 'https://wa.me/628123456789?text=Halo%20SMI,%20saya%20tertarik%20dengan%20Private%20Exclusive%20Coaching',
      external: true
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
        } overflow-hidden hover:shadow-xl transition-all duration-300 group`}
      >
        {product.popular && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Star className="w-3 h-3" />
              POPULER
            </span>
          </div>
        )}

        <div className="p-8">
          <div className={`w-16 h-16 bg-${product.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
            <Icon className={`w-8 h-8 text-${product.color}-600`} />
          </div>

          <h3 className="text-2xl font-bold text-neutral-900 mb-2">
            {product.name}
          </h3>
          <p className="text-neutral-600 mb-6">
            {product.description}
          </p>

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

          <div className="space-y-3 mb-8">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {product.external ? (
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
            <Link
              to={product.link}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-all duration-300"
            >
              {product.popular ? 'Gabung Komunitas Premium' : `Pilih ${product.name}`}
              <ArrowRight className="w-4 h-4" />
            </Link>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

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
          <Link
            to="/produk"
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors font-medium"
          >
            Lihat Semua Paket
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
