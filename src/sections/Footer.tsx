import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'manthanut27';
  const githubUrl = githubUsername.startsWith('http') ? githubUsername : `https://github.com/${githubUsername}`;
  const linkedinUrlRaw = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/utkmanthan';
  const linkedinUrl = linkedinUrlRaw.startsWith('http') ? linkedinUrlRaw : `https://${linkedinUrlRaw}`;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'manthanut27@gmail.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800/80 py-12 px-6 md:px-16 relative z-10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top Tier: Brand, Status, and Quick Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-800/80">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="font-syne font-black text-2xl text-white tracking-tight">
                MANTHAN<span className="text-brand-orange">.</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-400 font-bold uppercase">
                ENGINEER
              </span>
            </div>
            <p className="font-body text-xs text-slate-400 max-w-sm">
              Crafting high-performance web applications, reactive user interfaces, and resilient backend systems.
            </p>
          </div>

          {/* Live Availability Status */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300 font-bold">STATUS:</span>
            <span className="text-emerald-400">Available for Opportunities</span>
          </div>
        </div>

        {/* Middle Tier: Links & Social Channels */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-5 font-mono text-xs font-bold text-slate-400">
            <a href="#hero" className="hover:text-brand-orange transition-colors">
              // 00. TOP
            </a>
            <a href="#about" className="hover:text-brand-orange transition-colors">
              // 01. ABOUT
            </a>
            <a href="#skills" className="hover:text-brand-orange transition-colors">
              // 02. SKILLS
            </a>
            <a href="#projects" className="hover:text-brand-orange transition-colors">
              // 03. PROJECTS
            </a>
            <a href="#contact" className="hover:text-brand-orange transition-colors">
              // 04. CONTACT
            </a>
          </div>

          {/* Social Row & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-orange flex items-center justify-center transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-orange flex items-center justify-center transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-orange flex items-center justify-center transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 h-9 rounded-xl bg-slate-900 hover:bg-brand-orange text-slate-300 hover:text-white border border-slate-800 transition-all font-mono text-xs cursor-pointer ml-2 active:scale-95"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Tech Attribution */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-slate-900 font-mono text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            © {currentYear} MANTHAN UTEKAR. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>Built with React + TypeScript + Tailwind CSS + WebGL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
