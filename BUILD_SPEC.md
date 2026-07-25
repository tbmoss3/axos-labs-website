# Axos Labs Website — Build Spec

## Overview
Build a modern, animated, multi-page corporate website for **Axos Labs** — "The Red Hat of Business AI."
 Repo: https://github.com/tbmoss3/axos-labs-website
 Deploy target: Railway (Next.js 15 App Router)

---

## Design Direction

### Brand Essence
- **Tagline:** "The Red Hat of Business AI"
- **What we do:** Build AI "Brain" systems that integrate into existing business workflows
- **Vibe:** Enterprise precision + AI futurism. Not playful, not cold. Confident, technical, premium.
- **Positioning:** We are the anti-cloud-AI. Private, owned, sovereign AI that runs on YOUR hardware.

### Color Palette
- **Background (main):** `#0a0a0f` — near-black with navy undertone
- **Background (elevated):** `#111118` — panels, cards
- **Background (surface):** `#181822` — elevated cards, dropdowns
- **Text Primary:** `#f0f0f5` — near-white, slightly cool
- **Text Secondary:** `#a0a0b0` — muted silver
- **Text Muted:** `#6e6e7e` — timestamps, metadata
- **Accent:** `#7c3aed` — vibrant violet/purple (CTAs, links, active states)
- **Accent Hover:** `#8b5cf6` — lighter violet
- **Accent Glow:** `rgba(124, 58, 237, 0.3)` — for shadow effects
- **Success:** `#22c55e` — green for status indicators
- **Border Subtle:** `rgba(255,255,255,0.05)` — default borders
- **Border Standard:** `rgba(255,255,255,0.08)` — card borders

### Typography
- **Primary:** `Inter` (Google Fonts) — geometric sans, clean and technical
- **Display weight:** 500-600 with tight letter-spacing
- **Body weight:** 400
- **Letter-spacing:** -0.02em for headlines, normal for body
- **Hero headline:** 56-64px, weight 600, line-height 1.1, letter-spacing -0.03em
- **Section titles:** 36-48px, weight 500, letter-spacing -0.02em
- **Body:** 16-18px, weight 400, line-height 1.6
- **Labels/captions:** 12-14px, weight 500
- OpenType features: Inter with `font-variation-settings` support if available.

### Animation Posture (CRITICAL)
This is NOT a typical SaaS site. Every page should feel **alive** with coordinated motion:

1. **Page transitions:** Smooth cross-fade between routes (use Framer Motion AnimatePresence)
2. **Scroll-triggered reveals:** Elements fade in + translate Y(20px -> 0) on viewport entry
3. **Staggered entrances:** Grid items and feature cards stagger (0.05-0.1s delay each)
4. **Ambient effects:**
   - Gradient mesh blob in hero (animated purple/blue blobs slowly morphing)
   - Subtle particle/starfield in deep backgrounds
   - Floating UI cards in hero (simulating dashboard screenshots)
   - Border glow animation on interactive elements (CSS `box-shadow` pulse)
5. **Hover states:**
   - Cards: slight scale(1.02) + brighter border + shadow intensify
   - Buttons: background lightens + subtle translateY(-2px)
   - Links: color shift to accent hover + underline slide-in
6. **No generic tech gradients** — use violet-accent on near-black, not blue-purple rainbow
7. **Respect `prefers-reduced-motion`** — disable ambient animations

### Layout Principles
- Max content width: 1280px
- Generous vertical padding: 120-160px between major sections
- Dark-native design: near-black canvas, light text emerges from darkness
- Components use translucent backgrounds, never solid white
- Border radius: 8px standard, 12px for featured cards, 50% for icons

---

## Pages

### 1. Home Page (`/`)

**Sections (top to bottom):**

1. **Navigation Bar** (sticky, transitions to slight blur backdrop on scroll)
   - Logo left (text-based: "Axos" in bold + "Labs" in regular weight 400, or a simple geometric logo)
   - Links: Home, About, Contact
   - CTA: "Get a Brain" → /contact
   - Mobile: hamburger menu

2. **Hero Section**
   - Tagline: "The Red Hat of Business AI"
   - Headline: "Hire an AI Employee That Never Sleeps"
   - Subtitle: "Axos Labs installs persistent AI Brains into your business — on your hardware, integrated with your systems, operating under your oversight."
   - Two CTAs: "Request a Brain" (accent) + "Learn More" (ghost)
   - **Visual:** Animated gradient mesh background (purple/violet blobs slowly morphing). Floating 3D-styled cards showing dashboards/workflows that drift/pulse subtly.
   - Stats row below: "3 Industries Deployed" | "20+ Hours/Week Saved" | "100% On-Premise Option" (staggered reveal)

