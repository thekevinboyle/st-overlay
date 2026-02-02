import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { brand } from '@/constants/Colors';
import { frames } from '@/lib/frames';

interface FrameSelectorProps {
  selected: string | null;
  onChange: (frameId: string | null) => void;
}

export default function FrameSelector({ selected, onChange }: FrameSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>OVERLAYS</Text>
        <View style={styles.labelLine} />
        <Text style={styles.count}>{frames.length}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[styles.frameItem, selected === null && styles.frameItemSelected]}
          onPress={() => onChange(null)}
          activeOpacity={0.7}
        >
          <View style={[styles.thumbnail, selected === null && styles.thumbnailSelected]}>
            <View style={styles.noFrame}>
              <Text style={styles.noFrameText}>∅</Text>
              <Text style={styles.noFrameLabel}>NONE</Text>
            </View>
          </View>
          {selected === null && <View style={styles.selectedDot} />}
        </TouchableOpacity>

        {frames.slice(0, 20).map((frame) => {
          const isSelected = selected === frame.id;

          return (
            <TouchableOpacity
              key={frame.id}
              style={[styles.frameItem, isSelected && styles.frameItemSelected]}
              onPress={() => onChange(frame.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.thumbnail, isSelected && styles.thumbnailSelected]}>
                <Image source={frame.source} style={styles.thumbnailImage} />
              </View>
              {isSelected && <View style={styles.selectedDot} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 10,
  },
  label: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    fontWeight: '700',
    color: brand.gray,
    letterSpacing: 2,
  },
  labelLine: {
    flex: 1,
    height: 1,
    backgroundColor: brand.warmGray,
  },
  count: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    color: brand.coral,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 14,
    gap: 12,
  },
  frameItem: {
    alignItems: 'center',
  },
  frameItemSelected: {
    // Selected state handled by children
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: brand.warmGray,
    backgroundColor: brand.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailSelected: {
    borderColor: brand.coral,
    borderWidth: 3,
  },
  thumbnailImage: {
    width: 52,
    height: 52,
    resizeMode: 'contain',
  },
  noFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brand.paper,
    width: '100%',
  },
  noFrameText: {
    fontSize: 18,
    color: brand.gray,
  },
  noFrameLabel: {
    fontFamily: 'RobotoMono',
    fontSize: 7,
    color: brand.gray,
    letterSpacing: 1,
    marginTop: 2,
  },
  selectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: brand.coral,
    marginTop: 6,
  },
});
