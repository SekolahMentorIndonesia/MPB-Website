import { motion } from "framer-motion";

export default function CompanyAbout() {

  return (
    <div className="bg-neutral-50 overflow-hidden">
      {/* Section 1: Tentang PT */}
      <section id="tentang-pt" className="py-20 lg:py-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block font-sans">
              TENTANG KAMI
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-12 font-display leading-tight">
              PT. Multiusaha Prioritas Bersama
            </h2>
            
            <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-wider mb-5 font-sans">
                SEJARAH SINGKAT
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-5 font-display">PT Multiusaha Prioritas Bersama</h3>
              <div className="space-y-4 text-neutral-600 font-sans leading-relaxed text-sm sm:text-base">
                <p>
                  PT. Multiusaha Prioritas Bersama didirikan pada 27 November 2023 dengan tujuan untuk membangun ekosistem wirausaha yang tangguh di Indonesia.
                </p>
                <p>
                  Sebagai perusahaan induk, kami fokus pada pembangunan ekosistem wirausaha yang tangguh melalui berbagai lini bisnis, termasuk pendidikan dan pelatihan.
                </p>
                <p>
                  Kami percaya bahwa dengan pendekatan yang tepat, setiap potensi bisnis dapat diakselerasi secara efektif dan berkelanjutan.
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-neutral-100">
                <div className="flex items-center gap-4">
                  <img 
                    src="/images/company/logo.jpeg" 
                    alt="Logo PT Multiusaha Prioritas Bersama" 
                    className="h-12 w-auto object-contain rounded"
                  />
                  <div>
                    <p className="text-neutral-900 font-bold text-base font-display leading-none">PT. Multiusaha Prioritas Bersama</p>
                    <p className="text-neutral-400 text-sm font-sans mt-1">Perusahaan Induk</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Visi & Misi */}
      <section id="visi-misi" className="py-20 lg:py-32 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block font-sans">
              STRATEGI PERUSAHAAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-12 font-display leading-tight">
              Visi & Misi
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Visi */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-neutral-50 p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-5 font-display">Visi</h3>
                <p className="text-neutral-600 font-sans leading-relaxed text-sm sm:text-base">
                 Menjadi lembaga pelatihan dan pendampingan bisnis terdepan di Indonesia yang menciptakan wirausahawan kompeten, bermental kuat, dan siap bersinergi.
                </p>
              </motion.div>
              
              {/* Misi */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-neutral-50 p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-5 font-display">Misi</h3>
                <ul className="space-y-3 text-neutral-600 font-sans leading-relaxed text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-600 font-bold mt-1">•</span>
                    <span>Menyelenggarakan program training dan coaching bisnis yang relevan dan praktis untuk mencetak SDM dengan kemampuan dan mental yang mumpuni.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-600 font-bold mt-1">•</span>
                    <span>Membekali peserta dengan mindset dan strategi yang dibutuhkan agar dapat membantu Mitra Bisnis mendapatkan omset yang maksimal.</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Unit Usaha */}
      <section id="unit-usaha" className="py-20 lg:py-32 px-4 sm:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block font-sans">
              STRUKTUR PERSEROAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-12 font-display leading-tight">
              Gurita Bisnis Perseroan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* SMI Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100 flex flex-col justify-between"
              >
                <div>
                  <img 
                    src="/smi.jpeg" 
                    alt="Logo Sekolah Mentor Indonesia" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">Sekolah Mentor Indonesia</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">Bidang Mentoring & Coaching</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm mt-6"
                >
                  Kunjungi Website
                  <span>→</span>
                </a>
              </motion.div>
              
              {/* MTI Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100 flex flex-col justify-between"
              >
                <div>
                  <img 
                    src="/mitranet.jpeg" 
                    alt="Logo PT Mitranet Teknologi Internusa" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">PT Mitranet Teknologi Internusa</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">Bidang Telekomunikasi Digital</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm mt-6"
                >
                  Kunjungi Website
                  <span>→</span>
                </a>
              </motion.div>
              
              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100 flex flex-col"
              >
                <div className="mb-6">
                  <img 
                    src="/sinergi.jpeg" 
                    alt="Logo Perusahaan 3" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">PT Sinergi Kasikarya Sejahtera</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">Bidang Food & Beverages</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  Kunjungi Website
                  <span>→</span>
                </a>
              </motion.div>
              
              {/* Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100 flex flex-col"
              >
                <div className="mb-6">
                  <img 
                    src="/multron.jpeg" 
                    alt="Logo Multiusaha Elektronik" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">Multiusaha Elektronik</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">Bidang Distribution Eletronik</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  Kunjungi Website
                  <span>→</span>
                </a>
              </motion.div>
              
              {/* Card 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100 flex flex-col"
              >
                <div className="mb-6">
                  <img 
                    src="/multisky.jpeg" 
                    alt="Logo Multisky" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">Multisky</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">Bidang Tour & Event</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  Kunjungi Website
                  <span>→</span>
                </a>
              </motion.div>
              
              {/* Card 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100 flex flex-col"
              >
                <div className="mb-6">
                  <img 
                    src="/multipriority.jpeg" 
                    alt="Logo Multipriority Store" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">Multipriority Store</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">Bidang Desain & Percetakan</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  Kunjungi Website
                  <span>→</span>
                </a>
              </motion.div>
              
              {/* Card 7 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100 flex flex-col"
              >
                <div className="mb-6">
                  <img 
                    src="/harsypriority.jpeg" 
                    alt="Logo Priority Pro Property" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">Priority Pro Property</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">Bidang Property</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  Kunjungi Website
                  <span>→</span>
                </a>
              </motion.div>
              

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}