3. **What Is a Brain? Section**
   - Title: "What Is a Brain?"
   - Subtitle explaining a brain is a persistent AI employee (not chatbot, not copilot)
   - 3 feature cards with icons:
     - **Integrates** — connects to your existing systems (QBO, RentManager, CRM, etc.)
     - **Learns** — remembers every decision and gets smarter over time
     - **Acts** — processes work orders, files documents, dispatches vendors autonomously
   - Each card: icon + title + description, translucent surface bg, hover scale effect

4. **How It Works Section** (timeline/process)
   - Title: "How It Works"
   - 4-step visual timeline:
     1. **Install** — Brain Type pre-configured for your industry
     2. **Tune** — FDE connects your systems and workflows
     3. **Operate** — Brain handles standard workflows autonomously
     4. **Evolve** — Gets smarter with every install in your vertical
   - Use connector lines between steps, icons inside numbered circles

5. **Industries Section**
   - Title: "Industries We Serve"
   - Grid of industry cards (2x2 or 3 on desktop, 1 col mobile):
     - **Construction** — project tracking, vendor dispatch, compliance
     - **Real Estate** — work orders, tenant screening, court filings, invoicing
     - **Logistics** — yard management, dispatch, inventory sync
     - **More Coming Soon** — placeholder with "Healthcare, Manufacturing, Legal coming Q4 2026"
   - Each card: icon + title + brief description

6. **Pricing Teaser (Optional minimal)**
   - Title: "Custom Software + AI Brain Packages"
   - 3 tier cards (Standard, Premium, Strategic) — see business plan for pricing
   - Very minimal: just tier name, setup cost, monthly cost, one-liner

7. **CTA Section**
   - Title: "Ready to Hire Your First AI Employee?"
   - Subtitle: "Tell us about your business. We'll design a Brain that fits."
   - CTA button: "Request a Brain" → /contact
   - Background: subtle gradient shift from `#0a0a0f` to a faint violet tint at edges

8. **Footer**
   - Axos Labs logo/wordmark
   - Tagline: "The Red Hat of Business AI"
   - Links: Home, About, Contact
   - Copyright: "© 2026 Axos Labs. All rights reserved."
   - Social icons placeholder (Discord, GitHub, LinkedIn)

### 2. About Page (`/about`)

**Sections:**

1. **Page Header**
   - Title: "About Axos Labs"
   - Subtitle: "We build the enterprise layer on open-source AI."

2. **Mission Section**
   - Title: "Our Mission"
   - 2-3 paragraphs on the business plan's mission: every 50-500 employee company deserves a Brain, privacy-first, open-core model, the "Red Hat of Business AI" positioning.

3. **The Three Pillars Section**
   - Title: "How We Work"
   - 3 cards:
     - **Pillar 1: Custom Software** — development and maintenance contracts. Funds everything else.
     - **Pillar 2: AI Brains** — the core product. End-to-end brain installation and operation.
     - **Pillar 3: Other Bets** — acquisitions, ventures, investments that compound expertise.
   - Each card: number badge + title + description

4. **Industries & Traction Section**
   - Title: "Industries We've Worked In"
   - List with descriptions (expandable or cards):
     - **Construction** — "General contracting, specialty trades, project coordination"
     - **Real Estate** — "Property management, brokerage, tenant services — our first vertical. Simmons & Harris: live brain since 2026."
     - **Logistics** — "Warehousing, yard management, dispatch — Premier Warehousing / YardLogic in progress."
     - **More Coming Soon** — "Healthcare, Manufacturing, Legal, Financial Services — Q4 2026 and beyond."
   - Below: Traction metrics card:
     - "Simmons & Harris: Live brain since 2026, 50 employees, ~20 hrs/week saved"
     - "Premier Warehousing: Agentic yard management in build"
     - "3+ prospects requesting S&H-style brain for real estate"

5. **Team / Founder Section**
   - Title: "Built By"
   - Benton Moss — Founder & CEO
   - One-liner bio placeholder

6. **CTA**
   - Same as homepage CTA section

7. **Footer** (same component)

### 3. Contact / Intake Page (`/contact`)

**Sections:**

1. **Page Header**
   - Title: "Get Started"
   - Subtitle: "Tell us about your company and what you're looking for."

