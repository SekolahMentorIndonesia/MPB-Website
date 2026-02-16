import React from 'react';
import { Instagram, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { products } from './data/products';

function App() {
  const whatsappLink = (productName) => {
    const phoneNumber = "6287744556696"; // Keeping the same number as requested unless specified otherwise
    const message = `Halo, saya tertarik dengan produk ${productName} di Desain Percetakan Kreatif`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Instagram, url: 'https://www.instagram.com/desainpercetakan' },
  ];

  const navigationLinks = [
    { href: "#hero", text: "Beranda" },
    { href: "#about", text: "Tentang Kami" },
    { href: "#products", text: "Produk Kami" },
    { href: "https://wa.me/6287744556696", text: "Kontak" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Desain Percetakan Kreatif – Showcase</h1>
          <a
            href="https://multipriority.com/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition-colors duration-200 gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-neutral-900 py-20 md:py-32 overflow-hidden text-white">
        <div className="container mx-auto px-4 relative z-10 text-left">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Kreativitas Tanpa Batas untuk Cetakan Anda
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl font-light">
            Kami menghadirkan solusi desain dan percetakan berkualitas tinggi untuk mewujudkan ide-ide kreatif Anda menjadi produk nyata yang memukau.
          </p>
          <a
            href="https://wa.me/6287744556696?text=Halo, saya tertarik dengan layanan Desain Percetakan Kreatif"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
          >
            Konsultasi Desain Gratis
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 lg:text-left text-center">Tentang Desain Percetakan Kreatif</h2>
            <p className="text-gray-700 leading-relaxed mb-6 lg:text-left text-center max-w-prose mx-auto lg:mx-0">
              Desain Percetakan Kreatif adalah mitra terpercaya Anda untuk segala kebutuhan desain grafis dan percetakan. Kami menggabungkan keahlian desain artistik dengan teknologi cetak terkini untuk menghasilkan produk berkualitas premium seperti kartu nama, brosur, banner, hingga packaging custom. Fokus kami adalah memberikan hasil yang profesional, cepat, dan sesuai dengan identitas brand Anda.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-500 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Desain Eksklusif & Kustom</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-500 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Kualitas Cetak Premium</span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-500 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Pengerjaan Cepat & Tepat Waktu</span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/3 flex justify-center">
            <img
              src="/images/company/6.webp"
              alt="Logo Desain Percetakan Kreatif"
              className="rounded-lg shadow-md max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Produk Unggulan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <a
                href={whatsappLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <img src={product.image} alt={product.name} className="w-full h-auto object-contain" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-lg">Tanya Via WhatsApp</span>
                </div>
              </a>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 pt-16 lg:pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

            {/* Column 1: Company Info */}
            <div className="flex flex-col items-start">
              <a href="/Product-Desain-Percetakan-Kreatif" className="flex flex-col items-start mb-6 group">
                <span className="text-xl font-bold text-white leading-tight tracking-tight">Desain Percetakan Kreatif</span>
                <span className="text-xs text-neutral-300 font-medium tracking-wide uppercase mt-0.5">Kreatif - Berkualitas - Terpercaya</span>
              </a>
              <p className="text-sm leading-relaxed mb-8 font-sans text-neutral-300 max-w-xs">
                Mitra terpercaya untuk solusi desain grafis dan percetakan berkualitas tinggi dengan hasil yang memuaskan.
              </p>
              <div className="flex gap-4">
                {socialLinks.map(({ Icon, url }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all text-neutral-300 rounded-full group"
                    aria-label={`Social link ${i + 1}`}
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Our Services */}
            <div>
              <h4 className="text-white font-bold text-sm mb-6 font-display uppercase tracking-widest border-b border-neutral-800 pb-2 inline-block">
                Layanan Kami
              </h4>
              <ul className="space-y-4 text-sm font-sans">
                <li>
                  <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform"></span>
                    Cetak Digital & Offset
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform"></span>
                    Desain Grafis Profesional
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform"></span>
                    Branding & Logo
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform"></span>
                    Custom Packaging
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4 className="text-white font-bold text-sm mb-6 font-display uppercase tracking-widest border-b border-neutral-800 pb-2 inline-block">
                Kontak
              </h4>
              <div className="flex flex-col gap-5">
                <div className="flex gap-3 items-start">
                  <MapPin className="text-brand-500 flex-shrink-0 mt-1 w-5 h-5" />
                  <span className="text-sm leading-relaxed">Bekasi, Jawa Barat<br />Indonesia</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone className="text-brand-500 flex-shrink-0 w-5 h-5" />
                  <a href="tel:+6287744556696" className="text-sm hover:text-white transition-colors">+62 877-4455-6696</a>
                </div>
                <div className="flex gap-3 items-center">
                  <MessageCircle className="text-brand-500 flex-shrink-0 w-5 h-5" />
                  <a href="https://wa.me/6287744556696" className="text-sm hover:text-white transition-colors">+62 877-4455-6696</a>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail className="text-brand-500 flex-shrink-0 w-5 h-5" />
                  <a href="mailto:info@desainpercetakan.com" className="text-sm hover:text-white transition-colors">info@desainpercetakan.com</a>
                </div>
              </div>
            </div>

            {/* Column 4: Navigation */}
            <div>
              <h4 className="text-white font-bold text-sm mb-6 font-display uppercase tracking-widest border-b border-neutral-800 pb-2 inline-block">
                Navigasi
              </h4>
              <ul className="space-y-3 text-sm font-sans mb-8">
                {navigationLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="hover:text-brand-400 transition-colors block py-1">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-xs text-neutral-500 font-sans">
              &copy; {currentYear} Desain Percetakan Kreatif. Hak Cipta Dilindungi.
            </p>
            <p className="text-xs text-neutral-600 font-sans flex items-center gap-1">
              <span>Dibuat dengan ❤️ oleh</span>
              <span className="text-neutral-500 font-medium">Tim Desain Percetakan</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;