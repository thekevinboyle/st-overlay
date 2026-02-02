import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { brand } from '@/constants/Colors';
import { frames, Frame } from '@/lib/frames';

interface FrameSelectorProps {
  selected: string | null;
  onChange: (frameId: string | null) => void;
}

export default function FrameSelector({ selected, onChange }: FrameSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>OVERLAYS</Text>
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

        {frames.map((frame) => {
          const isSelected = selected === frame.id;

          return (
            <TouchableOpacity
              key={frame.id}
              style={[styles.frameItem, isSelected && styles.frameItemSelected]}
              onPress={() => onChange(frame.id)}
            >
              <View style={[styles.thumbnail, isSelected && styles.thumbnailSelected]}>
                <Image source={frame.source} style={styles.thumbnailImage} />
              </View>
              <Text style={[styles.frameName, isSelected && styles.frameNameSelected]} numberOfLines={1}>
                {frame.name}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    width: 70,
  },
  frameItemSelected: {
    opacity: 1,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailSelected: {
    borderColor: brand.coral,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  noFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  noFrameText: {
    fontSize: 24,
    color: brand.gray,
  },
  frameName: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    color: brand.gray,
    marginTop: 6,
    textAlign: 'center',
  },
  frameNameSelected: {
    color: brand.coral,
    fontWeight: '600',
  },
});