2. **Intake Form**
   **Two-path form:**

   **Path A: Software Solution**
   - Company Name (text)
   - Industry (dropdown: Construction, Real Estate, Logistics, Healthcare, Manufacturing, Legal, Financial Services, Other)
   - Company Size (dropdown: 1-10, 11-50, 51-100, 101-250, 251-500, 500+)
   - What systems do you use? (textarea — e.g. "QuickBooks, RentManager, Salesforce...")
   - What problem are you trying to solve? (textarea)
   - Budget Range (dropdown: Under $10K, $10K-50K, $50K-100K, $100K+, Not sure)
   - Contact Email (email)
   - Contact Phone (tel)
   - Submit → sends to `/api/intake`

   **Path B: Brain Solution**
   - Company Name (text)
   - Industry (same dropdown)
   - Company Size (same dropdown)
   - What systems do you want the Brain to connect to? (textarea)
   - What workflows should the Brain handle? (textarea — e.g. "Process work orders, dispatch vendors, file court papers...")
   - Estimated hours per week spent on repetitive tasks? (number input)
   - Preferred deployment: (radio: Cloud Concierge, On-Premise, Sovereignty Operations)
   - Contact Email (email)
   - Contact Phone (tel)
   - Submit → sends to `/api/intake`

   **UI for path selection:**
   - Two prominent toggle cards at the top:
     - "Custom Software" — for bespoke builds and integrations
     - "AI Brain" — for a persistent AI employee
   - Clicking switches the form fields below

3. **Contact Info**
   - Email placeholder: hello@axoslabs.com
   - "Response within 24 hours"

4. **Footer** (same component)

---

## API Route: `/api/intake`

POST handler that receives the form data and sends it to Discord via webhook.

```typescript
// Pseudo-code for the handler
export async function POST(req: Request) {
  const body = await req.json();
  
  const discordPayload = {
    embeds: [{
      title: `New Intake: ${body.type === 'brain' ? '🧠 Brain Request' : '💻 Software Request'}`,
      fields: [
        { name: 'Company', value: body.companyName, inline: true },
        { name: 'Industry', value: body.industry, inline: true },
        { name: 'Size', value: body.companySize, inline: true },
        { name: 'Contact', value: `${body.email} | ${body.phone || 'N/A'}`, inline: false },
        { name: 'Details', value: body.problemDescription || body.workflows || 'N/A', inline: false },
      ],
      color: body.type === 'brain' ? 0x7c3aed : 0x22c55e,
      timestamp: new Date().toISOString()
    }]
  };
  
  // Send to Discord webhook
  // Discord channel ID will be provided later — use placeholder env var DISCORD_WEBHOOK_URL
  
  return Response.json({ success: true });
}
```

**Environment variable placeholder:** `DISCORD_WEBHOOK_URL` — one of the agents will wire this up with a placeholder that can be replaced later.

---

## Component Inventory

### Shared Components (all pages)
- `Navbar` — sticky, blur backdrop on scroll, mobile hamburger
- `Footer` — logo, links, copyright, social icons
- `AnimatedSection` — scroll-triggered fade-in wrapper (Framer Motion whileInView)
- `GradientMesh` — animated background blobs for hero
- `FloatingCard` — floating 3D-style card for hero visual

### Page Sections
- `HeroSection` — hero on homepage
- `WhatIsBrainSection` — "What is a Brain?" section
- `HowItWorksSection` — 4-step process timeline
- `IndustriesSection` — industry grid
- `PricingTeaser` — minimal pricing cards
- `CTASection` — reusable bottom CTA
- `PageHeader` — title + subtitle for interior pages
- `MissionSection` — about page mission
- `PillarsSection` — 3-pillar cards
- `TractionSection` — metrics/traction display
- `IntakeForm` — full intake form with path toggle

---

## Animation Spec (Detailed)

### Global
- **Page transitions:** 0.3s fade cross-fade using `AnimatePresence`
- **Smooth scroll:** Custom smooth scroll behavior (CSS `scroll-behavior: smooth`)

