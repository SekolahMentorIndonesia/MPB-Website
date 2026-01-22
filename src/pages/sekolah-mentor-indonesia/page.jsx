import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import SMIHomeHero from "../../projects/sekolah-mentor-indonesia/sections/SMIHomeHero";
import WebsiteContent from "../../projects/sekolah-mentor-indonesia/sections/WebsiteContent";
import SMIHomeCommunity from "../../projects/sekolah-mentor-indonesia/sections/SMIHomeCommunity";
import SMIProducts from "../../projects/sekolah-mentor-indonesia/sections/SMIProducts";
import SMIHomeSuccessStories from "../../projects/sekolah-mentor-indonesia/sections/SMIHomeSuccessStories";
import SMIAIAssistant from "../../projects/sekolah-mentor-indonesia/sections/SMIAIAssistant";
import Footer from "../../components/Footer";
import SMILoadingScreen from "../../projects/sekolah-mentor-indonesia/sections/SMILoadingScreen";
import SMIFAQ from "../../projects/sekolah-mentor-indonesia/sections/SMIFAQ";
import SMIBlog from "../../projects/sekolah-mentor-indonesia/sections/SMIBlog";

// Load Midtrans Snap Script sekali di head
const loadMidtransScript = () => {
  if (!document.querySelector('script[data-midtrans-snap]')) {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', 'Mid-client-cFNW4aZ2M9oBRcjZ');
    script.setAttribute('data-midtrans-snap', 'true');
    script.async = true;
    document.head.appendChild(script);
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
      <AnimatePresence>
        {isLoading && <SMILoadingScreen key="loading" />}
      </AnimatePresence>

      <Navbar variant="smi" />
      <main>
        <SMIHomeHero />
        {/* <WebsiteContent /> */} {/* Sembunyikan sementara Pusat Edukasi Gratis */}
        <SMIHomeCommunity />
        <SMIProducts />
        <SMIHomeSuccessStories />
        <SMIBlog />
        <SMIFAQ />
      </main>
      <Footer variant="smi" />
      <SMIAIAssistant />
    </div>
  );
}
