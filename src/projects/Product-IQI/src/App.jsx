import React from 'react';
import { products } from './data/products';

function App() {
  const whatsappLink = (productName) => {
    const phoneNumber = "6287744556696"; // Nomor WhatsApp yang diberikan
    const message = `Halo, saya tertarik dengan produk ${productName}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">IQI Corps – Product Showcase</h1>
          <a
            href="http://localhost:3000/Product-IQICorps" // Ganti dengan domain MPB Anda
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
      <section className="relative bg-gray-800 text-white py-16 md:py-24">
        <img
          src="/images/iqi-corps.webp"
          alt="IQI Corps Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Solusi Digital Terbaik untuk Bisnis Anda
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Kami menyediakan berbagai layanan digital untuk membantu bisnis Anda berkembang.
          </p>
          <a
            href="https://wa.me/6287744556696?text=Halo, saya tertarik dengan layanan IQI Corps"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200"
          >
            Hubungi Kami Sekarang
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Tentang IQI Corps</h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            IQI Corps adalah penyedia solusi digital terkemuka yang berdedikasi untuk membantu bisnis mencapai potensi penuh mereka di era digital. Kami menawarkan berbagai layanan mulai dari pengembangan website, strategi pemasaran digital, hingga branding dan manajemen media sosial. Dengan tim ahli yang berpengalaman, kami berkomitmen untuk memberikan hasil yang inovatif dan efektif yang disesuaikan dengan kebutuhan unik setiap klien.
          </p>
        </div>
      </section>

      {/* Product Gallery */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <a
              key={product.id}
              href={whatsappLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold">Chat via WhatsApp</span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-800">{product.name}</h2>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 IQI Corps. All rights reserved.</p>
          <p className="text-sm mt-2">
            Dibuat dengan ❤️ oleh Tim IQI Corps
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
