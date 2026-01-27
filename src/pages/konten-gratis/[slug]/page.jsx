'use client';

import { useLoaderData } from 'react-router';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Heart,
  Bookmark,
  Share2,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import contentService from '../../../services/contentService';
import SafeHTML from '../../../components/SafeHTML';

export async function loader({ params }) {
  const contentResponse = await contentService.getContentBySlug(params.slug);
  let content = null;
  let relatedContent = [];

  if (contentResponse.success && contentResponse.data) {
    content = contentResponse.data;
    
    // Load related content
    const relatedResponse = await contentService.getRelatedContent(params.slug, 3);
    if (relatedResponse.success && relatedResponse.data) {
      relatedContent = relatedResponse.data;
    }
  }

  // Return null content if not found to handle 404 in component
  return { content, relatedContent };
}

export function meta({ data }) {
  if (!data || !data.content) {
    return [
      { title: "Konten Tidak Ditemukan - Sekolah Mentor Indonesia" },
      { name: "description", content: "Maaf, konten yang Anda cari tidak tersedia." },
      { name: "robots", content: "noindex" }
    ];
  }

  const { content } = data;
  const url = `https://smi.id/konten-gratis/${content.slug}`;

  return [
    { title: `${content.title} - Sekolah Mentor Indonesia` },
    { name: "description", content: content.excerpt },
    { property: "og:title", content: content.title },
    { property: "og:description", content: content.excerpt },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "og:image", content: content.featuredImage || "https://smi.id/logo.jpeg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: content.title },
    { name: "twitter:description", content: content.excerpt },
    { name: "twitter:image", content: content.featuredImage || "https://smi.id/logo.jpeg" }
  ];
}

export default function KontenDetailPage() {
  const { content, relatedContent } = useLoaderData();
  const [showShareMenu, setShowShareMenu] = useState(false);

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
        alert('Link berhasil disalin!');
        setShowShareMenu(false);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Konten Tidak Ditemukan</h1>
          <p className="text-neutral-600 mb-6">Maaf, artikel yang Anda cari mungkin telah dihapus atau URL tidak valid.</p>
          <Link
            to="/konten-gratis"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Konten
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/konten-gratis"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-brand-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleShare('copy')}
              className="p-2 text-neutral-500 hover:text-brand-600 hover:bg-neutral-50 rounded-full transition-all"
              title="Copy Link"
            >
              <Copy className="w-5 h-5" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 text-neutral-500 hover:text-brand-600 hover:bg-neutral-50 rounded-full transition-all"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              {/* Share Menu Dropdown */}
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                  <button onClick={() => handleShare('facebook')} className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex items-center gap-3 text-sm text-neutral-600">
                    <Facebook className="w-4 h-4 text-blue-600" /> Facebook
                  </button>
                  <button onClick={() => handleShare('twitter')} className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex items-center gap-3 text-sm text-neutral-600">
                    <Twitter className="w-4 h-4 text-sky-500" /> Twitter/X
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex items-center gap-3 text-sm text-neutral-600">
                    <Linkedin className="w-4 h-4 text-blue-700" /> LinkedIn
                  </button>
                  <button onClick={() => handleShare('whatsapp')} className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex items-center gap-3 text-sm text-neutral-600">
                    <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
      >
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
              content.type === 'video' ? 'bg-red-50 text-red-600 border border-red-100' :
              content.type === 'ebook' ? 'bg-green-50 text-green-600 border border-green-100' :
              'bg-blue-50 text-blue-600 border border-blue-100'
            }`}>
              {content.type}
            </span>
            <span className="bg-neutral-100 text-neutral-600 border border-neutral-200 px-3 py-1 rounded-full text-xs font-medium">
              {content.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight font-display">
            {content.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 py-6 border-y border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 overflow-hidden">
                <img
                  src={content.authorAvatar}
                  alt={content.author}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=SMI&background=random";
                  }}
                />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{content.author}</p>
                <p className="text-xs">Penulis</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-neutral-200 hidden sm:block"></div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(content.pubDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{content.readingTime || 5} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {content.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-neutral-100">
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="bg-white rounded-2xl p-0 sm:p-0">
          <SafeHTML 
            className="prose prose-lg prose-neutral max-w-none 
              prose-headings:font-display prose-headings:font-bold prose-headings:text-neutral-900 
              prose-p:text-neutral-700 prose-p:leading-relaxed 
              prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md
              prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
              prose-li:marker:text-brand-500"
            html={content.content}
          />
        </div>

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wider">Topik Terkait</h3>
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/konten-gratis?search=${tag}`}
                  className="bg-neutral-100 text-neutral-600 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 border border-transparent px-4 py-2 rounded-lg text-sm transition-all"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.article>

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 pt-12 border-t border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 font-display">Baca Juga</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedContent.map((item) => (
              <Link 
                key={item.id} 
                to={`/konten-gratis/${item.slug}`}
                className="group block"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-neutral-100 relative">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-50">
                      <Bookmark className="w-8 h-8 text-brand-300" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-neutral-700 shadow-sm">
                    {item.type}
                  </div>
                </div>
                <h3 className="font-bold text-neutral-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-2">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
