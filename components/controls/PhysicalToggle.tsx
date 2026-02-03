import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { station } from '@/constants/Colors';

interface PhysicalToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  labelLeft: string;
  labelRight: string;
}

const TRACK_WIDTH = 120;
const TRACK_PADDING = 4;
const HANDLE_WIDTH = 52;

export default function PhysicalToggle({
  value,
  onChange,
  labelLeft,
  labelRight,
}: PhysicalToggleProps) {
  const position = useSharedValue(value ? TRACK_WIDTH - HANDLE_WIDTH - TRACK_PADDING * 2 : 0);
  const scale = useSharedValue(1);

  const handlePress = () => {
    const newValue = !value;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    position.value = withSpring(
      newValue ? TRACK_WIDTH - HANDLE_WIDTH - TRACK_PADDING * 2 : 0,
      { damping: 15, stiffness: 150 }
    );

    onChange(newValue);
  };

  const handleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={handlePress}
        style={styles.track}
      >
        {/* Labels on track */}
        <View style={styles.labelContainer}>
          <Text style={[styles.trackLabel, !value && styles.trackLabelActive]}>
            {labelLeft}
          </Text>
          <Text style={[styles.trackLabel, value && styles.trackLabelActive]}>
            {labelRight}
          </Text>
        </View>

        {/* Sliding handle */}
        <Animated.View style={[styles.handle, handleStyle]}>
          <View style={styles.handleInner}>
            <View style={styles.handleGrip} />
            <View style={styles.handleGrip} />
            <View style={styles.handleGrip} />
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  track: {
    width: TRACK_WIDTH,
    height: 36,
    backgroundColor: station.surfaceDark,
    borderRadius: 8,
    padding: TRACK_PADDING,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    // Inner shadow effect
    borderWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.3)',
    borderLeftColor: 'rgba(0,0,0,0.2)',
    borderRightColor: 'rgba(255,255,255,0.05)',
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  labelContainer: {
    position: 'absolute',
    left: TRACK_PADDING,
    right: TRACK_PADDING,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  trackLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
    color: station.textMuted,
    letterSpacing: 0.5,
  },
  trackLabelActive: {
    color: station.accent,
  },
  handle: {
    width: HANDLE_WIDTH,
    height: 28,
    backgroundColor: station.surfaceLight,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    // Glossy effect
    borderWidth: 1,
    borderTopColor: station.glossHighlight,
    borderLeftColor: station.glossSubtle,
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  handleInner: {
    flexDirection: 'row',
    gap: 3,
  },
  handleGrip: {
    width: 2,
    height: 12,
    backgroundColor: station.surfaceMid,
    borderRadius: 1,
  },
});
