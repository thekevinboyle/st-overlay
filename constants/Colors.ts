// Superthing Coffee brand colors
// "Weirdo art meets specialty coffee" aesthetic

export const brand = {
  // Primary palette
  coral: '#f29496',
  peach: '#f29165',
  yellow: '#efda82',

  // Core
  black: '#1a1a1a',
  white: '#ffffff',

  // Warm neutrals (paper-like)
  cream: '#faf8f5',
  warmGray: '#e8e4df',
  paper: '#f5f2ed',

  // Text
  ink: '#2d2926',
  gray: '#8b8685',

  // Accents
  espresso: '#3d2c29',
  caramel: '#c9a66b',

  // Shadows
  shadow: 'rgba(45, 41, 38, 0.12)',
  shadowDark: 'rgba(45, 41, 38, 0.25)',
};

// Y2K Tech-Optimism "Brew Station" palette
// Monochrome/silver + coral accent
export const station = {
  // Surfaces - metallic silver gradient feel
  surfaceLight: '#E8E8ED',
  surfaceMid: '#C4C4CC',
  surfaceDark: '#2A2A2E',

  // Accent - coral from brand
  accent: '#F29496',
  accentGlow: 'rgba(242, 148, 150, 0.3)',
  accentMuted: 'rgba(242, 148, 150, 0.15)',

  // Text
  textPrimary: '#1A1A1C',
  textSecondary: '#6B6B73',
  textMuted: '#9A9AA0',

  // Highlights & effects
  white: '#FFFFFF',
  glossHighlight: 'rgba(255, 255, 255, 0.8)',
  glossSubtle: 'rgba(255, 255, 255, 0.4)',

  // Shadows for skeuomorphic depth
  shadowColor: '#A0A0A8',
  shadowDark: 'rgba(0, 0, 0, 0.15)',
  shadowDeep: 'rgba(0, 0, 0, 0.25)',

  // LCD-style display
  lcdBg: '#1E1E22',
  lcdText: '#C8FFD4',

  // Status indicators
  ledOff: '#4A4A50',
  ledOn: '#F29496',
};

// Glossy button effect presets for React Native
export const glossy = {
  rest: {
    // For LinearGradient: colors={['#F0F0F5', '#D8D8E0']}
    gradientStart: '#F0F0F5',
    gradientEnd: '#D8D8E0',
    borderTopColor: 'rgba(255,255,255,0.8)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowColor: '#A0A0A8',
  },
  pressed: {
    gradientStart: '#D8D8E0',
    gradientEnd: '#E8E8ED',
    shadowOffset: { width: 0, height: 1 },
  },
  coral: {
    gradientStart: '#F5A0A2',
    gradientEnd: '#E88A8C',
    shadowColor: '#C07072',
  },
};

// Extended theme
export const theme = {
  // Backgrounds
  bg: {
    primary: brand.cream,
    secondary: brand.paper,
    card: brand.white,
    input: brand.warmGray,
    accent: brand.coral,
  },

  // Text
  text: {
    primary: brand.ink,
    secondary: brand.gray,
    accent: brand.coral,
    inverse: brand.cream,
  },

  // Borders
  border: {
    light: 'rgba(45, 41, 38, 0.08)',
    medium: 'rgba(45, 41, 38, 0.15)',
    dark: brand.ink,
  },

  // Shadows for depth
  shadow: {
    sm: {
      shadowColor: brand.ink,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: brand.ink,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: brand.ink,
      shadowOffset: { width: 4, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
    pressed: {
      shadowColor: brand.ink,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
  },
};

export default {
  light: {
    text: brand.ink,
    textSecondary: brand.gray,
    background: brand.cream,
    card: brand.white,
    tint: brand.coral,
    border: theme.border.light,
    ...brand,
  },
  dark: {
    text: brand.cream,
    textSecondary: brand.gray,
    background: brand.espresso,
    card: brand.ink,
    tint: brand.coral,
    border: theme.border.medium,
    ...brand,
  },
};
