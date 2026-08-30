# Vento Tea - Project Handoff & Architecture Guide

Welcome! If you are an AI coding assistant picking up this project, this document provides the critical context, design rules, and architecture you need to know to seamlessly continue development on **Vento Tea**.

## 📌 Project Overview
Vento Tea is a premium, beautifully animated eCommerce frontend for a luxury Indian tea brand. The site emphasizes heritage, authenticity, and a highly polished, interactive user experience.

**CRITICAL SCOPE RULE**: **This is a FRONTEND-ONLY project.** Do not write backend code, databases, or API routes. All data is simulated via local state and mock JSON data.

---

## 🛠 Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (configured via `src/index.css` using `@theme`)
- **Routing**: React Router v7 (`react-router-dom`)
- **Animations**: Framer Motion (heavy use of scroll animations and gestures)
- **Icons**: Lucide React
- **Data Management**: React Context API (`CartContext`, `WishlistContext`, `AuthContext`)

---

## 🎨 Design System & Strict Rules

### 1. Colors (The "Vento" Palette)
The brand uses a warm, earthy, luxury color palette.
- **Forest Green** (`vento-forest`: `#0A2A1B`): Primary dark color used for text, navbars, and heavy backgrounds.
- **Cream** (`vento-cream`: `#F9F7F2`): Primary light background color.
- **Gold** (`vento-gold`: `#C5A059`): Accent color used for borders, highlights, and hover states.
- **Amber/Dark Gold** (`vento-gold-dark`: `#D4AF37`, `vento-amber`: `#b45309`)

🚨 **ABSOLUTE RULE: NO BLUE UI ELEMENTS ALLOWED.** 
Do not use Tailwind's default blue colors for links, buttons, focuses, or borders. Always stick to the Forest/Cream/Gold palette.

### 2. Typography
- **Headers (`font-serif`)**: *Cormorant* (Used for hero headlines, section titles).
- **UI/Structural (`font-sans`)**: *Source Serif 4* (Used for nav links, buttons, prices).
- **Body Text (`font-story`)**: *Crimson Text* (Used for long-form copy).

### 3. UI/UX Paradigms
- **Buttons**: Should almost always be pill-shaped (`rounded-full`). Must have punchy, tactile hover states (e.g., `transition-all duration-300 transform hover:scale-105 active:scale-95`).
- **Glassmorphism**: The header/nav and popups often use `backdrop-blur` with semi-transparent backgrounds (e.g., `bg-[#0A2A1B]/50`).
- **Text Truncation**: Product cards should use `line-clamp-1` to keep grid heights uniform.

---

## 📂 Project Structure

```text
/src
 ??? /components          # Reusable UI elements
     ??? CinematicHero.jsx  # Complex scroll-scrubbed video intro (Do not break timings!)
     ??? GamifiedCart.jsx   # Slide-out cart with free shipping threshold bar
     ??? TeaProductCard.jsx # Standardized product card
     ??? /layout
         ??? Header.jsx     # Dark green glass nav bar with search dropdown
         ??? Footer.jsx
 ??? /context             # Global state (Cart, Wishlist, Auth)
 ??? /data                # mockData.js (Simulated database - teas, prices, weights)
 ??? /pages               # Route views
     ??? Home.jsx
     ??? Shop.jsx
     ??? ProductDetails.jsx # Complex PDP with sticky bottom cart bar
     ??? Checkout.jsx
 ??? index.css            # Tailwind v4 configuration and global animations
```

---

## ⚠️ Known Complexities & "Gotchas"

1. **The Cinematic Hero (`CinematicHero.jsx`)**
   - The homepage features a `400vh` scroll container that scrubs a video frame-by-frame as the user scrolls.
   - Text animations (using Framer Motion's `useTransform`) are mathematically synced to specific `p` (progress) values to match visual cues in the video (e.g., a water drop on a leaf).
   - *Rule*: Do not blindly stretch or alter the `useTransform` arrays without verifying the visual sync against the video frames.

2. **JSX Unicode Parsing (Vite/Oxc)**
   - When injecting symbols like the Indian Rupee (₹) or Emojis (🎉) directly into JSX files via scripts, the fast Vite parser (Oxc) may throw a `[PARSE_ERROR] Invalid characters after number`.
   - *Fix*: Always wrap unicode escapes in JS expressions inside JSX. 
   - Good: `{"\u20B9"}` and `{"\u{1F389}"}`. 
   - Bad: `\u20B9` directly in text nodes.

3. **Sticky PDP Cart Bar (`ProductDetails.jsx`)**
   - The product details page uses an `IntersectionObserver` to detect when the main "Add to Cart" button scrolls out of view, triggering a fixed, semi-transparent bar at the bottom of the screen with quick variant selectors.

## 🚀 How to Contribute Next
1. Read `mockData.js` to understand the product schema before building new catalog features.
2. If building new components, follow the hover/scale interactivity paradigms seen in `TeaProductCard.jsx`.
3. Keep the frontend fast. Rely on Tailwind utility classes and avoid overly heavy JS recalculations during scroll events (unless offloaded to Framer Motion).
