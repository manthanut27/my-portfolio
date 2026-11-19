import { ArrowLeft, ArrowRight, ExternalLink, Github, Search, Sparkles, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { EmptyState } from '../components/EmptyState';

interface Project {
  name: string;
  category: 'Full-Stack' | 'Creative & 3D' | 'AI & Mobile';
  status: 'LIVE' | 'COMING SOON';
  accentColor: string;
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

  // High-performance non-render momentum tracking
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumAnimRef = useRef<number | null>(null);
  const hasDraggedRef = useRef(false);

  // Search & Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [comingSoonNotice, setComingSoonNotice] = useState<string | null>(null);

  const projects: Project[] = [
    {
      name: 'Eva Bloom',
      category: 'Full-Stack',
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
      category: 'Creative & 3D',
      status: 'LIVE',
      accentColor: '#710523', // cherry
      desc: 'Immersive 3D car showcase with interactive configuration, 360-degree rotation, and performance specs visualization using WebGL and R3F.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRtINeOCqG1mM8fr76lQr2CjlqlFZNlgd6LpvVspmJRDpL8s2qCs132OdeZbjN1C1Om-VyUZNZ_7BKL8AR71FbfpNNkDF0WqgM7PZ_qxFjGSwCv73QvcMloRcfIB9H9n-GZf2N-r7WSGa-RPycEYMU4O4f0Td-xZjXxyo7Ho8PPr4oRxWY95LN0_Ep1NJd1cWvaQ8pAqR2RlLz61XKZOmHUsLJhjsKBGQ-fG1f5Miv6_HV920SF72i6LpFzlAAyNYpJwHmqwLRgjU',
      tech: ['Next.js', 'R3F', 'GSAP', 'Framer', 'Tailwind'],
      liveLink: import.meta.env.VITE_LIVE_LINK_BMW || 'https://bmw-m4.manthanut.site',
      gitLink: import.meta.env.VITE_GITHUB_REPO_BMW || 'https://github.com/manthanut27/bmw-m4-showcase',
    },
    {
      name: 'Quiz Application',
      category: 'Full-Stack',
      status: 'LIVE',
      accentColor: '#500171', // purple
      desc: 'An interactive web-based quiz that tests foundational knowledge of HTML, CSS, and JavaScript through a series of timed challenges.',
      image: '/quiz-image.png',
      tech: ['React', 'GSAP', 'Tailwind CSS'],
      liveLink: import.meta.env.VITE_LIVE_LINK_QUIZ || 'https://quiz.manthanut.site',
      gitLink: import.meta.env.VITE_GITHUB_REPO_QUIZ || 'https://github.com/manthanut27/quiz',
    },
    {
      name: 'React Animations',
      category: 'Creative & 3D',
      status: 'LIVE',
      accentColor: '#06B6D4', // cyan
      desc: 'An immersive web animation and WebGL showcase featuring a split-column curtain reveal, circular clip-path transitions, and a scroll-pinned 3D circular card carousel.',
      image: '/react-animation.png',
      tech: ['React', 'Three.js', 'R3F', 'GSAP', 'Lenis', 'GLSL'],
      liveLink: import.meta.env.VITE_LIVE_LINK_REACT_ANIMATIONS || 'https://react-animation-xi.vercel.app',
      gitLink: import.meta.env.VITE_GITHUB_REPO_REACT_ANIMATIONS || 'https://github.com/manthanut27/react-animation',
    },
    {
      name: 'FitMirror',
      category: 'AI & Mobile',
      status: 'COMING SOON',
      accentColor: '#FE6334', // brand orange
      desc: 'AI-powered fitness tracking application utilizing pose estimation to provide real-time form correction, rep tracking, and workout analytics.',
      tech: ['TensorFlow.js', 'React Native', 'Expo', 'Python'],
    },
  ];

  const categories = ['ALL', 'FULL-STACK', 'CREATIVE & 3D', 'AI & MOBILE'];

  // Filter projects by category and query
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'ALL' ||
      p.category.toUpperCase() === selectedCategory;

    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  // Reset active index and scroll position when filter or query changes
  useEffect(() => {
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory, searchQuery]);

  // Smooth snap to closest card
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

  // Scroll to explicit index
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

  // Step scroll with Next / Previous controls
  const scrollStep = (direction: 'left' | 'right') => {
    const nextIdx =
      direction === 'left'
        ? Math.max(0, activeIndex - 1)
        : Math.min(filteredProjects.length - 1, activeIndex + 1);
    scrollToIndex(nextIdx);
  };

  // Update active index accurately on scroll
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

  // Mouse dragging handlers
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

  // Smooth mouse wheel translation to horizontal scroll
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
      className="relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-24 bg-slate-50 text-slate-900 border-t border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 relative z-10">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              <span>03 // FEATURED WORK & CASE STUDIES</span>
            </div>
            <h2 className="font-space text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              Selected Projects
            </h2>
            <p className="mt-2 font-body text-base md:text-lg text-slate-600 max-w-xl">
              Production architectures, interactive 3D WebGL builds, and cutting-edge software experiments.
            </p>
          </div>

          {/* Desktop Arrow Controls & Project Counter */}
          {filteredProjects.length > 0 && (
            <div className="hidden md:flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1.5 bg-white rounded-full border border-slate-200 text-slate-700 shadow-xs">
                {String(activeIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => scrollStep('left')}
                disabled={activeIndex === 0}
                className={`w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs active:scale-95 ${
                  activeIndex === 0
                    ? 'opacity-40 cursor-not-allowed hover:bg-white hover:text-slate-700'
                    : 'cursor-pointer'
                }`}
                aria-label="Previous project"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollStep('right')}
                disabled={activeIndex === filteredProjects.length - 1}
                className={`w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center text-slate-700 shadow-xs active:scale-95 ${
                  activeIndex === filteredProjects.length - 1
                    ? 'opacity-40 cursor-not-allowed hover:bg-white hover:text-slate-700'
                    : 'cursor-pointer'
                }`}
                aria-label="Next project"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tech or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl font-body text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-brand-orange transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Coming Soon Alert Notification */}
        {comingSoonNotice && (
          <div className="w-full p-4 bg-slate-900 text-white border border-slate-800 rounded-2xl flex items-center justify-between gap-4 shadow-lg animate-fadeIn">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-brand-orange shrink-0 animate-pulse" />
              <span className="font-mono text-xs md:text-sm font-medium text-slate-200">
                {comingSoonNotice}
              </span>
            </div>
            <button
              onClick={() => setComingSoonNotice(null)}
              className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Projects Carousel View or Empty State */}
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No Matching Projects"
            description={`No projects found matching "${searchQuery}" in ${selectedCategory}. Try resetting your search filter.`}
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
          />
        ) : (
          <div
            ref={scrollRef}
            tabIndex={0}
            role="region"
            aria-label="Projects horizontal carousel"
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
            className={`flex gap-5 sm:gap-6 md:gap-7 overflow-x-auto pb-6 pt-2 no-scrollbar touch-pan-x w-full select-none outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-2xl ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
            style={{
              scrollSnapType: isDragging ? 'none' : 'x proximity',
              scrollBehavior: isDragging ? 'auto' : 'smooth',
              WebkitOverflowScrolling: 'touch',
              overscrollBehaviorX: 'contain',
              scrollPaddingInline: '1.5rem',
            }}
          >
            {filteredProjects.map((project, idx) => {
              const isLive = project.status === 'LIVE';
              const isFocused = activeIndex === idx;

              return (
                <div
                  key={project.name}
                  className="project-card-container snap-center shrink-0 w-[88vw] sm:w-[380px] md:w-[450px] h-[540px] md:h-[580px] flex items-center transition-transform duration-300"
                >
                  <div
                    className={`bg-white rounded-2xl border flex flex-col h-full w-full overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group ${
                      isFocused
                        ? 'border-slate-400 shadow-md scale-[1.01]'
                        : 'border-slate-200/90'
                    }`}
                  >
                    {/* Media Thumbnail Frame */}
                    <div className="h-48 md:h-56 overflow-hidden relative border-b border-slate-100 bg-slate-900 flex items-center justify-center">
                      {/* Top Badges: Category & Status */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 z-20">
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 ${
                            isLive
                              ? 'bg-emerald-500 text-white'
                              : 'bg-brand-orange text-white'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>{project.status}</span>
                        </span>
                      </div>

                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-300 font-mono text-center p-6 select-none relative">
                          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fe6334_1px,transparent_1px)] [background-size:16px_16px]" />
                          <Sparkles className="w-8 h-8 text-brand-orange mb-2 animate-pulse" />
                          <span className="text-xs tracking-widest uppercase font-bold text-slate-400">
                            R&D IN PROGRESS
                          </span>
                          <span className="text-lg font-syne font-black text-white mt-1">
                            FitMirror Pose Engine
                          </span>
                          <span className="text-[10px] text-slate-500 mt-2">
                            [ Real-Time Pose Estimation ]
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 md:p-7 flex flex-col flex-grow text-left justify-between">
                      <div>
                        <h3 className="font-syne font-black text-xl md:text-2xl text-slate-900 group-hover:text-brand-orange transition-colors mb-2">
                          {project.name}
                        </h3>
                        <p className="font-body text-slate-600 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3 md:line-clamp-4">
                          {project.desc}
                        </p>

                        {/* Tech Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="bg-slate-100 text-slate-700 font-mono text-[10px] md:text-xs px-2.5 py-0.5 rounded-md border border-slate-200/80 font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Call to Action Buttons */}
                      <div className="flex gap-2.5 pt-4 border-t border-slate-100">
                        {isLive ? (
                          <>
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-brand-orange hover:bg-slate-900 text-white text-center py-2.5 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs hover:shadow-md active:scale-98"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                            <a
                              href={project.gitLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-center py-2.5 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-98"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>GitHub</span>
                            </a>
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              setComingSoonNotice(
                                `${project.name} is in active R&D! Pose estimation model is undergoing latency testing on mobile GPUs.`
                              )
                            }
                            className="w-full bg-slate-900 hover:bg-brand-orange text-white py-2.5 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs active:scale-98"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                            <span>Preview Roadmap</span>
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
          <div className="flex items-center justify-center gap-2 mt-2">
            {filteredProjects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.name}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-brand-orange shadow-xs'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Jump to project ${idx + 1}: ${proj.name}`}
                  aria-current={isActive ? 'true' : undefined}
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
