import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import * as Haptics from 'expo-haptics';
import { station } from '@/constants/Colors';

interface NumericStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit: string;
  label: string;
}

export default function NumericStepper({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  unit,
  label,
}: NumericStepperProps) {
  const [isPressingMinus, setIsPressingMinus] = useState(false);
  const [isPressingPlus, setIsPressingPlus] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<TextInput>(null);

  const increment = () => {
    const newValue = Math.min(max, value + step);
    if (newValue !== value) {
      onChange(newValue);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const decrement = () => {
    const newValue = Math.max(min, value - step);
    if (newValue !== value) {
      onChange(newValue);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const startHolding = (action: 'increment' | 'decrement') => {
    const fn = action === 'increment' ? increment : decrement;
    fn();

    // Start rapid fire after 400ms hold
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(fn, 80);
    }, 400);
  };

  const stopHolding = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopHolding();
    };
  }, []);

  const formatValue = () => {
    if (step < 1) {
      return value.toFixed(1);
    }
    return value.toString();
  };

  const handleDisplayPress = () => {
    setEditValue(formatValue());
    setIsEditing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Focus the input after state update
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleSubmit = () => {
    const parsed = parseFloat(editValue);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      // Round to step precision
      const rounded = step < 1
        ? Math.round(clamped / step) * step
        : Math.round(clamped);
      onChange(rounded);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.stepper}>
        {/* Minus button */}
        <Pressable
          onPressIn={() => {
            setIsPressingMinus(true);
            startHolding('decrement');
          }}
          onPressOut={() => {
            setIsPressingMinus(false);
            stopHolding();
          }}
          style={[
            styles.button,
            styles.buttonLeft,
            isPressingMinus && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, isPressingMinus && styles.buttonTextPressed]}>−</Text>
        </Pressable>

        {/* LCD Display - Tappable to edit */}
        <Pressable onPress={handleDisplayPress} style={styles.display}>
          {isEditing ? (
            <TextInput
              ref={inputRef}
              style={styles.displayInput}
              value={editValue}
              onChangeText={setEditValue}
              onBlur={handleBlur}
              onSubmitEditing={handleSubmit}
              keyboardType="decimal-pad"
              selectTextOnFocus
              returnKeyType="done"
            />
          ) : (
            <Text style={styles.displayText}>{formatValue()}</Text>
          )}
          <Text style={styles.unitText}>{unit}</Text>
        </Pressable>

        {/* Plus button */}
        <Pressable
          onPressIn={() => {
            setIsPressingPlus(true);
            startHolding('increment');
          }}
          onPressOut={() => {
            setIsPressingPlus(false);
            stopHolding();
          }}
          style={[
            styles.button,
            styles.buttonRight,
            isPressingPlus && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, isPressingPlus && styles.buttonTextPressed]}>+</Text>
        </Pressable>
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
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: station.surfaceMid,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: station.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: station.surfaceLight,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopColor: station.glossHighlight,
  },
  buttonLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 1,
    borderRightColor: station.surfaceMid,
  },
  buttonRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 1,
    borderLeftColor: station.surfaceMid,
  },
  buttonPressed: {
    backgroundColor: station.surfaceMid,
    borderTopColor: 'transparent',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '300',
    color: station.textPrimary,
  },
  buttonTextPressed: {
    color: station.accent,
  },
  display: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    backgroundColor: station.lcdBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 80,
    gap: 2,
  },
  displayText: {
    fontFamily: 'RobotoMono',
    fontSize: 18,
    color: station.lcdText,
    fontWeight: '600',
  },
  displayInput: {
    fontFamily: 'RobotoMono',
    fontSize: 18,
    color: station.lcdText,
    fontWeight: '600',
    minWidth: 50,
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
  unitText: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    color: station.lcdText,
    opacity: 0.7,
  },
});
