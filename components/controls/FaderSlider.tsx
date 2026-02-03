import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { station } from '@/constants/Colors';
import { useState } from 'react';

interface FaderSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  showValue?: boolean;
}

const KNOB_SIZE = 28;
const TRACK_HEIGHT = 8;

export default function FaderSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  showValue = true,
}: FaderSliderProps) {
  const [trackWidth, setTrackWidth] = useState(200);
  const position = useSharedValue(valueToPosition(value));
  const scale = useSharedValue(1);
  const lastValue = useSharedValue(value);

  function valueToPosition(val: number): number {
    const range = max - min;
    const normalized = (val - min) / range;
    return normalized * (trackWidth - KNOB_SIZE);
  }

  function positionToValue(pos: number): number {
    const maxPos = trackWidth - KNOB_SIZE;
    const clampedPos = Math.max(0, Math.min(maxPos, pos));
    const normalized = clampedPos / maxPos;
    const range = max - min;
    const rawValue = min + normalized * range;
    // Snap to step
    return Math.round(rawValue / step) * step;
  }

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.1);
    })
    .onUpdate((event) => {
      const startPos = valueToPosition(value);
      const newPos = Math.max(0, Math.min(trackWidth - KNOB_SIZE, startPos + event.translationX));
      position.value = newPos;

      const newValue = positionToValue(newPos);
      if (newValue !== lastValue.value) {
        lastValue.value = newValue;
        runOnJS(triggerHaptic)();
        runOnJS(onChange)(newValue);
      }
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      position.value = withSpring(valueToPosition(lastValue.value));
    });

  const knobStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.value },
      { scale: scale.value },
    ],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: position.value + KNOB_SIZE / 2,
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTrackWidth(width);
    position.value = valueToPosition(value);
  };

  const percentage = Math.round(((value - min) / (max - min)) * 100);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.sliderContainer} onLayout={handleLayout}>
        {/* Track */}
        <View style={styles.track}>
          {/* Fill */}
          <Animated.View style={[styles.trackFill, fillStyle]} />
        </View>

        {/* Knob */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.knob, knobStyle]}>
            <View style={styles.knobInner}>
              <View style={styles.knobGrip} />
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      {showValue && (
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{percentage}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: station.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  sliderContainer: {
    height: KNOB_SIZE + 8,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  track: {
    height: TRACK_HEIGHT,
    backgroundColor: station.surfaceDark,
    borderRadius: TRACK_HEIGHT / 2,
    overflow: 'hidden',
    // Inner shadow
    borderWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.3)',
    borderLeftColor: 'rgba(0,0,0,0.2)',
    borderRightColor: 'rgba(255,255,255,0.05)',
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: station.accent,
    borderRadius: TRACK_HEIGHT / 2,
  },
  knob: {
    position: 'absolute',
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: station.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    // Glossy effect
    borderWidth: 1,
    borderTopColor: station.glossHighlight,
    borderLeftColor: station.glossSubtle,
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  knobInner: {
    width: KNOB_SIZE - 8,
    height: KNOB_SIZE - 8,
    borderRadius: (KNOB_SIZE - 8) / 2,
    backgroundColor: station.surfaceMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  knobGrip: {
    width: 8,
    height: 2,
    backgroundColor: station.accent,
    borderRadius: 1,
  },
  valueContainer: {
    alignItems: 'center',
  },
  valueText: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    color: station.textSecondary,
  },
});
