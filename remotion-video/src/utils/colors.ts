/**
 * Brand Color Palette
 * Dark mode aesthetic with warm accents
 */

export const colors = {
  // Dark backgrounds
  darkNavy: '#0A192F',
  deepBlue: '#112240',
  slateGray: '#1E293B',

  // Accent colors
  amber: '#F59E0B',
  warmOrange: '#FB923C',
  gold: '#FCD34D',

  // Neutral colors
  white: '#FFFFFF',
  lightGray: '#E2E8F0',
  mediumGray: '#94A3B8',

  // Brand colors (from main site)
  professionalBlue: '#2563eb',
  bronze: '#cd7f32',

  // Blockchain/crypto themed
  ethereumPurple: '#627EEA',
  cryptoGreen: '#10B981',

  // Transparency overlays
  darkOverlay: 'rgba(10, 25, 47, 0.85)',
  lightOverlay: 'rgba(255, 255, 255, 0.1)',
} as const;

export type ColorKey = keyof typeof colors;
