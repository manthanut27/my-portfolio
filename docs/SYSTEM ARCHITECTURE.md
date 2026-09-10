ARCHITECTURE TYPE : JAMstack SPA + Serverless Edge Functions
RUNTIME           : Browser (React 18 + Vite 5)
EDGE RUNTIME      : Vercel Edge Functions (contact form only)
DATABASE          : Supabase (availability config only, read-only from client)
EXTERNAL APIS     : GitHub REST API v3 · Resend Email API · Supabase REST
CDN               : Vercel Edge Network (static assets + edge cache)
3D RUNTIME        : Three.js r165 (conditionally imported based on GPU tier)

4.1 HIGH-LEVEL COMPONENT MAP
┌─────────────────────────────────────────────────────────────────────────┐
│                         BROWSER (CLIENT)                                │
│                                                                         │
│  ┌──────────────┐    ┌──────────────────────────────────────────────┐  │
│  │ sessionStorage│    │              React SPA (Vite)                │  │
│  │ portfolio_    │◄──►│                                              │  │
│  │ loaded        │    │  ┌─────────┐  ┌──────────┐  ┌────────────┐  │  │
│  └──────────────┘    │  │Loading  │  │  Navbar  │  │  Sections  │  │  │
│                       │  │Screen   │  │  (fixed) │  │  (scroll)  │  │  │
│  ┌──────────────┐    │  └─────────┘  └──────────┘  └────────────┘  │  │
│  │ localStorage  │    │       │              │              │         │  │
│  │ gh_stats      │    │  ┌────┴──────────────┴──────────────┴─────┐ │  │
│  │ portfolio_    │◄──►│  │           GSAP + Framer Motion         │ │  │
│  │ sound         │    │  │        (animation orchestration)        │ │  │
│  └──────────────┘    │  └────────────────────────────────────────┘ │  │
│                       │                                              │  │
│  ┌──────────────┐    │  ┌────────────────────────────────────────┐ │  │
│  │ IntersectionObs│   │  │         PerformanceTierProvider        │ │  │
│  │ (section      │◄──►│  │   detect-gpu + hardwareConcurrency     │ │  │
│  │  tracking)    │    │  │   + deviceMemory → high/mid/low/mobile │ │  │
│  └──────────────┘    │  └────────────┬───────────────────────────┘ │  │
│                       │              │                               │  │
│                       │  ┌───────────▼───────────────────────────┐ │  │
│                       │  │          Three.js Renderer             │ │  │
│                       │  │  (lazy import, only if tier ≠ mobile)  │ │  │
│                       │  │  Scenes: TokyoBlock · SkillOrbs · MU  │ │  │
│                       │  └───────────────────────────────────────┘ │  │
│                       └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
┌──────────────────┐  ┌───────────────┐  ┌──────────────────────┐
│  GitHub REST API  │  │   Supabase    │  │   Vercel Edge Fn     │
│  api.github.com   │  │  (REST, anon) │  │  /api/contact        │
│  /users/:user     │  │  site_config  │  │       │              │
│  /repos/:user/:r  │  │  table        │  │       ▼              │
│  (rate: 60/hr     │  └───────────────┘  │    Resend API        │
│   anon, 5000/hr   │                     │    (email send)      │
│   authed token)   │                     └──────────────────────┘
└──────────────────┘

4.2 FRONTEND COMPONENT TREE
App.tsx
├── PerformanceTierProvider          ← Context: 'high' | 'mid' | 'low' | 'mobile'
├── SoundProvider                    ← Context: muted state + audio refs
├── LoadingScreenGate                ← reads/writes sessionStorage
│   ├── LoadingScreenA (CinematicReveal)
│   └── LoadingScreenB (InkSplash)
│
├── KonamiListener                   ← global keydown sequence detector
│
└── MainLayout
    ├── Navbar
    │   ├── Logo
    │   ├── NavLinks (with IntersectionObserver active state)
    │   ├── ScrollProgressBar
    │   ├── ResumeButton
    │   └── MuteToggle
    │
    ├── HeroSection
    │   ├── AvailabilityBadge       ← fetches Supabase on mount
    │   ├── BuildingBadge
    │   ├── NameReveal              ← GSAP timeline
    │   ├── TypewriterTagline       ← useTypewriter hook
    │   ├── LiveAgeCounter          ← useInterval hook, 1s
    │   ├── CTARow
    │   └── DecorativeBlobs         ← pure CSS, no Three.js
    │
    ├── Marquee
    │
    ├── AboutSection
    │   ├── StatCards
    │   ├── GitHubStats             ← useGitHubStats hook (cached fetch)
    │   ├── ContributionHeatmap     ← client-only mount guard
    │   └── TokyoBlock              ← lazy Three.js OR CSS fallback
    │
    ├── Marquee
    │
    ├── SkillsSection
    │   ├── SkillOrbits             ← lazy Three.js (high/mid)
    │   └── SkillGrid               ← CSS fallback (low/mobile)
    │
    ├── Marquee
    │
    ├── ProjectsSection
    │   ├── HorizontalTrack
    │   │   └── ProjectCard × 4
    │   └── TrackProgressBar
    │
    ├── Marquee
    │
    ├── TerminalSection
    │   ├── TitleBar
    │   ├── ScanlineOverlay
    │   ├── ModeSelector
    │   ├── CinematicMode
    │   ├── CLIMode                 ← useCommandHistory hook
    │   ├── StatsMode
    │   └── GlitchEffect            ← random interval 30–40s
    │
    ├── Marquee
    │
    ├── ContactSection
    │   ├── ContactForm             ← useContactForm hook → /api/contact
    │   ├── SuccessState
    │   ├── ErrorState
    │   └── SocialLinks
    │
    └── Footer

