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
