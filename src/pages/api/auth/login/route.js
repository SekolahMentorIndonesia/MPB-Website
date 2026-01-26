
// Mock user database
const USERS = [
  {
    id: 'user_1',
    email: 'user@smi.id',
    password: 'password123', // In real app, hash this!
    name: 'SMI Student',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=SMI+Student'
  },
  {
    id: 'admin_1',
    email: 'admin@smi.id',
    password: 'adminpassword',
    name: 'SMI Admin',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=SMI+Admin'
  }
];

// Simple JWT-like token generator (for demo purposes)
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 1 day
  };
  return btoa(JSON.stringify(payload));
};

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(user);

    return new Response(JSON.stringify({
      user: userWithoutPassword,
      token
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
