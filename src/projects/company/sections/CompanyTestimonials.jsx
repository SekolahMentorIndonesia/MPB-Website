import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

export default function CompanyTestimonials() {
  const { t } = useTranslation('company');
  const testimonials = t('testimonials.list', { returnObjects: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [direction, setDirection] = useState(1); // 1 = maju, -1 = mundur
  const sliderRef = useRef(null);

  // Auto-slide interval - maju mundur (back-and-forth)
  useEffect(() => {
    let interval;
    
    if (isAutoSliding) {
      interval = setInterval(() => {
        setActiveIndex((prev) => {
          let nextIndex = prev + direction;
          
          // Ubah arah jika mencapai batas
          if (nextIndex >= testimonials.length - 1) {
            setDirection(-1);
            return testimonials.length - 1;
          } else if (nextIndex <= 0) {
            setDirection(1);
            return 0;
          }
          
          return nextIndex;
        });
      }, 3000); // 3 detik per slide
    }
    
    return () => clearInterval(interval);
  }, [isAutoSliding, testimonials.length, direction]);

  // Update slider position when activeIndex changes - Handled by Framer Motion now


  // Handle manual slide
  const handleSlide = (index) => {
    setActiveIndex(index);
    setIsAutoSliding(false); // Stop auto-slide when user interacts
    
    // Resume auto-slide after 5 seconds of inactivity
    setTimeout(() => {
      setIsAutoSliding(true);
    }, 5000);
  };

  // Handle touch events for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setActiveIndex((prev) => Math.min(prev + 1, testimonials.length - 1));
      setIsAutoSliding(false);
    }
    if (touchEnd - touchStart > 50) {
      // Swipe right
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      setIsAutoSliding(false);
    }
    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
    
    // Resume auto-slide after 5 seconds
    setTimeout(() => {
      setIsAutoSliding(true);
    }, 5000);
  };

  return (
    <section id="testimoni" className="py-16 sm:py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-4 block font-sans">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 font-display leading-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-sans">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Layout - Responsive */}
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop: Show all 3 testimonials in grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {testimonials.map((testi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-50 p-8 rounded-2xl sm:rounded-3xl border border-neutral-100 shadow-soft flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <Quote className="text-brand-200 mb-6 w-8 h-8" />
                  <p className="text-base text-neutral-700 leading-relaxed mb-8 font-sans italic">
                    "{testi.content}"
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-200 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-neutral-200">
                    <img 
                      src={testi.image} 
                      alt={`${testi.name} - ${testi.role}`} 
                      width="56"
                      height="56"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'; // Hide image if broken
                        e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                        e.target.parentElement.innerHTML = `<span class="text-neutral-600 font-bold text-lg">${testi.name.charAt(0)}</span>`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm sm:text-base font-display mb-0.5">{testi.name}</h3>
                    <p className="text-neutral-500 text-xs sm:text-sm font-sans leading-tight">
                      {testi.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Slider showing 1 testimonial at a time */}
          <div className="lg:hidden relative max-w-3xl mx-auto overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((testi, index) => (
                <div
                  key={index}
                  className="min-w-full px-4"
                >
                  <div className="bg-neutral-50 p-8 rounded-2xl sm:rounded-3xl border border-neutral-100 shadow-soft flex flex-col justify-between h-full">
                    <div>
                      <Quote className="text-brand-200 mb-6 w-8 h-8" />
                      <p className="text-base text-neutral-700 leading-relaxed mb-8 font-sans italic">
                        "{testi.content}"
                      </p>
                    </div>

                    <div className="pt-6 border-t border-neutral-200 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-neutral-200">
                        <img 
                          src={testi.image} 
                          alt={testi.name} 
                          width="56"
                          height="56"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                            e.target.parentElement.innerHTML = `<span class="text-neutral-600 font-bold text-lg">${testi.name.charAt(0)}</span>`;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-neutral-900 text-sm sm:text-base font-display mb-0.5">{testi.name}</h3>
                        <p className="text-neutral-500 text-xs sm:text-sm font-sans leading-tight">
                          {testi.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Slider Indicators for Mobile */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlide(index)}
                  className={`relative w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === activeIndex ? 'bg-brand-600' : 'bg-neutral-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === activeIndex && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute inset-0 bg-brand-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      style={{ width: '24px', left: '-7px' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
