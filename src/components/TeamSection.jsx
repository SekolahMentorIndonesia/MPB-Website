import { useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const managementMembers = [
  { 
    name: "Mohamad Iqbal Alhafizh", 
    role: "Direktur Utama", 
    img: "/images/company/iqbal.webp", 
    linkedin: "https://www.linkedin.com/in/mohamad-iqbal-alhafizh" 
  },
  { 
    name: "Daffa Naufal Fachrezi", 
    role: "Direktur Marketing", 
    img: "/images/company/daffa.webp", 
    linkedin: "https://www.linkedin.com/in/dappnett" 
  },
  { 
    name: "Muhammad Habiban", 
    role: "Direktur Operasional", 
    img: "/images/company/iban.webp", 
    linkedin: "#" 
  },
];

const stafMembers = [
  { 
    name: "Muhamad Dzarel Alghifari", 
    role: "Staff IT Specialist", 
    img: "/images/company/dzarel.webp", 
    linkedin: "https://www.linkedin.com/in/dzarelalghifari" 
  },
];

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState("board-of-director");

  const tabs = [
    { id: "board-of-director", label: "Board Of Director" },
    { id: "staf", label: "Staff" },
  ];

  const activeData = activeTab === "board-of-director" ? managementMembers : stafMembers;
  const activeTitle = activeTab === "board-of-director" ? "Management MPB Group" : "Staff MPB Group";
  const activeSubtitle = activeTab === "board-of-director" ? "Board of Director" : "Our Dedicated Team";

  return (
    <section id="team" className="py-16 sm:py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-600 mb-3">
            {activeSubtitle}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-8">
            {activeTitle}
          </h2>

          {/* Tab Selector */}
          <div className="inline-flex bg-white p-1.5 rounded-full border border-neutral-200 shadow-sm mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-600 rounded-full shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto"
            >
              {activeData.map((member, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-neutral-100 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width="300"
                      height="400"
                    />
                    <div className="absolute inset-x-4 bottom-4">
                      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white/95 backdrop-blur rounded-2xl shadow-lg border border-neutral-100">
                        <div>
                          <p className="text-sm sm:text-base font-semibold text-neutral-900">
                            {member.name}
                          </p>
                          <p className="text-xs text-neutral-500 font-semibold">
                            {member.role}
                          </p>
                        </div>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`LinkedIn profil ${member.name}`}
                            className="flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 text-neutral-500 hover:text-[#0077b5] hover:border-[#0077b5]/30 bg-white transition-all duration-300 hover:shadow-md"
                          >
                            <FaLinkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
