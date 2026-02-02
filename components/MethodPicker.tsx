import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { brand } from '@/constants/Colors';

const METHODS = [
  'V60',
  'Espresso',
  'Aeropress',
  'Chemex',
  'French Press',
  'Moka Pot',
  'Cold Brew',
  'Pour Over',
  'Other',
];

interface MethodPickerProps {
  value: string;
  onChange: (method: string) => void;
}

export default function MethodPicker({ value, onChange }: MethodPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {METHODS.map((method) => (
        <TouchableOpacity
          key={method}
          style={[styles.chip, value === method && styles.chipSelected]}
          onPress={() => onChange(method)}
        >
          <Text
            style={[styles.chipText, value === method && styles.chipTextSelected]}
          >
            {method}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: brand.coral,
    borderColor: brand.coral,
  },
  chipText: {
    fontFamily: 'RobotoMono',
    fontSize: 14,
    color: brand.black,
  },
  chipTextSelected: {
    color: brand.white,
    fontWeight: '600',
  },
});
