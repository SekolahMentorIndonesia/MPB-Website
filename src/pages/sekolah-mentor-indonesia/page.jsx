import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import SMIHomeHero from "../../projects/sekolah-mentor-indonesia/sections/SMIHomeHero";
import WebsiteContent from "../../projects/sekolah-mentor-indonesia/sections/WebsiteContent";
import SMIHomeCommunity from "../../projects/sekolah-mentor-indonesia/sections/SMIHomeCommunity";
import SMIProducts from "../../projects/sekolah-mentor-indonesia/sections/SMIProducts";
import SMIAdvantages from "../../projects/sekolah-mentor-indonesia/sections/SMIAdvantages";
import SMIHomeSuccessStories from "../../projects/sekolah-mentor-indonesia/sections/SMIHomeSuccessStories";
import SMIAIAssistant from "../../projects/sekolah-mentor-indonesia/sections/SMIAIAssistant";
import SMILoadingScreen from "../../projects/sekolah-mentor-indonesia/sections/SMILoadingScreen";
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

export default function AppPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Midtrans script sekali saat app mount
    loadMidtransScript();
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Sekolah Mentor Indonesia",
    "alternateName": "SMI",
    "url": "https://mpbgroup.id/sekolah-mentor-indonesia",
    "parentOrganization": {
      "@type": "Corporation",
      "name": "PT Multiusaha Prioritas Bersama",
      "url": "https://mpbgroup.id"
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
        <SMIBlog />
        <SMIFAQ />
      </main>
      <SMIAIAssistant />
    </div>
  );
}
