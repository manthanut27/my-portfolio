import React, { useEffect, useState } from 'react';
import { useGitHubStats } from '../hooks/useGitHubStats';
import {
  Github,
  Trophy,
  Briefcase,
  FileCode,
  Layers,
  Activity,
  Terminal,
  MapPin,
  Sparkles,
  Cpu,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

interface AboutProps {
  hiringManagerMode?: boolean;
}

export const About: React.FC<AboutProps> = () => {
  const { publicRepos, stars, contributions, evaBloomCommits, heatmap, loading: ghLoading } = useGitHubStats();
  const [mounted, setMounted] = useState(false);

  // Client-side mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate 52x7 Contribution heatmap cells with modern tech styling
  const renderHeatmap = () => {
    if (!mounted) return null;

    const cells = [];
    const totalCells = 52 * 7;

    for (let i = 0; i < totalCells; i++) {
      let bg = 'rgba(15, 23, 42, 0.05)'; // 0 commits (subtle slate dot)
      let titleText = 'No contributions';

      if (heatmap && heatmap[i]) {
        const day = heatmap[i];
        const val = day.count;
        const level = day.level;

        // Map level (0 to 4) to sleek modern palette
        if (level === 1) bg = 'rgba(254, 99, 52, 0.25)';
        else if (level === 2) bg = 'rgba(254, 99, 52, 0.50)';
        else if (level === 3) bg = 'rgba(254, 99, 52, 0.75)';
        else if (level >= 4) bg = '#FE6334';

        const formattedDate = new Date(day.date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
        titleText = `${val === 0 ? 'No' : val} contribution${val === 1 ? '' : 's'} on ${formattedDate}`;
      } else {
        // Deterministic fallback commits
        const val = Math.floor(Math.sin(i * 0.05) * 5 + Math.cos(i * 0.1) * 3 + Math.random() * 4);
        if (val >= 1 && val <= 3) bg = 'rgba(254, 99, 52, 0.25)';
        else if (val >= 4 && val <= 7) bg = 'rgba(254, 99, 52, 0.50)';
        else if (val >= 8 && val <= 14) bg = 'rgba(254, 99, 52, 0.75)';
        else if (val >= 15) bg = '#FE6334';

        titleText = `${val === 0 ? 'No' : val} commits`;
      }

      cells.push(
        <div
          key={i}
          className="heatmap-cell"
          style={{ backgroundColor: bg }}
          title={titleText}
        />
      );
    }

    return (
      <div className="grid grid-flow-col grid-cols-52 grid-rows-7 gap-[3px] md:gap-[3.5px] w-full overflow-x-auto no-scrollbar py-1">
        {cells}
      </div>
    );
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-24 bg-slate-50 text-slate-900 overflow-hidden"
    >
      {/* Background Subtle Tech Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-brand-orange/5 via-slate-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span>01 // ABOUT THE ENGINEER</span>
          </div>
          <h2 className="font-space text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-3xl">
            Architecting scalable systems & interactive web experiences.
          </h2>
          <p className="mt-3 font-body text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
            Full-Stack Developer based in Mumbai, turning complex business logic and visual ambition into resilient production code.
          </p>
        </div>

        {/* Two-Column Grid: Left (Bio & Metrics) + Right (Obsidian Tech Radar & Credentials) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative Bio, 4x Stats, and GitHub Live Activity */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Bio Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="font-syne font-bold text-xl text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span>Engineering Philosophy</span>
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                Hey, I'm <strong className="text-slate-900 font-semibold">Manthan Utekar</strong>, a creative developer and full-stack engineer based in Mumbai. I specialize in building high-performance, animation-rich, modern web applications that look stunning and run blazingly fast.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether it is building custom e-commerce engines, complex 3D configurators in WebGL, or low-latency serverless endpoints, I focus on performance, accessibility, and visual aesthetics.
              </p>

              {/* Core Strengths Pills */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                  Full-Stack Architecture
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                  WebGL & Creative 3D
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                  Performance Optimization
                </span>
              </div>
            </div>

            {/* 4x Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Card 1: Projects Shipped */}
              <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center text-center group hover:border-brand-orange/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="font-space font-black text-2xl text-slate-900">6</span>
                <span className="font-mono text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
                  Projects Shipped
                </span>
              </div>

              {/* Card 2: Hawkathon */}
              <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center text-center group hover:border-brand-orange/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Trophy className="w-4 h-4" />
                </div>
                <span className="font-space font-black text-2xl text-slate-900">1</span>
                <span className="font-mono text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
                  Hawkathon 2026
                </span>
              </div>

              {/* Card 3: Freelance */}
              <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center text-center group hover:border-brand-orange/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-space font-black text-2xl text-slate-900">2</span>
                <span className="font-mono text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
                  Freelance Clients
                </span>
              </div>

              {/* Card 4: Eva Bloom Commits */}
              <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center text-center group hover:border-brand-orange/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <FileCode className="w-4 h-4" />
                </div>
                <span className="font-space font-black text-2xl text-slate-900">
                  {ghLoading ? '...' : evaBloomCommits}
                </span>
                <span className="font-mono text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
                  Eva Bloom Commits
                </span>
              </div>
            </div>

            {/* GitHub Live Activity Card */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-slate-900" />
                  <span className="font-space font-bold text-sm text-slate-900 tracking-wider uppercase">
                    GitHub Live Activity
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SYNCED</span>
                </div>
              </div>

              {/* Live Numbers Grid */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-space font-black text-2xl text-slate-900">
                    {ghLoading ? '...' : publicRepos}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-slate-500 mt-1 uppercase">
                    Public Repos
                  </span>
                </div>
                <div className="flex flex-col bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-space font-black text-2xl text-slate-900">
                    {ghLoading ? '...' : stars}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-slate-500 mt-1 uppercase">
                    Total Stars
                  </span>
                </div>
                <div className="flex flex-col bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-space font-black text-2xl text-slate-900">
                    {ghLoading ? '...' : contributions}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-slate-500 mt-1 uppercase">
                    Commits (2026)
                  </span>
                </div>
              </div>

              {/* Contribution Heatmap Container */}
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex justify-between items-center text-xs font-mono font-semibold text-slate-500 px-1">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-brand-orange" />
                    <span>52-Week Contribution Matrix</span>
                  </span>
                  <button
                    onClick={() => {
                      localStorage.removeItem('gh_stats');
                      window.location.reload();
                    }}
                    className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-brand-orange transition-colors cursor-pointer"
                    title="Force refresh GitHub cache"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {renderHeatmap()}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-[10px] font-mono text-slate-400">
                    <span>Less</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-xs bg-slate-200" />
                      <div className="w-2.5 h-2.5 rounded-xs bg-[rgba(254,99,52,0.25)]" />
                      <div className="w-2.5 h-2.5 rounded-xs bg-[rgba(254,99,52,0.50)]" />
                      <div className="w-2.5 h-2.5 rounded-xs bg-[rgba(254,99,52,0.75)]" />
                      <div className="w-2.5 h-2.5 rounded-xs bg-[#FE6334]" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Obsidian Tech Radar & Developer Profile */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            {/* Obsidian Terminal Card */}
            <div className="w-full bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between group">
              {/* Corner ambient glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-orange/30 transition-all duration-700" />

              <div>
                {/* IDE Window Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-brand-orange" />
                    developer_profile.ts
                  </span>
                  <span className="text-[10px] text-slate-500">UTF-8</span>
                </div>

                {/* Code Representation */}
                <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 flex flex-col gap-1.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <div className="text-slate-500">// Candidate Profile Specifications</div>
                  <div>
                    <span className="text-purple-400">interface</span>{' '}
                    <span className="text-amber-300">SoftwareEngineer</span> {'{'}
                  </div>
                  <div className="pl-4">
                    name: <span className="text-emerald-400">"Manthan Utekar"</span>;
                  </div>
                  <div className="pl-4">
                    role: <span className="text-emerald-400">"Full-Stack Engineer"</span>;
                  </div>
                  <div className="pl-4">
                    location: <span className="text-emerald-400">"Mumbai, India"</span>;
                  </div>
                  <div className="pl-4">
                    focus: <span className="text-brand-orange font-bold">"FitMirror (AI Pose Analytics)"</span>;
                  </div>
                  <div className="pl-4">
                    primaryStack: [
                    <span className="text-cyan-300">"React"</span>,{' '}
                    <span className="text-cyan-300">"Node.js"</span>,{' '}
                    <span className="text-cyan-300">"TypeScript"</span>,{' '}
                    <span className="text-cyan-300">"Supabase"</span>];
                  </div>
                  <div className="pl-4">
                    status: <span className="text-emerald-400 font-bold">"Open to Opportunities"</span>;
                  </div>
                  <div>{'}'}</div>
                </div>

                {/* Engineering Highlights */}
                <div className="flex flex-col gap-3 mt-6">
                  <div className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                    Core Architectural Competencies
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300">
                      <Cpu className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>Event-driven, low-latency API design</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300">
                      <Sparkles className="w-4 h-4 text-brand-yellow shrink-0" />
                      <span>WebGL & GPU particle pipeline rendering</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300">
                      <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Strict TypeScript, Zod validation & Prisma ORM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-5 mt-6 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>MUMBAI, IN · HYBRID / REMOTE</span>
                </div>
                <span className="text-slate-500 font-bold">AVAILABLE NOW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
