# Vento Tea — Redesign Execution Plan

**Author:** Principal Frontend Engineer / UX·UI Architect
**Goal:** 2× the professionalism, luxury, and creative storytelling — out-craft Vahdam, Blue Tea, Sammvaad, and No.3 Clive Road.
**Stack (unchanged):** React 19 + Vite + Tailwind v4 + Framer Motion 13 (already installed) + React Router 7.
**Status:** Awaiting approval. No component code will be written until you reply `APPROVED`.

---

## 0. Grounding — what the audit found

| Area | Current reality | Implication for the plan |
|---|---|---|
| **Mobile menu** | *Does not exist.* `Header.jsx` nav is `hidden lg:flex`, search `hidden md:flex`, Login `hidden lg:block`. There is **no hamburger button below `lg`** — phone users get a logo + cart/heart icons and **zero navigation**. | Priority-1 build, not a patch. Add hamburger + full-screen overlay + surface search/login inside it. |
| **Type system** | We just installed Cormorant (display) · Source Serif 4 (UI) · Crimson Text (body) · Playfair (marquee, locked). | Aligns exactly with your brief. Keep it; formalize weights & scale. |
| **Product data** | Every product already has `features:[{title,desc}]` + `badges:[]` + `origin`. | Benefit-driven cards need **no invented data** — we surface real fields as pills. |
| **Hero** | `CinematicHero` already uses `useScroll`/`useTransform`, 300vh sticky, 3-panel cross-fade. | Elevate (parallax, grain, scroll cue, type), don't rebuild. |
| **Timeline** | `SupplyChainTimeline` ("The Vento Promise": Plucked→Packed→Delivered) exists but **static**. | Add scroll-driven line-draw + parallax estate bg + staggered nodes. |
| **Cart** | `GamifiedCart` has a single free-gift progress bar but **no Framer Motion** (`if(!isOpen) return null` + CSS). | Upgrade to `AnimatePresence` slide-in + multi-tier progress + unlock micro-celebration. |
| **Reveal primitive** | `ScrollReveal` (fade-up, `once:true`) already wraps every Home section. | Reuse & extend into a `Stagger` variant instead of duplicating motion logic. |
| **Marquee** | Footer "VENTO TEA" pinned to Playfair. | 🔒 **Locked — untouched**, per prior instruction. |

---

## 1. Design system

### 1.1 Color palette — "Estate & Linen"

Earthy, organic, high-contrast. New tokens live in `src/index.css` `@theme`. Existing `vento-*` names are **kept and aliased** so nothing breaks; new roles are added.

| Token | Hex | Role |
|---|---|---|
| `forest` (Estate Forest) | `#0A2A1B` | Primary dark — headers, footer, dark sections *(keep)* |
| `forest-light` | `#17352A` | Raised dark surfaces, hovers |
| `sage` (Deep Sage) | `#47624C` | Secondary green surfaces, timeline, quote blocks |
| `sage-mist` | `#AEB9A4` | Muted rules, disabled, captions on dark |
| `amber` (Assam Amber) | `#B45309` | **Primary CTA energy**, active states *(keep, renamed)* |
| `amber-glow` | `#D97706` | CTA hover, highlights, progress fill |
| `terracotta` | `#A9553A` | Accent — badges, underlines, benefit icons |
| `terracotta-deep` | `#7C3A26` | Deep accent, pressed states |
| `gold` (Antique Gold) | `#C5A059` | Hairlines, eyebrows, dividers *(keep)* |
| `gold-leaf` | `#D4AF37` | Gold hover / shimmer *(keep as gold-dark)* |
| `linen` (Warm Linen) | `#F4EEE2` | **Default page background** (replaces stark cream) |
| `linen-deep` | `#EAE0CF` | Alternating section bands |
| `paper` | `#FBF8F1` | Cards / raised light surfaces |
| `ink` | `#23291F` | Warm near-black body text (softer than pure forest) |

> **Anti-gloss commitment:** warm linen grounds, never `#FFFFFF`. Accents are muted/earthy (terracotta, amber, sage) — **no** neon, purple gradients, or glassmorphism-on-everything. Glass/blur is reserved for exactly two places: the sticky header and overlay scrims.

### 1.2 Typography (formalizes the system we just built)

| Role | Family | Usage | Weights |
|---|---|---|---|
| **Showstopper** | **Cormorant** | Hero (h1), massive section titles, pull-quotes | 400 / 500 / 600 + italic |
| **Structural UI** | **Source Serif 4** | Nav, buttons, price tags, product titles, form labels, eyebrows | 400 / 600 / 700 |
| **Storyteller** | **Crimson Text** | Long-form body, origin story, tasting/brewing notes | 400 + italic |
| **Locked** | **Playfair Display** | Footer marquee only | 900 |

