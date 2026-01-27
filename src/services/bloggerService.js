
// Blogger Service - Refactored to use Internal API Proxy
// This ensures API keys are hidden and we use real data from Google Blogger API v3

const INTERNAL_API_URL = '/api/content/blogger';

// Helper: Extract first image from HTML content
const extractFirstImage = (content) => {
  if (!content) return '';
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : '';
};

// Helper: Estimate reading time
const estimateReadingTime = (content) => {
  const text = (content || '').replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Helper: Transform Blogger API Item to App Content Format
const transformBloggerItem = (item) => {
  // Skip invalid items
  if (!item.title) return null;

  const rawContent = item.content || ''; // V3 API uses 'content'
  const cleanDescription = (rawContent).replace(/<[^>]*>/g, '').substring(0, 200) + '...';
  
  // V3 labels are strings
  const categories = item.labels || [];
  
  // Determine content type
  const contentType = categories.includes('video') ? 'video' : 
                    categories.includes('ebook') ? 'ebook' : 
                    categories.includes('tutorial') ? 'tutorial' : 'artikel';

  return {
    id: item.id,
    title: item.title,
    link: item.url, // V3 API provides 'url'
    description: cleanDescription,
    content: rawContent,
    pubDate: item.published,
    categories: categories,
    contentType: contentType,
    image: extractFirstImage(rawContent),
    formattedDate: new Date(item.published).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    readingTime: estimateReadingTime(rawContent)
  };
};

// Core Fetch Function (Generic)
const fetchFromInternalAPI = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${INTERNAL_API_URL}?${queryParams.toString()}`);
    
    if (!response.ok) {
      console.error(`API Error: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from internal API:', error);
    return null;
  }
};

/**
 * Fetch content filtered by location (label) and optional type
 * @param {string} location - Label to filter by (e.g., 'website', 'landing')
 * @param {string} contentType - Optional content type filter
 */
export const fetchFilteredContent = async (location, contentType = null) => {
  try {
    const data = await fetchFromInternalAPI({
      labels: location,
      maxResults: 50
    });

    // Ensure we have an array
    const items = data && data.items ? data.items : [];

    const posts = items.map(transformBloggerItem).filter(post => post !== null);

    // Sort by date (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    if (contentType) {
      return sortedPosts.filter(post => post.contentType === contentType);
    }

    return sortedPosts;
  } catch (error) {
    console.error('Error in fetchFilteredContent:', error);
    return [];
  }
};

/**
 * Get Content by URL (using Blogger API byurl)
 */
export const getContentByUrl = async (postUrl) => {
  try {
    const data = await fetchFromInternalAPI({ url: postUrl });
    if (!data || data.error) return null;
    return transformBloggerItem(data);
  } catch (error) {
    console.error('Error in getContentByUrl:', error);
    return null;
  }
};

/**
 * Search Content (using Blogger API search)
 */
export const searchContent = async (query) => {
  try {
    const data = await fetchFromInternalAPI({ q: query });
    const items = data && data.items ? data.items : [];
    return items.map(transformBloggerItem).filter(post => post !== null);
  } catch (error) {
    console.error('Error in searchContent:', error);
    return [];
  }
};

/**
 * Get featured posts (latest from each category)
 * @param {string} location - Label to filter by
 */
export const getFeaturedPosts = async (location) => {
  try {
    // Fetch all posts for the location
    const posts = await fetchFilteredContent(location);
    
    const types = ['artikel', 'video', 'ebook', 'tutorial'];
    const featured = [];
    
    // Pick the latest post for each type
    types.forEach(type => {
      const post = posts.find(p => p.contentType === type);
      if (post) featured.push(post);
    });

    return featured;
  } catch (error) {
    console.error('Error in getFeaturedPosts:', error);
    return [];
  }
};

// Deprecated exports (kept to avoid breaking imports if any, but they are replaced)
// export const fetchBloggerJSON = ... 
// export const fetchRSSFeed = ...
