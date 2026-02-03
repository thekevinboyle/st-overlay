import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { station } from '@/constants/Colors';
import { FilterName, filters } from '@/lib/types';

interface FilterCartridgeProps {
  selected: FilterName;
  onChange: (filter: FilterName) => void;
}

const FILTER_ORDER: FilterName[] = ['none', 'coral-haze', 'vhs-cafe', 'film-grain'];

const FILTER_ICONS: Record<FilterName, string> = {
  'none': '○',
  'coral-haze': '◐',
  'vhs-cafe': '▤',
  'film-grain': '◉',
};

export default function FilterCartridge({
  selected,
  onChange,
}: FilterCartridgeProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTER_ORDER.map((filterName) => (
        <CartridgeButton
          key={filterName}
          filterName={filterName}
          isSelected={selected === filterName}
          onPress={() => onChange(filterName)}
        />
      ))}
    </ScrollView>
  );
}

interface CartridgeButtonProps {
  filterName: FilterName;
  isSelected: boolean;
  onPress: () => void;
}

function CartridgeButton({ filterName, isSelected, onPress }: CartridgeButtonProps) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Press animation
    scale.value = withSpring(0.95, { damping: 15 });
    translateY.value = withSpring(2, { damping: 15 });

    setTimeout(() => {
      scale.value = withSpring(1);
      translateY.value = withSpring(0);
    }, 100);

    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const filter = filters[filterName];

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <Animated.View style={[styles.cartridge, animatedStyle]}>
        {/* Slot housing */}
        <View style={styles.slot}>
          {/* Cartridge body */}
          <View style={[
            styles.cartridgeBody,
            isSelected && styles.cartridgeBodySelected,
          ]}>
            {/* Top notch */}
            <View style={styles.notch} />

            {/* Icon */}
            <Text style={[styles.icon, isSelected && styles.iconSelected]}>
              {FILTER_ICONS[filterName]}
            </Text>

            {/* Label */}
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {filterName === 'none' ? 'RAW' : filter.label.split(' ')[0].toUpperCase()}
            </Text>

            {/* Selected indicator */}
            {isSelected && <View style={styles.indicator} />}
          </View>
        </View>

        {/* Shadow base */}
        <View style={styles.shadowBase} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 12,
  },
  cartridge: {
    alignItems: 'center',
  },
  slot: {
    backgroundColor: station.surfaceDark,
    borderRadius: 8,
    padding: 4,
    // Inner shadow effect
    borderWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.4)',
    borderLeftColor: 'rgba(0,0,0,0.3)',
    borderRightColor: 'rgba(255,255,255,0.05)',
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  cartridgeBody: {
    width: 64,
    height: 80,
    backgroundColor: station.surfaceLight,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    // Glossy effect
    borderWidth: 1,
    borderTopColor: station.glossHighlight,
    borderLeftColor: station.glossSubtle,
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.15)',
  },
  cartridgeBodySelected: {
    backgroundColor: station.surfaceMid,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  notch: {
    position: 'absolute',
    top: 6,
    width: 20,
    height: 4,
    backgroundColor: station.surfaceMid,
    borderRadius: 2,
  },
  icon: {
    fontSize: 20,
    color: station.textSecondary,
    marginTop: 8,
  },
  iconSelected: {
    color: station.accent,
  },
  label: {
    fontFamily: 'Inter-Bold',
    fontSize: 9,
    color: station.textSecondary,
    letterSpacing: 0.5,
  },
  labelSelected: {
    color: station.textPrimary,
  },
  indicator: {
    position: 'absolute',
    bottom: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: station.accent,
    shadowColor: station.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  shadowBase: {
    position: 'absolute',
    bottom: -2,
    left: 4,
    right: 4,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
    zIndex: -1,
  },
});
