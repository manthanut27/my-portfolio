# Graph Report - my-portfolio  (2026-11-19)

## Corpus Check
- 41 files · ~32,614 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .css 2, .example 1, (none) 1)

## Summary
- 254 nodes · 345 edges · 23 communities (12 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `74e5b342`
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
- react
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

## God Nodes (most connected - your core abstractions)
1. `react` - 28 edges
2. `compilerOptions` - 17 edges
3. `compilerOptions` - 16 edges
4. `MainPortfolio()` - 13 edges
5. `lucide-react` - 11 edges
6. `⚡ Manthan Utekar — Portfolio` - 10 edges
7. `useSEO()` - 9 edges
8. `App()` - 7 edges
9. `framer-motion` - 6 edges
10. `5. Core Features & Capabilities` - 6 edges

## Surprising Connections (you probably didn't know these)
- `FR-09: Global Features Requirement` --conceptually_related_to--> `MainPortfolio()`  [INFERRED]
  docs/prd.md → src/App.tsx
- `Audio & Sound System Architecture` --conceptually_related_to--> `MainPortfolio()`  [INFERRED]
  docs/SYSTEM ARCHITECTURE.md → src/App.tsx
- `MainPortfolio()` --calls--> `Hero()`  [EXTRACTED]
  src/App.tsx → src/sections/Hero.tsx
- `Skills()` --calls--> `usePerformanceTier()`  [EXTRACTED]
  src/sections/Skills.tsx → src/context/PerformanceTier.tsx
- `MainPortfolio()` --calls--> `Navbar()`  [EXTRACTED]
  src/App.tsx → src/components/Navbar.tsx

## Import Cycles
- None detected.

## Communities (23 total, 11 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.12
Nodes (26): lucide-react, react-router-dom, About, App(), MainPortfolio(), EmptyState(), EmptyStateProps, Navbar() (+18 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (25): name, private, scripts, build, dev, lint, preview, type (+17 more)

### Community 2 - "About.tsx"
Cohesion: 0.12
Nodes (18): detect-gpu, three, PerformanceContext, PerformanceContextProps, PerformanceTier, usePerformanceTier(), useCommandHistory(), ContributionDay (+10 more)

### Community 3 - "Application TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

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

### Community 10 - "react"
Cohesion: 0.10
Nodes (13): framer-motion, react, HMModeToggleProps, KanjiOverlayProps, KonamiOverlayProps, LoadingScreenProps, MarqueeStripProps, KONAMI_CODE (+5 more)

### Community 11 - "User Story Requirements"
Cohesion: 0.50
Nodes (3): Developer User Persona Requirements, Hiring Manager User Persona Requirements, Recruiter User Persona Requirements

### Community 17 - "Project General Documentation"
Cohesion: 0.08
Nodes (23): 1. Clone & Install Dependencies, 🎨 1. Neo-Brutalist Design System, 1. System Architecture, 2. Frontend Component Hierarchy, 👔 2. Recruiter / Hiring Manager Mode, 2. Start the Local Development Server, 🎮 3. Interactive CLI Terminal, 3. Run Linter (+15 more)

### Community 18 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, detect-gpu, framer-motion, gsap, lucide-react, react, react-dom, react-router-dom (+1 more)

## Knowledge Gaps
- **35 isolated node(s):** `gsap`, `@types/node`, `@types/react`, `@types/react-dom`, `@types/three` (+30 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 163 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `App.tsx`, `package.json`, `About.tsx`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `MainPortfolio()` (e.g. with `FR-09: Global Features Requirement` and `Audio & Sound System Architecture`) actually correct?**
  _`MainPortfolio()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `gsap`, `@types/node`, `@types/react` to the rest of the system?**
  _35 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12012012012012012 - nodes in this community are weakly interconnected._
- **Why does `MainPortfolio()` connect `App.tsx` to `SYSTEM ARCHITECTURE.md`, `react`, `prd.md`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07007575757575757 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `Development Linters & Styling` to `package.json`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._