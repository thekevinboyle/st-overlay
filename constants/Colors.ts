// Superthing Coffee brand colors
export const brand = {
  coral: '#f29496',
  peach: '#f29165',
  yellow: '#efda82',
  black: '#000000',
  white: '#ffffff',
  gray: '#888888',
  darkGray: '#333333',
  lightGray: '#f5f5f5',
};

export default {
  light: {
    text: brand.black,
    textSecondary: brand.gray,
    background: brand.white,
    card: brand.lightGray,
    tint: brand.coral,
    border: '#e0e0e0',
    ...brand,
  },
  dark: {
    text: brand.white,
    textSecondary: brand.gray,
    background: brand.black,
    card: brand.darkGray,
    tint: brand.coral,
    border: '#333333',
    ...brand,
  },
};
