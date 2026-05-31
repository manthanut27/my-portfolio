export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // 1. Only allow POST method
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, message } = await req.json();

    // 2. Server-side validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || process.env.VITE_CONTACT_EMAIL || 'manthanut27@gmail.com';

    if (!resendKey) {
      console.error('Missing RESEND_API_KEY environment variable.');
      // Graceful mock fallback for local simulation
      return new Response(JSON.stringify({
        success: true,
        message: 'Mock response: email simulated successfully (no Resend API key).'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Request Resend API
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <contact@manthanut.site>',
        to: [recipientEmail],
        subject: `New message from ${name} via Portfolio`,
        html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`
      }),
    });

    if (!resendRes.ok) {
      const errorData = await resendRes.json();
      throw new Error(errorData.message || 'Resend API returned an error.');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Serverless function error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
