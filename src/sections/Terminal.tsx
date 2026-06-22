import React, { useEffect, useRef, useState } from 'react';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { useGitHubStats } from '../hooks/useGitHubStats';


interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

interface TerminalProps {
  hiringManagerMode: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ hiringManagerMode }) => {
  const { publicRepos, stars, contributions, loading: statsLoading } = useGitHubStats();
  const { addCommand, getPrevious, getNext } = useCommandHistory();

  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'manthanut27';
  const linkedinUrlRaw = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/utkmanthan';
  const linkedinDisplay = linkedinUrlRaw.replace(/^(https?:\/\/)?(www\.)?/, '');
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'manthanut27@gmail.com';

  const [activeTab, setActiveTab] = useState<'cinematic' | 'cli' | 'stats'>('cinematic');
  const [glitchActive, setGlitchActive] = useState(false);

  // Cinematic Tab state
  const [cinematicText, setCinematicText] = useState<string[]>([]);
  const [cinematicIndex, setCinematicIndex] = useState(0);

  // CLI Tab state
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<CommandOutput[]>([
    { command: 'system', output: 'Welcome to manthan@portfolio. Type "help" for a list of available commands.' }
  ]);
  const [isJapanese, setIsJapanese] = useState(false);

  const cliBottomRef = useRef<HTMLDivElement | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const cliInputRef = useRef<HTMLInputElement | null>(null);

  const cinematicLines = [
    '> initializing portfolio CLI...',
    '> connecting to GitHub API gateway... success',
    `> fetching user profile data... loaded [${githubUsername}]`,
    '> loading creative assets... React, Node, GSAP, Three.js',
    '// THE STORY',
    'I started coding at 18, curious about how the web worked.',
    'Built my first commercial e-commerce app (Eva Bloom) at 19.',
    'Now I am 19, searching for full-time creative engineering opportunities.',
    'Let us write some clean code together.'
  ];

  // 1. Cinematic typing triggers on scroll / tab change
  useEffect(() => {
    if (activeTab !== 'cinematic') return;

    setCinematicText([]);
    setCinematicIndex(0);

    const interval = setInterval(() => {
      setCinematicIndex((prev) => {
        if (prev >= cinematicLines.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'cinematic' && cinematicIndex < cinematicLines.length) {
      setCinematicText((prev) => [...prev, cinematicLines[cinematicIndex]]);
    }
  }, [cinematicIndex, activeTab]);

  // 2. Glitch interval trigger (fires every 30-40 seconds randomly)
  useEffect(() => {
    if (hiringManagerMode) return;

    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);

      // Schedule next random glitch
      const nextDelay = 30000 + Math.random() * 10000; // 30-40s
      timer = setTimeout(triggerGlitch, nextDelay);
    };

    let timer = setTimeout(triggerGlitch, 25000);
    return () => clearTimeout(timer);
  }, [hiringManagerMode]);

  // 3. CLI Scroll to bottom helper (scrolls internal terminal container instead of viewport)
  useEffect(() => {
    if (activeTab === 'cli' && terminalBodyRef.current) {
      const container = terminalBodyRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [cliHistory, activeTab]);

  // 4. Focus CLI Input preventing viewport scroll jumps
  useEffect(() => {
    if (activeTab === 'cli' && cliInputRef.current) {
      cliInputRef.current.focus({ preventScroll: true });
    }
  }, [activeTab]);

  // CLI input change handler
  const handleCliChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(cliInput);
      addCommand(cliInput);
      setCliInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = getPrevious();
      if (prev) setCliInput(prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = getNext();
      setCliInput(next || '');
    }
  };

  const executeCommand = (cmdText: string) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    if (!cleanCmd) return;

    let output: string | React.ReactNode = '';



    switch (cleanCmd) {
      case 'help':
        output = isJapanese ? (
          <div className="flex flex-col gap-1 text-[#27c93f]">
            <div>• help       - コマンドリストの表示</div>
            <div>• skills     - スキルスタックの表示</div>
            <div>• projects   - 開発プロジェクトの表示</div>
            <div>• contact    - コンタクトリンク</div>
            <div>• stats      - GitHubの統計情報</div>
            <div>• japanese   - 5秒間日本語マッピング</div>
            <div>• clear      - 画面のクリア</div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-[#27c93f]">
            <div>• help       - List all available commands</div>
            <div>• skills     - Show my full technology stack</div>
            <div>• projects   - Review my shipped projects & links</div>
            <div>• contact    - Display email & social contact links</div>
            <div>• stats      - Show real-time GitHub metrics</div>
            <div>• japanese   - Translate terminal to Japanese for 5s</div>
            <div>• clear      - Clear all command outputs</div>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="flex flex-col gap-2">
            <div>[FRONTEND]: React, Next.js, HTML, CSS, Tailwind CSS</div>
            <div>[BACKEND]: Node.js, Express, PostgreSQL, Supabase, Prisma, Redis</div>
            <div>[CREATIVE]: GSAP, Three.js, Framer Motion</div>
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="flex flex-col gap-2">
            <div>1. **Eva Bloom** [LIVE] - Premium jewelry store. Link: evabloom.in</div>
            <div>2. **BMW M4 GT3** [LIVE] - WebGL interactive showroom. Link: bmw-m4.manthan.dev</div>
            <div>3. **FitMirror** [COMING SOON] - AI pose form correction.</div>
            <div>4. **Tokyo SPA** [COMING SOON] - Serene wellness spa platform.</div>
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="flex flex-col gap-1">
            <div>• EMAIL   : {contactEmail}</div>
            <div>• GITHUB  : github.com/{githubUsername}</div>
            <div>• LINKEDIN: {linkedinDisplay}</div>
          </div>
        );
        break;
      case 'stats':
        output = statsLoading ? 'Loading metrics...' : (
          <div className="flex flex-col gap-1">
            <div>GITHUB USER   : {githubUsername}</div>
            <div>PUBLIC REPOS  : {publicRepos}</div>
            <div>TOTAL STARS   : {stars}</div>
            <div>COMMITS (2026): {contributions}</div>
            <div>FUN FACT      : Fuel consumption is 95% black tea, 5% electricity.</div>
          </div>
        );
        break;
      case 'japanese':
        setIsJapanese(true);
        output = '日本語マッピングが適用されました。5秒間保持されます...';
        setTimeout(() => {
          setIsJapanese(false);
          setCliHistory((prev) => [
            ...prev,
            { command: 'system', output: 'Returned back to default language mapping (en-US).' }
          ]);
        }, 5000);
        break;
      case 'clear':
        setCliHistory([]);
        return;
      default:
        output = isJapanese
          ? `コマンドが見つかりません: "${cleanCmd}"。 "help"を入力してください。`
          : `Command not found: "${cleanCmd}". Type "help" for support.`;
    }

    setCliHistory((prev) => [...prev, { command: cmdText, output }]);
  };

  return (
    <section
      id="terminal"
      data-kanji="端"
      data-label="TERMINAL"
      className={`relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 select-none transition-colors duration-1000 ${
        hiringManagerMode ? 'bg-slate-100 text-slate-900' : 'bg-brand-lavender text-brand-navy'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-8 relative z-10">
        {/* Section Header */}
        <div className="text-center relative">
          {!hiringManagerMode && (
            <div className="text-brand-navy/15 text-8xl font-black mb-2 pointer-events-none select-none">
              端
            </div>
          )}
          <h2 className="font-space text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-navy">
            Terminal
          </h2>
          <p className="mt-4 font-label text-base md:text-lg font-medium text-brand-navy/70 max-w-lg mx-auto">
            Query my credentials directly inside a developer console.
          </p>
        </div>

        {/* macOS Style Retro Terminal Container */}
        <div
          className={`w-full max-w-4xl bg-terminal-bg rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(12,74,110,0.4)] border border-brand-navy/20 flex flex-col transition-all duration-300 relative ${
            glitchActive ? 'translate-x-[3px] translate-y-[-2px] opacity-85 scale-[0.995]' : ''
          }`}
        >
          {/* macOS title bar */}
          <div className="bg-terminal-header px-4 py-3 flex items-center justify-between border-b border-white/10 relative z-20">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-inner" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-inner" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-inner" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 font-mono text-sm text-gray-400 font-medium tracking-wider">
              manthan@portfolio ~ %
            </div>
            <div className="w-16" />
          </div>

          {/* Terminal Tabs */}
          <div className="flex border-b border-white/5 bg-[#141b24] px-4 pt-2 gap-1 relative z-20 font-mono text-xs md:text-sm select-none">
            <button
              onClick={() => setActiveTab('cinematic')}
              className={`px-6 py-2.5 rounded-t-xl transition-all cursor-pointer ${
                activeTab === 'cinematic'
                  ? 'bg-terminal-bg text-brand-orange border-t-2 border-brand-orange font-bold'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              CINEMATIC
            </button>
            <button
              onClick={() => setActiveTab('cli')}
              className={`px-6 py-2.5 rounded-t-xl transition-all cursor-pointer ${
                activeTab === 'cli'
                  ? 'bg-terminal-bg text-brand-orange border-t-2 border-brand-orange font-bold'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              CLI MODE
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2.5 rounded-t-xl transition-all cursor-pointer ${
                activeTab === 'stats'
                  ? 'bg-terminal-bg text-brand-orange border-t-2 border-brand-orange font-bold'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              STATS
            </button>
          </div>

          {/* Terminal Console Body */}
          <div ref={terminalBodyRef} className="p-6 md:p-8 font-mono text-terminal-text text-left text-sm md:text-base leading-relaxed relative min-h-[420px] max-h-[500px] overflow-y-auto bg-terminal-bg select-text">
            {/* Scanlines overlay (disabled in Hiring Manager Mode) */}
            {!hiringManagerMode && <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />}

            {/* Render Tab Contents */}
            {activeTab === 'cinematic' && (
              <div className="flex flex-col gap-2 relative z-10">
                {cinematicText.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.startsWith('//')
                        ? 'text-brand-pink font-bold mt-3'
                        : line.startsWith('>')
                        ? 'text-gray-500'
                        : 'text-terminal-text'
                    }
                  >
                    {line}
                  </div>
                ))}
                {cinematicText.length < cinematicLines.length && (
                  <span className="w-2.5 h-4 bg-terminal-text inline-block animate-blink align-middle ml-1" />
                )}
              </div>
            )}

            {activeTab === 'cli' && (
              <div className="flex flex-col gap-3 relative z-10 h-full">
                {cliHistory.map((item, index) => (
                  <div key={index} className="flex flex-col gap-1.5 border-b border-white/5 pb-2">
                    <div className="text-brand-orange font-bold">
                      manthan@portfolio % <span className="text-white font-normal">{item.command}</span>
                    </div>
                    <div className="pl-4 text-terminal-text">{item.output}</div>
                  </div>
                ))}

                {/* Input row */}
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                  <span className="text-brand-orange font-bold">manthan@portfolio %</span>
                  <input
                    ref={cliInputRef}
                    type="text"
                    value={cliInput}
                    onChange={handleCliChange}
                    onKeyDown={handleKeyDown}
                    className="flex-grow bg-transparent text-white border-none outline-none caret-brand-orange font-mono text-sm md:text-base p-0 focus:ring-0"
                    placeholder="type 'help'..."
                  />
                </div>
                <div ref={cliBottomRef} />
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="flex flex-col gap-4 relative z-10">
                <div>// ASCII METRIC SYSTEMS CONFIG</div>

                {/* Stars Progress Graph */}
                <div className="flex flex-col gap-1">
                  <div>GITHUB STARS: {stars}</div>
                  <div className="text-brand-yellow font-bold">
                    {`[${'='.repeat(Math.min(stars, 20))}${' '.repeat(20 - Math.min(stars, 20))}]`}
                  </div>
                </div>

                {/* Repos Progress Graph */}
                <div className="flex flex-col gap-1">
                  <div>PUBLIC REPOSITORIES: {publicRepos}</div>
                  <div className="text-brand-cyan font-bold">
                    {`[${'='.repeat(Math.min(publicRepos, 20))}${' '.repeat(20 - Math.min(publicRepos, 20))}]`}
                  </div>
                </div>

                {/* Contributions Graph */}
                <div className="flex flex-col gap-1">
                  <div>2026 DATA COMMITS: {contributions}</div>
                  <div className="text-brand-orange font-bold">
                    {`[${'='.repeat(Math.min(contributions / 20, 20))}${' '.repeat(Math.max(0, 20 - Math.min(contributions / 20, 20)))}]`}
                  </div>
                </div>

                {/* Funny static stats */}
                <div className="flex flex-col gap-1 border-t border-white/10 pt-3 mt-2 text-xs md:text-sm">
                  <div>COFFEE CONSUMPTION : [====================] 100%</div>
                  <div>EMOTIONAL STABILITY  : [=======             ] 35%</div>
                  <div>IMAGINATION POWER    : [====================] 999%</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Terminal;
