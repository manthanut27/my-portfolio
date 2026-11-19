import React, { useState } from 'react';
import {
  Code,
  Globe,
  Terminal,
  Database,
  Layers,
  Cpu,
  Workflow,
  Zap,
  ShieldCheck,
  PlayCircle,
  LayoutGrid,
  Compass,
} from 'lucide-react';

interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend & DB' | 'DevOps & Tools' | 'Creative 3D';
  prof: number;
  label: 'Confident' | 'Intermediate' | 'Learning';
  icon: React.ReactNode;
}

interface SkillsProps {
  hiringManagerMode?: boolean;
}

export const Skills: React.FC<SkillsProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'orbit'>('grid');

  const skills: SkillItem[] = [
    // Frontend
    { name: 'React', category: 'Frontend', prof: 90, label: 'Confident', icon: <Code className="w-5 h-5" /> },
    { name: 'Next.js', category: 'Frontend', prof: 85, label: 'Confident', icon: <Globe className="w-5 h-5" /> },
    { name: 'Tailwind CSS', category: 'Frontend', prof: 95, label: 'Confident', icon: <Globe className="w-5 h-5" /> },
    { name: 'Vite', category: 'Frontend', prof: 85, label: 'Confident', icon: <Zap className="w-5 h-5" /> },
    { name: 'Framer Motion', category: 'Frontend', prof: 70, label: 'Intermediate', icon: <PlayCircle className="w-5 h-5" /> },

    // Backend & DB
    { name: 'Node.js', category: 'Backend & DB', prof: 80, label: 'Intermediate', icon: <Terminal className="w-5 h-5" /> },
    { name: 'Express', category: 'Backend & DB', prof: 85, label: 'Confident', icon: <Terminal className="w-5 h-5" /> },
    { name: 'Supabase', category: 'Backend & DB', prof: 85, label: 'Confident', icon: <Database className="w-5 h-5" /> },
    { name: 'PostgreSQL', category: 'Backend & DB', prof: 75, label: 'Intermediate', icon: <Layers className="w-5 h-5" /> },
    { name: 'Prisma ORM', category: 'Backend & DB', prof: 80, label: 'Intermediate', icon: <Workflow className="w-5 h-5" /> },
    { name: 'Redis', category: 'Backend & DB', prof: 65, label: 'Intermediate', icon: <Layers className="w-5 h-5" /> },
    { name: 'Python', category: 'Backend & DB', prof: 45, label: 'Learning', icon: <Cpu className="w-5 h-5" /> },

    // DevOps & Tools
    { name: 'Vercel', category: 'DevOps & Tools', prof: 90, label: 'Confident', icon: <Globe className="w-5 h-5" /> },
    { name: 'GitHub Actions', category: 'DevOps & Tools', prof: 75, label: 'Intermediate', icon: <Workflow className="w-5 h-5" /> },
    { name: 'Razorpay', category: 'DevOps & Tools', prof: 80, label: 'Intermediate', icon: <ShieldCheck className="w-5 h-5" /> },
    { name: 'Zod Validation', category: 'DevOps & Tools', prof: 85, label: 'Confident', icon: <ShieldCheck className="w-5 h-5" /> },

    // Creative 3D
    { name: 'GSAP', category: 'Creative 3D', prof: 75, label: 'Intermediate', icon: <PlayCircle className="w-5 h-5" /> },
    { name: 'Three.js / WebGL', category: 'Creative 3D', prof: 40, label: 'Learning', icon: <Globe className="w-5 h-5" /> },
  ];

  const categories = ['ALL', 'FRONTEND', 'BACKEND & DB', 'DEVOPS & TOOLS', 'CREATIVE 3D'];

  const filteredSkills = skills.filter((s) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'FRONTEND') return s.category === 'Frontend';
    if (activeTab === 'BACKEND & DB') return s.category === 'Backend & DB';
    if (activeTab === 'DEVOPS & TOOLS') return s.category === 'DevOps & Tools';
    if (activeTab === 'CREATIVE 3D') return s.category === 'Creative 3D';
    return true;
  });

  // Orbital layout helper
  const renderOrb = (skill: SkillItem, index: number, total: number, radius: number) => {
    const angle = (index * (Math.PI * 2)) / total;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
      <div
        key={skill.name}
        className="orb absolute"
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span className="text-slate-800">{skill.icon}</span>

        {/* Modernized Tooltip */}
        <div className="orb-tooltip">
          <div className="font-space font-bold text-slate-900 text-xs">
            {skill.name}
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
            {skill.label} · {skill.prof}%
          </div>
          <div className="prof-bar-container">
            <div
              className="prof-bar bg-brand-orange"
              style={{ width: `${skill.prof}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-24 bg-slate-50/70 border-t border-slate-200/60 overflow-hidden text-slate-900"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span>02 // TECHNICAL ECOSYSTEM</span>
          </div>
          <h2 className="font-space text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-3xl">
            Skills & Core Competencies
          </h2>
          <p className="mt-3 font-body text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
            A comprehensive breakdown of frameworks, databases, serverless platforms, and creative libraries I build with.
          </p>
        </div>

        {/* View Switcher & Category Tabs */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid vs Orbit Mode Toggle (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('orbit')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'orbit'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Orbit</span>
            </button>
          </div>
        </div>

        {/* Orbit Mode (Desktop Only) */}
        {viewMode === 'orbit' ? (
          <div className="hidden lg:flex relative w-[680px] h-[680px] mx-auto items-center justify-center my-4">
            {/* Center Monogram */}
            <div className="absolute w-24 h-24 bg-slate-900 text-white rounded-full flex flex-col items-center justify-center shadow-xl z-30 border-4 border-slate-100 group hover:scale-110 transition-transform duration-300">
              <span className="font-syne font-black text-2xl">MU</span>
              <span className="text-[9px] font-mono text-brand-orange uppercase">CORE</span>
            </div>

            {/* Inner Ring (Radius 120px) */}
            <div className="orbit-ring w-[240px] h-[240px] border-slate-300/60" />
            <div className="absolute w-[240px] h-[240px] animate-spin-slow-reverse group-hover:[animation-play-state:paused]">
              {skills.slice(0, 4).map((skill, index) =>
                renderOrb(skill, index, 4, 120)
              )}
            </div>

            {/* Middle Ring (Radius 210px) */}
            <div className="orbit-ring w-[420px] h-[420px] border-slate-300/60" />
            <div className="absolute w-[420px] h-[420px] animate-spin-slow group-hover:[animation-play-state:paused]">
              {skills.slice(4, 10).map((skill, index) =>
                renderOrb(skill, index, 6, 210)
              )}
            </div>

            {/* Outer Ring (Radius 300px) */}
            <div className="orbit-ring w-[600px] h-[600px] border-slate-300/60" />
            <div className="absolute w-[600px] h-[600px] animate-spin-slow-reverse group-hover:[animation-play-state:paused]">
              {skills.slice(10).map((skill, index) =>
                renderOrb(skill, index, skills.length - 10, 300)
              )}
            </div>
          </div>
        ) : (
          /* Grid View (Default for all screen sizes) */
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => {
              const labelColor =
                skill.label === 'Confident'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : skill.label === 'Intermediate'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200';

              return (
                <div
                  key={skill.name}
                  className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-brand-orange/40 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all shadow-xs">
                        {skill.icon}
                      </div>
                      <div>
                        <div className="font-space font-bold text-slate-900 text-sm sm:text-base">
                          {skill.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          {skill.category}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${labelColor}`}>
                      {skill.label}
                    </span>
                  </div>

                  {/* Proficiency Meter */}
                  <div className="w-full flex flex-col gap-1 mt-1">
                    <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
                      <span>Proficiency</span>
                      <span className="font-bold text-slate-900">{skill.prof}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-orange to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${skill.prof}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
