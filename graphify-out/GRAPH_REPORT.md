# Graph Report - my-portfolio  (2026-06-29)

## Corpus Check
- 39 files · ~27,358 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 205 nodes · 243 edges · 24 communities (17 shown, 7 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b6c4fd16`
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
- [[_COMMUNITY_Portfolio Contact Interface|Portfolio Contact Interface]]
- [[_COMMUNITY_User Story Requirements|User Story Requirements]]
- [[_COMMUNITY_Vercel Edge Contact API|Vercel Edge Contact API]]
- [[_COMMUNITY_Vercel Email Transporter|Vercel Email Transporter]]
- [[_COMMUNITY_Information Architecture Model|Information Architecture Model]]
- [[_COMMUNITY_Root TypeScript Configuration|Root TypeScript Configuration]]
- [[_COMMUNITY_Project General Documentation|Project General Documentation]]
- [[_COMMUNITY_Graphify Semantic Configuration|Graphify Semantic Configuration]]
- [[_COMMUNITY_Vercel Deployment Rewrites|Vercel Deployment Rewrites]]
- [[_COMMUNITY_Graphify Workflow Scripts|Graphify Workflow Scripts]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `compilerOptions` - 16 edges
3. `Hero()` - 8 edges
4. `usePerformanceTier()` - 6 edges
5. `useGitHubStats()` - 6 edges
6. `scripts` - 5 edges
7. `MainPortfolio()` - 5 edges
8. `About()` - 5 edges
9. `Projects()` - 5 edges
10. `Navbar()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Supabase Availability Status Integration` --conceptually_related_to--> `Hero()`  [INFERRED]
  docs/SYSTEM ARCHITECTURE.md → src/sections/Hero.tsx
- `FR-09: Global Features Requirement` --conceptually_related_to--> `MainPortfolio()`  [INFERRED]
  docs/prd.md → src/App.tsx
- `Audio & Sound System Architecture` --conceptually_related_to--> `MainPortfolio()`  [INFERRED]
  docs/SYSTEM ARCHITECTURE.md → src/App.tsx
- `GitHub API Rate Caching & Storage` --conceptually_related_to--> `useGitHubStats()`  [INFERRED]
  docs/SYSTEM ARCHITECTURE.md → src/hooks/useGitHubStats.ts
- `FR-04: About Section Requirement` --conceptually_related_to--> `About()`  [INFERRED]
  docs/prd.md → src/sections/About.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Scroll Navigation Flow** — sections_hero_hero, sections_about_about, sections_skills_skills, sections_projects_projects, sections_terminal_terminal, sections_contact_contact [INFERRED 0.85]
- **Third Party API Integrations** — hooks_usegithubstats_usegithubstats, sections_hero_hero, api_contact_handler [INFERRED 0.85]

## Communities (24 total, 7 thin omitted)

### Community 0 - "Global Features and Interlays"
Cohesion: 0.09
Nodes (23): KanjiOverlay(), KanjiOverlayProps, KonamiOverlay(), KonamiOverlayProps, MarqueeStrip(), MarqueeStripProps, FR-09: Global Features Requirement, Konami Code Easter Egg (+15 more)

### Community 1 - "Package Dependencies & Build Tooling"
Cohesion: 0.10
Nodes (19): vite.svg Icon, dependencies, detect-gpu, framer-motion, gsap, lucide-react, react, react-dom (+11 more)

### Community 2 - "Loading & Performance Tiers"
Cohesion: 0.17
Nodes (12): PerformanceContext, PerformanceContextProps, PerformanceTier, PerformanceTierProvider(), usePerformanceTier(), FR-05: Skills Section Requirement, Performance Tiers System, Product Purpose (+4 more)

### Community 3 - "Application TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

### Community 4 - "GitHub Stats & Command History"
Cohesion: 0.15
Nodes (14): react.svg Icon, FR-04: About Section Requirement, FR-07: Terminal Section Requirement, GitHub API Rate Caching & Storage, useCommandHistory(), ContributionDay, fallbackStats, GitHubStats (+6 more)

### Community 5 - "Node TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 6 - "Hero & Navigation Architecture"
Cohesion: 0.17
Nodes (11): hero.png (Hero Background Illustration), Navbar(), NavbarProps, FR-02: Navbar Requirement, FR-03: Hero Section Requirement, useLiveAge(), useTypewriter(), Manthan Utekar Resume PDF (+3 more)

### Community 7 - "Development Linters & Styling"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, tailwindcss, @tailwindcss/vite, @types/node (+6 more)

### Community 8 - "Portfolio Project Showcases"
Cohesion: 0.29
Nodes (6): FR-06: Projects Section Requirement, quiz-image.png (Project Eva Bloom Quiz), react-animation.png (Project BMW M4 Showcase), Project, Projects(), ProjectsProps

### Community 9 - "Hiring Manager Mode Toggle"
Cohesion: 0.50
Nodes (3): HMModeToggle(), HMModeToggleProps, Hiring Manager Mode

### Community 10 - "Portfolio Contact Interface"
Cohesion: 0.50
Nodes (3): FR-08: Contact Section Requirement, Contact(), ContactProps

### Community 11 - "User Story Requirements"
Cohesion: 0.50
Nodes (3): Developer User Persona Requirements, Hiring Manager User Persona Requirements, Recruiter User Persona Requirements

### Community 17 - "Project General Documentation"
Cohesion: 0.40
Nodes (4): Expanding the ESLint configuration, Portfolio Overview, React Compiler, React + TypeScript + Vite

### Community 23 - "Community 23"
Cohesion: 0.50
Nodes (3): LoadingScreen(), LoadingScreenProps, FR-01: Loading Screen Requirement

## Knowledge Gaps
- **110 isolated node(s):** `config`, `config`, `name`, `private`, `version` (+105 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Hero()` connect `Hero & Navigation Architecture` to `Global Features and Interlays`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Development Linters & Styling` to `Package Dependencies & Build Tooling`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Hero()` (e.g. with `hero.png (Hero Background Illustration)` and `FR-03: Hero Section Requirement`) actually correct?**
  _`Hero()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `config`, `config`, `name` to the rest of the system?**
  _110 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Global Features and Interlays` be split into smaller, more focused modules?**
  _Cohesion score 0.08901515151515152 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies & Build Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Application TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._