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
  const [activeTab, setActiveTab] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'orbit'>('grid');

  const skills: SkillItem[] = [
    // Frontend
    { name: 'React', category: 'Frontend', prof: 90, label: 'Confident', icon: <Code className="w-4 h-4" /> },
    { name: 'Next.js', category: 'Frontend', prof: 85, label: 'Confident', icon: <Globe className="w-4 h-4" /> },
    { name: 'Tailwind CSS', category: 'Frontend', prof: 95, label: 'Confident', icon: <Globe className="w-4 h-4" /> },
    { name: 'Vite', category: 'Frontend', prof: 85, label: 'Confident', icon: <Zap className="w-4 h-4" /> },
    { name: 'Framer Motion', category: 'Frontend', prof: 70, label: 'Intermediate', icon: <PlayCircle className="w-4 h-4" /> },

    // Backend & DB
    { name: 'Node.js', category: 'Backend & DB', prof: 80, label: 'Intermediate', icon: <Terminal className="w-4 h-4" /> },
    { name: 'Express', category: 'Backend & DB', prof: 85, label: 'Confident', icon: <Terminal className="w-4 h-4" /> },
    { name: 'Supabase', category: 'Backend & DB', prof: 85, label: 'Confident', icon: <Database className="w-4 h-4" /> },
    { name: 'PostgreSQL', category: 'Backend & DB', prof: 75, label: 'Intermediate', icon: <Layers className="w-4 h-4" /> },
    { name: 'Prisma ORM', category: 'Backend & DB', prof: 80, label: 'Intermediate', icon: <Workflow className="w-4 h-4" /> },
    { name: 'Redis', category: 'Backend & DB', prof: 65, label: 'Intermediate', icon: <Layers className="w-4 h-4" /> },
    { name: 'Python', category: 'Backend & DB', prof: 45, label: 'Learning', icon: <Cpu className="w-4 h-4" /> },

    // DevOps & Tools
    { name: 'Vercel', category: 'DevOps & Tools', prof: 90, label: 'Confident', icon: <Globe className="w-4 h-4" /> },
    { name: 'GitHub Actions', category: 'DevOps & Tools', prof: 75, label: 'Intermediate', icon: <Workflow className="w-4 h-4" /> },
    { name: 'Razorpay', category: 'DevOps & Tools', prof: 80, label: 'Intermediate', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'Zod Validation', category: 'DevOps & Tools', prof: 85, label: 'Confident', icon: <ShieldCheck className="w-4 h-4" /> },

    // Creative 3D
    { name: 'GSAP', category: 'Creative 3D', prof: 75, label: 'Intermediate', icon: <PlayCircle className="w-4 h-4" /> },
    { name: 'Three.js / WebGL', category: 'Creative 3D', prof: 40, label: 'Learning', icon: <Globe className="w-4 h-4" /> },
  ];

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Frontend', value: 'Frontend' },
    { label: 'Backend & database', value: 'Backend & DB' },
    { label: 'DevOps & tools', value: 'DevOps & Tools' },
    { label: '3D & creative', value: 'Creative 3D' },
  ];

  const filteredSkills = skills.filter((s) => {
    if (activeTab === 'All') return true;
    return s.category === activeTab;
  });

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
        <span className="text-slate-700">{skill.icon}</span>

        <div className="orb-tooltip">
          <div className="font-space font-semibold text-slate-900 text-xs">
            {skill.name}
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-0.5">
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
      className="w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-20 bg-slate-50 border-t border-slate-200/80 text-slate-900"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-8">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl text-left">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
            02 — Stack
          </span>
          <h2 className="font-space text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            Skills and technical ecosystem
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Frontend frameworks, backend services, databases, and animation libraries used across client and personal projects.
          </p>
        </div>

        {/* View Switcher & Category Tabs */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-2 rounded-xl border border-slate-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveTab(cat.value)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === cat.value
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid vs Orbit Mode Toggle */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 font-medium shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('orbit')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'orbit'
                  ? 'bg-white text-slate-900 font-medium shadow-xs'
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
          <div className="hidden lg:flex relative w-[640px] h-[640px] mx-auto items-center justify-center my-4">
            <div className="absolute w-20 h-20 bg-slate-900 text-white rounded-full flex flex-col items-center justify-center z-30 border-2 border-slate-200">
              <span className="font-space font-semibold text-lg">MU</span>
              <span className="text-[9px] font-mono text-slate-400">Core</span>
            </div>

            <div className="orbit-ring w-[220px] h-[220px] border-slate-300" />
            <div className="absolute w-[220px] h-[220px] animate-spin-slow-reverse group-hover:[animation-play-state:paused]">
              {skills.slice(0, 4).map((skill, index) =>
                renderOrb(skill, index, 4, 110)
              )}
            </div>

            <div className="orbit-ring w-[400px] h-[400px] border-slate-300" />
            <div className="absolute w-[400px] h-[400px] animate-spin-slow group-hover:[animation-play-state:paused]">
              {skills.slice(4, 10).map((skill, index) =>
                renderOrb(skill, index, 6, 200)
              )}
            </div>

            <div className="orbit-ring w-[580px] h-[580px] border-slate-300" />
            <div className="absolute w-[580px] h-[580px] animate-spin-slow-reverse group-hover:[animation-play-state:paused]">
              {skills.slice(10).map((skill, index) =>
                renderOrb(skill, index, skills.length - 10, 290)
              )}
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between text-left"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      {skill.icon}
                    </div>
                    <div>
                      <div className="font-space font-semibold text-sm text-slate-900">
                        {skill.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {skill.category}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                    {skill.label}
                  </span>
                </div>

                {/* Single quiet meter */}
                <div className="w-full flex flex-col gap-1 mt-1">
                  <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
                    <span>Proficiency</span>
                    <span className="font-medium text-slate-800 tabular-nums">{skill.prof}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-700 rounded-full"
                      style={{ width: `${skill.prof}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
