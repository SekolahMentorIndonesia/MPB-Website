import { Linkedin } from "lucide-react";

const teamMembers = [
  { 
    name: "Mohamad Iqbal Alhafizh", 
    role: "Founder & CEO", 
    img: "/images/company/founder.jpeg", 
    linkedin: "#" 
  },
  { 
    name: "Robert Leonardo Tobing", 
    role: "Business Partner", 
    img: "/images/company/robert.jpeg", 
    linkedin: "#" 
  },
  { 
    name: "Irvan Kusuma Tardiyanto", 
    role: "Creative Partner", 
    img: "/images/company/irvan.jpeg", 
    linkedin: "#" 
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-16 sm:py-20 bg-neutral-50 hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-600 mb-3">
            Tim Kami
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            Orang di Balik MPB Group & Sekolah Mentor Indonesia
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Tim lintas peran yang fokus pada pengembangan ekosistem wirausaha, teknologi, dan edukasi.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden"
            >
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-neutral-100 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-4 bottom-4">
                  <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white/95 backdrop-blur rounded-2xl shadow-lg border border-neutral-100">
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-neutral-900">
                        {member.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {member.role}
                      </p>
                    </div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 text-neutral-500 hover:text-brand-700 hover:border-brand-200 bg-white transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
