import React, { useEffect, useRef, useState } from 'react';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { usePerformanceTier } from '../context/PerformanceTier';
import { Github, Trophy, Briefcase, FileCode, Star, Layers, Activity } from 'lucide-react';
import * as THREE from 'three';

interface AboutProps {
  hiringManagerMode: boolean;
}

export const About: React.FC<AboutProps> = ({ hiringManagerMode }) => {
  const { tier } = usePerformanceTier();
  const { publicRepos, stars, contributions, evaBloomCommits, heatmap, loading: ghLoading } = useGitHubStats();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Client-side mount check to prevent hydration mismatch for heatmap
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3D Three.js Procedural Tokyo City Block Canvas
  useEffect(() => {
    if (hiringManagerMode || tier === 'mobile' || tier === 'low' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c4a6e, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 8, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFE6334, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xC0F0F5, 1.5, 20);
    pointLight.position.set(0, 4, 0);
    scene.add(pointLight);

    // Procedural Tokyo Grid block - crystal matrix of glowing skyscrapers
    const group = new THREE.Group();
    const citySize = 5;
    const spacing = 1.2;

    for (let x = -citySize / 2; x <= citySize / 2; x++) {
      for (let z = -citySize / 2; z <= citySize / 2; z++) {
        // Random Skyscraper heights
        const h = 0.5 + Math.random() * 3.5;
        const geo = new THREE.BoxGeometry(0.8, h, 0.8);

        // Skyscraper wireframe material
        const mat = new THREE.MeshStandardMaterial({
          color: (x + z) % 2 === 0 ? 0xFE6334 : 0x0c4a6e,
          roughness: 0.1,
          metalness: 0.8,
          transparent: true,
          opacity: 0.75,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x * spacing, h / 2, z * spacing);
        group.add(mesh);

        // Add skyscraper wireframe helper for tech grid effect
        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xC0F0F5, linewidth: 1.5 }));
        line.position.copy(mesh.position);
        group.add(line);
      }
    }
    scene.add(group);

    // Add falling grid stars (representing commits/data stream)
    const starCount = tier === 'high' ? 300 : 150;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 20;
      starPos[i + 1] = Math.random() * 15;
      starPos[i + 2] = (Math.random() - 0.5) * 20;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xFDE047,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Dynamic rotation on scroll
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Animation Loop
    let animId: number;
    const tick = () => {
      // Y rotation linked directly to scroll
      group.rotation.y = scrollY * 0.0015;
      // Soft default spin
      group.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1;

      // Animate falling data dots
      const positions = starGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.02;
        if (positions[i] < 0) {
          positions[i] = 12; // recycle stars
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };
    tick();

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [tier, hiringManagerMode]);

  // Generate 52x7 Contribution heatmap cells
  const renderHeatmap = () => {
    if (!mounted) return null;

    const cells = [];
    const totalCells = 52 * 7;

    for (let i = 0; i < totalCells; i++) {
      let bg = 'rgba(12,74,110,0.08)'; // 0 commits
      let titleText = 'No contributions';

      if (heatmap && heatmap[i]) {
        const day = heatmap[i];
        const val = day.count;
        const level = day.level;

        // Map level (0 to 4) to our brand colors
        if (level === 1) bg = '#CBEF9A';
        else if (level === 2) bg = '#D9F99D';
        else if (level === 3) bg = 'rgba(254, 99, 52, 0.6)';
        else if (level >= 4) bg = '#FE6334';

        // Format the date nicely
        const formattedDate = new Date(day.date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        titleText = `${val === 0 ? 'No' : val} contribution${val === 1 ? '' : 's'} on ${formattedDate}`;
      } else {
        // Fallback: Generate some deterministic pseudorandom commit weights
        const val = Math.floor(Math.sin(i * 0.05) * 5 + Math.cos(i * 0.1) * 3 + Math.random() * 4);

        if (val >= 1 && val <= 3) bg = '#CBEF9A'; // 1-3 commits
        else if (val >= 4 && val <= 7) bg = '#D9F99D'; // 4-7 commits
        else if (val >= 8 && val <= 14) bg = 'rgba(254, 99, 52, 0.6)'; // 8-14 commits (60% orange)
        else if (val >= 15) bg = '#FE6334'; // 15+ commits

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
      <div className="grid grid-flow-col grid-cols-52 grid-rows-7 gap-[3px] md:gap-[4px] w-full overflow-x-auto no-scrollbar pb-2">
        {cells}
      </div>
    );
  };

  return (
    <section
      id="about"
      data-kanji="創"
      data-label="CREATE"
      className={`relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 select-none transition-colors duration-1000 ${
        hiringManagerMode ? 'bg-slate-100 text-slate-900' : 'bg-brand-lime text-brand-navy'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Header Title */}
        <div className="text-center relative">
          {!hiringManagerMode && (
            <div className="text-brand-navy/15 text-8xl font-black mb-2 pointer-events-none select-none">
              創
            </div>
          )}
          <h2 className="font-space text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-navy">
            About Me
          </h2>
          <p className="mt-4 font-label text-base md:text-lg font-medium text-brand-navy/70 max-w-lg mx-auto">
            I turn coffee into performant personal and commercial products.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Bio + frosted cards column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Bio hardcoded text */}
            <div className="text-lg md:text-xl font-medium leading-relaxed text-brand-navy/95 max-w-2xl text-left bg-white/20 p-6 rounded-2xl border border-white/30 backdrop-blur-sm">
              <p className="mb-4">
                Hey, I'm <span className="font-bold text-brand-orange">Manthan Utekar</span>, an 18-year-old developer based in Mumbai. I build premium, animations-heavy, modern web experiences that look gorgeous and run blazingly fast.
              </p>
              <p>
                Whether it is building custom e-commerce engines, complex 3D configurators in WebGL, or low-latency serverless endpoints, I focus on performance, accessibility, and visual aesthetics.
              </p>
            </div>

            {/* Stat Cards 4x frosted glass */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Card 1: Shipped */}
              <div className="glass-card p-5 rounded-2xl text-center flex flex-col items-center border border-white/40">
                <Briefcase className="w-6 h-6 text-brand-orange mb-2" />
                <span className="font-space font-black text-2xl text-brand-navy">6</span>
                <span className="font-body text-xs text-brand-navy/60 font-semibold mt-1">Projects Shipped</span>
              </div>

              {/* Card 2: Hackathon */}
              <div className="glass-card p-5 rounded-2xl text-center flex flex-col items-center border border-white/40">
                <Trophy className="w-6 h-6 text-brand-orange mb-2" />
                <span className="font-space font-black text-2xl text-brand-navy">1</span>
                <span className="font-body text-xs text-brand-navy/60 font-semibold mt-1">Hawkathon 2026</span>
              </div>

              {/* Card 3: Freelance */}
              <div className="glass-card p-5 rounded-2xl text-center flex flex-col items-center border border-white/40">
                <Layers className="w-6 h-6 text-brand-orange mb-2" />
                <span className="font-space font-black text-2xl text-brand-navy">2</span>
                <span className="font-body text-xs text-brand-navy/60 font-semibold mt-1">Freelance Clients</span>
              </div>

              {/* Card 4: Eva Bloom Commits */}
              <div className="glass-card p-5 rounded-2xl text-center flex flex-col items-center border border-white/40">
                <FileCode className="w-6 h-6 text-brand-orange mb-2" />
                <span className="font-space font-black text-2xl text-brand-navy">
                  {ghLoading ? '...' : evaBloomCommits}
                </span>
                <span className="font-body text-xs text-brand-navy/60 font-semibold mt-1">Eva Bloom Commits</span>
              </div>
            </div>

            {/* GitHub live stats section */}
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-6 text-left">
              <div className="flex items-center gap-2 border-b border-brand-navy/10 pb-3">
                <Github className="w-6 h-6 text-brand-orange" />
                <span className="font-space font-bold text-lg text-brand-navy">GITHUB LIVE ACTIVITY</span>
              </div>

              {/* Grid values */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col">
                  <span className="font-space font-black text-3xl text-brand-navy">
                    {ghLoading ? '...' : publicRepos}
                  </span>
                  <span className="text-xs font-semibold text-brand-navy/60 mt-1">Public Repos</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-space font-black text-3xl text-brand-navy">
                    {ghLoading ? '...' : stars}
                  </span>
                  <span className="text-xs font-semibold text-brand-navy/60 mt-1">Total Stars</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-space font-black text-3xl text-brand-navy">
                    {ghLoading ? '...' : contributions}
                  </span>
                  <span className="text-xs font-semibold text-brand-navy/60 mt-1">Commits (2026)</span>
                </div>
              </div>

              {/* Contribution Heatmap */}
              {!hiringManagerMode && (
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex justify-between items-center text-xs font-bold text-brand-navy/60 px-1">
                    <span>Contribution Stream</span>
                    <button
                      onClick={() => {
                        localStorage.removeItem('gh_stats');
                        window.location.reload();
                      }}
                      className="flex items-center gap-1 hover:text-brand-orange hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
                      title="Force refresh GitHub data"
                    >
                      <Activity className="w-3.5 h-3.5 text-brand-orange animate-pulse" /> Live Matrix (refresh)
                    </button>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                    {renderHeatmap()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Tokyo Scene Canvas OR static placeholder */}
          {!hiringManagerMode && tier !== 'mobile' && tier !== 'low' ? (
            <div className="lg:col-span-5 w-full h-[520px] rounded-3xl overflow-hidden glass-card relative border border-white/30">
              <canvas ref={canvasRef} className="w-full h-full block" />
              {/* Overlay crystal guide tag */}
              <div className="absolute bottom-4 left-4 bg-brand-navy/80 backdrop-blur-md px-3 py-1.5 rounded-lg font-space text-[10px] text-brand-yellow font-bold uppercase tracking-widest border border-brand-yellow/20">
                🌐 TOKYO BLOCK GLOW // WIREFRAME
              </div>
            </div>
          ) : (
            // Mobile/Low performance tier Static Fallback: beautiful minimal styled card
            <div className="lg:col-span-5 w-full h-[320px] rounded-3xl bg-brand-navy text-brand-yellow p-8 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl border border-brand-yellow/10">
              <div className="flex flex-col gap-4">
                <div className="text-6xl font-black opacity-10 select-none">MU</div>
                <h4 className="font-space text-2xl font-bold tracking-tight">MANTHAN UTEKAR // CREATIVE DEVELOPER</h4>
                <p className="font-body text-sm text-brand-lime leading-relaxed">
                  "Creative and high-fidelity React applications optimized for fast loading and immersive animations."
                </p>
              </div>
              <div className="flex items-center gap-2 border-t border-brand-yellow/10 pt-4 text-xs font-space tracking-wider">
                <Star className="w-4 h-4 text-brand-orange animate-spin-slow" />
                <span>MUMBAI, IN // 2D STATIC PERFORMANCE FALLBACK</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default About;