- **Type scale (fluid, `clamp()`):** display `clamp(3rem, 8vw, 7rem)` · h2 `clamp(2rem, 5vw, 3.75rem)` · h3 `1.5rem` · body `1.0625–1.125rem` · eyebrow `0.75rem / tracking 0.2em / uppercase`.
- **Optional decision point:** reintroduce **Montserrat** *only* for uppercase eyebrows/nav to sharpen the "structural" contrast. **Recommendation: don't** — the all-serif system reads more heritage/bespoke. Flagged for your call.

### 1.3 Motion tokens (shared, in a new `src/lib/motion.js`)

- **Easing** `ease-out-sine`: `[0.25, 0.46, 0.45, 0.94]` (buttery, organic — the default for reveals).
- **Durations:** micro 0.2s · UI 0.35s · reveal 0.7s · cinematic 1.0s+.
- **Stagger:** children `0.08s`, delayChildren `0.1s`.
- Exported `variants` presets (`fadeUp`, `stagger`, `drawLine`, `drawerRight`, `overlay`) so every component pulls from one source of truth.

---

## 2. Component tree (new / changed)

```
App
├─ Header  (REWORK)
│  ├─ Logo
│  ├─ DesktopNav            (unchanged, restyled)
│  ├─ SearchBar             (unchanged desktop; also injected into MobileMenu)
│  ├─ HeaderActions         (login / wishlist / cart)
│  └─ HamburgerButton  ★NEW (lg:hidden, animated ↔ X)
│
├─ MobileMenu           ★NEW  (full-screen overlay, AnimatePresence, portal-level)
│  ├─ Backdrop (blur)
│  ├─ NavLinks (staggered Cormorant)
│  ├─ MiniSearch
│  ├─ Account/ Login row
│  └─ Social + CTA
│
├─ CinematicHero  (ENHANCE — parallax video, grain, vignette, scroll cue)
│
├─ ProductCatalog  (ENHANCE — StaggerReveal grid wrapper)
│  └─ TeaProductCard  (REDESIGN — benefit pills + hover choreography)
│     ├─ ProductImage (hover scale)
│     ├─ BenefitPills ★NEW  (maps product.features / badges → icon+label)
│     └─ AddToCartButton  (amber fill-sweep + tap)
│
├─ SupplyChainTimeline → HeritageJourney  (ENHANCE — scroll line-draw, parallax bg, staggered nodes)
│
├─ GamifiedCart  (ENHANCE — AnimatePresence drawer, multi-tier bar, unlock pop)
│
└─ lib/
   ├─ motion.js      ★NEW  (easings, durations, variants)
   └─ useScrollLock  ★NEW  (body scroll-lock hook, shared by MobileMenu + cart)
```

Shared primitive: extend `ScrollReveal` with a sibling `Stagger` (parent) + `StaggerItem` (child) so grids animate as one choreographed unit.

**Explicitly out of scope / preserved:** all routes, contexts (Cart/Auth/Wishlist), `mockData`, SEO, and the **footer marquee**.

---

## 3. Animation strategy — what moves, when, how

| # | Where | Trigger | What moves | How (spec) |
|---|---|---|---|---|
| 1 | **Hero video** | scroll (0→1 over 300vh) | bg `scale 1.1→1.25` + `y` parallax; 3 text panels cross-fade | existing `useTransform`, refined; add grain overlay + vignette + bouncing scroll-cue chevron |
| 2 | **Product grid** | in-view (`once`) | cards fade-up + rise, **staggered** | `Stagger` parent, `staggerChildren:0.08`, `fadeUp` ease-out-sine |
| 3 | **Card hover** | hover / focus | image `scale 1→1.08` (600ms), benefit pills fade-in, Add button amber **fill-sweep** L→R + icon nudge | CSS transition + `whileHover`; keyboard-focus parity |
| 4 | **Heritage timeline** | scroll progress in view | connector line **draws** (`scaleX`/`pathLength`), nodes pop-in staggered, icons micro-bounce, bg **parallax** | `useScroll` on section + `drawLine` variant |
| 5 | **Slide-out cart** | open/close | drawer `x:100%→0`, overlay fade+blur, progress bar width spring, **tier unlock** scale-pop + leaf sparkle | `AnimatePresence`, tween 0.35s ease-out |
| 6 | **Mobile menu** | hamburger tap | overlay fade+blur, hamburger→X morph, nav links staggered `y+opacity` | `AnimatePresence` + stagger |
| 7 | **Section reveals** | in-view | existing fade-up (kept) | reuse `ScrollReveal` |
| 8 | **Buttons (global)** | tap | `scale 0.97` press feedback | `whileTap` |

