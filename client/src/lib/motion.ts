/**
 * REUSABLE FRAMER MOTION VARIANTS
 * 
 * Single source of truth for all animations across the portfolio.
 * Every component imports from this file — never define animation
 * variants inline.
 * 
 * Timing rules:
 *   - All durations under 300ms
 *   - Easing: cubic-bezier(0.23, 1, 0.32, 1) — snappy ease-out
 *   - Stagger: 50ms per child item
 *   - Never animate from scale(0), always scale(0.95)
 *   - Only animate transform and opacity
 */

import type { Variants } from "framer-motion";

/* ============================================
   VIEWPORT ANIMATIONS (scroll-triggered)
   ============================================ */

/**
 * Fade in from below while translating up.
 * Used for: section titles, card entrances, text blocks.
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/**
 * Fade in from above while translating down.
 * Used for: dropdowns, tooltips, secondary reveals.
 */
export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/**
 * Fade in from the left.
 * Used for: side panels, feature lists, timeline items.
 */
export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/**
 * Fade in from the right.
 * Used for: images, stats, featured elements.
 */
export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/**
 * Scale from 0.95 to 1 with fade in.
 * Used for: cards, modals, featured project thumbnails.
 * Never uses scale(0) — follows "nothing appears from nothing" rule.
 */
export const zoomIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/* ============================================
   CONTAINER ANIMATIONS (staggered children)
   ============================================ */

/**
 * Stagger container — parent that orchestrates child reveals.
 * Each child is delayed by 50ms for a cascading effect.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

/* ============================================
   AMBIENT / DECORATIVE ANIMATIONS
   ============================================ */

/**
 * Gentle floating motion for decorative elements.
 * Used for: background orbs, floating icons, ambient shapes.
 * Infinite loop, smooth sine-wave motion.
 */
export const floating: Variants = {
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

/**
 * Subtle pulse glow for accent elements.
 * Used for: glowing borders, CTA buttons, highlighted sections.
 */
export const pulseGlow: Variants = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

/* ============================================
   INTERACTIVE TRANSITIONS (hover/press)
   ============================================ */

/**
 * Card hover lift — reusable as a transition config.
 */
export const cardHoverTransition = {
  duration: 0.2,
  ease: [0.23, 1, 0.32, 1],
} as const;

/**
 * Button press scale — reusable as a transition config.
 */
export const buttonPressTransition = {
  duration: 0.16,
  ease: [0.23, 1, 0.32, 1],
} as const;
