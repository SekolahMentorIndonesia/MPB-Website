import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CompanyAbout, CompanyFounderStory, CompanyTestimonials } from "../../projects/company";

export function links() {
  return [
    { rel: "canonical", href: "https://multipriority.com/about" },
    { rel: "alternate", href: "https://multipriority.com/about", hreflang: "x-default" },
    { rel: "alternate", href: "https://multipriority.com/about", hreflang: "id" },
    { rel: "alternate", href: "https://multipriority.com/en/about", hreflang: "en" }
  ];
}

export function meta() {
  return [
    { title: "Tentang Kami | PT Multiusaha Prioritas Bersama" },
    { 
      name: "description", 
      content: "Pelajari lebih lanjut tentang PT Multiusaha Prioritas Bersama (MPB Corps), visi kami, dan kisah pendiri kami." 
    },
    { property: "og:title", content: "Tentang Kami | PT Multiusaha Prioritas Bersama" },
    { property: "og:description", content: "Pelajari lebih lanjut tentang PT Multiusaha Prioritas Bersama (MPB Corps), visi kami, dan kisah pendiri kami." },
    { property: "og:url", content: "https://multipriority.com/about" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/images/company/logo.jpeg" },
    { name: "robots", content: "index, follow" }
  ];
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="company" />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">
                Tentang <span className="text-brand-600">MPB Corps</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Membangun ekosistem bisnis yang berkelanjutan dan memberdayakan ekonomi kreatif Indonesia.
            </p>
        </div>
        
        <CompanyAbout />
        <CompanyFounderStory />
        <CompanyTestimonials />
      </div>
      <Footer variant="company" />
    </div>
  );
}
