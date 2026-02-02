import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Building2, Globe, Laptop, Smartphone, Palette, Film, Plane } from "lucide-react";

export default function CompanyStructure() {
  const { t } = useTranslation('company');

  const units = [
    { key: 'smi', icon: Building2 },
    { key: 'mti', icon: Smartphone },
    { key: 'sks', icon: Laptop },
    { key: 'me', icon: Globe },
    { key: 'ms', icon: Plane },
    { key: 'mp', icon: Palette },
    { key: 'ppp', icon: Film },
  ];

  return (
    <section id="structure" className="py-20 lg:py-32 px-4 sm:px-6 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-4 block font-sans">
            {t('structure.badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 font-display leading-tight">
            {t('structure.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {units.map((unit, index) => {
            const Icon = unit.icon;
            return (
              <motion.div
                key={unit.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 font-display">
                  {t(`structure.${unit.key}_name`)}
                </h3>
                <p className="text-neutral-600 text-sm mb-6 font-sans">
                  {t(`structure.${unit.key}_field`)}
                </p>
                <div className="flex items-center text-brand-600 font-bold text-sm group-hover:gap-2 transition-all cursor-pointer">
                  {t(`structure.${unit.key}_cta`)}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
