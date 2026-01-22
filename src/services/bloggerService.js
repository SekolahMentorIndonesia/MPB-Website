// Blogger RSS Feed Service
// Configuration
const BLOGGER_CONFIG = {
  blogId: import.meta.env.VITE_BLOGGER_ID || '1722387930275850186',
  baseUrl: 'https://www.blogger.com/feeds',
  defaultParams: '?alt=rss&max-results=50'
};

// Blogger JSON API URLs (no API key needed - public endpoint)
export const BLOGGER_JSON_FEEDS = {
  landingAll: `https://www.googleapis.com/blogger/v3/blogs/${BLOGGER_CONFIG.blogId}/posts?maxResults=50&labels=landing`,
  websiteAll: `https://www.googleapis.com/blogger/v3/blogs/${BLOGGER_CONFIG.blogId}/posts?maxResults=50&labels=website`,
};

// Alternative: Direct RSS feed (no API key needed)
export const BLOGGER_RSS_FEEDS = {
  landingAll: `${BLOGGER_CONFIG.baseUrl}/${BLOGGER_CONFIG.blogId}/posts/default/-/landing${BLOGGER_CONFIG.defaultParams}`,
  websiteAll: `${BLOGGER_CONFIG.baseUrl}/${BLOGGER_CONFIG.blogId}/posts/default/-/website${BLOGGER_CONFIG.defaultParams}`,
};

// Parse RSS XML to JSON
export const parseRSSFeed = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
  const items = xmlDoc.getElementsByTagName('item');
  const posts = [];
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // Extract basic info
    const title = item.getElementsByTagName('title')[0]?.textContent || '';
    const link = item.getElementsByTagName('link')[0]?.textContent || '';
    const description = item.getElementsByTagName('description')[0]?.textContent || '';
    const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || '';
    
    // Extract categories (labels) - handle both formats
    const categories = [];
    const categoryElements = item.getElementsByTagName('category');
    for (let j = 0; j < categoryElements.length; j++) {
      const categoryText = categoryElements[j].textContent || categoryElements[j].getAttribute('domain');
      if (categoryText && !categories.includes(categoryText)) {
        categories.push(categoryText);
      }
    }
    
    // Extract media thumbnail (for videos)
    let thumbnail = '';
    const mediaThumbnail = item.getElementsByTagName('media:thumbnail')[0];
    if (mediaThumbnail) {
      thumbnail = mediaThumbnail.getAttribute('url') || '';
    }
    
    // Extract content - try content first, then description
    let content = '';
    const contentElement = item.getElementsByTagName('content')[0];
    if (contentElement) {
      content = contentElement.textContent || '';
    }
    if (!content) {
      content = description;
    }
    
    // Clean content from HTML entities
    content = (content || '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    
    // Determine content type from labels
    const contentType = categories.includes('video') ? 'video' : 
                      categories.includes('ebook') ? 'ebook' : 
                      categories.includes('tutorial') ? 'tutorial' : 'artikel';
    
    // Skip posts with empty or placeholder content
    if (!title || title === 'Sekolah Mentor Indonesia' || content.trim() === '&nbsp;Sekolah Mentor Indonesia' || content.trim() === 'Test Landing Page') {
      continue;
    }
    
    posts.push({
      title,
      link,
      description: (description || '').replace(/<[^>]*>/g, '').substring(0, 200),
      content,
      thumbnail,
      pubDate,
      categories,
      contentType,
      // Extract first image from content as fallback thumbnail
      image: thumbnail || extractFirstImage(content),
      // Format date
      formattedDate: new Date(pubDate).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      // Reading time estimation
      readingTime: estimateReadingTime(content)
    });
  }
  
  return posts;
};

// Extract first image from HTML content
const extractFirstImage = (content) => {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : '';
};

