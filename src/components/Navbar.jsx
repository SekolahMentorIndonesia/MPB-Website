import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Navbar({ variant = 'company' }) {
  const { t, i18n } = useTranslation(['company', 'landing']);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navbarConfig = {
    company: {
      logo: "/images/company/logo.webp",
      title: t('navbar.title', { ns: 'company' }),
      subtitle: t('navbar.subtitle', { ns: 'company' }),
      menuItems: [
        { name: t('navbar.home', { ns: 'company' }), href: '#hero' },
        {
          name: t('navbar.about', { ns: 'company' }),
          href: '#about-company',
          hasDropdown: true,
          dropdownItems: [
            { name: t('navbar.about_us', { ns: 'company' }), href: '#about-company' },
            { name: t('navbar.vision_mission', { ns: 'company' }), href: '#visi-misi' },
            { name: t('navbar.board_of_director', { ns: 'company' }), href: '#team' },
            { name: t('navbar.structure', { ns: 'company' }), href: '#unit-usaha' },
          ]
        },
        {
          name: t('navbar.our_services', { ns: 'company' }),
          hasDropdown: true,
          dropdownItems: [
            { name: t('navbar.education_talent', { ns: 'company' }), href: 'https://smi.multipriority.com/' },
            { name: t('navbar.digital_telecom', { ns: 'company' }), href: '#unit-mti' },
            { name: t('navbar.it_trade_services', { ns: 'company' }), href: '/Product-Pusat-Laptop-Bekasi' },
            { name: t('navbar.digital_branding', { ns: 'company' }), href: '/Product-IQICorps' },
            { name: t('navbar.tourism_event', { ns: 'company' }), href: '/Product-Multisky' },
            { name: t('navbar.creative_design_print', { ns: 'company' }), href: '/Product-Desain-Percetakan-Kreatif' },
            { name: t('navbar.creative_production', { ns: 'company' }), href: '#unit-ppp' },
          ]
        },
        { name: t('navbar.career', { ns: 'company' }), href: 'https://recruitment.multipriority.com' },
        { name: t('navbar.contact', { ns: 'company' }), href: '#contact' },
      ]
    }
  };

  const currentConfig = navbarConfig.company;
  const menuItems = currentConfig?.menuItems || [];

  const [activeDropdown, setActiveDropdown] = useState(null);

  const scrollToSection = (e, href) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);

    // Handle page navigation
    if (href.startsWith('/') || href.startsWith('#')) {
      e.preventDefault(); // Only prevent default for internal links
      if (href.startsWith('/')) {
        navigate(href);
        return;
      }

      if (href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          const navbarHeight = 68;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
    // If it's an external link, let the default behavior (navigation) happen
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
        {/* Logo Section (Left) */}
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex items-center hover:scale-105 transition-transform duration-200"
            aria-label="Go to homepage"
          >
            <img
              src={currentConfig.logo}
              alt=""
              className="h-10 sm:h-12 w-auto object-contain"
              width="48"
              height="48"
            />
            <div className="ml-3 flex flex-col items-start">
              <span className="text-sm font-bold text-neutral-900 leading-tight">{currentConfig.title}</span>
              <span className="text-[10px] text-neutral-500 leading-tight">{currentConfig.subtitle}</span>
            </div>
          </button>
        </div>

        {/* Desktop Menu (Right) */}
        <div className="hidden lg:flex items-center gap-6">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              onFocus={() => item.hasDropdown && setActiveDropdown(item.name)}
              onBlur={(e) => {
                // Close if focus leaves the group
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setActiveDropdown(null);
                }
              }}
            >
              <a
                href={item.href}
                onClick={(e) => !item.hasDropdown && scrollToSection(e, item.href)}
                className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-brand-600 transition-colors duration-200 py-2 outline-none focus:text-brand-600"
                aria-haspopup={item.hasDropdown ? "true" : undefined}
                aria-expanded={item.hasDropdown ? (activeDropdown === item.name) : undefined}
                role={item.hasDropdown ? "button" : "link"}
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                )}
              </a>

              {/* Desktop Dropdown */}
              {item.hasDropdown && (
                <div
                  className={`absolute top-full right-0 w-72 pt-2 transition-all duration-200 ${activeDropdown === item.name
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 translate-y-2 invisible'
                    }`}
                  role="menu"
                  aria-label={`${item.name} submenu`}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden py-2">
                    {item.dropdownItems.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        onClick={(e) => scrollToSection(e, subItem.href)}
                        className="block px-4 py-2.5 text-sm text-neutral-600 hover:bg-brand-50 hover:text-brand-600 transition-colors focus:bg-brand-50 focus:text-brand-600 outline-none"
                        role="menuitem"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Language Switcher */}
          <div className="relative ml-2 pl-6 border-l border-neutral-200">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg transition-colors duration-200 text-neutral-600"
              aria-label="Select language"
              aria-expanded={isLangOpen}
              aria-haspopup="true"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{i18n.language}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-neutral-100 p-1 overflow-hidden"
                  role="menu"
                >
                  <button
                    onClick={() => changeLanguage('id')}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${i18n.language === 'id' ? 'bg-brand-50 text-brand-600' : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    role="menuitem"
                  >
                    Bahasa Indonesia
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${i18n.language.startsWith('en') ? 'bg-brand-50 text-brand-600' : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    role="menuitem"
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl flex flex-col lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                <span className="font-bold text-neutral-900">{currentConfig.title}</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-5">
                <div className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                    <div key={item.name} className="flex flex-col gap-2">
                      <a
                        href={item.href}
                        onClick={(e) => !item.hasDropdown && scrollToSection(e, item.href)}
                        className="text-base font-medium text-neutral-800 py-2"
                      >
                        {item.name}
                      </a>

                      {/* Mobile Dropdown Items */}
                      {item.hasDropdown && (
                        <div className="pl-4 flex flex-col gap-3 border-l-2 border-neutral-100">
                          {item.dropdownItems.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => scrollToSection(e, subItem.href)}
                              className="text-sm text-neutral-600 py-1"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-4">Language</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => changeLanguage('id')}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${i18n.language === 'id'
                        ? 'bg-brand-50 border-brand-200 text-brand-700'
                        : 'border-neutral-200 text-neutral-600'
                        }`}
                    >
                      Indonesia
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${i18n.language.startsWith('en')
                        ? 'bg-brand-50 border-brand-200 text-brand-700'
                        : 'border-neutral-200 text-neutral-600'
                        }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
