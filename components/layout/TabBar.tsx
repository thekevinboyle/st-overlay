import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { station } from '@/constants/Colors';
import { StationTab } from '@/lib/types';

interface TabBarProps {
  activeTab: StationTab;
  onChange: (tab: StationTab) => void;
  disabled?: boolean;
}

const TABS: { id: StationTab; label: string; icon: string }[] = [
  { id: 'data', label: 'DATA', icon: '◈' },
  { id: 'style', label: 'STYLE', icon: '◐' },
  { id: 'frame', label: 'FRAME', icon: '▣' },
  { id: 'export', label: 'EXPORT', icon: '↗' },
];

export default function TabBar({ activeTab, onChange, disabled = false }: TabBarProps) {
  const handlePress = (tab: StationTab) => {
    if (disabled) return;
    if (tab !== activeTab) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onChange(tab);
    }
  };

  return (
    <View style={[styles.container, disabled && styles.containerDisabled]}>
      {TABS.map((tab, index) => {
        const isActive = activeTab === tab.id;
        const isFirst = index === 0;
        const isLast = index === TABS.length - 1;

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => handlePress(tab.id)}
            activeOpacity={disabled ? 1 : 0.8}
            style={[
              styles.tab,
              isFirst && styles.tabFirst,
              isLast && styles.tabLast,
              isActive && styles.tabActive,
              disabled && styles.tabDisabled,
            ]}
          >
            <Text style={[
              styles.icon,
              isActive && styles.iconActive,
              disabled && styles.textDisabled,
            ]}>
              {tab.icon}
            </Text>
            <Text style={[
              styles.label,
              isActive && styles.labelActive,
              disabled && styles.textDisabled,
            ]}>
              {tab.label}
            </Text>
            {isActive && !disabled && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: station.surfaceMid,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: station.surfaceLight,
    borderRadius: 8,
    marginHorizontal: 2,
    gap: 4,
    // Glossy effect
    borderWidth: 1,
    borderTopColor: station.glossSubtle,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  tabFirst: {
    marginLeft: 0,
  },
  tabLast: {
    marginRight: 0,
  },
  tabActive: {
    backgroundColor: station.accent,
    borderTopColor: 'rgba(255,255,255,0.3)',
    shadowColor: station.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tabDisabled: {
    backgroundColor: station.surfaceLight,
  },
  icon: {
    fontSize: 16,
    color: station.textSecondary,
  },
  iconActive: {
    color: station.white,
  },
  label: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: station.textSecondary,
    letterSpacing: 1,
  },
  labelActive: {
    color: station.white,
  },
  textDisabled: {
    color: station.textMuted,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: station.white,
  },
});
