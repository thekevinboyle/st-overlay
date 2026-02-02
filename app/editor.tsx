import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { brand } from '@/constants/Colors';
import { BrewData, FilterName } from '@/lib/types';
import { getFrameById } from '@/lib/frames';
import DataCard from '@/components/DataCard';
import FilterSelector from '@/components/FilterSelector';
import FrameSelector from '@/components/FrameSelector';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PREVIEW_WIDTH = SCREEN_WIDTH - 32;
const PREVIEW_HEIGHT = PREVIEW_WIDTH * 1.25; // 4:5 aspect ratio

export default function EditorScreen() {
  const { imageUri, brewData } = useLocalSearchParams<{
    imageUri: string;
    brewData: string;
  }>();

  const parsedBrewData: BrewData = brewData ? JSON.parse(brewData) : {};

  const [selectedFilter, setSelectedFilter] = useState<FilterName>('coral-haze');
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState({ x: 16, y: PREVIEW_HEIGHT - 180 });
  const [cardTheme, setCardTheme] = useState<'light' | 'dark'>('light');

  const selectedFrame = selectedFrameId ? getFrameById(selectedFrameId) : null;

  const handleExport = () => {
    router.push({
      pathname: '/export',
      params: {
        imageUri,
        brewData,
        filter: selectedFilter,
        frameId: selectedFrameId || '',
        cardPosition: JSON.stringify(cardPosition),
        cardTheme,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Style</Text>
        <TouchableOpacity onPress={() => setCardTheme(t => t === 'light' ? 'dark' : 'light')}>
          <Text style={styles.themeToggle}>{cardTheme === 'light' ? '◐' : '◑'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previewContainer}>
        <View style={styles.preview}>
          {/* Base image with filter */}
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Filter overlay */}
          {selectedFilter !== 'none' && (
            <View
              style={[
                styles.filterOverlay,
                selectedFilter === 'coral-haze' && styles.coralFilter,
                selectedFilter === 'vhs-cafe' && styles.vhsFilter,
                selectedFilter === 'film-grain' && styles.filmFilter,
              ]}
            />
          )}

          {/* VHS scan lines effect */}
          {selectedFilter === 'vhs-cafe' && (
            <View style={styles.scanLines} pointerEvents="none" />
          )}

          {/* Frame/Overlay */}
          {selectedFrame && (
            <Image
              source={selectedFrame.source}
              style={styles.frameOverlay}
              resizeMode="contain"
            />
          )}

          {/* Data card */}
          <DataCard
            data={parsedBrewData}
            position={cardPosition}
            onPositionChange={setCardPosition}
            containerSize={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
            theme={cardTheme}
          />
        </View>

        <Text style={styles.hint}>Drag the card to reposition</Text>
      </View>

      <View style={styles.controls}>
        <FilterSelector
          imageUri={imageUri!}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />

        <FrameSelector
          selected={selectedFrameId}
          onChange={setSelectedFrameId}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Text style={styles.exportButtonText}>Export →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    fontFamily: 'RobotoMono',
    fontSize: 14,
    color: brand.black,
  },
  title: {
    fontFamily: 'RobotoMono',
    fontSize: 16,
    fontWeight: '600',
    color: brand.black,
  },
  themeToggle: {
    fontSize: 24,
    color: brand.black,
  },
  previewContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  preview: {
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  filterOverlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  coralFilter: {
    backgroundColor: 'rgba(242, 148, 150, 0.2)',
  },
  vhsFilter: {
    backgroundColor: 'rgba(80, 60, 40, 0.25)',
  },
  filmFilter: {
    backgroundColor: 'rgba(255, 230, 200, 0.12)',
  },
  scanLines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    backgroundColor: 'transparent',
  },
  frameOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  hint: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    color: brand.gray,
    marginTop: 8,
  },
  controls: {
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  exportButton: {
    backgroundColor: brand.black,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  exportButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 16,
    fontWeight: '600',
    color: brand.white,
    letterSpacing: 1,
  },
});
