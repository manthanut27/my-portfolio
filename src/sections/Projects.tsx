import { ArrowLeft, ArrowRight, ExternalLink, Github, Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { EmptyState } from '../components/EmptyState';

interface Project {
  name: string;
  category: 'Full-Stack' | 'Creative & 3D' | 'AI & Mobile';
  status: 'LIVE' | 'COMING SOON';
  desc: string;
  image?: string;
  tech: string[];
  liveLink?: string;
  gitLink?: string;
}

interface ProjectsProps {
  hiringManagerMode?: boolean;
}

export const Projects: React.FC<ProjectsProps> = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumAnimRef = useRef<number | null>(null);
  const hasDraggedRef = useRef(false);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [comingSoonNotice, setComingSoonNotice] = useState<string | null>(null);

  const projects: Project[] = [
    {
      name: 'Eva Bloom',
      category: 'Full-Stack',
      status: 'LIVE',
      desc: "Jewelry e-commerce store with product galleries, dynamic cart, secure Razorpay checkout, and real-time inventory management.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJqSrkr-blVDlX-HqAMtgVWLBL_yE--HjGpwbLYv6e0b58ziTzsUEeO9T4iKqnLasMR-ECqRhV6Lx0UJ_uoLT91MSU0lGZGNYRSS7JPXPOy5lZjtcg4nAU_JThBCHXjCNeXC6nJqHvgRpzopKgDI0cRFohcnwUU71SMmOk2x8j5WrAirP5djf3ARtOmsw38pmDQSZWvQbRQqmZesJqoSGyIt6mZIUBWTNjIULtYqu8eGL3IuV5kn1f7oGMDsd6jRAngLDOQos6QOE',
      tech: ['React', 'Node.js', 'Supabase', 'Prisma', 'Razorpay', 'Resend', 'Redis'],
      liveLink: import.meta.env.VITE_LIVE_LINK_EVA_BLOOM || 'https://evabloom.in',
      gitLink: import.meta.env.VITE_GITHUB_REPO_EVA_BLOOM || 'https://github.com/manthanut27/eva-bloom',
    },
    {
      name: 'BMW M4 GT3',
      category: 'Creative & 3D',
      status: 'LIVE',
      desc: 'Interactive 3D motorsport showcase with 360-degree rotation, paint customizer, and performance specs visualization using WebGL and R3F.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtINeOCqG1mM8fr76lQr2CjlqlFZNlgd6LpvVspmJRDpL8s2qCs132OdeZbjN1C1Om-VyUZNZ_7BKL8AR71FbfpNNkDF0WqgM7PZ_qxFjGSwCv73QvcMloRcfIB9H9n-GZf2N-r7WSGa-RPycEYMU4O4f0Td-xZjXxyo7Ho8PPr4oRxWY95LN0_Ep1NJd1cWvaQ8pAqR2RlLz61XKZOmHUsLJhjsKBGQ-fG1f5Miv6_HV920SF72i6LpFzlAAyNYpJwHmqwLRgjU',
      tech: ['Next.js', 'R3F', 'GSAP', 'Framer', 'Tailwind'],
      liveLink: import.meta.env.VITE_LIVE_LINK_BMW || 'https://bmw-m4.manthanut.site',
      gitLink: import.meta.env.VITE_GITHUB_REPO_BMW || 'https://github.com/manthanut27/bmw-m4-showcase',
    },
    {
      name: 'Quiz Application',
      category: 'Full-Stack',
      status: 'LIVE',
      desc: 'Interactive quiz application covering HTML, CSS, and modern JavaScript with persistent score storage and animated transitions.',
      image: '/quiz-image.png',
      tech: ['React', 'GSAP', 'Tailwind CSS'],
      liveLink: import.meta.env.VITE_LIVE_LINK_QUIZ || 'https://quiz.manthanut.site',
      gitLink: import.meta.env.VITE_GITHUB_REPO_QUIZ || 'https://github.com/manthanut27/quiz',
    },
    {
      name: 'React Animations',
      category: 'Creative & 3D',
      status: 'LIVE',
      desc: 'WebGL and scroll animation showcase featuring split-column curtain reveals, clip-path transitions, and a scroll-pinned circular carousel.',
      image: '/react-animation.png',
      tech: ['React', 'Three.js', 'R3F', 'GSAP', 'Lenis', 'GLSL'],
      liveLink: import.meta.env.VITE_LIVE_LINK_REACT_ANIMATIONS || 'https://react-animation-xi.vercel.app',
      gitLink: import.meta.env.VITE_GITHUB_REPO_REACT_ANIMATIONS || 'https://github.com/manthanut27/react-animation',
    },
    {
      name: 'FitMirror',
      category: 'AI & Mobile',
      status: 'COMING SOON',
      desc: 'Mobile fitness tracking application with real-time pose estimation for form feedback and workout repetition counting.',
      tech: ['TensorFlow.js', 'React Native', 'Expo', 'Python'],
    },
  ];

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Full-stack', value: 'Full-Stack' },
    { label: 'Creative & 3D', value: 'Creative & 3D' },
    { label: 'AI & mobile', value: 'AI & Mobile' },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;

    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory, searchQuery]);

  const snapToNearestCard = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.project-card-container');
    if (cards.length === 0) return;

    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (scrollLeft <= 15) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      setActiveIndex(0);
      return;
    }

    if (scrollLeft >= maxScroll - 15) {
      container.scrollTo({ left: maxScroll, behavior: 'smooth' });
      setActiveIndex(filteredProjects.length - 1);
      return;
    }

    const containerLeft = scrollLeft;
    const containerRight = scrollLeft + container.clientWidth;
    let maxVisibleRatio = -1;
    let bestIndex = 0;
    let bestCard: HTMLElement | null = null;

    cards.forEach((card, idx) => {
      const cardLeft = card.offsetLeft;
      const cardRight = cardLeft + card.offsetWidth;

      const overlapStart = Math.max(containerLeft, cardLeft);
      const overlapEnd = Math.min(containerRight, cardRight);
      const visibleWidth = Math.max(0, overlapEnd - overlapStart);
      const visibleRatio = visibleWidth / card.offsetWidth;

      if (visibleRatio > maxVisibleRatio) {
        maxVisibleRatio = visibleRatio;
        bestIndex = idx;
        bestCard = card;
      }
    });

    if (bestCard) {
      const targetScroll =
        (bestCard as HTMLElement).offsetLeft -
        (container.clientWidth - (bestCard as HTMLElement).offsetWidth) / 2;

      container.scrollTo({
        left: Math.max(0, Math.min(maxScroll, targetScroll)),
        behavior: 'smooth',
      });
      setActiveIndex(bestIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('.project-card-container');
    if (cards.length === 0 || !cards[index]) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (index === 0) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (index === filteredProjects.length - 1) {
      container.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      const card = cards[index];
      const targetScroll = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, Math.min(maxScroll, targetScroll)),
        behavior: 'smooth',
      });
    }
    setActiveIndex(index);
  };

  const scrollStep = (direction: 'left' | 'right') => {
    const nextIdx =
      direction === 'left'
        ? Math.max(0, activeIndex - 1)
        : Math.min(filteredProjects.length - 1, activeIndex + 1);
    scrollToIndex(nextIdx);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (maxScroll <= 0 || filteredProjects.length <= 1) {
      setActiveIndex(0);
      return;
    }

    const scrollLeft = container.scrollLeft;

    if (scrollLeft <= 15) {
      setActiveIndex(0);
      return;
    }

    if (scrollLeft >= maxScroll - 15) {
      setActiveIndex(filteredProjects.length - 1);
      return;
    }

    const cards = container.querySelectorAll<HTMLElement>('.project-card-container');
    if (cards.length === 0) return;

    const containerLeft = scrollLeft;
    const containerRight = scrollLeft + container.clientWidth;
    let maxVisibleRatio = -1;
    let bestIndex = 0;

    cards.forEach((card, idx) => {
      const cardLeft = card.offsetLeft;
      const cardRight = cardLeft + card.offsetWidth;

      const overlapStart = Math.max(containerLeft, cardLeft);
      const overlapEnd = Math.min(containerRight, cardRight);
      const visibleWidth = Math.max(0, overlapEnd - overlapStart);
      const visibleRatio = visibleWidth / card.offsetWidth;

      if (visibleRatio > maxVisibleRatio) {
        maxVisibleRatio = visibleRatio;
        bestIndex = idx;
      }
    });

    setActiveIndex(bestIndex);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    if (momentumAnimRef.current) {
      cancelAnimationFrame(momentumAnimRef.current);
      momentumAnimRef.current = null;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedRef.current = false;

    startXRef.current = e.pageX;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseMoveContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();

    const currentX = e.pageX;
    const currentTime = performance.now();
    const deltaX = currentX - startXRef.current;

    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }

    const dt = currentTime - lastTimeRef.current;
    if (dt > 0) {
      const dx = currentX - lastXRef.current;
      velocityRef.current = 0.7 * (dx / dt) + 0.3 * velocityRef.current;
    }

    lastXRef.current = currentX;
    lastTimeRef.current = currentTime;

    scrollRef.current.scrollLeft = scrollLeftRef.current - deltaX;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const container = scrollRef.current;
    if (!container) return;

    let v = velocityRef.current;
    if (Math.abs(v) > 0.2) {
      let lastAnimTime = performance.now();
      const friction = 0.94;

      const momentumStep = () => {
        const now = performance.now();
        const dt = now - lastAnimTime;
        lastAnimTime = now;

        container.scrollLeft -= v * dt * 1.2;
        v *= Math.pow(friction, dt / 16);

        if (Math.abs(v) > 0.05) {
          momentumAnimRef.current = requestAnimationFrame(momentumStep);
        } else {
          momentumAnimRef.current = null;
          snapToNearestCard();
        }
      };

      momentumAnimRef.current = requestAnimationFrame(momentumStep);
    } else {
      snapToNearestCard();
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.1) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll <= 0) return;

        const isAtLeftEdge = container.scrollLeft <= 4 && e.deltaY < 0;
        const isAtRightEdge = container.scrollLeft >= maxScroll - 4 && e.deltaY > 0;

        if (!isAtLeftEdge && !isAtRightEdge) {
          e.preventDefault();
          container.scrollBy({
            left: e.deltaY * 1.15,
            behavior: 'auto',
          });
        }
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
      if (momentumAnimRef.current) {
        cancelAnimationFrame(momentumAnimRef.current);
      }
    };
  }, [filteredProjects]);

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
  }, [filteredProjects]);

  return (
    <section
      id="projects"
      className="w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-20 bg-slate-50 text-slate-900 border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
          <div className="flex flex-col items-start max-w-xl">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
              03 — Work
            </span>
            <h2 className="font-space text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Selected projects and case studies
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Production architectures, interactive WebGL applications, and developer tools.
            </p>
          </div>

          {/* Stepper Controls */}
          {filteredProjects.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500 tabular-nums px-2.5 py-1 bg-white border border-slate-200 rounded-md">
                {String(activeIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => scrollStep('left')}
                disabled={activeIndex === 0}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollStep('right')}
                disabled={activeIndex === filteredProjects.length - 1}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next project"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-2 rounded-xl border border-slate-200">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-body text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-slate-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Notification Banner */}
        {comingSoonNotice && (
          <div className="w-full p-3 bg-slate-900 text-white rounded-lg flex items-center justify-between gap-3 text-xs font-mono">
            <span>{comingSoonNotice}</span>
            <button
              onClick={() => setComingSoonNotice(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Carousel or Empty State */}
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No matching projects"
            description={`No projects found matching "${searchQuery}" in ${selectedCategory}.`}
            actionLabel="Reset search"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          />
        ) : (
          <div
            ref={scrollRef}
            tabIndex={0}
            role="region"
            aria-label="Projects carousel"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMoveContainer}
            onClickCapture={(e) => {
              if (hasDraggedRef.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollStep('left');
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollStep('right');
              }
            }}
            className={`flex gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar touch-pan-x w-full select-none outline-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollSnapType: isDragging ? 'none' : 'x proximity',
              scrollBehavior: isDragging ? 'auto' : 'smooth',
            }}
          >
            {filteredProjects.map((project, idx) => {
              const isLive = project.status === 'LIVE';
              const isFocused = activeIndex === idx;

              return (
                <div
                  key={project.name}
                  className="project-card-container snap-center shrink-0 w-[85vw] sm:w-[360px] md:w-[420px] h-[520px] flex items-center"
                >
                  <div
                    className={`bg-white rounded-xl border flex flex-col h-full w-full overflow-hidden transition-colors ${
                      isFocused ? 'border-slate-400 shadow-sm' : 'border-slate-200'
                    }`}
                  >
                    {/* Media Thumbnail Frame */}
                    <div className="h-44 md:h-48 overflow-hidden relative border-b border-slate-100 bg-slate-900 flex items-center justify-center">
                      <div className="absolute top-3 left-3 z-10">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-200 border border-slate-700">
                          {project.category}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 z-10">
                        <span
                          className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded flex items-center gap-1.5 ${
                            isLive
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span>{project.status === 'LIVE' ? 'Live' : 'In development'}</span>
                        </span>
                      </div>

                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 font-mono text-center p-4">
                          <span className="text-xs uppercase text-slate-500">Architecture in progress</span>
                          <span className="text-sm font-space text-white mt-1">Pose estimation engine</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow text-left justify-between">
                      <div>
                        <h3 className="font-space font-semibold text-lg text-slate-900 mb-1.5">
                          {project.name}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3">
                          {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="bg-slate-100 text-slate-600 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-slate-100">
                        {isLive ? (
                          <>
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-center py-2 rounded-lg font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live demo</span>
                            </a>
                            <a
                              href={project.gitLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-center py-2 rounded-lg font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>GitHub</span>
                            </a>
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              setComingSoonNotice(
                                `${project.name} is currently in local benchmarking for pose detection latency.`
                              )
                            }
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Status details</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Carousel Pagination Dots */}
        {filteredProjects.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-1">
            {filteredProjects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.name}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    isActive ? 'w-6 bg-slate-800' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Jump to ${proj.name}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
