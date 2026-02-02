import { ImageSourcePropType } from 'react-native';

export interface Frame {
  id: string;
  name: string;
  source: ImageSourcePropType;
}

// Statically require all frame assets
// React Native requires static imports for bundling
export const frames: Frame[] = [
  { id: 'coffee-mug', name: 'Coffee Mug', source: require('../assets/frames/coffee-mug.png') },
  { id: 'left-hand', name: 'Left Hand', source: require('../assets/frames/left-hand.png') },
  { id: 'right-hand', name: 'Right Hand', source: require('../assets/frames/right-hand.png') },
  { id: 'up-hand', name: 'Up Hand', source: require('../assets/frames/up-hand.png') },
  { id: 'up-hand-wiggle', name: 'Up Wiggle', source: require('../assets/frames/up-hand-wiggle.png') },
  { id: 'down-hand-wiggle', name: 'Down Wiggle', source: require('../assets/frames/down-hand-wiggle.png') },
  { id: 'down-hand-wiggle-right', name: 'Down Wiggle R', source: require('../assets/frames/down-hand-wiggle-right.png') },
  { id: 'two-hands-down', name: 'Two Hands', source: require('../assets/frames/two-hands-down.png') },
  { id: 'squiggle', name: 'Squiggle', source: require('../assets/frames/squiggle.png') },
  { id: 'pipe-wiggle-eye', name: 'Pipe Eye', source: require('../assets/frames/pipe-wiggle-eye.png') },
  { id: 'pipe-with-hand', name: 'Pipe Hand', source: require('../assets/frames/pipe-with-hand.png') },
  { id: 'asset-13', name: 'Frame 1', source: require('../assets/frames/Asset 13.png') },
  { id: 'asset-14', name: 'Frame 2', source: require('../assets/frames/Asset 14.png') },
  { id: 'asset-16', name: 'Frame 3', source: require('../assets/frames/Asset 16.png') },
  { id: 'asset-17', name: 'Frame 4', source: require('../assets/frames/Asset 17.png') },
  { id: 'asset-18', name: 'Frame 5', source: require('../assets/frames/Asset 18_1.png') },
  { id: 'asset-19', name: 'Frame 6', source: require('../assets/frames/Asset 19.png') },
  { id: 'asset-22', name: 'Frame 7', source: require('../assets/frames/Asset 22.png') },
  { id: 'asset-24', name: 'Frame 8', source: require('../assets/frames/Asset 24.png') },
  { id: 'asset-25', name: 'Frame 9', source: require('../assets/frames/Asset 25.png') },
  { id: 'asset-26', name: 'Frame 10', source: require('../assets/frames/Asset 26.png') },
  { id: 'asset-27', name: 'Frame 11', source: require('../assets/frames/Asset 27.png') },
  { id: 'asset-28', name: 'Frame 12', source: require('../assets/frames/Asset 28.png') },
  { id: 'asset-30', name: 'Frame 13', source: require('../assets/frames/Asset 30.png') },
  { id: 'asset-31', name: 'Frame 14', source: require('../assets/frames/Asset 31.png') },
  { id: 'asset-32', name: 'Frame 15', source: require('../assets/frames/Asset 32.png') },
  { id: 'asset-33', name: 'Frame 16', source: require('../assets/frames/Asset 33_1.png') },
  { id: 'asset-34', name: 'Frame 17', source: require('../assets/frames/Asset 34.png') },
  { id: 'asset-35', name: 'Frame 18', source: require('../assets/frames/Asset 35.png') },
  { id: 'asset-36', name: 'Frame 19', source: require('../assets/frames/Asset36.png') },
  { id: 'asset-37', name: 'Frame 20', source: require('../assets/frames/Asset 37.png') },
  { id: 'asset-38', name: 'Frame 21', source: require('../assets/frames/Asset 38.png') },
  { id: 'asset-39', name: 'Frame 22', source: require('../assets/frames/Asset 39.png') },
  { id: 'asset-40', name: 'Frame 23', source: require('../assets/frames/Asset 40.png') },
  { id: 'asset-41', name: 'Frame 24', source: require('../assets/frames/Asset 41.png') },
  { id: 'asset-42', name: 'Frame 25', source: require('../assets/frames/Asset 42.png') },
  { id: 'asset-43', name: 'Frame 26', source: require('../assets/frames/Asset 43.png') },
  { id: 'asset-44', name: 'Frame 27', source: require('../assets/frames/Asset 44.png') },
  { id: 'asset-45', name: 'Frame 28', source: require('../assets/frames/Asset 45.png') },
  { id: 'asset-46', name: 'Frame 29', source: require('../assets/frames/Asset 46.png') },
  { id: 'asset-47', name: 'Frame 30', source: require('../assets/frames/Asset 47.png') },
  { id: 'asset-48', name: 'Frame 31', source: require('../assets/frames/Asset 48.png') },
  { id: 'asset-49', name: 'Frame 32', source: require('../assets/frames/Asset 49.png') },
  { id: 'asset-50', name: 'Frame 33', source: require('../assets/frames/Asset 50.png') },
  { id: 'asset-51', name: 'Frame 34', source: require('../assets/frames/Asset 51.png') },
  { id: 'asset-52', name: 'Frame 35', source: require('../assets/frames/Asset 52.png') },
  { id: 'asset-53', name: 'Frame 36', source: require('../assets/frames/Asset 53.png') },
  { id: 'asset-54', name: 'Frame 37', source: require('../assets/frames/Asset 54.png') },
  { id: 'asset-55', name: 'Frame 38', source: require('../assets/frames/Asset 55.png') },
  { id: 'asset-56', name: 'Frame 39', source: require('../assets/frames/Asset 56.png') },
];

export const getFrameById = (id: string): Frame | undefined => {
  return frames.find(f => f.id === id);
};
