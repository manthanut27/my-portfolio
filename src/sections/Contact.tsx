import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, Github, Linkedin, Mail } from 'lucide-react';

interface ContactProps {
  hiringManagerMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ hiringManagerMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Validation errors & shakes
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [apiError, setApiError] = useState(false);

  const [shakeName, setShakeName] = useState(false);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakeMessage, setShakeMessage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [submittedName, setSubmittedName] = useState('');

  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'manthanut27';
  const githubUrl = githubUsername.startsWith('http') ? githubUsername : `https://github.com/${githubUsername}`;

  const linkedinUrlRaw = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/utkmanthan';
  const linkedinUrl = linkedinUrlRaw.startsWith('http') ? linkedinUrlRaw : `https://${linkedinUrlRaw}`;

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'manthanut27@gmail.com';

  const handleSubmit = async () => {
    // Reset validation errors, shakes and apiErrors
    setNameError('');
    setEmailError('');
    setMessageError('');
    setApiError(false);

    let hasError = false;

    // 1. Validate name
    if (!name || name.trim().length < 2) {
      setNameError('Name must be at least 2 characters.');
      setShakeName(true);
      setTimeout(() => setShakeName(false), 400);
      hasError = true;
    }

    // 2. Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 400);
      hasError = true;
    }

    // 3. Validate message
    if (!message || message.trim().length < 10) {
      setMessageError('Message must be at least 10 characters.');
      setShakeMessage(true);
      setTimeout(() => setShakeMessage(false), 400);
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      let data: any = {};
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        // Local Dev Fallback (Vite server simulation)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          console.warn('Local dev API fallback active. Simulating email payload delivery:');
          console.log({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["manthanut27@gmail.com"],
            subject: `New message from ${name} via Portfolio`,
            html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`
          });

          await new Promise((resolve) => setTimeout(resolve, 1000));
          setSubmittedName(name);
          setStatus('success');
          setName('');
          setEmail('');
          setMessage('');
          return;
        }
        throw new Error('API non-JSON response');
      }

      if (res.ok && data.success) {
        setSubmittedName(name);
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error('API send failure');
      }
    } catch (err) {
      console.error('Submit API error:', err);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-kanji="連"
      data-label="CONNECT"
      className={`relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 select-none transition-colors duration-1000 ${
        hiringManagerMode ? 'bg-slate-50 text-slate-900' : 'bg-[#CBEF9A] text-brand-navy'
      }`}
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-10 relative z-10">
        {/* Section Heading */}
        <div className="text-center relative">
          {!hiringManagerMode && (
            <div className="text-brand-navy/15 text-8xl font-black mb-2 pointer-events-none select-none">
              連
            </div>
          )}
          <h2 className="font-syne font-black text-5xl md:text-7xl uppercase tracking-tighter text-brand-navy leading-none">
            Get in touch
          </h2>
          <p className="mt-4 font-label text-sm md:text-base font-medium text-brand-navy/70 max-w-lg mx-auto">
            Drop me a line. Let us collaborate on your next premium project.
          </p>
        </div>

        {/* Outer Wrapper: Soft Green background */}
        <div className="w-full max-w-xl mx-auto bg-[#c8e6a0] rounded-[20px] p-8 md:p-[32px] shadow-2xl transition-all duration-300">
          
          {status === 'success' ? (
            /* Success State Card */
            <div className="w-full bg-[#e8f5d0] rounded-[16px] p-7 md:p-[28px] flex flex-col items-center justify-center text-center gap-4 min-h-[300px] border border-white/30">
              <div className="w-16 h-16 rounded-full bg-[#c8e6a0] flex items-center justify-center text-[#5a8a6a] animate-bounce shadow-md">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="font-syne font-black text-2xl uppercase tracking-widest text-[#5a8a6a]">
                Message sent!
              </h3>
              <p className="font-body text-sm font-semibold text-[#5a8a6a]/95 max-w-xs leading-relaxed">
                I'll get back to you soon, {submittedName}.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 px-6 py-3 bg-[#c8c8e8] hover:bg-[#b8b8d8] text-[#2d2d4d] font-space font-bold text-xs uppercase tracking-widest rounded-[12px] shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Send Another
              </button>
            </div>
          ) : (
            /* Standard Contact Form view */
            <div className="w-full bg-[#e8f5d0] rounded-[16px] p-7 md:p-[28px] flex flex-col gap-5 text-left border border-white/30">
              
              {/* Full Name field */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="uppercase tracking-widest text-[12px] font-mono font-bold text-[#5a8a6a]">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  className={`w-full px-4 bg-[#f0fae8] rounded-[12px] h-[52px] border border-[#5a8a6a]/15 focus:border-[#5a8a6a]/40 outline-none text-slate-800 font-body text-sm transition-all select-text shadow-sm ${
                    shakeName ? 'animate-shake border-red-500 ring-2 ring-red-200' : ''
                  }`}
                />
                {nameError && (
                  <span className="text-[12px] text-red-500 font-semibold mt-0.5 ml-1">
                    {nameError}
                  </span>
                )}
              </div>

              {/* Email Address field */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="uppercase tracking-widest text-[12px] font-mono font-bold text-[#5a8a6a]">
                  Email Address
                </label>
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    className={`w-full pl-4 pr-10 bg-[#f0fae8] rounded-[12px] h-[52px] border border-[#5a8a6a]/15 focus:border-[#5a8a6a]/40 outline-none text-slate-800 font-body text-sm transition-all select-text shadow-sm ${
                      shakeEmail ? 'animate-shake border-red-500 ring-2 ring-red-200' : ''
                    }`}
                  />
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a8a6a]" />
                </div>
                {emailError && (
                  <span className="text-[12px] text-red-500 font-semibold mt-0.5 ml-1">
                    {emailError}
                  </span>
                )}
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex justify-between items-center">
                  <label className="uppercase tracking-widest text-[12px] font-mono font-bold text-[#5a8a6a]">
                    Message
                  </label>
                  <span className="text-[12px] font-mono font-bold text-[#5a8a6a]/80">
                    {message.length} / 1000
                  </span>
                </div>
                <textarea
                  placeholder="Hey Manthan, let us talk about..."
                  maxLength={1000}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (messageError) setMessageError('');
                  }}
                  className={`w-full p-4 bg-[#f0fae8] rounded-[12px] h-[130px] resize-none border border-[#5a8a6a]/15 focus:border-[#5a8a6a]/40 outline-none text-slate-800 font-body text-sm transition-all select-text shadow-sm ${
                    shakeMessage ? 'animate-shake border-red-500 ring-2 ring-red-200' : ''
                  }`}
                />
                {messageError && (
                  <span className="text-[12px] text-red-500 font-semibold mt-0.5 ml-1">
                    {messageError}
                  </span>
                )}
              </div>

              {/* API error banner */}
              {apiError && (
                <div className="w-full p-3.5 bg-red-100 border border-red-200 text-red-700 rounded-[12px] text-[13px] font-semibold text-center flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-[52px] flex items-center justify-center gap-2.5 bg-[#c8c8e8] hover:bg-[#b8b8d8] disabled:bg-[#d8d8f8] text-[#2d2d4d] disabled:text-[#6d6d8d] rounded-[12px] font-mono font-bold text-sm uppercase tracking-widest cursor-pointer disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-98 transition-all"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#2d2d4d] border-t-transparent rounded-full animate-spin shrink-0" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 shrink-0" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Social Links Row */}
        <div className="flex flex-col items-center gap-4 border-t border-brand-navy/10 pt-8 mt-4">
          <div className="font-space text-xs font-bold text-brand-navy/60 tracking-widest uppercase">
            FIND ME AROUND THE WEB
          </div>
          <div className="flex justify-center items-center gap-6">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-navy/15 text-brand-navy hover:bg-brand-orange hover:text-white active:scale-90 hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-navy/15 text-brand-navy hover:bg-brand-orange hover:text-white active:scale-90 hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-navy/15 text-brand-navy hover:bg-brand-orange hover:text-white active:scale-90 hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
