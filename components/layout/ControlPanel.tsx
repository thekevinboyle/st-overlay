import { View, StyleSheet, ScrollView } from 'react-native';
import { station } from '@/constants/Colors';

interface ControlPanelProps {
  children: React.ReactNode;
}

export default function ControlPanel({ children }: ControlPanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.handle} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: station.surfaceLight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Top shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    // Highlight at top
    borderTopWidth: 1,
    borderTopColor: station.glossHighlight,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    backgroundColor: station.surfaceMid,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 4,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
});
