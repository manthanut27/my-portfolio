import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, Github, Linkedin, Mail, Copy, Check, Clock, MapPin } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { Magnetic } from '../components/ui/Magnetic';
import { ScrollReveal } from '../components/ui/ScrollReveal';

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
      className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-28 bg-slate-950 text-white border-t border-slate-800/80 overflow-hidden"
    >
      {/* 21st.dev inspired technical background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-orange font-mono text-xs font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              <span>04 / Contact & Inquiry</span>
            </div>
            <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
              Let's build something remarkable.
            </h2>
            <p className="mt-3 font-body text-base md:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
              Available for full-time engineering roles, performance optimization, and scalable web architectures. Reach out anytime.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-Column Grid: Left (Direct Contact Info & Channels) + Right (Interactive Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Direct Email Card */}
            <ScrollReveal delay={0.05}>
              <SpotlightCard
                spotlightColor="rgba(254, 99, 52, 0.20)"
                className="p-6 bg-slate-900/90 border-slate-800 text-white shadow-lg flex flex-col gap-3.5 group rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-950/80 text-brand-orange border border-orange-800/30 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400">
                    Direct inbox
                  </span>
                  <div className="font-space font-semibold text-white text-base sm:text-lg mt-0.5 break-all">
                    {contactEmail}
                  </div>
                </div>
                <Magnetic strength={0.2} className="w-full">
                  <button
                    onClick={handleCopyEmail}
                    className="w-full mt-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium border border-slate-700/60 transition-all cursor-pointer active:scale-95"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy email address</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </SpotlightCard>
            </ScrollReveal>

            {/* Quick Metrics & Meta */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <SpotlightCard
                  spotlightColor="rgba(254, 99, 52, 0.16)"
                  className="p-5 bg-slate-900/90 border-slate-800 text-white shadow-lg rounded-2xl"
                >
                  <div className="flex items-center gap-2 text-slate-400 mb-1.5">
                    <MapPin className="w-4 h-4 text-brand-orange" />
                    <span className="text-[10px] font-mono font-medium uppercase tracking-wider">
                      Location
                    </span>
                  </div>
                  <div className="font-space font-semibold text-sm text-white">
                    Mumbai, India
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5 tabular-nums">
                    IST (UTC+5:30)
                  </div>
                </SpotlightCard>

                <SpotlightCard
                  spotlightColor="rgba(254, 99, 52, 0.16)"
                  className="p-5 bg-slate-900/90 border-slate-800 text-white shadow-lg rounded-2xl"
                >
                  <div className="flex items-center gap-2 text-slate-400 mb-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-mono font-medium uppercase tracking-wider">
                      Response SLA
                    </span>
                  </div>
                  <div className="font-space font-semibold text-sm text-white tabular-nums">
                    &lt; 24 hours
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 font-medium mt-0.5">
                    Fast turnaround
                  </div>
                </SpotlightCard>
              </div>
            </ScrollReveal>

            {/* Social Network Channels */}
            <ScrollReveal delay={0.15}>
              <SpotlightCard
                spotlightColor="rgba(254, 99, 52, 0.16)"
                className="p-5 bg-slate-900/90 border-slate-800 text-white shadow-lg flex items-center justify-between rounded-2xl"
              >
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400">
                  Social channels
                </span>
                <div className="flex items-center gap-2.5">
                  <Magnetic strength={0.25}>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-white hover:text-slate-950 text-slate-300 border border-slate-700/60 flex items-center justify-center transition-all cursor-pointer"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.25}>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 border border-slate-700/60 flex items-center justify-center transition-all cursor-pointer"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Magnetic>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <ScrollReveal delay={0.1}>
              <SpotlightCard
                spotlightColor="rgba(254, 99, 52, 0.20)"
                className="p-6 sm:p-8 bg-slate-900/90 border-slate-800 text-white shadow-xl rounded-2xl"
              >
                {status === 'success' ? (
                  /* Success View */
                  <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center justify-center shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-space font-semibold text-2xl text-white">
                      Message sent
                    </h3>
                    <p className="font-body text-sm text-slate-400 max-w-sm leading-relaxed">
                      Thank you, <strong className="text-white">{submittedName}</strong>. Your note has landed directly in my inbox. I'll get back to you shortly.
                    </p>
                    <Magnetic strength={0.2}>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-mono text-xs font-medium transition-colors cursor-pointer"
                      >
                        Send another message
                      </button>
                    </Magnetic>
                  </div>
                ) : (
                  /* Contact Form */
                  <div className="flex flex-col gap-4 text-left">
                    {/* Name field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400">
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
                        className={`w-full px-4 h-11 rounded-xl bg-slate-950/80 border ${
                          nameError ? 'border-red-400 focus:border-red-500' : 'border-slate-800 focus:border-brand-orange'
                        } outline-none font-body text-sm text-white placeholder:text-slate-500 focus:bg-slate-950 focus:ring-1 focus:ring-brand-orange/40 transition-all`}
                      />
                      {nameError && (
                        <span className="text-xs text-red-400 font-medium mt-0.5 ml-1">
                          {nameError}
                        </span>
                      )}
                    </div>

                    {/* Email field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400">
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
                          className={`w-full pl-4 pr-10 h-11 rounded-xl bg-slate-950/80 border ${
                            emailError ? 'border-red-400 focus:border-red-500' : 'border-slate-800 focus:border-brand-orange'
                          } outline-none font-body text-sm text-white placeholder:text-slate-500 focus:bg-slate-950 focus:ring-1 focus:ring-brand-orange/40 transition-all`}
                        />
                        <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      </div>
                      {emailError && (
                        <span className="text-xs text-red-400 font-medium mt-0.5 ml-1">
                          {emailError}
                        </span>
                      )}
                    </div>

                    {/* Message field */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400">
                          Message
                        </label>
                        <span className="text-[11px] font-mono text-slate-500 tabular-nums">
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
                        className={`w-full p-4 h-32 rounded-xl resize-none bg-slate-950/80 border ${
                          messageError ? 'border-red-400 focus:border-red-500' : 'border-slate-800 focus:border-brand-orange'
                        } outline-none font-body text-sm text-white placeholder:text-slate-500 focus:bg-slate-950 focus:ring-1 focus:ring-brand-orange/40 transition-all`}
                      />
                      {messageError && (
                        <span className="text-xs text-red-400 font-medium mt-0.5 ml-1">
                          {messageError}
                        </span>
                      )}
                    </div>

                    {/* API Failure Notice */}
                    {apiError && (
                      <div className="p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-xs flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-medium text-red-200">
                          <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                          <span>Submission notice</span>
                        </div>
                        <p>
                          Unable to connect to the mail gateway right now. You can email directly to{' '}
                          <a href={`mailto:${contactEmail}`} className="underline font-medium text-white">
                            {contactEmail}
                          </a>
                          .
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={handleSubmit}
                            className="px-3 py-1 bg-red-900/60 hover:bg-red-800 text-white rounded-lg text-xs font-medium border border-red-700 cursor-pointer"
                          >
                            Retry send
                          </button>
                          <button
                            onClick={handleCopyEmail}
                            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer"
                          >
                            {copiedEmail ? 'Copied' : 'Copy email'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Magnetic strength={0.15} className="w-full">
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-11 flex items-center justify-center gap-2 font-mono font-medium text-xs bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                    </Magnetic>
                  </div>
                )}
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
