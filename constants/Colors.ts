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
