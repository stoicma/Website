/**
 * Reusable Spring Animation Presets
 */

export const springConfigs = {
  // Smooth, gentle animations
  gentle: {
    damping: 200,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
  },

  // Bouncy, energetic animations
  bouncy: {
    damping: 10,
    mass: 0.5,
    stiffness: 100,
    overshootClamping: false,
  },

  // Quick, snappy animations
  snappy: {
    damping: 100,
    mass: 0.5,
    stiffness: 200,
    overshootClamping: true,
  },

  // Smooth with slight overshoot
  smooth: {
    damping: 80,
    mass: 1,
    stiffness: 120,
    overshootClamping: false,
  },

  // Slow, cinematic animations
  cinematic: {
    damping: 100,
    mass: 2,
    stiffness: 50,
    overshootClamping: false,
  },

  // For text reveals
  textReveal: {
    damping: 90,
    mass: 1,
    stiffness: 110,
    overshootClamping: false,
  },
} as const;

export type SpringConfigKey = keyof typeof springConfigs;
