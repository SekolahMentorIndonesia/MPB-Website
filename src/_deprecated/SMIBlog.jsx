import { Calendar, ArrowRight, User, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchFilteredContent } from "../services/bloggerService";

export default function SMIBlog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        console.log('Loading landing articles...');
        
        // Try real API first
        const articlesData = await fetchFilteredContent('landing', 'artikel');
        console.log('Articles loaded:', articlesData);
        
        if (articlesData.length > 0) {
          setArticles(articlesData.slice(0, 6)); // Show 6 latest articles
        } else {
          // Fallback dummy data if API fails
          const dummyData = [
            {
              title: "10 Tips Jadi Content Creator Pemula",
              description: "Baru mulai jadi content creator? Hindari 5 kesalahan fatal ini! Pelajari strategi efektif untuk meningkatkan engagement dan interaksi dengan audiens Anda.",
              link: "https://sekolahmentorindonesia.blogspot.com/2026/01/10-tips-jadi-content-creator-pemula.html",
              pubDate: "Mon, 19 Jan 2026 08:37:00 +0000",
              categories: ["artikel", "landing"],
              contentType: "artikel",
              image: "",
              formattedDate: "19 Januari 2026",
              readingTime: 3
            }
          ];
          
          console.log('Using dummy data:', dummyData);
          setArticles(dummyData);
        }
        
      } catch (error) {
        console.error('Error loading articles:', error);
        
        // Fallback dummy data for any errors
        const fallbackData = [
          {
            title: "10 Tips Jadi Content Creator Pemula",
            description: "Baru mulai jadi content creator? Hindari 5 kesalahan fatal ini! Pelajari strategi efektif untuk meningkatkan engagement dan interaksi dengan audiens Anda.",
            link: "https://sekolahmentorindonesia.blogspot.com/2026/01/10-tips-jadi-content-creator-pemula.html",
            pubDate: "Mon, 19 Jan 2026 08:37:00 +0000",
            categories: ["artikel", "landing"],
            contentType: "artikel",
            image: "",
            formattedDate: "19 Januari 2026",
            readingTime: 3
          }
        ];
        
        console.log('Using fallback data:', fallbackData);
        setArticles(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const ArticleCard = ({ article }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => window.open(article.link, '_blank')}
    >
      {/* Image */}
      <div className="h-48 relative overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <p className="text-brand-600 text-sm font-medium">Artikel</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-4">
          {article.categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="bg-brand-50 text-brand-600 px-2 py-1 rounded-md font-medium text-xs"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Date & Reading Time */}
        <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {article.formattedDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readingTime} min
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 mb-3 font-display line-clamp-2 group-hover:text-brand-600 transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        {/* Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <User className="w-3 h-3" />
            SMI Team
          </div>
          <button className="text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center gap-1 transition-colors">
            Baca Selengkapnya
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  );

  // Loading skeleton
  if (loading) {
    return (
      <section id="blog" className="py-20 lg:py-32 px-4 sm:px-6 bg-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-6 bg-neutral-200 rounded w-32 mx-auto mb-4 animate-pulse"></div>
            <div className="h-10 bg-neutral-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-neutral-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-neutral-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-neutral-200 rounded w-20 mb-4"></div>
                  <div className="h-6 bg-neutral-200 rounded mb-3"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 lg:py-32 px-4 sm:px-6 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-4 block font-sans">
            BLOG & INSIGHTS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 font-display leading-tight">
            Artikel & Tips Terbaru
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Dapatkan insight terbaru tentang content creation, digital marketing, dan industri kreatif.
          </p>
        </motion.div>

        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center">
              <button 
                onClick={() => window.open('/konten', '_self')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors font-medium"
              >
                Lihat Semua Artikel
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Belum Ada Artikel
            </h3>
            <p className="text-neutral-600 mb-6">
              Artikel akan segera tersedia. Pastikan posting di Blogger dengan label "landing" dan "artikel".
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
