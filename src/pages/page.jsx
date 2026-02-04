import { Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CompanyHero } from "../projects/company";

// Lazy load non-critical sections
const CompanyAbout = lazy(() => import("../projects/company/sections/CompanyAbout"));
const CompanyContact = lazy(() => import("../projects/company/sections/CompanyContact"));
const CompanyTestimonials = lazy(() => import("../projects/company/sections/CompanyTestimonials"));
const CompanyFounderStory = lazy(() => import("../projects/company/sections/CompanyFounderStory"));

// Halaman landing utama publik untuk memperkenalkan Sekolah Mentor Indonesia.
export function links() {
  return [
    { rel: "canonical", href: "https://multipriority.com" },
    { rel: "alternate", href: "https://multipriority.com", hreflang: "x-default" },
    { rel: "alternate", href: "https://multipriority.com", hreflang: "id" },
    { rel: "alternate", href: "https://multipriority.com/en", hreflang: "en" }
  ];
}

export function meta() {
  return [
    { title: "PT Multiusaha Prioritas Bersama | Solusi Bisnis & Korporasi" },
    { 
      name: "description", 
      content: "PT Multiusaha Prioritas Bersama (MPB Corps) adalah perusahaan induk yang fokus pada investasi strategis, pengembangan unit bisnis, dan pemberdayaan ekonomi kreatif." 
    },
    { 
      name: "keywords", 
      content: "PT Multiusaha Prioritas Bersama, MPB Corps, perusahaan induk, holding company, investasi bisnis, pengembangan bisnis, ekonomi kreatif" 
    },
    { property: "og:title", content: "PT Multiusaha Prioritas Bersama | Solusi Bisnis & Korporasi" },
    { 
      property: "og:description", 
      content: "PT Multiusaha Prioritas Bersama (MPB Corps). Perusahaan induk profesional untuk pengembangan bisnis dan pemberdayaan ekonomi kreatif." 
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://multipriority.com" },
    { property: "og:image", content: "/images/company/logo.webp" },
    { property: "og:site_name", content: "PT Multiusaha Prioritas Bersama" },
    { property: "og:locale", content: "id_ID" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "PT Multiusaha Prioritas Bersama | Solusi Bisnis & Korporasi" },
    { name: "twitter:description", content: "Perusahaan induk profesional untuk pengembangan bisnis dan pemberdayaan ekonomi kreatif." },
    { name: "twitter:image", content: "/images/company/logo.webp" },
    { name: "robots", content: "index, follow" }
  ];
}

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "PT Multiusaha Prioritas Bersama",
        "url": "https://multipriority.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://multipriority.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Corporation",
        "name": "PT Multiusaha Prioritas Bersama",
        "alternateName": "MPB Corps",
        "url": "https://multipriority.com",
        "logo": "https://multipriority.com/images/company/logo.webp",
        "description": "Perusahaan induk yang menaungi berbagai unit bisnis strategis, berfokus pada layanan profesional dan pemberdayaan ekonomi.",
        "foundingDate": "2023",
        "sameAs": [
          "https://www.instagram.com/mpbgroup.id",
          "https://www.linkedin.com/company/mpb-group"
        ],
        "founder": {
          "@type": "Person",
          "name": "Mohamad Iqbal Alhafizh",
          "jobTitle": "Founder & CEO"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Blk. G, Sriamur",
          "addressLocality": "Kec. Tambun Utara",
          "addressRegion": "Jawa Barat",
          "postalCode": "17510",
          "addressCountry": "ID"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+62-819-1502-0498",
          "contactType": "customer service",
          "email": "info@multipriority.com",
          "areaServed": "ID",
          "availableLanguage": "Indonesian"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Business Units",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sekolah Mentor Indonesia",
                "description": "Unit bisnis strategis bidang pengembangan talenta."
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Header Navigation */}
      <Navbar variant="company" />

      <CompanyHero />

      <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading sections...</div>}>
        <CompanyAbout />
        <CompanyFounderStory />
        
        {/* Business Units Structure handled in CompanyAbout */}

        {/* Testimonials Section */}
        <CompanyTestimonials />

        {/* Contact Section */}
        <CompanyContact />
      </Suspense>

      {/* Footer */}
      <Footer variant="company" />
    </div>
  );
}
