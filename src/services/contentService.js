// Content Management Service
// Handle: Blogger API, JSON fallback, dan content filtering

class ApiResponse {
  static success(data, message = 'Success') {
    return {
      success: true,
      data,
      message
    };
  }

  static error(message, code = 500) {
    return {
      success: false,
      error: message,
      code
    };
  }
}

class ContentService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    this.bloggerAPI = import.meta.env.VITE_BLOGGER_API_KEY;
    this.blogId = import.meta.env.VITE_BLOGGER_BLOG_ID;
  }

  /**
   * Fetch konten dari Blogger API dengan fallback ke JSON
   */
  async fetchContent() {
    try {
      // Priority 1: Blogger RSS Feed (no API key needed)
      const bloggerData = await this.fetchFromBloggerRSS();
      if (bloggerData.length > 0) {
        return ApiResponse.success(bloggerData, 'Content loaded from Blogger RSS');
      }

      // Priority 2: Local JSON fallback
      const jsonData = await this.fetchFromJSON();
      return ApiResponse.success(jsonData, 'Content loaded from local JSON');

    } catch (error) {
      console.error('Error fetching content:', error);
      return ApiResponse.error('Failed to fetch content', 500);
    }
  }

  /**
   * Fetch dari Blogger RSS Feed (no API key needed)
   */
  async fetchFromBloggerRSS() {
    const blogId = this.blogId || '1722387930275850186';
    
    // Try multiple approaches to avoid CORS issues
    const urls = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.blogger.com/feeds/${blogId}/posts/default?alt=json&max-results=50`)}`,
      `https://cors-anywhere.herokuapp.com/https://www.blogger.com/feeds/${blogId}/posts/default?alt=json&max-results=50`,
      `https://www.blogger.com/feeds/${blogId}/posts/default?alt=json&max-results=50`
    ];
    
    let data = null;
    let lastError = null;
    
    for (const url of urls) {
      try {
        console.log('🔍 Trying URL:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        
        const json = await response.json();
        console.log('📊 Response data:', json);
        
        // Handle different response formats
        if (json.feed && json.feed.entry) {
          data = json;
          break;
        } else if (Array.isArray(json)) {
          // Some proxies return array directly
          data = { feed: { entry: json } };
          break;
        }
      } catch (error) {
        console.warn(`❌ Failed with ${url}:`, error.message);
        lastError = error;
      }
    }
    
    if (!data) {
      console.error('All URLs failed, using fallback');
      throw lastError || new Error('All fetch attempts failed');
    }
    
    if (!data.feed || !data.feed.entry) {
      console.log('⚠️ No entries found in RSS feed');
      return [];
    }
    
    const entries = data.feed.entry.map(entry => this.transformBloggerRSSEntry(entry));
    console.log('✅ Transformed entries:', entries);
    
    return entries;
  }

  /**
   * Transform Blogger RSS entry ke format SMI
   */
  transformBloggerRSSEntry(entry) {
    // Extract content
    const content = entry.content.$t || entry.summary.$t || '';
    
    // Extract labels from categories
    const categories = entry.category || [];
    const labels = categories.map(cat => cat.term);
    
    console.log('🏷️ Entry labels:', labels, 'Title:', entry.title.$t);
    
    const target = this.extractTargetFromLabels(labels);
    const type = this.extractTypeFromLabels(labels);
    
    console.log('🎯 Extracted target:', target, 'type:', type);
    
    return {
      id: entry.id.$t.split('/').pop(),
      title: entry.title.$t,
      slug: this.generateSlug(entry.title.$t),
      excerpt: this.extractExcerpt(content),
      content: content,
      author: entry.author[0].name.$t,
      authorAvatar: entry.author[0].gd$image?.src || '/images/default-avatar.png',
      publishedAt: entry.published.$t,
      updatedAt: entry.updated.$t,
      readTime: this.calculateReadTime(content),
      featuredImage: this.extractFeaturedImage(content),
      
      // Tags
      target,
      type,
      category: this.extractCategoryFromLabels(labels),
      tags: labels.filter(label => !this.isSystemTag(label)),
      
      // SEO
      status: 'published',
      seoTitle: entry.title.$t,
      seoDescription: this.extractExcerpt(content),
      seoKeywords: labels.filter(label => !this.isSystemTag(label)),
      
      // Engagement
      views: Math.floor(Math.random() * 1000) + 100,
      likes: Math.floor(Math.random() * 100) + 10,
      bookmarks: Math.floor(Math.random() * 50) + 5,
      
      // Media
      downloadUrl: this.extractDownloadUrl(content),
      fileSize: this.extractFileSize(content),
      pageCount: this.extractPageCount(content),
      videoUrl: this.extractVideoUrl(content),
      videoDuration: this.extractVideoDuration(content),
      thumbnailUrl: this.extractThumbnailUrl(content)
    };
  }

  /**
   * Fetch dari local JSON (fallback)
   */
  async fetchFromJSON() {
    try {
      const response = await fetch('/data/content.json');
      if (!response.ok) {
        throw new Error('JSON file not found');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Return empty array if JSON not available
      console.warn('Local JSON fallback failed, returning empty content');
      return [];
    }
  }

  /**
   * Filter konten berdasarkan target dan type
   */
  filterContent(content, filters = {}) {
    const { target, type, category, search } = filters;
    
    let filtered = [...content];

    // Filter by target
    if (target && target !== 'all') {
      filtered = filtered.filter(item => 
        item.target === target
      );
    }

    // Filter by type
    if (type && type !== 'all') {
      filtered = filtered.filter(item => item.type === type);
    }

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    // Search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.excerpt.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort by published date (newest first)
    filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return filtered;
  }

  /**
   * Get konten untuk landing page
   */
  async getLandingContent(limit = 6) {
    const response = await this.fetchContent();
    if (!response.success) return response;

    console.log('🔍 All content before filter:', response.data);
    
    const landingContent = this.filterContent(response.data, {
      target: 'landing'
    });

    console.log('🎯 Landing content after filter:', landingContent);

    return ApiResponse.success(landingContent.slice(0, limit));
  }

  /**
   * Get konten untuk website utama
   */
  async getWebsiteContent(filters = {}) {
    const response = await this.fetchContent();
    if (!response.success) return response;

    const websiteContent = this.filterContent(response.data, {
      target: 'website',
      ...filters
    });

    return ApiResponse.success(websiteContent);
  }

  /**
   * Get detail konten by slug
   */
  async getContentBySlug(slug) {
    const response = await this.fetchContent();
    if (!response.success) return response;

    const content = response.data.find(item => item.slug === slug);
    
    if (!content) {
      return ApiResponse.error('Content not found', 404);
    }

    return ApiResponse.success(content);
  }

  /**
   * Get related content
   */
  async getRelatedContent(slug, limit = 3) {
    const contentResponse = await this.getContentBySlug(slug);
    if (!contentResponse.success) return contentResponse;

    const content = contentResponse.data;
    const response = await this.fetchContent();
    if (!response.success) return response;

    // Filter related content by type, category, and tags
    const related = response.data
      .filter(item => 
        item.id !== content.id && // Exclude current content
        (item.type === content.type || 
         item.category === content.category ||
         item.tags.some(tag => content.tags.includes(tag)))
      )
      .slice(0, limit);

    return ApiResponse.success(related);
  }

  /**
   * Helper functions
   */
  extractTargetFromLabels(labels) {
    if (labels.includes('landing')) return 'landing';
    if (labels.includes('website')) return 'website';
    return 'landing'; // Default untuk landing page
  }

  extractTypeFromLabels(labels) {
    if (labels.includes('artikel')) return 'artikel';
    if (labels.includes('ebook')) return 'ebook';
    if (labels.includes('video')) return 'video';
    if (labels.includes('tutorial')) return 'tutorial';
    return 'artikel'; // Default
  }

  extractCategoryFromLabels(labels) {
    const categoryLabels = labels.filter(label => 
      !this.isSystemTag(label)
    );
    return categoryLabels[0] || 'Content Creation';
  }

  isSystemTag(label) {
    return ['landing', 'website', 'artikel', 'ebook', 'video', 'tutorial'].includes(label);
  }

  generateSlug(title) {
    return (title || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  extractExcerpt(content, maxLength = 150) {
    // Remove HTML tags
    const plainText = (content || '').replace(/<[^>]*>/g, '');
    const excerpt = plainText.substring(0, maxLength);
    return excerpt.length < plainText.length ? excerpt + '...' : excerpt;
  }

  extractFeaturedImage(content) {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : '/images/default-featured.jpg';
  }

  extractDownloadUrl(content) {
    const linkMatch = content.match(/<a[^>]+href="([^">]+download[^">]*)"/);
    return linkMatch ? linkMatch[1] : null;
  }

  extractFileSize(content) {
    const sizeMatch = content.match(/(\d+(?:\.\d+)?)\s*(MB|GB|KB)/i);
    return sizeMatch ? sizeMatch[0] : null;
  }

  extractPageCount(content) {
    const pageMatch = content.match(/(\d+)\s*(?:halaman|pages?)/i);
    return pageMatch ? parseInt(pageMatch[1]) : null;
  }

  extractVideoUrl(content) {
    const youtubeMatch = content.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^"&?\/\s]{11})/);
    if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    
    const videoMatch = content.match(/<video[^>]+src="([^">]+)"/);
    return videoMatch ? videoMatch[1] : null;
  }

  extractVideoDuration(content) {
    const durationMatch = content.match(/(\d{1,2}:\d{2}(?::\d{2})?)/);
    return durationMatch ? durationMatch[1] : null;
  }

  extractThumbnailUrl(content) {
    const thumbnailMatch = content.match(/<img[^>]+(?:thumbnail|thumb)[^>]+src="([^">]+)"/);
    return thumbnailMatch ? thumbnailMatch[1] : null;
  }

  calculateReadTime(content) {
    const plainText = (content || '').replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const wordCount = plainText.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}

export default new ContentService();
