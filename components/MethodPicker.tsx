import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { brand } from '@/constants/Colors';

const METHODS = [
  { id: 'V60', icon: '▽' },
  { id: 'Espresso', icon: '◉' },
  { id: 'Aeropress', icon: '⬡' },
  { id: 'Chemex', icon: '◇' },
  { id: 'French Press', icon: '▣' },
  { id: 'Moka Pot', icon: '△' },
  { id: 'Cold Brew', icon: '❄' },
  { id: 'Pour Over', icon: '◎' },
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
      {METHODS.map((method) => {
        const isSelected = value === method.id;
        return (
          <TouchableOpacity
            key={method.id}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onChange(method.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipIcon, isSelected && styles.chipIconSelected]}>
              {method.icon}
            </Text>
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {method.id}
            </Text>
            {isSelected && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  chip: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: brand.white,
    borderWidth: 2,
    borderColor: brand.warmGray,
    borderRadius: 4,
  },
  chipSelected: {
    backgroundColor: brand.ink,
    borderColor: brand.ink,
  },
  chipIcon: {
    fontSize: 14,
    color: brand.gray,
  },
  chipIconSelected: {
    color: brand.coral,
  },
  chipText: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    fontWeight: '600',
    color: brand.ink,
    letterSpacing: 0.5,
  },
  chipTextSelected: {
    color: brand.cream,
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: -2,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    backgroundColor: brand.coral,
    transform: [{ rotate: '45deg' }],
  },
});
