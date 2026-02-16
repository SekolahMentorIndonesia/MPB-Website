import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Using the numbered images found in public/images/company/
// Ideally these should be actual client/partner logos
const logos = [
  "/images/company/1.webp",
  "/images/company/2.webp",
  "/images/company/3.webp",
  "/images/company/4.webp",
  "/images/company/5.webp",
  "/images/company/6.webp",
  "/images/company/7.webp",
  "/images/company/9.webp",
  "/images/company/10.webp",
];

export default function CompanyClients() {
  const { t } = useTranslation('company');

  return (
    <section className="py-12 bg-white border-b border-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <p className="text-neutral-500 text-sm font-medium tracking-wide uppercase">
          {t('clients.title', 'Dipercaya oleh berbagai mitra strategis')}
        </p>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Scrolling Container */}
        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30, // Adjust for speed
            }}
            style={{ width: "max-content" }}
          >
            {/* Double the list for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div 
                key={index} 
                className="relative w-24 h-12 sm:w-32 sm:h-16 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-6 sm:mx-10"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
