'use client';

import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Download, 
  Play, 
  Calendar, 
  Clock, 
  User,
  Heart,
  Bookmark,
  Eye,
  X,
  ChevronDown
} from 'lucide-react';
import contentService from '../../services/contentService';
import { CONTENT_TYPE, FilterOptions } from '../../types/content';

export async function loader() {
  const response = await contentService.getWebsiteContent();
  return response.success ? response.data : [];
}

export function meta() {
  return [
    { title: "Konten Gratis - Sekolah Mentor Indonesia" },
    { 
      name: "description", 
      content: "Akses ribuan konten gratis dari Sekolah Mentor Indonesia. Artikel, ebook, dan video untuk meningkatkan skill content creation Anda." 
    },
    { 
      name: "keywords", 
      content: "konten gratis, artikel content creator, ebook gratis, video tutorial, sekolah mentor indonesia, belajar content creation" 
    },
    { property: "og:title", content: "Konten Gratis - Sekolah Mentor Indonesia" },
    { property: "og:description", content: "Akses ribuan konten gratis untuk content creator" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://smi.id/konten-gratis" },
    { name: "robots", content: "index, follow" },
    { rel: "canonical", href: "https://smi.id/konten-gratis" }
  ];
}

export default function KontenGratisPage() {
  const initialContent = useLoaderData();
  const [content, setContent] = useState(initialContent);
  const [filteredContent, setFilteredContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter content
  useEffect(() => {
    let filtered = [...content];

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search) ||
        item.excerpt.toLowerCase().includes(search) ||
        item.content.toLowerCase().includes(search) ||
        item.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }

    setFilteredContent(filtered);
  }, [content, selectedType, selectedCategory, searchTerm]);

  // Get unique categories
  const categories = ['all', ...new Set(content.map(item => item.category))];

  const ContentCard = ({ item }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={() => setSelectedContent(item)}
    >
      {/* Image */}
      <div className="h-48 relative overflow-hidden">
        {item.featuredImage ? (
          <img
            src={item.featuredImage}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-2">
                {item.type === 'video' ? (
                  <Play className="w-6 h-6 text-white" />
                ) : item.type === 'ebook' ? (
                  <Download className="w-6 h-6 text-white" />
                ) : (
                  <BookOpen className="w-6 h-6 text-white" />
                )}
              </div>
              <p className="text-brand-600 text-sm font-medium capitalize">{item.type}</p>
            </div>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.type === 'video' ? 'bg-red-100 text-red-600' :
            item.type === 'ebook' ? 'bg-green-100 text-green-600' :
            'bg-blue-100 text-blue-600'
          }`}>
            {item.type === 'video' ? 'Video' : 
             item.type === 'ebook' ? 'Ebook' : 'Artikel'}
          </span>
        </div>

        {/* Engagement Stats */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white text-xs">
          <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full">
            <Eye className="w-3 h-3" />
            {item.views}
          </div>
          <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full">
            <Heart className="w-3 h-3" />
            {item.likes}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-brand-50 text-brand-600 px-2 py-1 rounded-md font-medium text-xs">
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 mb-3 font-display line-clamp-2 group-hover:text-brand-600 transition-colors">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
          {item.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short'
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {item.readTime}m
            </div>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {item.author}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-neutral-500 text-xs">
              +{item.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium">
          {item.type === 'video' ? 'Tonton Video' :
           item.type === 'ebook' ? 'Download Ebook' : 'Baca Artikel'}
          <ChevronDown className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </motion.article>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-12">
            <div className="h-8 bg-neutral-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 bg-neutral-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-neutral-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-neutral-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-neutral-200 rounded w-20 mb-3"></div>
                  <div className="h-6 bg-neutral-200 rounded mb-3"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-neutral-900 mb-4 font-display">
              Konten Gratis
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Akses ribuan konten berkualitas untuk meningkatkan skill content creation Anda
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari konten..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-neutral-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Tipe Konten
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {FilterOptions.type.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'Semua Kategori' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                  Menampilkan {filteredContent.length} dari {content.length} konten
                </p>
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                >
                  Reset Filter
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ContentCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Tidak Ada Konten Ditemukan
            </h3>
            <p className="text-neutral-600 mb-6">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Content Modal */}
      {selectedContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedContent(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {selectedContent.title}
                </h2>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedContent.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedContent.readTime} menit baca
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {selectedContent.author}
                </div>
              </div>

              {/* Type & Category */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedContent.type === 'video' ? 'bg-red-100 text-red-600' :
                  selectedContent.type === 'ebook' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {selectedContent.type === 'video' ? 'Video' : 
                   selectedContent.type === 'ebook' ? 'Ebook' : 'Artikel'}
                </span>
                <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedContent.category}
                </span>
                {selectedContent.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Video Embed */}
              {selectedContent.type === 'video' && selectedContent.videoUrl && (
                <div className="mb-6">
                  <iframe
                    src={selectedContent.videoUrl}
                    className="w-full h-96 rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Content */}
              <SafeHTML 
                className="prose prose-sm max-w-none text-neutral-700 leading-relaxed mb-8"
                html={selectedContent.content}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedContent.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {selectedContent.likes} likes
                  </div>
                  <div className="flex items-center gap-1">
                    <Bookmark className="w-4 h-4" />
                    {selectedContent.bookmarks} bookmarks
                  </div>
                </div>
                <div className="flex gap-3">
                  {selectedContent.type === 'ebook' && selectedContent.downloadUrl && (
                    <button
                      onClick={() => window.open(selectedContent.downloadUrl, '_blank')}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download Ebook
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedContent(null)}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors text-sm font-medium"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
