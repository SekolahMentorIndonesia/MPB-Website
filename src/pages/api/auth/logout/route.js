
export async function POST(request) {
  // In a stateless JWT system, explicit logout on backend isn't strictly necessary 
  // unless using a blacklist/redis. For now, we just return success.
  return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
