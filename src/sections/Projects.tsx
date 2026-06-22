import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';


interface Project {
  name: string;
  status: 'LIVE' | 'COMING SOON';
  accentColor: string;
  desc: string;
  image?: string;
  tech: string[];
  liveLink?: string;
  gitLink?: string;
}

interface ProjectsProps {
  hiringManagerMode: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ hiringManagerMode }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(25); // Min 25% progress default width
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const projects: Project[] = [
    {
      name: 'Eva Bloom',
      status: 'LIVE',
      accentColor: '#572981', // grape
      desc: "India's premium jewelry e-commerce platform featuring dynamic product galleries, secure checkout, and real-time inventory management.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJqSrkr-blVDlX-HqAMtgVWLBL_yE--HjGpwbLYv6e0b58ziTzsUEeO9T4iKqnLasMR-ECqRhV6Lx0UJ_uoLT91MSU0lGZGNYRSS7JPXPOy5lZjtcg4nAU_JThBCHXjCNeXC6nJqHvgRpzopKgDI0cRFohcnwUU71SMmOk2x8j5WrAirP5djf3ARtOmsw38pmDQSZWvQbRQqmZesJqoSGyIt6mZIUBWTNjIULtYqu8eGL3IuV5kn1f7oGMDsd6jRAngLDOQos6QOE',
      tech: ['React', 'Node.js', 'Supabase', 'Prisma', 'Razorpay', 'Resend', 'Redis'],
      liveLink: import.meta.env.VITE_LIVE_LINK_EVA_BLOOM || 'https://evabloom.in',
      gitLink: import.meta.env.VITE_GITHUB_REPO_EVA_BLOOM || 'https://github.com/manthanut27/eva-bloom',
    },
    {
      name: 'BMW M4 GT3',
      status: 'LIVE',
      accentColor: '#710523', // cherry
      desc: 'Immersive 3D car showcase with interactive configuration, 360-degree rotation, and performance specs visualization using WebGL and R3F.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtINeOCqG1mM8fr76lQr2CjlqlFZNlgd6LpvVspmJRDpL8s2qCs132OdeZbjN1C1Om-VyUZNZ_7BKL8AR71FbfpNNkDF0WqgM7PZ_qxFjGSwCv73QvcMloRcfIB9H9n-GZf2N-r7WSGa-RPycEYMU4O4f0Td-xZjXxyo7Ho8PPr4oRxWY95LN0_Ep1NJd1cWvaQ8pAqR2RlLz61XKZOmHUsLJhjsKBGQ-fG1f5Miv6_HV920SF72i6LpFzlAAyNYpJwHmqwLRgjU',
      tech: ['Next.js', 'R3F', 'GSAP', 'Framer', 'Tailwind'],
      liveLink: import.meta.env.VITE_LIVE_LINK_BMW || 'https://bmw-m4.manthan.dev',
      gitLink: import.meta.env.VITE_GITHUB_REPO_BMW || 'https://github.com/manthanut27/bmw-m4-showcase',
    },
    {
      name: 'Quiz Application',
      status: 'LIVE',
      accentColor: '#500171', // purple
      desc: 'An interactive web-based quiz that tests your foundational knowledge of HTML, CSS, and JavaScript through a series of multiple-choice questions.',
      image: '/quiz-image.png',
      tech: ['React', 'Gsap', 'Tailwind'],
      liveLink: import.meta.env.VITE_LIVE_LINK_QUIZ || 'https://quiz.manthan.dev',
      gitLink: import.meta.env.VITE_GITHUB_REPO_QUIZ || 'https://github.com/manthanut27/quiz',
    },
    {
      name: 'React Animations',
      status: 'LIVE',
      accentColor: '#06B6D4',
      desc: 'An immersive web animation and WebGL showcase featuring a split-column curtain reveal, circular clip-path transitions, and a scroll-pinned 3D circular card carousel.',
      image: '/react-animation.png',
      tech: ['React', 'Three.js', 'R3F', 'GSAP', 'Lenis', 'GLSL'],
      liveLink: import.meta.env.VITE_LIVE_LINK_REACT_ANIMATIONS || 'https://react-animation-xi.vercel.app',
      gitLink: import.meta.env.VITE_GITHUB_REPO_REACT_ANIMATIONS || 'https://github.com/manthanut27/react-animation',
    },
    {
      name: 'FitMirror',
      status: 'COMING SOON',
      accentColor: '#4B7002', // watermelon
      desc: 'AI-powered fitness tracking application utilizing pose estimation to provide real-time form correction and workout analytics.',
      tech: ['TensorFlow.js', 'React Native', 'Expo', 'Python'],
    },


  ];

  // Update progress bar width on horizontal scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    const pct = (container.scrollLeft / maxScroll) * 100;

    const baseWidth = 25; // min progress size
    const currentWidth = baseWidth + (pct / 100) * (100 - baseWidth);
    setScrollProgress(currentWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Shimmer effect calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Horizontal mouse dragging scroll carousel handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMoveDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag scroll multiplier speed
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      data-kanji="作"
      data-label="WORK"
      className={`relative w-full min-h-screen flex flex-col justify-center py-24 select-none overflow-hidden transition-colors duration-1000 ${hiringManagerMode ? 'bg-slate-100 text-slate-900' : 'bg-brand-pink text-brand-navy'
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12 w-full flex flex-col flex-grow relative z-10">
        {/* Header Title */}
        <div className="flex items-end justify-between mb-12 relative w-full border-b border-brand-navy/10 pb-4">
          <div className="absolute -top-16 -left-8 text-[120px] md:text-[180px] font-black text-white/20 select-none pointer-events-none z-0">
            作
          </div>
          <div className="relative z-10 text-left">
            <span className="font-space text-brand-navy/60 tracking-[0.2em] font-bold text-xs uppercase block mb-1">
              WORK
            </span>
            <h2 className="font-syne font-black text-5xl md:text-8xl leading-none uppercase text-brand-navy">
              Projects
            </h2>
          </div>
          {/* Navigation Arrows */}
          <div className="flex gap-2 relative z-10 pb-2">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border-2 border-brand-navy flex items-center justify-center hover:bg-brand-navy hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border-2 border-brand-navy flex items-center justify-center hover:bg-brand-navy hover:text-white transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Project Cards Carousel */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMoveDrag}
          className={`flex gap-8 overflow-x-auto no-scrollbar pb-12 pt-4 flex-grow items-center w-full cursor-grab active:cursor-grabbing select-none ${isDragging ? '' : 'snap-x snap-mandatory'
            }`}
        >
          {projects.map((project) => {
            const isLive = project.status === 'LIVE';

            return (
              <div
                key={project.name}
                className="snap-center shrink-0 w-[90vw] md:w-[500px] h-[580px] flex items-center"
              >
                <div
                  onMouseMove={handleMouseMove}
                  className="project-card glass-card rounded-2xl overflow-hidden flex flex-col h-full relative w-full shadow-2xl transition-all duration-300 group"
                  style={{
                    borderLeft: `6px solid ${project.accentColor}`,
                  }}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span
                      className={`text-[10px] md:text-xs font-space font-black px-3.5 py-1.5 rounded-full shadow-md ${isLive
                        ? 'bg-brand-orange text-white'
                        : 'bg-brand-navy text-brand-yellow'
                        }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Thumbnail Cover image */}
                  <div className="h-56 overflow-hidden relative border-b border-white/20 bg-black/5 flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                      />
                    ) : (
                      /* Aesthetic Retro-Modern Placeholder */
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-brand-yellow font-space uppercase relative select-none">
                        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                        <span className="text-[10px] tracking-[0.2em] font-black opacity-50 mb-1 text-slate-400">
                          System Status
                        </span>
                        <span className="text-lg tracking-widest font-black text-brand-orange animate-pulse">
                          Coming Soon
                        </span>
                        <span className="text-[8px] font-mono tracking-widest opacity-30 mt-2 text-slate-500">
                          [ DEVELOPMENT GATE ACTIVE ]
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow relative text-left">
                    <h3 className="font-syne font-black text-2xl md:text-3xl text-brand-navy mb-2">
                      {project.name}
                    </h3>
                    <p className="font-body text-brand-navy/80 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                      {project.desc}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-white/40 text-brand-navy font-space text-[10px] md:text-xs px-2.5 py-1 rounded-full border border-white/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Call to Actions buttons */}
                    <div className="flex gap-4">
                      {isLive ? (
                        <>
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-brand-orange hover:bg-brand-navy text-white text-center py-3 rounded-xl font-headline font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-brand-orange/15"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                          <a
                            href={project.gitLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-white hover:bg-brand-navy/5 text-brand-navy border-2 border-brand-navy text-center py-3 rounded-xl font-headline font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Github className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        </>
                      ) : (
                        <>
                          <button
                            disabled
                            className="flex-1 bg-gray-200 text-gray-400 py-3 rounded-xl font-headline font-bold text-sm cursor-not-allowed border border-gray-300/30"
                          >
                            Live Demo
                          </button>
                          <button
                            disabled
                            className="flex-1 bg-gray-200 text-gray-400 py-3 rounded-xl font-headline font-bold text-sm cursor-not-allowed border border-gray-300/30"
                          >
                            GitHub
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Bar indicators */}
        <div className="w-full max-w-sm mx-auto h-2 bg-brand-navy/10 rounded-full overflow-hidden relative mt-4 shadow-inner">
          <div
            className="absolute top-0 left-0 h-full bg-brand-orange rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
};
export default Projects;