4.3 CUSTOM HOOKS
HookLocationPurposeusePerformanceTierhooks/usePerformanceTier.tsDetects GPU/CPU/RAM, returns tier stringuseTypewriterhooks/useTypewriter.tsCycles strings with type/backspace animationuseGitHubStatshooks/useGitHubStats.tsFetches + caches GitHub API datauseIntersectionObserverhooks/useIntersectionObserver.tsDrives active nav link + section transitionsuseKonamihooks/useKonami.tsDetects Konami sequence, fires callbackuseCommandHistoryhooks/useCommandHistory.tsArrow-key CLI history for terminal Mode 2useContactFormhooks/useContactForm.tsForm state, validation, submit to /api/contactuseSoundhooks/useSound.tsManages audio refs, mute toggle, localStorageuseGlitchIntervalhooks/useGlitchInterval.tsRandom 30–40s interval for terminal glitchuseLiveAgehooks/useLiveAge.tsCalculates age from DOB, ticks every 1s

4.4 EDGE FUNCTION: /api/contact
File     : api/contact.ts
Runtime  : Vercel Edge Runtime
Method   : POST only (405 on others)

REQUEST BODY (JSON)
{
  "name":    string,  // min 2 chars
  "email":   string,  // valid email
  "message": string   // min 10, max 1000 chars
}

