import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WebsiteContent from "../../projects/sekolah-mentor-indonesia/sections/WebsiteContent";

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <WebsiteContent />
      <Footer type="home" />
    </div>
  );
}

export function meta() {
  return [
    { title: "Pusat Edukasi Gratis - Sekolah Mentor Indonesia" },
    { 
      name: "description", 
      content: "Kumpulan artikel, video, ebook, dan tutorial gratis untuk content creator. Belajar dari mentor profesional dan tingkatkan skill Anda." 
    },
    { 
      name: "keywords", 
      content: "tutorial content creator, ebook gratis, video tutorial, artikel marketing, belajar content creation, kursus gratis" 
    },
    { property: "og:title", content: "Pusat Edukasi Gratis - Sekolah Mentor Indonesia" },
    { 
      property: "og:description", 
      content: "Kumpulan artikel, video, ebook, dan tutorial gratis untuk content creator" 
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://smi.id/content" },
    { property: "og:image", content: "https://smi.id/logo.jpeg" },
    { name: "robots", content: "index, follow" }
  ];
}
