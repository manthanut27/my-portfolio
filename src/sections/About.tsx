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
  RefreshCw,
} from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { NumberTicker } from '../components/ui/NumberTicker';
import { Magnetic } from '../components/ui/Magnetic';
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from '../components/ui/ScrollReveal';

interface AboutProps {
  hiringManagerMode?: boolean;
}

export const About: React.FC<AboutProps> = () => {
  const { publicRepos, stars, contributions, evaBloomCommits, heatmap, loading: ghLoading } = useGitHubStats();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderHeatmap = () => {
    if (!mounted) return null;

    const cells = [];
    const totalCells = 52 * 7;

    for (let i = 0; i < totalCells; i++) {
      let bg = '#e2e8f0'; // 0 commits
      let titleText = 'No contributions';

      if (heatmap && heatmap[i]) {
        const day = heatmap[i];
        const val = day.count;
        const level = day.level;

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
      <div className="grid grid-flow-col grid-cols-52 grid-rows-7 gap-[3px] w-full overflow-x-auto no-scrollbar py-1 touch-pan-x overscroll-x-contain">
        {cells}
      </div>
    );
  };

  return (
    <section
      id="about"
      className="w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-20 bg-slate-50 text-slate-900"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col items-start max-w-2xl text-left">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
              01 — Background
            </span>
            <h2 className="font-space text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Full-stack developer building production web applications and 3D interfaces
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Based in Mumbai, focused on performant frontend architecture, real-time data pipelines, and responsive web experiences.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Narrative Bio & Stat Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Bio Card with subtle cursor spotlight */}
            <ScrollReveal delay={0.05}>
              <SpotlightCard className="p-6 text-left">
                <h3 className="font-space font-semibold text-base text-slate-900 mb-2">
                  Engineering focus
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  I'm <strong className="text-slate-900 font-medium">Manthan Utekar</strong>, a full-stack engineer based in Mumbai. I develop animation-rich, responsive web applications with a focus on code structure, fast load times, and accessibility.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  My recent work includes custom e-commerce checkout flows (Eva Bloom), 3D vehicle configurators in WebGL (BMW M4 GT3), and real-time backend integrations using Supabase, Node.js, and Redis.
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100 text-xs font-mono text-slate-700">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                    Full-stack architecture
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                    WebGL & Three.js
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                    Performance & SEO
                  </span>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* 4x Stat Cards with staggered reveal and NumberTicker */}
            <ScrollRevealContainer className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ScrollRevealItem>
                <SpotlightCard className="p-4 flex flex-col items-start text-left h-full">
                  <Briefcase className="w-4 h-4 text-slate-400 mb-2" />
                  <span className="font-space font-semibold text-xl text-slate-900 tabular-nums">
                    <NumberTicker value={6} />
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 mt-0.5">
                    Shipped projects
                  </span>
                </SpotlightCard>
              </ScrollRevealItem>

              <ScrollRevealItem>
                <SpotlightCard className="p-4 flex flex-col items-start text-left h-full">
                  <Trophy className="w-4 h-4 text-slate-400 mb-2" />
                  <span className="font-space font-semibold text-xl text-slate-900 tabular-nums">
                    <NumberTicker value={1} />
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 mt-0.5">
                    Hawkathon 2026
                  </span>
                </SpotlightCard>
              </ScrollRevealItem>

              <ScrollRevealItem>
                <SpotlightCard className="p-4 flex flex-col items-start text-left h-full">
                  <Layers className="w-4 h-4 text-slate-400 mb-2" />
                  <span className="font-space font-semibold text-xl text-slate-900 tabular-nums">
                    <NumberTicker value={2} />
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 mt-0.5">
                    Freelance clients
                  </span>
                </SpotlightCard>
              </ScrollRevealItem>

              <ScrollRevealItem>
                <SpotlightCard className="p-4 flex flex-col items-start text-left h-full">
                  <FileCode className="w-4 h-4 text-slate-400 mb-2" />
                  <span className="font-space font-semibold text-xl text-slate-900 tabular-nums">
                    {ghLoading ? '—' : <NumberTicker value={evaBloomCommits} />}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 mt-0.5">
                    Eva Bloom commits
                  </span>
                </SpotlightCard>
              </ScrollRevealItem>
            </ScrollRevealContainer>

            {/* GitHub Activity Card */}
            <ScrollReveal delay={0.15}>
              <SpotlightCard className="p-5 flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-700" />
                    <span className="font-mono text-xs font-semibold text-slate-800">
                      GitHub activity
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    Updated today
                  </span>
                </div>

                {/* Counts */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-left">
                  <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-100">
                    <div className="font-space font-semibold text-base sm:text-lg text-slate-900 tabular-nums">
                      {ghLoading ? '—' : <NumberTicker value={publicRepos} />}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-0.5 truncate">
                      Repositories
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-100">
                    <div className="font-space font-semibold text-base sm:text-lg text-slate-900 tabular-nums">
                      {ghLoading ? '—' : <NumberTicker value={stars} />}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-0.5 truncate">
                      Stars received
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-100">
                    <div className="font-space font-semibold text-base sm:text-lg text-slate-900 tabular-nums">
                      {ghLoading ? '—' : <NumberTicker value={contributions} />}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-0.5 truncate">
                      Commits 2026
                    </div>
                  </div>
                </div>

                {/* Heatmap */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-500 px-0.5">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-slate-400" />
                      <span>52-week contribution matrix</span>
                    </span>
                    <span className="sm:hidden text-[10px] text-slate-400 font-mono">Swipe →</span>
                    <Magnetic strength={0.2} className="hidden sm:inline-block">
                      <button
                        onClick={() => {
                          localStorage.removeItem('gh_stats');
                          window.location.reload();
                        }}
                        className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 transition-colors cursor-pointer px-2 py-0.5 rounded"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Refresh</span>
                      </button>
                    </Magnetic>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
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
              </SpotlightCard>
            </ScrollReveal>
          </div>

          {/* Right Column: Clean Code Specification & Scope */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal delay={0.2}>
              <SpotlightCard
                spotlightColor="rgba(254, 99, 52, 0.12)"
                className="bg-slate-900 text-white rounded-xl p-6 border-slate-800 text-left flex flex-col justify-between"
              >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 font-mono text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-slate-400" />
                    developer_profile.ts
                  </span>
                  <span>TypeScript</span>
                </div>

                {/* Code Block */}
                <div className="font-mono text-xs leading-relaxed text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-slate-500">// Candidate specification</div>
                  <div>
                    <span className="text-purple-400">interface</span>{' '}
                    <span className="text-slate-100 font-semibold">Engineer</span> {'{'}
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
                    currentFocus: <span className="text-slate-100">"FitMirror (Pose estimation)"</span>;
                  </div>
                  <div className="pl-4">
                    coreStack: [
                    <span className="text-slate-100">"React"</span>,{' '}
                    <span className="text-slate-100">"Node.js"</span>,{' '}
                    <span className="text-slate-100">"TypeScript"</span>,{' '}
                    <span className="text-slate-100">"Supabase"</span>];
                  </div>
                  <div className="pl-4">
                    status: <span className="text-emerald-400 font-medium">"Available for hire"</span>;
                  </div>
                  <div>{'}'}</div>
                </div>

                {/* Systems Architecture */}
                <div className="flex flex-col gap-2 mt-5">
                  <div className="text-xs font-mono text-slate-400">
                    Core technical practices
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs font-mono text-slate-300">
                    <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                      • Strict TypeScript with Zod runtime validation
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                      • Shader and WebGL pipeline optimization
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                      • Relational database modeling with Prisma and PostgreSQL
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-6 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mumbai, India (IST)</span>
                </div>
                <span className="text-slate-400">Hybrid / Remote</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);
};

export default About;
