import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { station } from '@/constants/Colors';

interface RotaryKnobProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  unit: string;
  size?: number;
}

export default function RotaryKnob({
  value,
  onChange,
  min,
  max,
  step,
  label,
  unit,
  size = 80,
}: RotaryKnobProps) {
  const rotation = useSharedValue(valueToRotation(value, min, max));
  const scale = useSharedValue(1);
  const lastValue = useSharedValue(value);

  function valueToRotation(val: number, minVal: number, maxVal: number): number {
    const range = maxVal - minVal;
    const normalized = (val - minVal) / range;
    // Map to -135 to 135 degrees (270 degree sweep)
    return -135 + normalized * 270;
  }

  function rotationToValue(rot: number, minVal: number, maxVal: number, stepVal: number): number {
    // Clamp rotation to valid range
    const clampedRot = Math.max(-135, Math.min(135, rot));
    const normalized = (clampedRot + 135) / 270;
    const range = maxVal - minVal;
    const rawValue = minVal + normalized * range;
    // Snap to step
    return Math.round(rawValue / stepVal) * stepVal;
  }

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      // Use vertical drag to control rotation (more intuitive)
      const sensitivity = 1.5;
      const deltaRotation = -event.translationY * sensitivity;
      const newRotation = valueToRotation(value, min, max) + deltaRotation;
      rotation.value = Math.max(-135, Math.min(135, newRotation));

      const newValue = rotationToValue(rotation.value, min, max, step);
      if (newValue !== lastValue.value) {
        lastValue.value = newValue;
        runOnJS(triggerHaptic)();
        runOnJS(onChange)(newValue);
      }
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      // Snap rotation to final value
      rotation.value = withSpring(valueToRotation(lastValue.value, min, max));
    });

  const knobStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  // Generate notch marks
  const notches = [];
  const notchCount = 12;
  for (let i = 0; i < notchCount; i++) {
    const angle = -135 + (i / (notchCount - 1)) * 270;
    notches.push(
      <View
        key={i}
        style={[
          styles.notch,
          {
            transform: [
              { rotate: `${angle}deg` },
              { translateY: -(size / 2 + 4) },
            ],
          },
        ]}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.knobContainer, { width: size + 20, height: size + 20 }]}>
        {/* Notch marks */}
        <View style={styles.notchContainer}>
          {notches}
        </View>

        {/* Outer ring */}
        <View style={[styles.outerRing, { width: size, height: size, borderRadius: size / 2 }]}>
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[
                styles.knob,
                { width: size - 12, height: size - 12, borderRadius: (size - 12) / 2 },
                knobStyle,
              ]}
            >
              {/* Indicator line */}
              <View style={styles.indicator} />
              {/* Center cap */}
              <View style={[styles.centerCap, { width: size / 3, height: size / 3, borderRadius: size / 6 }]} />
            </Animated.View>
          </GestureDetector>
        </View>
      </View>

      {/* LCD-style display */}
      <View style={styles.lcdDisplay}>
        <Text style={styles.lcdText}>
          {value.toFixed(step < 1 ? 1 : 0)}{unit}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: station.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  knobContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notchContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notch: {
    position: 'absolute',
    width: 2,
    height: 6,
    backgroundColor: station.surfaceMid,
    borderRadius: 1,
  },
  outerRing: {
    backgroundColor: station.surfaceMid,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: station.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  knob: {
    backgroundColor: station.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopColor: station.glossHighlight,
    borderLeftColor: station.glossSubtle,
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.15)',
  },
  indicator: {
    position: 'absolute',
    top: 8,
    width: 3,
    height: 12,
    backgroundColor: station.accent,
    borderRadius: 1.5,
  },
  centerCap: {
    backgroundColor: station.surfaceMid,
    borderWidth: 1,
    borderTopColor: station.glossSubtle,
    borderLeftColor: station.glossSubtle,
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  lcdDisplay: {
    backgroundColor: station.lcdBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: station.surfaceDark,
  },
  lcdText: {
    fontFamily: 'RobotoMono',
    fontSize: 14,
    color: station.lcdText,
    fontWeight: '600',
  },
});
