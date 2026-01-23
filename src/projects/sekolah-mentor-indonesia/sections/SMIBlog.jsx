import { Calendar, ArrowRight, User, Clock, BookOpen, Download, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import contentService from "../../../services/contentService";

export default function SMIBlog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        console.log('Loading landing content...');
        
        // Use new content service
        const response = await contentService.getLandingContent(6);
        console.log('Content response:', response);
        
        if (response.success && response.data.length > 0) {
          setArticles(response.data);
        } else {
          console.log('No content found, showing empty state');
          setArticles([]);
        }
        
      } catch (error) {
        console.error('Error loading content:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const ContentCard = ({ content, onClick }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="h-48 relative overflow-hidden">
        {content.featuredImage ? (
          <img
            src={content.featuredImage}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-2">
                {content.type === 'video' ? (
                  <Play className="w-6 h-6 text-white" />
                ) : content.type === 'ebook' ? (
                  <Download className="w-6 h-6 text-white" />
                ) : (
                  <BookOpen className="w-6 h-6 text-white" />
                )}
              </div>
              <p className="text-brand-600 text-sm font-medium capitalize">{content.type}</p>
            </div>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            content.type === 'video' ? 'bg-red-100 text-red-600' :
            content.type === 'ebook' ? 'bg-green-100 text-green-600' :
            'bg-blue-100 text-blue-600'
          }`}>
            {content.type === 'video' ? 'Video' : 
             content.type === 'ebook' ? 'Ebook' : 'Artikel'}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-brand-50 text-brand-600 px-2 py-1 rounded-md font-medium text-xs">
            {content.category}
          </span>
        </div>

        {/* Date & Reading Time */}
        <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(content.publishedAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {content.readTime} min
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 mb-3 font-display line-clamp-2 group-hover:text-brand-600 transition-colors">
          {content.title}
        </h3>

        {/* Excerpt */}
        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
          {content.excerpt}
        </p>

        {/* Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <User className="w-3 h-3" />
            {content.author}
          </div>
          <button className="text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center gap-1 transition-colors">
            {content.type === 'video' ? 'Tonton Video' :
             content.type === 'ebook' ? 'Download Ebook' : 'Baca Selengkapnya'}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  );

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
              {articles.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ContentCard 
                    content={content} 
                    onClick={() => setSelectedArticle(content)}
                  />
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center">
              <button 
                onClick={() => window.open('/konten-gratis', '_self')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors font-medium"
              >
                Lihat Semua Konten
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Belum Ada Konten
            </h3>
            <p className="text-neutral-600">
              Konten akan segera tersedia
            </p>
          </div>
        )}
      </div>

      {/* Content Modal/Popup */}
      {selectedArticle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {selectedArticle.title}
                </h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedArticle.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedArticle.readTime} menit baca
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {selectedArticle.author}
                </div>
              </div>

              {/* Type & Category */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedArticle.type === 'video' ? 'bg-red-100 text-red-600' :
                  selectedArticle.type === 'ebook' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {selectedArticle.type === 'video' ? 'Video' : 
                   selectedArticle.type === 'ebook' ? 'Ebook' : 'Artikel'}
                </span>
                <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedArticle.category}
                </span>
                {selectedArticle.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Body */}
              <div className="prose prose-brand max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