### Scroll-Triggered Reveals
- Use Framer Motion `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- Animation: `opacity: 0 -> 1`, `y: 30 -> 0`, duration 0.6s, ease `[0.25, 0.1, 0.25, 1]`
- Stagger children: `staggerChildren: 0.1`

### Hero
- **Gradient mesh:** CSS animations on 3-4 radial gradient blobs, 15-20s infinite loop, slow morphing via `@keyframes`
- **Floating cards:** CSS `animation: float 6s ease-in-out infinite`, each card with different delay
- **Stats:** Staggered fade-in, 0.15s delay between each

### Cards
- **Hover:** `transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`, `transform: translateY(-4px) scale(1.02)`, border brightens to `rgba(255,255,255,0.12)`

### Buttons
- **Hover:** background lightens, `translateY(-2px)`, enhanced shadow
- **Active:** `translateY(0)`, shadow reduces

### Form
- **Path toggle:** Smooth height transition between form sections
- **Input focus:** border color transitions to accent, subtle glow
- **Submit:** Loading spinner + success animation

---

## Tech Stack

- **Framework:** Next.js 15 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (install only what you need)
- **Animation:** Framer Motion + GSAP (ScrollTrigger for scroll effects)
- **Icons:** Lucide React
- **Fonts:** Inter (Google Fonts via `next/font`)
- **State:** React useReducer for form state

---

## File Structure

```
axos-labs-website/
├── app/
│   ├── layout.tsx          # Root layout with font loading + providers
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About page
│   ├── contact/page.tsx    # Contact page
│   ├── api/intake/route.ts # Intake API handler
│   └── globals.css         # Tailwind + custom CSS variables
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── what-is-brain-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── industries-section.tsx
│   │   ├── pricing-teaser.tsx
│   │   ├── cta-section.tsx
│   │   ├── mission-section.tsx
│   │   ├── pillars-section.tsx
│   │   ├── traction-section.tsx
│   │   ├── intake-form.tsx
│   │   └── page-header.tsx
│   └── animations/
│       ├── animated-section.tsx
│       ├── gradient-mesh.tsx
│       └── floating-card.tsx
├── lib/
│   └── utils.ts            # cn() utility
├── public/
│   └── (assets go here)
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Deliverables (Per Agent)

### Agent 1 (Layout + Shared + Home)
- `layout.tsx` with font loading (`next/font/google` Inter) + metadata + html lang
- `globals.css` with CSS custom properties for the full color palette
- `navbar.tsx` — sticky, blur backdrop on scroll, mobile hamburger, smooth animations
- `footer.tsx` — matches design system
- `animated-section.tsx` — reusable scroll-triggered fade-in wrapper
- `gradient-mesh.tsx` — animated gradient blob background
- `floating-card.tsx` — floating 3D-styled card component
- `page.tsx` (Home) — assembles ALL homepage sections
- All homepage section components: `hero-section`, `what-is-brain-section`, `how-it-works-section`, `industries-section`, `pricing-teaser`, `cta-section`
- `next.config.js` — static export for Railway

### Agent 2 (About + Contact Pages)
- `about/page.tsx` — full about page
- `contact/page.tsx` — full contact page
- All about/contact section components: `page-header`, `mission-section`, `pillars-section`, `traction-section`, `intake-form`
- `api/intake/route.ts` — POST handler with Discord webhook integration (placeholder URL)
- Form validation with React state
- Path toggle logic (Software vs Brain)

### Agent 3 (Animations Polish + QA)
- GSAP ScrollTrigger integration for advanced scroll animations
- Fine-tune all Framer Motion animations (staggering, spring physics)
- `prefers-reduced-motion` support
- Mobile responsiveness audit
- Performance audit (Lighthouse-like checks)
- Cross-browser compatibility fixes
- Integration of all components — ensure they work together
- Final build verification (`npm run build` must succeed)
- Push final code to GitHub

---

## Success Criteria

1. **Visual Quality:** Matches design spec — near-black canvas, violet accent, Inter typography, proper spacing
2. **Animation Quality:** Smooth 60fps animations, no jank. Scroll reveals feel natural. Hero gradient mesh is mesmerizing.
3. **Functionality:** All navigation works, form submits successfully, mobile responsive
4. **Code Quality:** TypeScript strict mode, no console errors, clean component structure
5. **Build:** `npm run build` succeeds with zero errors
6. **No Filler Content:** Every section has real Axos Labs content from the business plan. No fake testimonials, no "Lorem ipsum"

---

## Notes for Agents

- **Content source:** Use the Axos Labs Business Plan for all copy. Real numbers, real customer names (Simmons & Harris, Premier Warehousing), real pricing.
- **Logo:** The swarm should design a simple geometric logo + wordmark. "Axos" wordmark can be a custom SVG or just bold typography. It doesn't need to be complex — Linear and Stripe both use simple geometric marks.
- **Images:** Use abstract/generated visuals, not stock photos. Gradient meshes, 3D card mocks, geometric patterns. Nobody buys an AI brain from a stock photo of a smiling person.
- **No AI slop:** Avoid generic SaaS tropes — no three equal cards with generic icons, no hero-plus-three-cards formula, no decorative stats that aren't real. The "surface-first" approach: this is a "Decide/Learn" surface (landing/marketing), but individual sections within it vary — the hero is Decide, the features are Compare, the form is Configure.
- **Discord webhook:** The intake form POSTs to `/api/intake` which forwards to Discord. The actual `DISCORD_WEBHOOK_URL` env var will be configured on Railway later. For now, wire it to a placeholder and make it work.
