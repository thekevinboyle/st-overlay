// Superthing Coffee brand colors
export const brand = {
  coral: '#f29496',
  peach: '#f29165',
  yellow: '#efda82',
  black: '#000000',
  white: '#ffffff',
};

const tintColorLight = brand.coral;
const tintColorDark = brand.coral;

export default {
  light: {
    text: brand.black,
    background: brand.white,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    coral: brand.coral,
    peach: brand.peach,
    yellow: brand.yellow,
  },
  dark: {
    text: brand.white,
    background: brand.black,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    coral: brand.coral,
    peach: brand.peach,
    yellow: brand.yellow,
  },
};
