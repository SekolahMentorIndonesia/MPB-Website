
export async function loader({ request }) {
  const url = new URL(request.url);
  const maxResults = url.searchParams.get('maxResults') || '50';
  const labels = url.searchParams.get('labels');
  
  // 1. Validasi Environment Variables
  // In React Router/Vite, we use import.meta.env
  // Note: VITE_ prefixed variables are exposed to client, but this code runs on server/build time
  // or via client-side proxy if configured. In RR7 SPA mode, this might run on client.
  // Assuming secure handling or public key usage (Blogger API Key is generally public-safe with referer restrictions)
  const API_KEY = import.meta.env.VITE_BLOGGER_API_KEY;
  const BLOG_ID = import.meta.env.VITE_BLOGGER_BLOG_ID;
  const BASE_URL = import.meta.env.VITE_BLOGGER_BASE_URL;

  if (!API_KEY || !BLOG_ID || !BASE_URL) {
    console.error('Missing Blogger API Configuration');
    return new Response(JSON.stringify({ 
      error: 'Server configuration error',
      message: 'Blogger API credentials not configured'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 2. Construct API URL
  const postUrl = url.searchParams.get('url');
  const query = url.searchParams.get('q');
  
  let bloggerUrl;
  const params = new URLSearchParams({ key: API_KEY });

  if (postUrl) {
    // Mode: Get by URL
    params.append('url', postUrl);
    bloggerUrl = `${BASE_URL}/blogs/${BLOG_ID}/posts/byurl?${params.toString()}`;
  } else if (query) {
    // Mode: Search
    params.append('q', query);
    bloggerUrl = `${BASE_URL}/blogs/${BLOG_ID}/posts/search?${params.toString()}`;
  } else {
    // Mode: List
    params.append('maxResults', maxResults);
    if (labels) {
      params.append('labels', labels);
    }
    bloggerUrl = `${BASE_URL}/blogs/${BLOG_ID}/posts?${params.toString()}`;
  }

  try {
    // 3. Fetch ke Google API
    const response = await fetch(bloggerUrl);
    
    // 4. Handle Specific Errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Blogger API Error:', response.status, errorData);

      if (response.status === 401 || response.status === 403) {
        return new Response(JSON.stringify({ error: 'Authentication failed' }), { status: 403 });
      }
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 });
      }
      
      throw new Error(`Blogger API returned ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Blogger Proxy Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch from Blogger' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
