import { View, Text, StyleSheet } from 'react-native';
import { station } from '@/constants/Colors';

interface SectionHeaderProps {
  label: string;
}

export default function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  label: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    color: station.textSecondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: station.surfaceMid,
  },
});
