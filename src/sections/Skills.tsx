import React from 'react';
import { usePerformanceTier } from '../context/PerformanceTier';
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
  PlayCircle
} from 'lucide-react';

interface SkillItem {
  name: string;
  prof: number;
  color: string;
  label: 'Learning' | 'Intermediate' | 'Confident';
  icon: React.ReactNode;
}

interface SkillsProps {
  hiringManagerMode: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ hiringManagerMode }) => {
  const { tier } = usePerformanceTier();

  // Skills organized by rings
  const innerSkills: SkillItem[] = [
    { name: 'React', prof: 90, color: '#FE6334', label: 'Confident', icon: <Code className="w-5 h-5" /> },
    { name: 'Next.js', prof: 85, color: '#FE6334', label: 'Confident', icon: <Globe className="w-5 h-5" /> },
    { name: 'Node.js', prof: 80, color: '#E9CFF6', label: 'Intermediate', icon: <Terminal className="w-5 h-5" /> },
    { name: 'Python', prof: 40, color: '#FFA6B5', label: 'Learning', icon: <Cpu className="w-5 h-5" /> },
  ];

  const middleSkills: SkillItem[] = [
    { name: 'Supabase', prof: 85, color: '#FE6334', label: 'Confident', icon: <Database className="w-5 h-5" /> },
    { name: 'PostgreSQL', prof: 75, color: '#E9CFF6', label: 'Intermediate', icon: <Layers className="w-5 h-5" /> },
    { name: 'Prisma', prof: 80, color: '#E9CFF6', label: 'Intermediate', icon: <Workflow className="w-5 h-5" /> },
    { name: 'Redis', prof: 60, color: '#E9CFF6', label: 'Intermediate', icon: <Layers className="w-5 h-5" /> },
    { name: 'Express', prof: 85, color: '#FE6334', label: 'Confident', icon: <Terminal className="w-5 h-5" /> },
    { name: 'Tailwind', prof: 95, color: '#FE6334', label: 'Confident', icon: <Globe className="w-5 h-5" /> },
  ];

  const outerSkills: SkillItem[] = [
    { name: 'GSAP', prof: 70, color: '#E9CFF6', label: 'Intermediate', icon: <PlayCircle className="w-5 h-5" /> },
    { name: 'Three.js', prof: 30, color: '#FFA6B5', label: 'Learning', icon: <Globe className="w-5 h-5" /> },
    { name: 'Framer', prof: 65, color: '#E9CFF6', label: 'Intermediate', icon: <PlayCircle className="w-5 h-5" /> },
    { name: 'Actions', prof: 75, color: '#E9CFF6', label: 'Intermediate', icon: <Workflow className="w-5 h-5" /> },
    { name: 'Vite', prof: 85, color: '#FE6334', label: 'Confident', icon: <Zap className="w-5 h-5" /> },
    { name: 'Vercel', prof: 90, color: '#FE6334', label: 'Confident', icon: <Globe className="w-5 h-5" /> },
    { name: 'Razorpay', prof: 80, color: '#E9CFF6', label: 'Intermediate', icon: <ShieldCheck className="w-5 h-5" /> },
    { name: 'Zod', prof: 85, color: '#FE6334', label: 'Confident', icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  const allSkills = [...innerSkills, ...middleSkills, ...outerSkills];

  // Helper to render orb content
  const renderOrb = (skill: SkillItem, index: number, total: number, radius: number) => {
    // Distribute angles evenly around circle
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
        <span className="text-brand-navy/70">{skill.icon}</span>

        {/* Tooltip on hover */}
        <div className="orb-tooltip">
          <div className="font-headline font-black text-brand-navy text-sm">
            {skill.name}
          </div>
          <div className="text-[10px] font-space text-brand-navy/60 uppercase tracking-wider mt-1">
            {skill.label}
          </div>
          <div className="prof-bar-container">
            <div
              className="prof-bar"
              style={{
                width: `${skill.prof}%`,
                backgroundColor: skill.color,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const isMobileOrLow = tier === 'mobile' || tier === 'low' || hiringManagerMode;

  return (
    <section
      id="skills"
      data-kanji="技"
      data-label="SKILLS"
      className={`relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-20 md:py-24 select-none overflow-hidden transition-colors duration-1000 ${
        hiringManagerMode ? 'bg-slate-50 text-slate-900' : 'bg-brand-cyan text-brand-navy'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-8 md:gap-12 relative z-10">
        {/* Header Title */}
        <div className="text-center relative">
          {!hiringManagerMode && (
            <div className="text-brand-navy/15 text-6xl sm:text-7xl md:text-8xl font-black mb-1 md:mb-2 pointer-events-none select-none">
              技
            </div>
          )}
          <h2 className="font-space text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-navy">
            Skills
          </h2>
          <p className="mt-2 md:mt-4 font-label text-sm sm:text-base md:text-lg font-medium text-brand-navy/70 max-w-lg mx-auto">
            An orbital view of my technical ecosystem.
          </p>
        </div>

        {/* Skills Orbit Layout for Desktop (lg+) / Responsive Card Grid for Mobile & Tablets */}
        {!isMobileOrLow ? (
          <div className="hidden lg:flex relative w-[700px] h-[700px] mx-auto items-center justify-center scale-90 md:scale-100">
            {/* Center Monogram */}
            <div className="absolute w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl z-30 border-[6px] border-brand-cyan group hover:scale-115 transition-transform duration-300">
              <span className="font-syne font-black text-4xl text-brand-navy">MU</span>
            </div>

            {/* Inner Ring (Radius 120px) */}
            <div className="orbit-ring w-[240px] h-[240px]" />
            <div className="absolute w-[240px] h-[240px] animate-spin-slow-reverse group-hover:[animation-play-state:paused]">
              {innerSkills.map((skill, index) =>
                renderOrb(skill, index, innerSkills.length, 120)
              )}
            </div>

            {/* Middle Ring (Radius 210px) */}
            <div className="orbit-ring w-[420px] h-[420px]" />
            <div className="absolute w-[420px] h-[420px] animate-spin-slow group-hover:[animation-play-state:paused]">
              {middleSkills.map((skill, index) =>
                renderOrb(skill, index, middleSkills.length, 210)
              )}
            </div>

            {/* Outer Ring (Radius 300px) */}
            <div className="orbit-ring w-[600px] h-[600px]" />
            <div className="absolute w-[600px] h-[600px] animate-spin-slow-reverse group-hover:[animation-play-state:paused]">
              {outerSkills.map((skill, index) =>
                renderOrb(skill, index, outerSkills.length, 300)
              )}
            </div>
          </div>
        ) : null}

        {/* Responsive Grid View: always on for mobile/tablets or when in low/recruiter tier */}
        <div className={`w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 md:mt-8 ${!isMobileOrLow ? 'lg:hidden' : ''}`}>
          {allSkills.map((skill) => (
            <div
              key={skill.name}
              className="glass-card p-4 sm:p-5 rounded-2xl flex items-center gap-4 text-left border border-white/40 shadow-sm"
            >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-brand-navy/10 text-brand-navy shadow-sm">
                  {skill.icon}
                </div>
                <div className="flex-grow">
                  <div className="font-headline font-black text-brand-navy text-base">
                    {skill.name}
                  </div>
                  <div className="text-[10px] font-space text-brand-navy/55 uppercase mt-0.5 tracking-wider">
                    {skill.label}
                  </div>
                  <div className="prof-bar-container">
                    <div
                      className="prof-bar"
                      style={{
                        width: `${skill.prof}%`,
                        backgroundColor: skill.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};
export default Skills;
