
export async function GET(request) {
  const url = new URL(request.url);
  const blogId = url.searchParams.get('blogId') || process.env.VITE_BLOGGER_ID || '1722387930275850186';
  const maxResults = url.searchParams.get('maxResults') || '50';

  if (!blogId) {
    return new Response(JSON.stringify({ error: 'Blog ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const bloggerUrl = `https://www.blogger.com/feeds/${blogId}/posts/default?alt=json&max-results=${maxResults}`;

  try {
    const response = await fetch(bloggerUrl);
    if (!response.ok) {
      throw new Error(`Blogger API returned ${response.status}`);
    }
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' // Cache for 1 hour
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
