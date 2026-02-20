import React from 'react';
import { Instagram, Mail, MapPin, Phone, MessageCircle } from "lucide-react"; // Added for footer icons
import { products } from './data/products';

function App() {
    const whatsappLink = (productName) => {
        const phoneNumber = "6287744556696"; // Nomor WhatsApp yang diberikan
        const message = `Halo, saya tertarik dengan layanan Multisky: ${productName}`;
        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    const currentYear = new Date().getFullYear();

    // Social media links for Multisky
    const multiskySocialLinks = [
        { Icon: Instagram, url: 'https://www.instagram.com/multisky' }, // Placeholder URL
    ];

    // Navigation links for Multisky (simplified for this page)
    const multiskyNavigationLinks = [
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
                    <h1 className="text-xl font-semibold text-gray-800">Multisky – Product Showcase</h1>
                    <a
                        href="/" // Mengarahkan ke situs utama MPB Corps
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
                        Solusi Pariwisata & Manajemen Acara Terbaik
                    </h2>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl font-light">
                        Kami menyediakan layanan manajemen acara dan solusi pariwisata profesional untuk menciptakan pengalaman yang tak terlupakan.
                    </p>
                    <a
                        href="https://wa.me/6287744556696?text=Halo, saya tertarik dengan layanan Multisky"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                    >
                        Hubungi Kami Sekarang
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
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 lg:text-left text-center">Tentang Multisky</h2>
                        <p className="text-gray-700 leading-relaxed mb-6 lg:text-left text-center max-w-prose mx-auto lg:mx-0">
                            Multisky adalah bagian dari MPB Corps yang berfokus pada layanan Pariwisata dan Manajemen Acara. Kami berkomitmen untuk memberikan pengalaman terbaik dalam setiap acara dan perjalanan dengan dedikasi tinggi pada kualitas dan kepuasan pelanggan.
                        </p>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-500 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Manajemen Acara Profesional</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-500 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Solusi Pariwisata Terpadu</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-500 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Kreativitas dan Inovasi</span>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/3 flex justify-center">
                        <img
                            src="/images/company/5.webp" // Gambar Multisky
                            alt="About Multisky"
                            className="rounded-lg shadow-md max-w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="container mx-auto px-4 py-12 md:py-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Layanan Kami</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                            <a
                                href={whatsappLink(product.name || "Layanan Multisky")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative group"
                            >
                                <img src={product.image} alt={product.name} className="w-full object-contain p-4" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white font-bold text-lg">chat whatsapp</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900 text-neutral-300 pt-16 lg:pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                        {/* Column 1: Company Info (Multisky) */}
                        <div className="flex flex-col items-start">
                            <a href="/Product-Multisky" className="flex flex-col items-start mb-6 group">
                                <span className="text-xl font-bold text-white leading-tight tracking-tight">Multisky</span>
                                <span className="text-xs text-neutral-300 font-medium tracking-wide uppercase mt-0.5">Pariwisata & Manajemen Acara</span>
                            </a>
                            <p className="text-sm leading-relaxed mb-8 font-sans text-neutral-300 max-w-xs">
                                Mitra terpercaya Anda untuk solusi pariwisata terpadu dan manajemen acara yang luar biasa.
                            </p>
                            <div className="flex gap-4">
                                {multiskySocialLinks.map(({ Icon, url }, i) => (
                                    <a
                                        key={i}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-neutral-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all text-neutral-300 rounded-full group"
                                        aria-label={url.includes('instagram') ? 'Instagram Multisky' : `Social link ${i + 1}`}
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
                                        Manajemen Acara
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform"></span>
                                        Paket Wisata
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform"></span>
                                        Event Organizer
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform"></span>
                                        Tour & Travel
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
                                    <a href="mailto:info@multisky.com" className="text-sm hover:text-white transition-colors">info@multisky.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Navigation & Legal */}
                        <div>
                            <h4 className="text-white font-bold text-sm mb-6 font-display uppercase tracking-widest border-b border-neutral-800 pb-2 inline-block">
                                Navigasi
                            </h4>
                            <ul className="space-y-3 text-sm font-sans mb-8">
                                {multiskyNavigationLinks.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.href} className="hover:text-brand-400 transition-colors block py-1">
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <h4 className="text-white font-bold text-sm mb-4 font-display uppercase tracking-widest border-b border-neutral-800 pb-2 inline-block">
                                Legal
                            </h4>
                            <ul className="space-y-3 text-sm font-sans">
                                <li><a href="#" className="hover:text-brand-400 transition-colors">Kebijakan Privasi</a></li>
                                <li><a href="#" className="hover:text-brand-400 transition-colors">Syarat & Ketentuan</a></li>
                            </ul>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <p className="text-xs text-neutral-500 font-sans">
                            &copy; {currentYear} Multisky. Hak Cipta Dilindungi.
                        </p>
                        <p className="text-xs text-neutral-600 font-sans flex items-center gap-1">
                            <span>Dibuat dengan ❤️ oleh</span>
                            <span className="text-neutral-500 font-medium">Tim Multisky</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
