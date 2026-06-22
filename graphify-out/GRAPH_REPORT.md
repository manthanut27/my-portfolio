# Graph Report - .  (2026-06-24)

## Corpus Check
- Corpus is ~27,356 words - fits in a single context window. You may not need a graph.

## Summary
- 200 nodes · 238 edges · 23 communities (16 shown, 7 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `compilerOptions` - 16 edges
3. `PRD (Product Requirements Document)` - 13 edges
4. `Hero()` - 8 edges
5. `System Architecture Document` - 7 edges
6. `usePerformanceTier()` - 6 edges
7. `useGitHubStats()` - 6 edges
8. `scripts` - 5 edges
9. `MainPortfolio()` - 5 edges
10. `About()` - 5 edges

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

## Communities (23 total, 7 thin omitted)

### Community 0 - "Global Features and Interlays"
Cohesion: 0.09
Nodes (24): KanjiOverlay(), KanjiOverlayProps, KonamiOverlay(), KonamiOverlayProps, MarqueeStrip(), MarqueeStripProps, FR-09: Global Features Requirement, Konami Code Easter Egg (+16 more)

### Community 1 - "Package Dependencies & Build Tooling"
Cohesion: 0.10
Nodes (19): vite.svg Icon, dependencies, detect-gpu, framer-motion, gsap, lucide-react, react, react-dom (+11 more)

### Community 2 - "Loading & Performance Tiers"
Cohesion: 0.13
Nodes (16): LoadingScreen(), LoadingScreenProps, PerformanceContext, PerformanceContextProps, PerformanceTier, PerformanceTierProvider(), usePerformanceTier(), PRD (Product Requirements Document) (+8 more)

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
Nodes (4): User Stories & Acceptance Criteria, Developer User Persona Requirements, Hiring Manager User Persona Requirements, Recruiter User Persona Requirements

### Community 14 - "Information Architecture Model"
Cohesion: 0.67
Nodes (3): Information Architecture Document, Section Hierarchy & Content Inventory, Route Structure & Secret Routes

## Knowledge Gaps
- **108 isolated node(s):** `config`, `config`, `name`, `private`, `version` (+103 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PRD (Product Requirements Document)` connect `Loading & Performance Tiers` to `Global Features and Interlays`, `GitHub Stats & Command History`, `Hero & Navigation Architecture`, `Portfolio Project Showcases`, `Hiring Manager Mode Toggle`, `Portfolio Contact Interface`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `Hero()` connect `Hero & Navigation Architecture` to `Global Features and Interlays`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `config`, `config`, `name` to the rest of the system?**
  _108 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Global Features and Interlays` be split into smaller, more focused modules?**
  _Cohesion score 0.08901515151515152 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies & Build Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Loading & Performance Tiers` be split into smaller, more focused modules?**
  _Cohesion score 0.1286549707602339 - nodes in this community are weakly interconnected._
- **Should `Application TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._