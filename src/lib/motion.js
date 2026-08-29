// Shared motion tokens & variants — a single source of truth for the redesign.
// Keeping every reveal on one easing curve is what makes the site feel
// "organic, not erratic" (see vento-redesign-plan.md §1.3 / §3).

/** Buttery ease-out-sine — the default curve for reveals and parallax. */
export const EASE_OUT_SINE = [0.25, 0.46, 0.45, 0.94];

export const DURATION = {
  micro: 0.2,
  ui: 0.35,
  reveal: 0.7,
  cinematic: 1.0,
};

/** Simple fade + rise. */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE_OUT_SINE },
  },
};

/** Parent that choreographs its children in sequence. */
export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Child used inside a `stagger` parent. */
export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE_OUT_SINE },
  },
};

/** Full-screen scrim fade (mobile menu, cart overlay). */
export const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.ui, ease: EASE_OUT_SINE } },
  exit: { opacity: 0, transition: { duration: DURATION.micro, ease: EASE_OUT_SINE } },
};

/** Right-hand slide-in panel (cart drawer). */
export const drawerRight = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: DURATION.ui, ease: EASE_OUT_SINE } },
  exit: { x: '100%', transition: { duration: DURATION.ui, ease: EASE_OUT_SINE } },
};