VALIDATION (server-side, mirrors client)
├── All fields required → 400 { error: "All fields required" }
├── Email regex check  → 400 { error: "Invalid email" }
├── Message length     → 400 { error: "Message too short / too long" }
└── Rate limit header check (optional: Vercel's built-in or IP header)

SUCCESS FLOW
├── Validate → call Resend SDK
├── Resend.emails.send({
│     from: "portfolio@manthanut.site",
│     to: "manthan@personal-email.com",
│     replyTo: req.body.email,
│     subject: `Portfolio contact: ${req.body.name}`,
│     html: `<p><b>From:</b> ${name} (${email})</p><p>${message}</p>`
│   })
└── Return 200 { success: true }

ERROR FLOW
├── Resend API error → 502 { error: "Email delivery failed, please try again" }
└── Unhandled error  → 500 { error: "Internal error" }

ENV VARS REQUIRED
├── RESEND_API_KEY
└── CONTACT_RECIPIENT_EMAIL

4.5 SUPABASE SCHEMA
sql-- Table: site_config
-- Purpose: runtime-editable site settings (no redeploy needed)
-- RLS: public read, no write (anon key used client-side)

CREATE TABLE site_config (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key        text UNIQUE NOT NULL,
  value      text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Seed data
INSERT INTO site_config (key, value) VALUES
  ('availability_status', 'open');   -- 'open' | 'busy'

-- RLS Policy (read-only for anon)
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_config"
  ON site_config FOR SELECT
  USING (true);
Client fetch pattern:
tsconst { data } = await supabase
  .from('site_config')
  .select('value')
  .eq('key', 'availability_status')
  .single();

const status = data?.value ?? 'open'; // optimistic default

4.6 GITHUB API CACHING STRATEGY
ts// hooks/useGitHubStats.ts

const CACHE_KEY = 'gh_stats';
const CACHE_TTL = 3_600_000; // 1 hour in ms

interface GitHubCache {
  data: GitHubStats;
  timestamp: number;
}

async function fetchGitHubStats(): Promise<GitHubStats> {
  const raw = localStorage.getItem(CACHE_KEY);
  if (raw) {
    const cached: GitHubCache = JSON.parse(raw);
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data; // cache hit
    }
  }

  // Cache miss or expired → fetch fresh
  const [user, repos] = await Promise.all([
    fetch('https://api.github.com/users/manthanut27').then(r => r.json()),
    fetch('https://api.github.com/users/manthanut27/repos?per_page=100').then(r => r.json())
  ]);

  const stars = repos.reduce((sum: number, r: any) => sum + r.stargazers_count, 0);

  const stats: GitHubStats = {
    publicRepos: user.public_repos,
    followers: user.followers,
    stars,
    // contributions requires separate call or GitHub GraphQL
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify({ data: stats, timestamp: Date.now() }));
  return stats;
}

4.7 PERFORMANCE TIER DETECTION
ts// hooks/usePerformanceTier.ts
import { getGPUTier } from 'detect-gpu';

type Tier = 'high' | 'mid' | 'low' | 'mobile';

async function detectTier(): Promise<Tier> {
  if (window.innerWidth < 768) return 'mobile';

  const gpu = await getGPUTier();
  const cores = navigator.hardwareConcurrency ?? 2;
  const ram = (navigator as any).deviceMemory ?? 2;

  if (gpu.tier >= 2 && cores >= 4 && ram >= 4) return 'high';
  if (gpu.tier >= 1 && cores >= 2) return 'mid';
  return 'low';
}
Three.js conditional import pattern:
ts// Only loads Three.js if tier allows it
const ThreeScene = tier !== 'mobile' && tier !== 'low'
  ? lazy(() => import('./scenes/TokyoBlock'))
  : () => <TokyoCSSFallback />;

4.8 SOUND SYSTEM
Assets (served from /public/audio/)
├── ambient.mp3        ← looping background, volume 0.15
└── keyclick.mp3       ← single keypress click, volume 0.4

SoundProvider
├── ambientRef: useRef<HTMLAudioElement>
├── clickRef:   useRef<HTMLAudioElement>
├── muted:      boolean (from localStorage 'portfolio_sound')
├── playClick() → clickRef.currentTime = 0; clickRef.play()
└── toggleMute() → flips muted, persists to localStorage

Auto-play restriction handling:
  - All audio deferred until first user interaction (click/key)
  - Ambient only starts on explicit unmute click
  - Never auto-plays on mount

4.9 SECTION TRANSITION SYSTEM
IntersectionObserver config:
  threshold: 0.3
  rootMargin: '0px'

On section enter:
  1. Trigger kanji + label fade-in overlay (opacity 0→1→0, scale 0.8→1→1, 800ms total)
  2. Update activeSection state → navbar highlights correct link
  3. If section has GSAP scroll animations (TokyoBlock, SkillOrbit): register ScrollTrigger

Section transition element (rendered between sections):
  <div class="section-transition">
    <span class="kanji">{kanji}</span>
    <span class="label">{englishLabel}</span>
  </div>

4.10 BUILD & DEPLOYMENT
Development
├── npm run dev          → Vite dev server (localhost:5173)
├── npm run build        → Vite production build → /dist
└── npm run preview      → Preview production build locally

Deployment (Vercel)
├── Framework preset: Vite
├── Output dir: dist
├── Edge Functions dir: api/
├── Build command: npm run build
└── Install command: npm install

Environment Variables (Vercel dashboard)
├── VITE_SUPABASE_URL           (public, VITE_ prefix for client)
├── VITE_SUPABASE_ANON_KEY      (public, read-only)
├── RESEND_API_KEY              (server-only, edge function)
└── CONTACT_RECIPIENT_EMAIL     (server-only, edge function)

Vercel.json
{
  "functions": {
    "api/contact.ts": {
      "runtime": "edge"
    }
  },
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}

4.11 DATA FLOW SUMMARY
PAGE LOAD
  Browser → Vercel CDN → index.html + JS bundle
  JS mount → sessionStorage check → LoadingScreen (if new session)
  LoadingScreen exits → MainLayout renders
  PerformanceTierProvider → detect-gpu → sets tier context
  SoundProvider → localStorage → sets muted state
  HeroSection.AvailabilityBadge → Supabase REST → renders status
  AboutSection.useGitHubStats → localStorage check → GitHub API (if stale) → renders stats

USER SUBMITS CONTACT FORM
  Client validation → POST /api/contact (JSON body)
  Edge Function → validates server-side → Resend.emails.send()
  Resend → SMTP → manthan's inbox
  Edge Function → 200 { success: true }
  Client → renders SuccessState

MUTE TOGGLE
  User clicks mute button
  SoundProvider.toggleMute() → localStorage.setItem('portfolio_sound', ...)
  ambientRef.pause() / .play()

KONAMI CODE
  KonamiListener → keydown sequence match → dispatch KonamiEvent
  KonamiOverlay component → opacity 1 → setTimeout 3000ms → opacity 0

HIRING MANAGER MODE
  Click button → React state setHiringManagerMode(true)
  Context propagates → conditional renders across all sections
  Click again → setHiringManagerMode(false) → full site restores