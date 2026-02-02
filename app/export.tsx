import { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { brand } from '@/constants/Colors';
import { BrewData, FilterName } from '@/lib/types';
import DataCard from '@/components/DataCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PREVIEW_WIDTH = SCREEN_WIDTH - 64;
const PREVIEW_HEIGHT = PREVIEW_WIDTH * 1.25;

export default function ExportScreen() {
  const params = useLocalSearchParams<{
    imageUri: string;
    brewData: string;
    filter: FilterName;
    frame: string;
    cardPosition: string;
    cardTheme: 'light' | 'dark';
  }>();

  const parsedBrewData: BrewData = params.brewData ? JSON.parse(params.brewData) : {};
  const cardPosition = params.cardPosition ? JSON.parse(params.cardPosition) : { x: 16, y: 200 };
  const viewRef = useRef<View>(null);
  const [saving, setSaving] = useState(false);

  const captureImage = async (): Promise<string | null> => {
    if (!viewRef.current) return null;

    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
        result: 'tmpfile',
      });
      return uri;
    } catch (error) {
      console.error('Error capturing image:', error);
      return null;
    }
  };

  const handleShare = async () => {
    setSaving(true);
    try {
      const uri = await captureImage();
      if (uri && await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/png',
          dialogTitle: 'Share your brew',
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share image');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow access to save photos');
        return;
      }

      const uri = await captureImage();
      if (uri) {
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert('Saved!', 'Image saved to your camera roll');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save image');
    } finally {
      setSaving(false);
    }
  };

  const handleDone = () => {
    router.dismissAll();
    router.replace('/');
  };

  // Scale card position for smaller preview
  const scale = PREVIEW_WIDTH / (SCREEN_WIDTH - 32);
  const scaledCardPosition = {
    x: cardPosition.x * scale,
    y: cardPosition.y * scale,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Export</Text>
        <TouchableOpacity onPress={handleDone}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View
          ref={viewRef}
          style={styles.preview}
          collapsable={false}
        >
          <Image
            source={{ uri: params.imageUri }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Filter overlay */}
          {params.filter !== 'none' && (
            <View
              style={[
                styles.filterOverlay,
                params.filter === 'coral-haze' && styles.coralFilter,
                params.filter === 'vhs-cafe' && styles.vhsFilter,
                params.filter === 'film-grain' && styles.filmFilter,
              ]}
            />
          )}

          {/* Frame overlay */}
          {params.frame && (
            <Image
              source={{ uri: params.frame }}
              style={styles.frameOverlay}
              resizeMode="cover"
            />
          )}

          {/* Static data card (not draggable) */}
          <View
            style={[
              styles.cardContainer,
              { left: scaledCardPosition.x, top: scaledCardPosition.y },
            ]}
          >
            <StaticDataCard data={parsedBrewData} theme={params.cardTheme || 'light'} />
          </View>
        </View>

        <Text style={styles.readyText}>Ready to share!</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleShare}
          disabled={saving}
        >
          <Text style={styles.primaryButtonText}>
            {saving ? 'Processing...' : 'Share'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.secondaryButtonText}>
            Save to Camera Roll
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function StaticDataCard({ data, theme }: { data: BrewData; theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)';
  const textColor = isDark ? brand.white : brand.black;
  const secondaryColor = isDark ? '#aaa' : brand.gray;

  const hasData = data.coffeeName || data.dose || data.brewMethod;
  if (!hasData) return null;

  const renderStars = () => {
    if (!data.rating) return null;
    return '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
  };

  return (
    <View style={[cardStyles.card, { backgroundColor: cardBg }]}>
      {data.coffeeName && (
        <Text style={[cardStyles.coffeeName, { color: textColor }]} numberOfLines={1}>
          {data.coffeeName.toUpperCase()}
        </Text>
      )}
      {data.roaster && (
        <Text style={[cardStyles.roaster, { color: secondaryColor }]} numberOfLines={1}>
          {data.roaster}
        </Text>
      )}

      {(data.dose || data.water || data.ratio) && (
        <View style={cardStyles.recipeRow}>
          {data.dose && data.water && (
            <Text style={[cardStyles.recipe, { color: textColor }]}>
              {data.dose}g → {data.water}g
            </Text>
          )}
          {data.ratio && (
            <Text style={[cardStyles.recipe, { color: textColor }]}>
              {data.ratio}
            </Text>
          )}
        </View>
      )}

      {(data.brewMethod || data.temperature || data.brewTime) && (
        <Text style={[cardStyles.details, { color: secondaryColor }]}>
          {[data.brewMethod, data.temperature && `${data.temperature}°C`, data.brewTime]
            .filter(Boolean)
            .join('  ')}
        </Text>
      )}

      {data.grindSize && (
        <Text style={[cardStyles.details, { color: secondaryColor }]}>
          {data.grindSize}
        </Text>
      )}

      {data.flavorNotes && data.flavorNotes.length > 0 && (
        <Text style={[cardStyles.flavors, { color: brand.coral }]}>
          {data.flavorNotes.join(', ')}
        </Text>
      )}

      {data.rating > 0 && (
        <Text style={[cardStyles.rating, { color: brand.coral }]}>
          {renderStars()}
        </Text>
      )}

      <Text style={[cardStyles.watermark, { color: secondaryColor }]}>
        SUPERTHING
      </Text>
    </View>
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
  doneButton: {
    fontFamily: 'RobotoMono',
    fontSize: 14,
    color: brand.coral,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
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
  frameOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    position: 'absolute',
  },
  readyText: {
    fontFamily: 'RobotoMono',
    fontSize: 14,
    color: brand.gray,
    marginTop: 20,
  },
  footer: {
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  primaryButton: {
    backgroundColor: brand.black,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 16,
    fontWeight: '600',
    color: brand.white,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: brand.black,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 16,
    fontWeight: '600',
    color: brand.black,
    letterSpacing: 1,
  },
});

const cardStyles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 6,
    minWidth: 140,
    maxWidth: 180,
  },
  coffeeName: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  roaster: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    marginBottom: 8,
  },
  recipeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  recipe: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    fontWeight: '600',
  },
  details: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    marginBottom: 2,
  },
  flavors: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    marginTop: 6,
    fontStyle: 'italic',
  },
  rating: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 2,
  },
  watermark: {
    fontFamily: 'RobotoMono',
    fontSize: 7,
    letterSpacing: 2,
    marginTop: 8,
    opacity: 0.5,
  },
});
