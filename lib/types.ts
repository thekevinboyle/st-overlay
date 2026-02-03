export interface BrewData {
  coffeeName: string;
  roaster: string;
  origin: string;
  dose: string;
  water: string;
  ratio: string;
  grindSize: string;
  temperature: string;
  brewTime: string;
  brewMethod: string;
  flavorNotes: string[];
  rating: number;
}

export const emptyBrewData: BrewData = {
  coffeeName: '',
  roaster: '',
  origin: '',
  dose: '',
  water: '',
  ratio: '',
  grindSize: '',
  temperature: '',
  brewTime: '',
  brewMethod: '',
  flavorNotes: [],
  rating: 0,
};

export type FilterName = 'coral-haze' | 'vhs-cafe' | 'film-grain' | 'none';

export interface FilterConfig {
  name: FilterName;
  label: string;
  saturation: number;
  brightness: number;
  contrast: number;
  warmth: number;
  grain: number;
}

export const filters: Record<FilterName, FilterConfig> = {
  'none': {
    name: 'none',
    label: 'Original',
    saturation: 1,
    brightness: 1,
    contrast: 1,
    warmth: 0,
    grain: 0,
  },
  'coral-haze': {
    name: 'coral-haze',
    label: 'Coral Haze',
    saturation: 1.1,
    brightness: 1.05,
    contrast: 0.95,
    warmth: 0.15,
    grain: 0.05,
  },
  'vhs-cafe': {
    name: 'vhs-cafe',
    label: 'VHS Café',
    saturation: 0.8,
    brightness: 0.95,
    contrast: 1.1,
    warmth: 0.1,
    grain: 0.3,
  },
  'film-grain': {
    name: 'film-grain',
    label: 'Film Grain',
    saturation: 1.05,
    brightness: 1.02,
    contrast: 0.92,
    warmth: 0.12,
    grain: 0.2,
  },
};

// Brew Station types for skeuomorphic controls

export type StationTab = 'data' | 'style' | 'frame' | 'export';

export interface SegmentOption {
  id: string;
  label: string;
  icon?: string;
}

// Brew method options for segment buttons
export const BREW_METHODS: SegmentOption[] = [
  { id: 'v60', label: 'V60', icon: '▽' },
  { id: 'aeropress', label: 'AERO', icon: '◎' },
  { id: 'espresso', label: 'ESPR', icon: '◉' },
  { id: 'chemex', label: 'CHEM', icon: '◇' },
  { id: 'french-press', label: 'FRNC', icon: '▣' },
  { id: 'other', label: 'OTHER', icon: '○' },
];

// Grind size options
export const GRIND_SIZES: SegmentOption[] = [
  { id: 'extra-fine', label: 'X-FINE' },
  { id: 'fine', label: 'FINE' },
  { id: 'medium-fine', label: 'MED-F' },
  { id: 'medium', label: 'MED' },
  { id: 'medium-coarse', label: 'MED-C' },
  { id: 'coarse', label: 'COARSE' },
];
