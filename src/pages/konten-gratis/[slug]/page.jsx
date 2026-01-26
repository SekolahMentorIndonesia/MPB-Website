'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User,
  Heart,
  Bookmark,
  Eye,
  Share2,
  Download,
  Play,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Link as LinkIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import contentService from '../../../services/contentService';
import SafeHTML from '../../../components/SafeHTML';

export function meta({ params }) {
  return [
    { title: `Konten Gratis - Sekolah Mentor Indonesia` },
    { 
      name: "description", 
      content: `Baca konten gratis berkualitas dari Sekolah Mentor Indonesia untuk meningkatkan skill content creation Anda.` 
    }
  ];
}

export default function KontenDetailPage({ params }) {
  const [content, setContent] = useState(null);
  const [relatedContent, setRelatedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // Load main content
        const contentResponse = await contentService.getContentBySlug(params.slug);
        if (contentResponse.success && contentResponse.data) {
          setContent(contentResponse.data);
          
          // Load related content
          const relatedResponse = await contentService.getRelatedContent(params.slug, 3);
          if (relatedResponse.success && relatedResponse.data) {
            setRelatedContent(relatedResponse.data);
          }
        } else {
          console.warn('Content not found, using fallback');
          setContent(null);
        }
      } catch (error) {
        console.error('Error loading content:', error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      loadContent();
    }
  }, [params.slug]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = content?.title || 'Check out this content from SMI';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-32 mb-6"></div>
            <div className="h-12 bg-neutral-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-neutral-200 rounded w-3/4 mb-8"></div>
            <div className="h-64 bg-neutral-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-neutral-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Konten Tidak Ditemukan
            </h1>
            <p className="text-neutral-600 mb-8">
              Maaf, konten yang Anda cari tidak tersedia atau telah dihapus.
            </p>
            <Link
              to="/konten-gratis"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Konten Gratis
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <Link
            to="/konten-gratis"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Konten Gratis
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Type Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                content.type === 'video' ? 'bg-red-100 text-red-600' :
                content.type === 'ebook' ? 'bg-green-100 text-green-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {content.type === 'video' ? 'Video' : 
                 content.type === 'ebook' ? 'Ebook' : 'Artikel'}
              </span>
              <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-sm font-medium">
                {content.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-neutral-900 mb-4 font-display">
              {content.title}
            </h1>
            
            <p className="text-lg text-neutral-600 mb-6">
              {content.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={content.authorAvatar}
                    alt={content.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{content.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(content.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {content.readTime} menit baca
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {content.views} views
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {content.likes} likes
              </div>
              <div className="flex items-center gap-1">
                <Bookmark className="w-4 h-4" />
                {content.bookmarks} bookmarks
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Featured Image */}
          {content.featuredImage && (
            <div className="mb-8">
              <img
                src={content.featuredImage}
                alt={content.title}
                className="w-full h-64 sm:h-96 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Video Embed */}
          {content.type === 'video' && content.videoUrl && (
            <div className="mb-8">
              <iframe
                src={content.videoUrl}
                className="w-full h-96 rounded-xl"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}

          {/* Content Body */}
          <SafeHTML 
            className="prose prose-lg max-w-none text-neutral-700 leading-relaxed mb-8"
            html={content.content}
          />

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-neutral-200">
            <div className="flex gap-3">
              {content.type === 'ebook' && content.downloadUrl && (
                <button
                  onClick={() => window.open(content.downloadUrl, '_blank')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download Ebook
                  {content.fileSize && ` (${content.fileSize})`}
                </button>
              )}
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium">
                <Heart className="w-4 h-4" />
                Like
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors font-medium">
                <Bookmark className="w-4 h-4" />
                Bookmark
              </button>
            </div>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors font-medium"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-10">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4 text-sky-500" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4 text-blue-700" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center gap-2"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Related Content */}
        {relatedContent.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 pt-16 border-t border-neutral-200"
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">Konten Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedContent.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/konten-gratis/${item.slug}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white rounded-xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {item.featuredImage ? (
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-br from-brand-50 to-blue-50 flex items-center justify-center">
                        <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
                          {item.type === 'video' ? (
                            <Play className="w-4 h-4 text-white" />
                          ) : item.type === 'ebook' ? (
                            <Download className="w-4 h-4 text-white" />
                          ) : (
                            <Heart className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>{item.readTime} menit</span>
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
