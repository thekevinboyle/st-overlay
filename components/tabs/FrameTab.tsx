import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import { station } from '@/constants/Colors';
import { frames } from '@/lib/frames';
import SectionHeader from '@/components/layout/SectionHeader';
import PhysicalToggle from '@/components/controls/PhysicalToggle';

interface FrameTabProps {
  frameId: string | null;
  onFrameChange: (id: string | null) => void;
  cardTheme: 'light' | 'dark';
  onCardThemeChange: (theme: 'light' | 'dark') => void;
}

export default function FrameTab({
  frameId,
  onFrameChange,
  cardTheme,
  onCardThemeChange,
}: FrameTabProps) {
  const handleFrameSelect = (id: string | null) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onFrameChange(id);
  };

  return (
    <View style={styles.container}>
      {/* Frame Selection */}
      <SectionHeader label="Select Frame" />
      <View style={styles.section}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.frameScroll}
        >
          {/* None option */}
          <TouchableOpacity
            onPress={() => handleFrameSelect(null)}
            activeOpacity={0.8}
          >
            <View style={[
              styles.frameSlot,
              frameId === null && styles.frameSlotSelected,
            ]}>
              <View style={[
                styles.frameThumbnail,
                frameId === null && styles.frameThumbnailSelected,
              ]}>
                <Text style={styles.noneIcon}>∅</Text>
                <Text style={styles.noneLabel}>NONE</Text>
              </View>
              {frameId === null && <View style={styles.frameIndicator} />}
            </View>
          </TouchableOpacity>

          {/* Frame options */}
          {frames.slice(0, 20).map((frame) => {
            const isSelected = frameId === frame.id;
            return (
              <TouchableOpacity
                key={frame.id}
                onPress={() => handleFrameSelect(frame.id)}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.frameSlot,
                  isSelected && styles.frameSlotSelected,
                ]}>
                  <View style={[
                    styles.frameThumbnail,
                    isSelected && styles.frameThumbnailSelected,
                  ]}>
                    <Image source={frame.source} style={styles.frameImage} />
                  </View>
                  {isSelected && <View style={styles.frameIndicator} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Card Theme */}
      <SectionHeader label="Data Card Theme" />
      <View style={styles.section}>
        <View style={styles.toggleRow}>
          <PhysicalToggle
            value={cardTheme === 'dark'}
            onChange={(isDark) => onCardThemeChange(isDark ? 'dark' : 'light')}
            labelLeft="LIGHT"
            labelRight="DARK"
          />
        </View>
        <Text style={styles.hint}>
          Tip: Drag the card on the preview to reposition it
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  section: {
    marginBottom: 16,
  },
  frameScroll: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    gap: 12,
  },
  frameSlot: {
    alignItems: 'center',
    gap: 8,
  },
  frameSlotSelected: {},
  frameThumbnail: {
    width: 72,
    height: 72,
    backgroundColor: station.surfaceDark,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: station.surfaceMid,
    overflow: 'hidden',
  },
  frameThumbnailSelected: {
    borderColor: station.accent,
    shadowColor: station.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  frameImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noneIcon: {
    fontSize: 24,
    color: station.textMuted,
  },
  noneLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 9,
    color: station.textMuted,
    letterSpacing: 0.5,
    marginTop: 4,
  },
  frameIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: station.accent,
  },
  toggleRow: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  hint: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: station.textMuted,
    textAlign: 'center',
    marginTop: 12,
  },
});
