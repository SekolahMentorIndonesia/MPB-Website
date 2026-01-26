
export async function POST(request) {
  // Registration mock
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Simulate success
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      role: 'student',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
    };

    const token = btoa(JSON.stringify({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      exp: Date.now() + 24 * 60 * 60 * 1000
    }));

    return new Response(JSON.stringify({
      user: newUser,
      token
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: 'Registration failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
