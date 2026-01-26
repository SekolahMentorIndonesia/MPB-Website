
// Mock user database (should match login route)
const USERS = [
  {
    id: 'user_1',
    email: 'user@smi.id',
    name: 'SMI Student',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=SMI+Student'
  },
  {
    id: 'admin_1',
    email: 'admin@smi.id',
    name: 'SMI Admin',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=SMI+Admin'
  }
];

export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Decode simple token
    try {
      const payload = JSON.parse(atob(token));
      
      if (payload.exp < Date.now()) {
        return new Response(JSON.stringify({ message: 'Token expired' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const user = USERS.find(u => u.id === payload.id);
      
      if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(user), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (e) {
      return new Response(JSON.stringify({ message: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Auth Check Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
