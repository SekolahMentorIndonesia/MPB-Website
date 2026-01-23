import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function CompanyAbout() {
  const { t } = useTranslation('company');

  return (
    <div className="bg-neutral-50 overflow-hidden">
      {/* Section 1: Tentang PT */}
      <section id="about-company" className="py-20 lg:py-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block font-sans">
              {t('about.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-12 font-display leading-tight">
              {t('about.title')}
            </h2>
            
            <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-soft border border-neutral-100">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-wider mb-5 font-sans">
                {t('about.history_badge')}
              </div>
              <div className="space-y-4 text-neutral-600 font-sans leading-relaxed text-sm sm:text-base">
                <p>
                  {t('about.history_p1')}
                </p>
                <p>
                  {t('about.history_p2')}
                </p>
                <p>
                  {t('about.history_p3')}
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
                    <p className="text-neutral-900 font-bold text-base font-display leading-none">{t('about.parent_company')}</p>
                    <p className="text-neutral-400 text-sm font-sans mt-1">{t('about.parent_type')}</p>
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
              {t('strategy.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-12 font-display leading-tight">
              {t('strategy.title')}
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
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-5 font-display">{t('strategy.vision_title')}</h3>
                <p className="text-neutral-600 font-sans leading-relaxed text-sm sm:text-base">
                 {t('strategy.vision_desc')}
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
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-5 font-display">{t('strategy.mission_title')}</h3>
                <ul className="space-y-3 text-neutral-600 font-sans leading-relaxed text-sm sm:text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-600 font-bold mt-1">•</span>
                    <span>{t('strategy.mission_1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-600 font-bold mt-1">•</span>
                    <span>{t('strategy.mission_2')}</span>
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
              {t('structure.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-12 font-display leading-tight">
              {t('structure.title')}
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
                    src="/images/company/1.png" 
                    alt="Logo Sekolah Mentor Indonesia" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">{t('structure.smi_name')}</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">{t('structure.smi_field')}</p>
                </div>
                
                <a 
                  href="/sekolah-mentor-indonesia" 
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm mt-6"
                >
                  {t('structure.smi_cta')}
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
                    src="/images/company/2.png" 
                    alt="Logo PT Mitranet Teknologi Internusa" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">{t('structure.mti_name')}</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">{t('structure.mti_field')}</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm mt-6"
                >
                  {t('structure.mti_cta')}
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
                    src="/images/company/3.png" 
                    alt="Logo Perusahaan 3" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">{t('structure.sks_name')}</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">{t('structure.sks_field')}</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  {t('structure.sks_cta')}
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
                    src="/images/company/4.png" 
                    alt="Logo Multiusaha Elektronik" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">{t('structure.me_name')}</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">{t('structure.me_field')}</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  {t('structure.me_cta')}
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
                    src="/images/company/5.png" 
                    alt="Logo Multisky" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">{t('structure.ms_name')}</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">{t('structure.ms_field')}</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  {t('structure.ms_cta')}
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
                    src="/images/company/6.png" 
                    alt="Logo Multipriority Store" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">{t('structure.mp_name')}</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">{t('structure.mp_field')}</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  {t('structure.mp_cta')}
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
                    src="/images/company/7.png" 
                    alt="Logo Priority Pro Property" 
                    className="h-32 w-auto object-contain mb-4 mx-auto"
                  />
                  <h3 className="text-xl font-bold text-neutral-900 font-display">{t('structure.ppp_name')}</h3>
                  <p className="text-brand-600 text-sm font-sans mt-1">{t('structure.ppp_field')}</p>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors duration-200 text-sm"
                >
                  {t('structure.ppp_cta')}
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