// Estimate reading time
const estimateReadingTime = (content) => {
  const text = (content || '').replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Fetch Blogger JSON API (no CORS issues)
export const fetchBloggerJSON = async (jsonUrl) => {
  try {
    console.log('Fetching Blogger JSON from:', jsonUrl);
    
    const response = await fetch(jsonUrl);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Blogger JSON response:', data);
    
    // Handle both API response formats
    let items = [];
    if (data.items) {
      items = data.items;
      console.log('Using data.items array');
    } else if (data && typeof data === 'object') {
      items = Array.isArray(data) ? data : [data];
      console.log('Using data as single item or array');
    }
    
    console.log('Raw items from Blogger:', items);
    console.log('Number of items:', items.length);
    
    if (items.length === 0) {
      console.log('No items found in response');
      return [];
    }
    
    // Convert Blogger API items to our format
    const posts = items.map(item => {
      console.log('Processing item:', item);
      
      // Extract labels from item
      const categories = item.labels ? item.labels.map(label => label.name || label) : [];
      console.log('Extracted categories:', categories);
      
      // Determine content type from labels
      const contentType = categories.includes('video') ? 'video' : 
                        categories.includes('ebook') ? 'ebook' : 
                        categories.includes('tutorial') ? 'tutorial' : 'artikel';
      
      console.log('Determined contentType:', contentType);
      
      // Skip posts with empty or placeholder content
      if (!item.title || item.title === 'Sekolah Mentor Indonesia') {
        console.log('Skipping placeholder post:', item.title);
        return null;
      }
      
      // Get the correct URL - Blogger API provides the full URL
      const postUrl = item.url || item.link || item.self?.link || `https://sekolahmentorindonesia.blogspot.com/p/${item.id}`;
      console.log('Post URL:', postUrl);
      
      // Extract content properly
      const content = item.content || item.summary || '';
      console.log('Content length:', content.length);
      console.log('Content preview:', content.substring(0, 100));
      
      return {
        title: item.title,
        link: postUrl,
        description: (content || '').substring(0, 200).replace(/<[^>]*>/g, ''),
        content: content,
        thumbnail: '',
        pubDate: item.published || item.updated,
        categories,
        contentType,
        image: extractFirstImage(content),
        formattedDate: new Date(item.published || item.updated).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        readingTime: estimateReadingTime(content)
      };
    }).filter(post => post !== null); // Remove null entries
    
    console.log('Final converted posts:', posts);
    return posts;
  } catch (error) {
    console.error('Error fetching Blogger JSON:', error);
    return [];
  }
};
export const fetchRSSFeed = async (feedUrl) => {
  try {
    console.log('Fetching RSS feed from:', feedUrl);
    
    // Use CORS proxy for Blogger feeds
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
    console.log('Proxy URL:', proxyUrl);
    
    const response = await fetch(proxyUrl);
    console.log('Proxy response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Proxy response data:', data);
    
    if (!data.contents) {
      throw new Error('No content received from proxy');
    }
    
    const xmlText = data.contents;
    console.log('Raw XML text length:', xmlText.length);
    console.log('Raw XML preview:', xmlText.substring(0, 500));
    
    const parsed = parseRSSFeed(xmlText);
    console.log('Parsed articles:', parsed);
    
    return parsed;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    
    // Fallback: Try direct fetch (might work in production)
    try {
      console.log('Trying direct fetch fallback...');
      const directResponse = await fetch(feedUrl);
      if (directResponse.ok) {
        const xmlText = await directResponse.text();
        console.log('Direct fetch successful, parsing...');
        return parseRSSFeed(xmlText);
      }
    } catch (fallbackError) {
      console.error('Fallback fetch also failed:', fallbackError);
    }
    
    return [];
  }
};

// Fetch multiple feeds with filtering
export const fetchFilteredContent = async (location, contentType = null) => {
  try {
    console.log(`Fetching filtered content for location: ${location}, contentType: ${contentType}`);
    
    let allContent = [];
    
    // Try JSON API first
    try {
      console.log('Trying JSON API...');
      allContent = await fetchBloggerJSON(BLOGGER_JSON_FEEDS[`${location}All`]);
      console.log('JSON API success, articles:', allContent.length);
    } catch (jsonError) {
      console.error('JSON API failed, trying RSS:', jsonError);
      
      // Fallback to RSS feed
      try {
        console.log('Trying RSS feed...');
        allContent = await fetchRSSFeed(BLOGGER_RSS_FEEDS[`${location}All`]);
        console.log('RSS feed success, articles:', allContent.length);
      } catch (rssError) {
        console.error('RSS feed also failed:', rssError);
      }
    }
    
    console.log('All content fetched:', allContent);
    
    // Filter by content type if specified
    let filteredContent = allContent;
    if (contentType) {
      filteredContent = allContent.filter(post => post.contentType === contentType);
      console.log(`Filtered by ${contentType}:`, filteredContent);
    }
    
    console.log('Final filtered content:', filteredContent);
    
    // Sort by date (newest first)
    const sorted = filteredContent.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    console.log('Sorted content:', sorted);
    
    return sorted;
  } catch (error) {
    console.error('Error fetching filtered content:', error);
    return [];
  }
};

// Get featured posts (latest from each category)
export const getFeaturedPosts = async (location) => {
  const feeds = [
    fetchRSSFeed(BLOGGER_FEEDS[`${location}Articles`]),
    fetchRSSFeed(BLOGGER_FEEDS[`${location}Videos`])
  ];
  
  if (location === 'website') {
    feeds.push(
      fetchRSSFeed(BLOGGER_FEEDS.websiteEbooks),
      fetchRSSFeed(BLOGGER_FEEDS.websiteTutorials)
    );
  }
  
  const results = await Promise.all(feeds);
  const featured = [];
  
  // Get first post from each category
  results.forEach((posts, index) => {
    if (posts.length > 0) {
      featured.push(posts[0]);
    }
  });
  
  // Sort by date
  return featured.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
};
