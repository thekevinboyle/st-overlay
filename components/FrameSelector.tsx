import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { brand } from '@/constants/Colors';

interface FrameSelectorProps {
  frames: string[];
  selected: string | null;
  onChange: (frame: string | null) => void;
}

export default function FrameSelector({ frames, selected, onChange }: FrameSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>FRAMES</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[styles.frameItem, selected === null && styles.frameItemSelected]}
          onPress={() => onChange(null)}
        >
          <View style={[styles.thumbnail, selected === null && styles.thumbnailSelected]}>
            <View style={styles.noFrame}>
              <Text style={styles.noFrameText}>∅</Text>
            </View>
          </View>
          <Text style={[styles.frameName, selected === null && styles.frameNameSelected]}>
            None
          </Text>
        </TouchableOpacity>

        {frames.map((frame, index) => {
          const isSelected = selected === frame;
          const frameName = frame.split('/').pop()?.replace(/\.[^/.]+$/, '') || `Frame ${index + 1}`;

          return (
            <TouchableOpacity
              key={frame}
              style={[styles.frameItem, isSelected && styles.frameItemSelected]}
              onPress={() => onChange(frame)}
            >
              <View style={[styles.thumbnail, isSelected && styles.thumbnailSelected]}>
                <Image source={{ uri: frame }} style={styles.thumbnailImage} />
              </View>
              <Text style={[styles.frameName, isSelected && styles.frameNameSelected]}>
                {frameName}
              </Text>
            </TouchableOpacity>
          );
        })}

        {frames.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Add frames to{'\n'}/assets/frames/</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  label: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    fontWeight: '600',
    color: brand.gray,
    letterSpacing: 2,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 12,
  },
  frameItem: {
    alignItems: 'center',
    opacity: 0.7,
  },
  frameItemSelected: {
    opacity: 1,
  },
  thumbnail: {
    width: 70,
    height: 88,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f0f0f0',
  },
  thumbnailSelected: {
    borderColor: brand.coral,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  noFrameText: {
    fontSize: 24,
    color: brand.gray,
  },
  frameName: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    color: brand.gray,
    marginTop: 6,
  },
  frameNameSelected: {
    color: brand.coral,
    fontWeight: '600',
  },
  emptyState: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  emptyText: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    color: brand.gray,
    textAlign: 'center',
    lineHeight: 18,
  },
});
