# Graph Report - my-portfolio  (2026-11-19)

## Corpus Check
- 45 files · ~40,684 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .css 2, .example 1, (none) 1)

## Summary
- 325 nodes · 464 edges · 27 communities (14 shown, 13 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9e5a4767`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- package.json
- About.tsx
- Application TypeScript Config
- prd.md
- Node TypeScript Config
- Manthan Utekar Resume PDF
- Development Linters & Styling
- quiz-image.png (Project Eva Bloom Quiz)
- SYSTEM ARCHITECTURE.md
- framer-motion
- User Story Requirements
- Vercel Edge Contact API
- Vercel Email Transporter
- Information Architecture Model
- Root TypeScript Configuration
- Project General Documentation
- dependencies
- Vercel Deployment Rewrites
- react-animation.png (Project BMW M4 Showcase)
- hero.png (Hero Background Illustration)
- react.svg Icon
- LiquidEngine
- components.json
- MarqueeStrip.tsx
- useKonami.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 29 edges
2. `LiquidEngine` - 25 edges
3. `SculptureHero()` - 20 edges
4. `compilerOptions` - 19 edges
5. `compilerOptions` - 16 edges
6. `MainPortfolio()` - 13 edges
7. `lucide-react` - 12 edges
8. `⚡ Manthan Utekar — Portfolio` - 10 edges
9. `useSEO()` - 9 edges
10. `clamp()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `FR-09: Global Features Requirement` --conceptually_related_to--> `MainPortfolio()`  [INFERRED]
  docs/prd.md → src/App.tsx
- `Audio & Sound System Architecture` --conceptually_related_to--> `MainPortfolio()`  [INFERRED]
  docs/SYSTEM ARCHITECTURE.md → src/App.tsx
- `MainPortfolio()` --calls--> `Hero()`  [EXTRACTED]
  src/App.tsx → src/sections/Hero.tsx
- `Demo()` --calls--> `SculptureHero()`  [EXTRACTED]
  src/components/ui/demo.tsx → src/components/ui/liquid-sculpture-hero.tsx
- `Hero()` --calls--> `SculptureHero()`  [EXTRACTED]
  src/sections/Hero.tsx → src/components/ui/liquid-sculpture-hero.tsx

## Import Cycles
- None detected.

## Communities (27 total, 13 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.09
Nodes (31): lucide-react, react, react-dom, react-router-dom, About, App(), MainPortfolio(), EmptyState() (+23 more)

### Community 1 - "package.json"
Cohesion: 0.05
Nodes (33): name, private, scripts, build, dev, lint, preview, type (+25 more)

### Community 2 - "About.tsx"
Cohesion: 0.21
Nodes (10): useCommandHistory(), ContributionDay, fallbackStats, GitHubStats, useGitHubStats(), About(), AboutProps, CommandOutput (+2 more)

### Community 3 - "Application TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, baseUrl, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+12 more)

### Community 4 - "prd.md"
Cohesion: 0.14
Nodes (13): FR-01: Loading Screen Requirement, FR-02: Navbar Requirement, FR-03: Hero Section Requirement, FR-04: About Section Requirement, FR-05: Skills Section Requirement, FR-06: Projects Section Requirement, FR-07: Terminal Section Requirement, FR-08: Contact Section Requirement (+5 more)

### Community 5 - "Node TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 7 - "Development Linters & Styling"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, tailwindcss, @tailwindcss/vite, @types/node (+6 more)

### Community 9 - "SYSTEM ARCHITECTURE.md"
Cohesion: 0.25
Nodes (7): Frontend Component Hierarchy Tree, GitHub API Rate Caching & Storage, High-Level Architecture & Component Map, GPU & Hardware Capability Detection, Audio & Sound System Architecture, Supabase Availability Status Integration, Inter-section Transition System

### Community 10 - "framer-motion"
Cohesion: 0.15
Nodes (7): framer-motion, KanjiOverlayProps, KonamiOverlayProps, LoadingScreenProps, useLiveAge(), Hero(), HeroProps

### Community 11 - "User Story Requirements"
Cohesion: 0.50
Nodes (3): Developer User Persona Requirements, Hiring Manager User Persona Requirements, Recruiter User Persona Requirements

### Community 17 - "Project General Documentation"
Cohesion: 0.08
Nodes (23): 1. Clone & Install Dependencies, 🎨 1. Neo-Brutalist Design System, 1. System Architecture, 2. Frontend Component Hierarchy, 👔 2. Recruiter / Hiring Manager Mode, 2. Start the Local Development Server, 🎮 3. Interactive CLI Terminal, 3. Run Linter (+15 more)

### Community 18 - "dependencies"
Cohesion: 0.18
Nodes (11): dependencies, clsx, detect-gpu, framer-motion, gsap, lucide-react, react, react-dom (+3 more)

### Community 23 - "LiquidEngine"
Cohesion: 0.11
Nodes (18): Demo(), Arrow(), clamp(), compile(), computeRect(), DEFAULTS, EngineOptions, hexToRgb() (+10 more)

### Community 24 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

## Knowledge Gaps
- **36 isolated node(s):** `gsap`, `three`, `@types/node`, `@types/react`, `@types/react-dom` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 194 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `package.json`, `About.tsx`, `framer-motion`, `LiquidEngine`, `MarqueeStrip.tsx`, `useKonami.ts`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **What connects `gsap`, `three`, `@types/node` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09268707482993198 - nodes in this community are weakly interconnected._
- **Why does `MainPortfolio()` connect `App.tsx` to `SYSTEM ARCHITECTURE.md`, `framer-motion`, `prd.md`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.050505050505050504 - nodes in this community are weakly interconnected._
- **Should `Application TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `prd.md` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._