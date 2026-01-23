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
    { title: "PT Multiusaha Prioritas Bersama - Membangun Ekosistem Wirausaha Indonesia" },
    { 
      name: "description", 
      content: "PT Multiusaha Prioritas Bersama (MPB Group) adalah perusahaan induk yang berfokus pada pengembangan unit bisnis strategis di bidang pendidikan (Sekolah Mentor Indonesia) dan pemberdayaan ekonomi kreatif." 
    },
    { 
      name: "keywords", 
      content: "PT Multiusaha Prioritas Bersama, MPB Group, Sekolah Mentor Indonesia, perusahaan induk, investasi pendidikan, bisnis kreatif indonesia, Mohammad Iqbal Alhafizh" 
    },
    { property: "og:title", content: "PT Multiusaha Prioritas Bersama - Membangun Ekosistem Wirausaha" },
    { 
      property: "og:description", 
      content: "Membangun masa depan Indonesia melalui pendidikan dan pemberdayaan ekonomi kreatif. Induk perusahaan Sekolah Mentor Indonesia." 
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://mpbgroup.id" },
    { property: "og:image", content: "/images/company/logo.jpeg" },
    { property: "og:site_name", content: "MPB Group" },
    { property: "og:locale", content: "id_ID" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "index, follow" },
    { rel: "canonical", href: "https://mpbgroup.id" }
  ];
}

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "PT Multiusaha Prioritas Bersama",
    "alternateName": "MPB Group",
    "url": "https://mpbgroup.id",
    "logo": "https://mpbgroup.id/images/company/logo.jpeg",
    "description": "Perusahaan induk yang menaungi berbagai unit bisnis strategis di Indonesia, berfokus pada pendidikan, teknologi, dan pemberdayaan ekonomi.",
    "founder": {
      "@type": "Person",
      "name": "Mohammad Iqbal Alhafizh",
      "jobTitle": "Founder & CEO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-819-1502-0498",
      "contactType": "customer service",
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
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Header Navigation */}
      <Navbar variant="company" />

      {/* Hero Section */}
      <CompanyHero />

      {/* About Section */}
      <CompanyAbout />

      {/* Founder Story Section */}
      <CompanyFounderStory />

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
