import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CompanyHero,
  CompanyAbout,
  CompanyContact,
  CompanyTestimonials,
  CompanyCTA,
  CompanyFounderStory
} from "../projects/company";
import SMIProducts from "../projects/sekolah-mentor-indonesia/sections/SMIProducts";

// Halaman landing utama publik untuk memperkenalkan Sekolah Mentor Indonesia.
export function meta() {
  return [
    { title: "PT Multiusaha Prioritas Bersama | Website Resmi" },
    { 
      name: "description", 
      content: "Website resmi PT Multiusaha Prioritas Bersama (MPB Group). Perusahaan induk yang berfokus pada pengembangan unit bisnis strategis di bidang pendidikan, teknologi, dan pemberdayaan ekonomi kreatif di Indonesia." 
    },
    { 
      name: "keywords", 
      content: "PT Multiusaha Prioritas Bersama, MPB Group, Sekolah Mentor Indonesia, perusahaan induk, investasi pendidikan, bisnis kreatif indonesia, Mohamad Iqbal Alhafizh" 
    },
    { property: "og:title", content: "PT Multiusaha Prioritas Bersama | Website Resmi" },
    { 
      property: "og:description", 
      content: "Website resmi PT Multiusaha Prioritas Bersama. Membangun masa depan Indonesia melalui pendidikan dan pemberdayaan ekonomi kreatif." 
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://multipriority.com" },
    { property: "og:image", content: "/images/company/logo.jpeg" },
    { property: "og:site_name", content: "PT Multiusaha Prioritas Bersama" },
    { property: "og:locale", content: "id_ID" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "PT Multiusaha Prioritas Bersama | Website Resmi" },
    { name: "twitter:description", content: "Website resmi PT Multiusaha Prioritas Bersama. Membangun masa depan Indonesia melalui pendidikan dan pemberdayaan ekonomi kreatif." },
    { name: "twitter:image", content: "/images/company/logo.jpeg" },
    { name: "robots", content: "index, follow" },
    { rel: "canonical", href: "https://multipriority.com" }
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
        "alternateName": "MPB Group",
        "url": "https://multipriority.com",
        "logo": "https://multipriority.com/images/company/logo.jpeg",
        "description": "Perusahaan induk yang menaungi berbagai unit bisnis strategis di Indonesia, berfokus pada pendidikan, teknologi, dan pemberdayaan ekonomi.",
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
                "description": "Platform pelatihan dan mentoring content creator."
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

      <CompanyAbout />
      <CompanyFounderStory />
      
      {/* Business Units Structure handled in CompanyAbout */}

      {/* Products Section - Hidden */}
      <div style={{ display: 'none' }}>
        <SMIProducts />
      </div>

      {/* Testimonials Section */}
      <CompanyTestimonials />

      {/* Contact Section */}
      <CompanyContact />

      {/* Footer */}
      <Footer variant="company" />
    </div>
  );
}