**Guardrails (anti-erratic):**
- One shared easing (`ease-out-sine`) → nothing "springs" unpredictably except the cart-unlock celebration (intentional).
- Reveals use `viewport={{ once:true }}` → **no replay flicker** on scroll-up.
- **`prefers-reduced-motion`**: a global check disables parallax/large transforms and collapses reveals to instant opacity. Non-negotiable.
- Parallax uses `transform` only (GPU) — no layout thrash; images get `will-change:transform` sparingly.

---

## 4. Mobile hamburger — the fix (Priority 1)

**Problem:** no toggle exists below `lg`; navigation is unreachable on phones.

**Solution — full-screen editorial overlay** (recommended over a slide drawer: more premium, gives Cormorant room to breathe, and lets us surface the otherwise-hidden search + login).

**Behavior**
1. `HamburgerButton` (`lg:hidden`) added to `Header`, right of actions. Animated 2-line ↔ X morph; `aria-expanded`, `aria-controls`, `aria-label`.
2. `MobileMenu` = `fixed inset-0 z-[60]`, warm-linen (or deep-forest) panel with `backdrop-blur-xl` scrim behind. `AnimatePresence` fade + subtle scale-in.
3. Contents: large staggered Cormorant nav links (Home / Shop / Our Story / Blogs / Contact), a **MiniSearch** (fixes the phone-hidden search), Login/Account, social row, and an amber CTA ("Shop the Collection").
4. **Closes on:** backdrop tap, link click, `Esc`, and **route change** (`useLocation` effect) — so it never lingers after navigation.
5. **Body scroll-lock** while open via shared `useScrollLock` hook (also reused by the cart).
6. **A11y:** `role="dialog"` `aria-modal`, focus moved into panel on open and restored on close, basic focus trap, all controls keyboard-reachable.

**Breakpoints:** overlay `< lg`. Also expose search on `md` where it's currently `hidden md:flex` → ensure phones (`< md`) reach search via the menu.

---

## 5. Required D2C sections — mapping

| Brief | Delivery |
|---|---|
| **Cinematic Hero** (sticky bg, fading text on scroll) | Enhance `CinematicHero`: parallax video, film-grain + vignette, refined Cormorant panels, animated scroll cue. |
| **Benefit-driven cards** (Blue Tea style) | Redesign `TeaProductCard`: `BenefitPills` from real `features`/`badges` (e.g. "100% Natural", "Whole Leaf"), hover image scale, amber fill-sweep Add button. |
| **Heritage / Sourcing timeline** (Sammvaad style) | Upgrade `SupplyChainTimeline` → animated `HeritageJourney`: Plucked → Packed → Delivered with scroll line-draw + parallax estate photo + staggered nodes. |
| **Gamified slide-out cart** | Upgrade `GamifiedCart`: `AnimatePresence` drawer, **two-tier** progress (free shipping → free gift), animated bar, unlock celebration. |

---

## 6. Build order (phased, each independently testable on localhost)

1. **Phase 0 — Foundation:** color tokens + `lib/motion.js` + `useScrollLock`. (No visual break; aliases keep old classes working.)
2. **Phase 1 — Mobile menu + Header** (the bug fix). ← highest user impact.
3. **Phase 2 — Cinematic Hero** polish + parallax + reduced-motion.
4. **Phase 3 — Benefit-driven product cards** + staggered grid.
5. **Phase 4 — Heritage Journey** timeline animation.
6. **Phase 5 — Gamified cart** upgrade.
7. **Phase 6 — Global QA:** reduced-motion audit, mobile 375px + desktop pass, contrast (WCAG AA), section rhythm, marquee untouched-check.

**Verification each phase:** dev server already runs at `localhost:5174`; I'll screenshot desktop + mobile (375px) and check computed styles / console. **No commits** unless you ask.

---

## 7. Decision points (bake your preferences into `APPROVED`, or override)

- **D1 — Mobile menu style:** ✅ full-screen overlay *(recommended)* vs. right slide-drawer.
- **D2 — Eyebrow font:** ✅ keep all-serif (Source Serif) *(recommended)* vs. add Montserrat for uppercase labels.
- **D3 — Palette intensity:** ✅ "Estate & Linen" as specced *(recommended)* vs. push terracotta/amber more dominant.
- **D4 — Hero media:** keep current placeholder CDN video vs. you supply an estate video/still (parallax works with either).
- **D5 — Scope:** Home page first *(recommended)*, then roll the system to Shop/Product/About — vs. all pages in one pass.

---

**Please review the plan. Reply 'APPROVED' to begin the code generation.**
