import { ArrowLeft, ArrowRight, ExternalLink, Github, Search, Sparkles, X, Info } from 'lucide-react';
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
  hiringManagerMode: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ hiringManagerMode }) => {
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
      desc: 'An interactive web-based quiz that tests your foundational knowledge of HTML, CSS, and JavaScript through a series of multiple-choice questions.',
      image: '/quiz-image.png',
      tech: ['React', 'Gsap', 'Tailwind'],
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
      accentColor: '#4B7002', // watermelon
      desc: 'AI-powered fitness tracking application utilizing pose estimation to provide real-time form correction and workout analytics.',
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

  // Smooth snap to closest card based on visible viewport overlap
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

  // Scroll to explicit index with precise centering and boundary handling
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

    // Strict boundary checks for instant first/last dot activation
    if (scrollLeft <= 15) {
      setActiveIndex(0);
      return;
    }

    if (scrollLeft >= maxScroll - 15) {
      setActiveIndex(filteredProjects.length - 1);
      return;
    }

    // Determine which card has the largest visible presence in the viewport
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

  // Smooth mouse wheel translation to horizontal scroll with edge passthrough
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // If predominantly vertical scroll and horizontal overflow exists
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.1) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll <= 0) return;

        const isAtLeftEdge = container.scrollLeft <= 4 && e.deltaY < 0;
        const isAtRightEdge = container.scrollLeft >= maxScroll - 4 && e.deltaY > 0;

        // Only intercept when there is room to scroll horizontally
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

  // Shimmer effect calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Smooth mouse dragging with velocity tracking and momentum glide
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

  return (
    <section
      id="projects"
      data-kanji="作"
      data-label="WORK"
      className={`relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 py-20 md:py-24 select-none overflow-hidden transition-colors duration-1000 ${
        hiringManagerMode ? 'bg-slate-100 text-slate-900' : 'bg-brand-pink text-brand-navy'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 md:gap-10 relative z-10">
        {/* Header Title with Navigation Arrows & Status Count */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
          <div className="relative">
            {!hiringManagerMode && (
              <div className="text-brand-navy/15 text-6xl sm:text-7xl md:text-8xl font-black mb-1 md:mb-2 pointer-events-none select-none">
                作
              </div>
            )}
            <h2 className="font-space text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-navy">
              Projects
            </h2>
            <p className="mt-2 md:mt-4 font-label text-sm sm:text-base md:text-lg font-medium text-brand-navy/70 max-w-lg">
              Explore production applications, creative 3D WebGL builds, and prototypes.
            </p>
          </div>

          {/* Desktop Arrow Controllers & Project Counter */}
          {filteredProjects.length > 0 && (
            <div className="hidden md:flex items-center gap-3">
              <span className="font-space text-xs font-bold px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-full border border-brand-navy/15 text-brand-navy shadow-sm">
                {String(activeIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => scrollStep('left')}
                disabled={activeIndex === 0}
                className={`w-11 h-11 rounded-full border-2 border-brand-navy bg-white hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center text-brand-navy shadow-[2px_2px_0px_#0C4A6E] active:translate-x-[1px] active:translate-y-[1px] ${
                  activeIndex === 0
                    ? 'opacity-40 cursor-not-allowed hover:bg-white hover:text-brand-navy'
                    : 'cursor-pointer'
                }`}
                aria-label="Previous project"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollStep('right')}
                disabled={activeIndex === filteredProjects.length - 1}
                className={`w-11 h-11 rounded-full border-2 border-brand-navy bg-white hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center text-brand-navy shadow-[2px_2px_0px_#0C4A6E] active:translate-x-[1px] active:translate-y-[1px] ${
                  activeIndex === filteredProjects.length - 1
                    ? 'opacity-40 cursor-not-allowed hover:bg-white hover:text-brand-navy'
                    : 'cursor-pointer'
                }`}
                aria-label="Next project"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-space font-bold text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'bg-white/60 text-brand-navy hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/50" />
            <input
              type="text"
              placeholder="Search tech or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white/80 border border-brand-navy/15 rounded-xl font-body text-xs text-brand-navy placeholder:text-brand-navy/40 outline-none focus:border-brand-orange transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-navy/50 hover:text-brand-navy"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Notification / Modal for Coming Soon Projects */}
        {comingSoonNotice && (
          <div className="w-full p-4 bg-brand-yellow text-brand-navy border-2 border-brand-navy shadow-[4px_4px_0px_#0C4A6E] rounded-xl flex items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-brand-orange shrink-0" />
              <span className="font-space text-xs md:text-sm font-bold">
                {comingSoonNotice}
              </span>
            </div>
            <button
              onClick={() => setComingSoonNotice(null)}
              className="p-1 hover:bg-black/10 rounded-lg text-brand-navy"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Projects Carousel View or Empty State */}
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No Matching Projects"
            description={`No projects found matching "${searchQuery}" in ${selectedCategory}. Try resetting your search or filter.`}
            actionLabel="Clear Filter & Search"
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
            className={`flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-6 pt-2 no-scrollbar touch-pan-x w-full select-none outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-2xl ${
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
                  className="project-card-container snap-center shrink-0 w-[88vw] sm:w-[380px] md:w-[460px] h-[540px] md:h-[580px] flex items-center transition-transform duration-300"
                >
                  <div
                    onMouseMove={handleMouseMove}
                    className={`project-card glass-card rounded-2xl overflow-hidden flex flex-col h-full relative w-full shadow-xl transition-all duration-300 group border-2 ${
                      isFocused ? 'border-brand-navy shadow-2xl scale-[1.01]' : 'border-white/60'
                    }`}
                    style={{
                      borderLeft: `6px solid ${project.accentColor}`,
                    }}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span
                        className={`text-[10px] md:text-xs font-space font-black px-3 py-1 rounded-full shadow-md ${
                          isLive
                            ? 'bg-brand-orange text-white'
                            : 'bg-brand-navy text-brand-yellow'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Thumbnail Cover image */}
                    <div className="h-48 md:h-56 overflow-hidden relative border-b border-white/20 bg-black/5 flex items-center justify-center">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-brand-yellow font-space uppercase relative select-none">
                          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                          <span className="text-[10px] tracking-[0.2em] font-black opacity-50 mb-1 text-slate-400">
                            System Status
                          </span>
                          <span className="text-base md:text-lg tracking-widest font-black text-brand-orange animate-pulse">
                            Coming Soon
                          </span>
                          <span className="text-[8px] font-mono tracking-widest opacity-30 mt-2 text-slate-500">
                            [ DEVELOPMENT GATE ACTIVE ]
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="p-5 md:p-7 flex flex-col flex-grow relative text-left">
                      <h3 className="font-syne font-black text-xl md:text-2xl text-brand-navy mb-2">
                        {project.name}
                      </h3>
                      <p className="font-body text-brand-navy/80 text-xs md:text-sm leading-relaxed mb-4 flex-grow line-clamp-3 md:line-clamp-4">
                        {project.desc}
                      </p>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="bg-white/50 text-brand-navy font-space text-[10px] md:text-xs px-2.5 py-0.5 rounded-full border border-white/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Call to Action Buttons */}
                      <div className="flex gap-3">
                        {isLive ? (
                          <>
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-brand-orange hover:bg-brand-navy text-white text-center py-2.5 md:py-3 rounded-xl font-headline font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                            <a
                              href={project.gitLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-white hover:bg-brand-navy/5 text-brand-navy border-2 border-brand-navy text-center py-2.5 md:py-3 rounded-xl font-headline font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>GitHub</span>
                            </a>
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              setComingSoonNotice(
                                `${project.name} is in active R&D! Pose estimation engine is undergoing testing. Check GitHub or Terminal for roadmap updates.`
                              )
                            }
                            className="w-full bg-white hover:bg-brand-yellow text-brand-navy border-2 border-brand-navy py-2.5 md:py-3 rounded-xl font-headline font-bold text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                          >
                            <Sparkles className="w-4 h-4 text-brand-orange" />
                            <span>Roadmap & Preview Details</span>
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

        {/* Interactive Pagination Dots (Line loading removed) */}
        {filteredProjects.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-4">
            {filteredProjects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.name}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-brand-orange shadow-md'
                      : 'w-2.5 bg-brand-navy/25 hover:bg-brand-navy/50 hover:scale-125'
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
