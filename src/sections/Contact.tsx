import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, Github, Linkedin, Mail, Copy, Check, Clock, MapPin } from 'lucide-react';

interface ContactProps {
  hiringManagerMode?: boolean;
}

export const Contact: React.FC<ContactProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Validation state
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [apiError, setApiError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [submittedName, setSubmittedName] = useState('');

  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'manthanut27';
  const githubUrl = githubUsername.startsWith('http') ? githubUsername : `https://github.com/${githubUsername}`;

  const linkedinUrlRaw = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/utkmanthan';
  const linkedinUrl = linkedinUrlRaw.startsWith('http') ? linkedinUrlRaw : `https://${linkedinUrlRaw}`;

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'manthanut27@gmail.com';

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async () => {
    setNameError('');
    setEmailError('');
    setMessageError('');
    setApiError(false);

    let hasError = false;

    // 1. Validate name
    if (!name || name.trim().length < 2) {
      setNameError('Please enter your name (at least 2 characters).');
      hasError = true;
    }

    // 2. Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address (e.g. alex@company.com).');
      hasError = true;
    }

    // 3. Validate message
    if (!message || message.trim().length < 10) {
      setMessageError('Message is too brief. Please enter at least 10 characters.');
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
            from: "Portfolio Contact <contact@manthanut.site>",
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
      className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-24 bg-slate-50 text-slate-900 border-t border-slate-200/60"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-orange font-mono text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            <span>04 / Contact</span>
          </div>
          <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl">
            Let's build something remarkable.
          </h2>
          <p className="mt-3 font-body text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
            Interested in hiring me, collaborating on a project, or discussing full-stack architecture? Reach out anytime.
          </p>
        </div>

        {/* Two-Column Grid: Left (Direct Contact Info & Channels) + Right (Interactive Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Direct Email Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400">
                  Direct email
                </span>
                <div className="font-space font-semibold text-slate-900 text-base mt-0.5 break-all">
                  {contactEmail}
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="mt-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-medium transition-all cursor-pointer active:scale-95"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy email address</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Metrics & Meta */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                <div className="flex items-center gap-2 text-slate-400 mb-1.5">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  <span className="text-[10px] font-mono font-medium uppercase tracking-wider">
                    Location
                  </span>
                </div>
                <div className="font-space font-semibold text-sm text-slate-900">
                  Mumbai, India
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5 tabular-nums">
                  IST (UTC+5:30)
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                <div className="flex items-center gap-2 text-slate-400 mb-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-mono font-medium uppercase tracking-wider">
                    Response time
                  </span>
                </div>
                <div className="font-space font-semibold text-sm text-slate-900 tabular-nums">
                  &lt; 24 hours
                </div>
                <div className="text-[10px] font-mono text-emerald-700 font-medium mt-0.5">
                  Fast turnaround
                </div>
              </div>
            </div>

            {/* Social Network Channels */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center justify-between">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-500">
                Social links
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              {status === 'success' ? (
                /* Success View */
                <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-space font-semibold text-2xl text-slate-900">
                    Message sent
                  </h3>
                  <p className="font-body text-sm text-slate-600 max-w-sm leading-relaxed">
                    Thank you, <strong className="text-slate-900">{submittedName}</strong>. Your note has landed directly in my inbox. I'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-medium transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <div className="flex flex-col gap-4 text-left">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-600">
                      Your name
                    </label>
                    <input
                      type="text"
                      placeholder="Alex Rivera"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (nameError) setNameError('');
                      }}
                      className={`w-full px-4 h-11 rounded-xl bg-slate-50 border ${
                        nameError ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-slate-400'
                      } outline-none font-body text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white transition-all`}
                    />
                    {nameError && (
                      <span className="text-xs text-red-600 font-medium mt-0.5 ml-1">
                        {nameError}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-600">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        className={`w-full pl-4 pr-10 h-11 rounded-xl bg-slate-50 border ${
                          emailError ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-slate-400'
                        } outline-none font-body text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white transition-all`}
                      />
                      <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    {emailError && (
                      <span className="text-xs text-red-600 font-medium mt-0.5 ml-1">
                        {emailError}
                      </span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-600">
                        Message
                      </label>
                      <span className="text-[11px] font-mono text-slate-400 tabular-nums">
                        {message.length} / 1000
                      </span>
                    </div>
                    <textarea
                      placeholder="Hey Manthan, let's connect regarding..."
                      maxLength={1000}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (messageError) setMessageError('');
                      }}
                      className={`w-full p-4 h-32 rounded-xl resize-none bg-slate-50 border ${
                        messageError ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-slate-400'
                      } outline-none font-body text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white transition-all`}
                    />
                    {messageError && (
                      <span className="text-xs text-red-600 font-medium mt-0.5 ml-1">
                        {messageError}
                      </span>
                    )}
                  </div>

                  {/* API Failure Notice */}
                  {apiError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex flex-col gap-2">
                      <div className="flex items-center gap-2 font-medium text-red-900">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>Submission notice</span>
                      </div>
                      <p>
                        Unable to connect to the mail gateway right now. You can email directly to{' '}
                        <a href={`mailto:${contactEmail}`} className="underline font-medium">
                          {contactEmail}
                        </a>
                        .
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={handleSubmit}
                          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-900 rounded-lg text-xs font-medium border border-red-300 cursor-pointer"
                        >
                          Retry send
                        </button>
                        <button
                          onClick={handleCopyEmail}
                          className="px-3 py-1 bg-white hover:bg-red-50 text-red-900 rounded-lg text-xs font-medium border border-red-300 cursor-pointer"
                        >
                          {copiedEmail ? 'Copied' : 'Copy email'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full h-11 flex items-center justify-center gap-2 font-mono font-medium text-xs bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 shrink-0" />
                        <span>Send message</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
