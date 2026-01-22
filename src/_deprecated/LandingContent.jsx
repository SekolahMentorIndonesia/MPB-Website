import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Play, BookOpen } from 'lucide-react';
import { fetchFilteredContent, getFeaturedPosts } from '../services/bloggerService';

export default function LandingContent() {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Load landing page content
        const [articlesData, videosData, featuredData] = await Promise.all([
          fetchFilteredContent('landing', 'artikel'),
          fetchFilteredContent('landing', 'video'),
          getFeaturedPosts('landing')
        ]);
        
        setArticles(articlesData.slice(0, 6)); // Show 6 latest articles
        setVideos(videosData.slice(0, 4)); // Show 4 latest videos
        setFeatured(featuredData.slice(0, 3)); // Show 3 featured posts
      } catch (error) {
        console.error('Error loading landing content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const ContentCard = ({ item, type = 'article' }) => {
    const isVideo = type === 'video';
    
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
        onClick={() => window.open(item.link, '_blank')}
      >
        {/* Image/Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-50 to-blue-50 flex items-center justify-center">
              {isVideo ? (
                <Play className="w-12 h-12 text-brand-600" />
              ) : (
                <BookOpen className="w-12 h-12 text-brand-600" />
              )}
            </div>
          )}
          
          {isVideo && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              VIDEO
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors">
            {item.title}
          </h3>
          
          <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
            {item.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {item.formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.readingTime} min
              </span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.article>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Loading Skeletons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-neutral-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Featured Section */}
      {featured.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-brand-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Konten Pilihan
              </h2>
              <p className="text-lg text-neutral-600">
                Insight terbaru dari Sekolah Mentor Indonesia
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((item, index) => (
                <ContentCard key={index} item={item} type={item.contentType} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles Section */}
      {articles.length > 0 && (
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Artikel Terbaru
              </h2>
              <p className="text-lg text-neutral-600">
                Tips dan strategi untuk content creator
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <ContentCard key={index} item={article} type="article" />
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-12">
              <button 
                onClick={() => window.open('https://sekolahmentorindonesia.blogspot.com', '_blank')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors"
              >
                Lihat Semua Artikel
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Latest Videos Section */}
      {videos.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Video Tutorial
              </h2>
              <p className="text-lg text-neutral-600">
                Belajar visual dengan video panduan
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, index) => (
                <ContentCard key={index} item={video} type="video" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-brand-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ingin Belajar Lebih Dalam?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Kunjungi Website Utama kami untuk mendapatkan ebook dan tutorial gratis
            </p>
            <button 
              onClick={() => window.open('/app', '_self')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 rounded-full hover:bg-neutral-50 transition-colors font-bold"
            >
              Mulai Belajar Gratis
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
