import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { AnimatePresence } from "framer-motion";
import contentService from "../../services/contentService";
import Navbar from "../../components/Navbar";
import SMIHomeHero from "../../projects/sekolah-mentor-indonesia/sections/SMIHomeHero";
import WebsiteContent from "../../projects/sekolah-mentor-indonesia/sections/WebsiteContent";
import SMIHomeCommunity from "../../projects/sekolah-mentor-indonesia/sections/SMIHomeCommunity";
import SMIProducts from "../../projects/sekolah-mentor-indonesia/sections/SMIProducts";
import SMIAdvantages from "../../projects/sekolah-mentor-indonesia/sections/SMIAdvantages";
import SMIHomeSuccessStories from "../../projects/sekolah-mentor-indonesia/sections/SMIHomeSuccessStories";
import SMIChatAI from "../../components/SMIChatAI";
import SMIFAQ from "../../projects/sekolah-mentor-indonesia/sections/SMIFAQ";
import SMIBlog from "../../projects/sekolah-mentor-indonesia/sections/SMIBlog";

// Load Midtrans Snap Script sekali di head
const loadMidtransScript = () => {
  if (!document.querySelector('script[data-midtrans-snap]')) {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    if (clientKey) {
        script.setAttribute('data-client-key', clientKey);
        script.setAttribute('data-midtrans-snap', 'true');
        script.async = true;
        document.head.appendChild(script);
    } else {
        console.error("VITE_MIDTRANS_CLIENT_KEY not set");
    }
  }
};

export async function clientLoader() {
  try {
    const response = await contentService.getLandingContent(3);
    return {
      articles: response?.success ? response.data : []
    };
  } catch (error) {
    console.error("Failed to load articles:", error);
    return { articles: [] };
  }
}

export function meta() {
  return [
    { title: "Sekolah Mentor Indonesia - Platform Belajar Content Creator" },
    { name: "description", content: "Bergabung dengan Sekolah Mentor Indonesia. Platform edukasi terdepan untuk content creator. Pelajari strategi branding, produksi konten, dan monetisasi." },
    { name: "keywords", content: "Sekolah Mentor Indonesia, SMI, kursus content creator, belajar jadi konten kreator, mentoring online, kelas konten kreator indonesia, strategi branding" },
    { property: "og:title", content: "Sekolah Mentor Indonesia - Platform Belajar Content Creator" },
    { property: "og:description", content: "Bergabung dengan Sekolah Mentor Indonesia. Platform edukasi terdepan untuk content creator." },
    { property: "og:image", content: "/logo.jpeg" },
    { property: "og:image:alt", content: "Logo Sekolah Mentor Indonesia" },
    { property: "og:url", content: "https://multipriority.com/sekolah-mentor-indonesia" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Sekolah Mentor Indonesia" },
    { name: "twitter:description", content: "Platform edukasi terdepan untuk content creator." },
    { name: "twitter:image", content: "/logo.jpeg" },
    { name: "twitter:image:alt", content: "Logo Sekolah Mentor Indonesia" },
    { name: "robots", content: "index, follow" },
    { rel: "canonical", href: "https://multipriority.com/sekolah-mentor-indonesia" }
  ];
}

export default function AppPage() {
  const { articles } = useLoaderData() || { articles: [] };

  useEffect(() => {
    // Load Midtrans script sekali saat app mount
    loadMidtransScript();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Sekolah Mentor Indonesia",
    "alternateName": "SMI",
    "url": "https://multipriority.com/sekolah-mentor-indonesia",
    "logo": "https://multipriority.com/logo.jpeg",
    "description": "Platform edukasi terdepan untuk content creator. Pelajari strategi branding, produksi konten, dan monetisasi.",
    "sameAs": [
        "https://www.instagram.com/sekolahmentor_id"
    ],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Blk. G, Sriamur",
        "addressLocality": "Kec. Tambun Utara",
        "addressRegion": "Jawa Barat",
        "postalCode": "17510",
        "addressCountry": "ID"
    },
    "parentOrganization": {
      "@type": "Corporation",
      "name": "PT Multiusaha Prioritas Bersama",
      "url": "https://multipriority.com"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main>
        <SMIHomeHero />
        {/* <WebsiteContent /> */} {/* Sembunyikan sementara Pusat Edukasi Gratis */}
        <SMIHomeCommunity />
        <SMIProducts />
        <SMIAdvantages />
        <SMIHomeSuccessStories />
        <SMIBlog articles={articles} />
        <SMIFAQ />
      </main>
      <SMIChatAI />
    </div>
  );
}
