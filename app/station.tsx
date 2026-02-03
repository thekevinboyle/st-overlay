import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { captureRef } from 'react-native-view-shot';
import { station } from '@/constants/Colors';
import { BrewData, FilterName, StationTab, emptyBrewData } from '@/lib/types';
import { getFrameById } from '@/lib/frames';

// Layout components
import PhotoBezel from '@/components/layout/PhotoBezel';
import TabBar from '@/components/layout/TabBar';
import ControlPanel from '@/components/layout/ControlPanel';

// Tab content components
import DataTab from '@/components/tabs/DataTab';
import StyleTab from '@/components/tabs/StyleTab';
import FrameTab from '@/components/tabs/FrameTab';
import ExportTab from '@/components/tabs/ExportTab';

// DataCard for overlay
import DataCard from '@/components/DataCard';

// Max card width for container size calculations
const MAX_CARD_WIDTH = 400;

export default function StationScreen() {
  const { imageUri: paramImageUri } = useLocalSearchParams<{ imageUri: string }>();

  // Core state
  const [imageUri, setImageUri] = useState<string | null>(paramImageUri || null);
  const [brewData, setBrewData] = useState<BrewData>(emptyBrewData);
  const [selectedFilter, setSelectedFilter] = useState<FilterName>('coral-haze');
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState({ x: 8, y: 80 });
  const [cardTheme, setCardTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<StationTab>('data');

  // Export state
  const [isSaving, setIsSaving] = useState(false);
  const viewRef = useRef<View>(null);

  const isReady = !!imageUri;
  const selectedFrame = selectedFrameId ? getFrameById(selectedFrameId) : null;

  // Approximate container size for DataCard bounds (based on max card width)
  const frameBorder = selectedFrame ? 16 : 0;
  const containerWidth = MAX_CARD_WIDTH - 40 - (frameBorder * 2); // padding + bezel
  const containerHeight = (MAX_CARD_WIDTH * 0.75) - 20 - (frameBorder * 2); // 4:3 aspect ratio

  // Capture image for export
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

  // Share handler
  const handleShare = async () => {
    if (!isReady || isSaving) return;

    setIsSaving(true);
    try {
      const uri = await captureImage();
      if (uri && await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/png',
          dialogTitle: 'Share your brew',
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share image');
    } finally {
      setIsSaving(false);
    }
  };

  // Save handler
  const handleSave = async () => {
    if (!isReady || isSaving) return;

    setIsSaving(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow access to save photos');
        return;
      }

      const uri = await captureImage();
      if (uri) {
        await MediaLibrary.saveToLibraryAsync(uri);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Saved!', 'Image saved to your camera roll');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save image');
    } finally {
      setIsSaving(false);
    }
  };

  // Change photo handler
  const handleChangePhoto = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'data':
        return (
          <DataTab
            brewData={brewData}
            onChange={setBrewData}
          />
        );
      case 'style':
        return (
          <StyleTab
            filter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        );
      case 'frame':
        return (
          <FrameTab
            frameId={selectedFrameId}
            onFrameChange={setSelectedFrameId}
            cardTheme={cardTheme}
            onCardThemeChange={setCardTheme}
          />
        );
      case 'export':
        return (
          <ExportTab
            onShare={handleShare}
            onSave={handleSave}
            isReady={isReady}
            isSaving={isSaving}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.outerContainer}>
          <View style={styles.container}>
            {/* Photo Preview - Always Visible */}
            <View style={styles.previewSection}>
              <View ref={viewRef} collapsable={false} style={styles.bezelWrapper}>
                <PhotoBezel
                  imageUri={imageUri}
                  filter={selectedFilter}
                  frameId={selectedFrameId}
                  aspectRatio={4/3}
                >
                  {isReady && (
                    <DataCard
                      data={brewData}
                      position={cardPosition}
                      onPositionChange={setCardPosition}
                      containerSize={{ width: containerWidth, height: containerHeight }}
                      theme={cardTheme}
                    />
                  )}
                </PhotoBezel>
              </View>
              {/* Change Photo Button */}
              <TouchableOpacity onPress={handleChangePhoto} style={styles.changePhotoButton}>
                <Text style={styles.changePhotoText}>↻ CHANGE PHOTO</Text>
              </TouchableOpacity>
            </View>

            {/* Control Panel - Tab Content */}
            <ControlPanel>
              {renderTabContent()}
            </ControlPanel>

            {/* Tab Bar - Fixed at Bottom */}
            <View style={styles.tabBarContainer}>
              <TabBar
                activeTab={activeTab}
                onChange={setActiveTab}
                disabled={!isReady}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: station.surfaceMid,
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '95%',
    backgroundColor: station.surfaceLight,
    borderRadius: 20,
    overflow: 'hidden',
    // Card shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
    // Subtle border
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  previewSection: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: station.surfaceDark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bezelWrapper: {
    width: '100%',
  },
  changePhotoButton: {
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
  },
  changePhotoText: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    color: station.textMuted,
    letterSpacing: 1,
  },
  tabBarContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 6,
    backgroundColor: station.surfaceLight,
  },
});
