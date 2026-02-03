import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { station } from '@/constants/Colors';
import { SegmentOption } from '@/lib/types';

interface SegmentButtonsProps {
  options: SegmentOption[];
  selected: string;
  onChange: (id: string) => void;
  scrollable?: boolean;
}

export default function SegmentButtons({
  options,
  selected,
  onChange,
  scrollable = false,
}: SegmentButtonsProps) {
  const handlePress = (id: string) => {
    if (id !== selected) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onChange(id);
    }
  };

  const renderButtons = () => (
    <>
      {options.map((option, index) => {
        const isSelected = selected === option.id;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => handlePress(option.id)}
            activeOpacity={0.8}
            style={[
              styles.button,
              isFirst && styles.buttonFirst,
              isLast && styles.buttonLast,
              isSelected && styles.buttonSelected,
            ]}
          >
            <View style={styles.buttonContent}>
              {option.icon && (
                <Text style={[styles.icon, isSelected && styles.iconSelected]}>
                  {option.icon}
                </Text>
              )}
              <Text style={[styles.label, isSelected && styles.labelSelected]}>
                {option.label}
              </Text>
            </View>
            {isSelected && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          {renderButtons()}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {renderButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 4,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: station.surfaceMid,
    borderRadius: 8,
    padding: 3,
    shadowColor: station.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    flex: 1,
    minWidth: 56,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: station.surfaceLight,
    borderRadius: 6,
    marginHorizontal: 1,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopColor: station.glossSubtle,
  },
  buttonFirst: {
    marginLeft: 0,
  },
  buttonLast: {
    marginRight: 0,
  },
  buttonSelected: {
    backgroundColor: station.surfaceDark,
    borderTopColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonContent: {
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    fontSize: 14,
    color: station.textSecondary,
  },
  iconSelected: {
    color: station.accent,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: station.textSecondary,
    letterSpacing: 0.5,
  },
  labelSelected: {
    color: station.white,
  },
  indicator: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: station.accent,
  },
});
