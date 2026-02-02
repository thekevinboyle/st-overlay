import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { brand, theme } from '@/constants/Colors';
import { BrewData, FilterName } from '@/lib/types';
import { getFrameById } from '@/lib/frames';
import DataCard from '@/components/DataCard';
import FilterSelector from '@/components/FilterSelector';
import FrameSelector from '@/components/FrameSelector';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PREVIEW_WIDTH = SCREEN_WIDTH - 48;
const PREVIEW_HEIGHT = PREVIEW_WIDTH * 1.25;

export default function EditorScreen() {
  const { imageUri, brewData } = useLocalSearchParams<{
    imageUri: string;
    brewData: string;
  }>();

  const parsedBrewData: BrewData = brewData ? JSON.parse(brewData) : {};
  const fadeIn = useRef(new Animated.Value(0)).current;

  const [selectedFilter, setSelectedFilter] = useState<FilterName>('coral-haze');
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState({ x: 12, y: PREVIEW_HEIGHT - 200 });
  const [cardTheme, setCardTheme] = useState<'light' | 'dark'>('light');

  const selectedFrame = selectedFrameId ? getFrameById(selectedFrameId) : null;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← BACK</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerStep}>STEP 03</Text>
          <Text style={styles.title}>STYLE IT</Text>
        </View>
        <TouchableOpacity
          onPress={() => setCardTheme(t => t === 'light' ? 'dark' : 'light')}
          style={styles.themeButton}
        >
          <Text style={styles.themeButtonText}>
            {cardTheme === 'light' ? '◐' : '◑'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Preview */}
      <Animated.View style={[styles.previewContainer, { opacity: fadeIn }]}>
        <View style={styles.previewWrapper}>
          {/* Decorative corners */}
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />

          <View style={styles.preview}>
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

            {/* VHS effect */}
            {selectedFilter === 'vhs-cafe' && (
              <>
                <View style={styles.scanLines} />
                <View style={styles.vhsNoise} />
              </>
            )}

            {/* Frame overlay */}
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
        </View>

        <View style={styles.hintContainer}>
          <View style={styles.hintLine} />
          <Text style={styles.hint}>drag the card to reposition</Text>
          <View style={styles.hintLine} />
        </View>
      </Animated.View>

      {/* Controls */}
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

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <View style={styles.exportButtonInner}>
            <Text style={styles.exportButtonText}>EXPORT</Text>
            <Text style={styles.exportButtonArrow}>→</Text>
          </View>
          <View style={styles.exportButtonShadow} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.cream,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: brand.warmGray,
  },
  backButton: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  backButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    fontWeight: '600',
    color: brand.gray,
    letterSpacing: 1,
  },
  headerTitle: {
    alignItems: 'center',
  },
  headerStep: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    color: brand.coral,
    letterSpacing: 2,
  },
  title: {
    fontFamily: 'RobotoMono',
    fontSize: 16,
    fontWeight: '700',
    color: brand.ink,
    letterSpacing: 2,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: brand.warmGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 20,
    color: brand.ink,
  },
  previewContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  previewWrapper: {
    position: 'relative',
    padding: 4,
  },
  cornerTL: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: brand.coral,
  },
  cornerTR: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: brand.coral,
  },
  cornerBL: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: brand.coral,
  },
  cornerBR: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: brand.coral,
  },
  preview: {
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    backgroundColor: brand.ink,
    overflow: 'hidden',
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
    backgroundColor: 'rgba(242, 148, 150, 0.18)',
  },
  vhsFilter: {
    backgroundColor: 'rgba(60, 45, 35, 0.3)',
  },
  filmFilter: {
    backgroundColor: 'rgba(255, 235, 210, 0.1)',
  },
  scanLines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.04,
    backgroundColor: 'transparent',
  },
  vhsNoise: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.03,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  frameOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  hintLine: {
    width: 30,
    height: 1,
    backgroundColor: brand.warmGray,
  },
  hint: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    color: brand.gray,
    letterSpacing: 1,
  },
  controls: {
    flex: 1,
    backgroundColor: brand.paper,
    borderTopWidth: 2,
    borderTopColor: brand.warmGray,
  },
  footer: {
    padding: 20,
    backgroundColor: brand.cream,
    borderTopWidth: 2,
    borderTopColor: brand.warmGray,
  },
  exportButton: {
    position: 'relative',
  },
  exportButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: brand.ink,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 4,
    transform: [{ translateY: -4 }],
  },
  exportButtonShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: brand.espresso,
    borderRadius: 4,
    zIndex: -1,
  },
  exportButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 15,
    fontWeight: '700',
    color: brand.cream,
    letterSpacing: 2,
  },
  exportButtonArrow: {
    fontFamily: 'RobotoMono',
    fontSize: 18,
    color: brand.coral,
    fontWeight: '700',
  },
});
