import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { Magnetic } from '../components/ui/Magnetic';

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
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800/80 pb-12 relative z-10 select-none">
      {/* 21st.dev inspired micro-mesh divider */}
      <div
        className="w-full h-6 border-b border-slate-800/80 bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_0,transparent_50%)] mb-10"
        style={{ backgroundSize: '12px 12px' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col gap-10">
        {/* Top Tier: Brand, Status, and Quick Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-800/80">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <span className="font-space font-bold text-xl text-white tracking-tight">
                Manthan Utekar
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 font-mono text-[10px] text-brand-orange font-medium">
                Full-stack engineer
              </span>
            </div>
            <p className="font-body text-xs text-slate-400 max-w-sm">
              Crafting high-performance web applications, reactive user interfaces, and resilient backend systems.
            </p>
          </div>

          {/* Live Availability Status */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400">Status:</span>
            <span className="text-emerald-400 font-medium">Available for opportunities</span>
          </div>
        </div>

        {/* Middle Tier: Links & Social Channels */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          {/* Quick Nav Links with interactive pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { name: 'About', href: '#about' },
              { name: 'Skills', href: '#skills' },
              { name: 'Projects', href: '#projects' },
              { name: 'Contact', href: '#contact' },
            ].map((link) => (
              <Magnetic key={link.name} strength={0.15}>
                <a
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all font-mono text-xs font-medium"
                >
                  {link.name}
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Social Row & Back to Top */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.25}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 flex items-center justify-center transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={`mailto:${contactEmail}`}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 flex items-center justify-center transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 px-3 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all font-mono text-xs font-medium cursor-pointer ml-2 active:scale-95"
                aria-label="Scroll back to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Tech Attribution */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-slate-900 font-mono text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            © {currentYear} Manthan Utekar. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Built with React · TypeScript · Tailwind CSS · WebGL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
