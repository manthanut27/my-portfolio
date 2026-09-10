# Graph Report - my-portfolio  (2026-09-10)

## Corpus Check
- 43 files · ~31,013 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 215 nodes · 269 edges · 23 communities (16 shown, 7 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aca78c04`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Global Features and Interlays|Global Features and Interlays]]
- [[_COMMUNITY_Package Dependencies & Build Tooling|Package Dependencies & Build Tooling]]
- [[_COMMUNITY_Loading & Performance Tiers|Loading & Performance Tiers]]
- [[_COMMUNITY_Application TypeScript Config|Application TypeScript Config]]
- [[_COMMUNITY_GitHub Stats & Command History|GitHub Stats & Command History]]
- [[_COMMUNITY_Node TypeScript Config|Node TypeScript Config]]
- [[_COMMUNITY_Hero & Navigation Architecture|Hero & Navigation Architecture]]
- [[_COMMUNITY_Development Linters & Styling|Development Linters & Styling]]
- [[_COMMUNITY_Portfolio Project Showcases|Portfolio Project Showcases]]
- [[_COMMUNITY_Hiring Manager Mode Toggle|Hiring Manager Mode Toggle]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_User Story Requirements|User Story Requirements]]
- [[_COMMUNITY_Vercel Edge Contact API|Vercel Edge Contact API]]
- [[_COMMUNITY_Vercel Email Transporter|Vercel Email Transporter]]
- [[_COMMUNITY_Information Architecture Model|Information Architecture Model]]
- [[_COMMUNITY_Root TypeScript Configuration|Root TypeScript Configuration]]
- [[_COMMUNITY_Project General Documentation|Project General Documentation]]
- [[_COMMUNITY_Graphify Semantic Configuration|Graphify Semantic Configuration]]
- [[_COMMUNITY_Vercel Deployment Rewrites|Vercel Deployment Rewrites]]
- [[_COMMUNITY_Graphify Workflow Scripts|Graphify Workflow Scripts]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `compilerOptions` - 16 edges
3. `useSEO()` - 9 edges
4. `Hero()` - 8 edges
5. `MainPortfolio()` - 6 edges
6. `usePerformanceTier()` - 6 edges
7. `useGitHubStats()` - 6 edges
8. `scripts` - 5 edges
9. `About()` - 5 edges
10. `Projects()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `GitHub API Rate Caching & Storage` --conceptually_related_to--> `useGitHubStats()`  [INFERRED]
  docs/SYSTEM ARCHITECTURE.md → src/hooks/useGitHubStats.ts
- `FR-03: Hero Section Requirement` --conceptually_related_to--> `Hero()`  [INFERRED]
  docs/prd.md → src/sections/Hero.tsx
- `Supabase Availability Status Integration` --conceptually_related_to--> `Hero()`  [INFERRED]
  docs/SYSTEM ARCHITECTURE.md → src/sections/Hero.tsx
- `FR-09: Global Features Requirement` --conceptually_related_to--> `MainPortfolio()`  [INFERRED]
  docs/prd.md → src/App.tsx
- `Audio & Sound System Architecture` --conceptually_related_to--> `MainPortfolio()`  [INFERRED]
  docs/SYSTEM ARCHITECTURE.md → src/App.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Scroll Navigation Flow** — sections_hero_hero, sections_about_about, sections_skills_skills, sections_projects_projects, sections_terminal_terminal, sections_contact_contact [INFERRED 0.85]
- **Third Party API Integrations** — hooks_usegithubstats_usegithubstats, sections_hero_hero, api_contact_handler [INFERRED 0.85]

## Communities (23 total, 7 thin omitted)

### Community 0 - "Global Features and Interlays"
Cohesion: 0.14
Nodes (16): KonamiOverlay(), KonamiOverlayProps, MarqueeStrip(), MarqueeStripProps, Konami Code Easter Egg, KONAMI_CODE, useKonami(), useSEO() (+8 more)

### Community 1 - "Package Dependencies & Build Tooling"
Cohesion: 0.10
Nodes (19): vite.svg Icon, dependencies, detect-gpu, framer-motion, gsap, lucide-react, react, react-dom (+11 more)

### Community 2 - "Loading & Performance Tiers"
Cohesion: 0.19
Nodes (11): PerformanceContext, PerformanceContextProps, PerformanceTier, PerformanceTierProvider(), usePerformanceTier(), FR-05: Skills Section Requirement, Performance Tiers System, GPU & Hardware Capability Detection (+3 more)

### Community 3 - "Application TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

### Community 4 - "GitHub Stats & Command History"
Cohesion: 0.17
Nodes (12): react.svg Icon, FR-04: About Section Requirement, useCommandHistory(), ContributionDay, fallbackStats, GitHubStats, useGitHubStats(), About() (+4 more)

### Community 5 - "Node TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 6 - "Hero & Navigation Architecture"
Cohesion: 0.19
Nodes (10): hero.png (Hero Background Illustration), Navbar(), NavbarProps, FR-02: Navbar Requirement, useLiveAge(), useTypewriter(), Manthan Utekar Resume PDF, Hero() (+2 more)

### Community 7 - "Development Linters & Styling"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, tailwindcss, @tailwindcss/vite, @types/node (+6 more)

### Community 8 - "Portfolio Project Showcases"
Cohesion: 0.22
Nodes (8): EmptyState(), EmptyStateProps, FR-06: Projects Section Requirement, quiz-image.png (Project Eva Bloom Quiz), react-animation.png (Project BMW M4 Showcase), Project, Projects(), ProjectsProps

### Community 9 - "Hiring Manager Mode Toggle"
Cohesion: 0.14
Nodes (12): KanjiOverlay(), KanjiOverlayProps, FR-09: Global Features Requirement, Frontend Component Hierarchy Tree, GitHub API Rate Caching & Storage, High-Level Architecture & Component Map, Audio & Sound System Architecture, Supabase Availability Status Integration (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (12): HMModeToggle(), HMModeToggleProps, LoadingScreen(), LoadingScreenProps, FR-01: Loading Screen Requirement, FR-03: Hero Section Requirement, FR-07: Terminal Section Requirement, FR-08: Contact Section Requirement (+4 more)

### Community 11 - "User Story Requirements"
Cohesion: 0.50
Nodes (3): Developer User Persona Requirements, Hiring Manager User Persona Requirements, Recruiter User Persona Requirements

### Community 17 - "Project General Documentation"
Cohesion: 0.40
Nodes (4): Expanding the ESLint configuration, Portfolio Overview, React Compiler, React + TypeScript + Vite

## Knowledge Gaps
- **112 isolated node(s):** `config`, `config`, `name`, `private`, `version` (+107 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Hero()` connect `Hero & Navigation Architecture` to `Global Features and Interlays`, `Hiring Manager Mode Toggle`, `Community 10`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `useGitHubStats()` connect `GitHub Stats & Command History` to `Hiring Manager Mode Toggle`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Development Linters & Styling` to `Package Dependencies & Build Tooling`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `config`, `config`, `name` to the rest of the system?**
  _112 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Global Features and Interlays` be split into smaller, more focused modules?**
  _Cohesion score 0.13538461538461538 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies & Build Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Application TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._