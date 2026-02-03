import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { station } from '@/constants/Colors';

// Layout components
import PhotoBezel from '@/components/layout/PhotoBezel';
import TabBar from '@/components/layout/TabBar';

export default function LaunchScreen() {
  const [loading, setLoading] = useState(false);
  const [pressed, setPressed] = useState<'camera' | 'library' | null>(null);

  const pickImage = async (useCamera: boolean) => {
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
      };

      const result = useCamera
        ? await ImagePicker.launchCameraAsync(options)
        : await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled && result.assets[0]) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.push({
          pathname: '/station',
          params: { imageUri: result.assets[0].uri },
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  const handlePressIn = (button: 'camera' | 'library') => {
    setPressed(button);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          {/* Brand Nameplate */}
          <View style={styles.nameplateContainer}>
            <View style={styles.nameplate}>
              <View style={styles.nameplateInner}>
                <Text style={styles.brandSmall}>SUPERTHING</Text>
                <Text style={styles.brandLarge}>BREW STATION</Text>
              </View>
              <View style={styles.nameplateShine} />
            </View>
            <View style={styles.modelInfo}>
              <View style={styles.modelDot} />
              <Text style={styles.modelText}>MODEL ST-2026</Text>
            </View>
          </View>

          {/* Photo Bezel - Shows "NO INPUT" state */}
          <View style={styles.bezelSection}>
            <PhotoBezel
              imageUri={null}
              filter="none"
              frameId={null}
              aspectRatio={4/3}
            />
          </View>

          {/* Source Selector Section */}
          <View style={styles.sourceSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionLabel}>SELECT SOURCE</Text>
              <View style={styles.sectionLine} />
            </View>

            {/* Source Buttons */}
            <View style={styles.buttonGrid}>
              {/* Camera Button */}
              <TouchableOpacity
                style={[
                  styles.sourceButton,
                  pressed === 'camera' && styles.sourceButtonPressed,
                ]}
                onPressIn={() => handlePressIn('camera')}
                onPressOut={() => setPressed(null)}
                onPress={() => pickImage(true)}
                disabled={loading}
                activeOpacity={1}
              >
                <View style={[
                  styles.sourceButtonInner,
                  pressed === 'camera' && styles.sourceButtonInnerPressed,
                ]}>
                  <Text style={styles.sourceIcon}>◉</Text>
                  <Text style={styles.sourceLabel}>CAMERA</Text>
                </View>
                {pressed !== 'camera' && <View style={styles.sourceButtonShadow} />}
              </TouchableOpacity>

              {/* Library Button */}
              <TouchableOpacity
                style={[
                  styles.sourceButton,
                  pressed === 'library' && styles.sourceButtonPressed,
                ]}
                onPressIn={() => handlePressIn('library')}
                onPressOut={() => setPressed(null)}
                onPress={() => pickImage(false)}
                disabled={loading}
                activeOpacity={1}
              >
                <View style={[
                  styles.sourceButtonInner,
                  pressed === 'library' && styles.sourceButtonInnerPressed,
                ]}>
                  <Text style={styles.sourceIcon}>▣</Text>
                  <Text style={styles.sourceLabel}>LIBRARY</Text>
                </View>
                {pressed !== 'library' && <View style={styles.sourceButtonShadow} />}
              </TouchableOpacity>
            </View>

            {/* Loading indicator */}
            {loading && (
              <View style={styles.loadingIndicator}>
                <View style={styles.loadingDot} />
                <Text style={styles.loadingText}>LOADING...</Text>
              </View>
            )}
          </View>

          {/* Tab Bar - Disabled State */}
          <View style={styles.tabBarContainer}>
            <TabBar
              activeTab="data"
              onChange={() => {}}
              disabled={true}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: station.surfaceMid,
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 380,
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
  nameplateContainer: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: station.surfaceLight,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  nameplate: {
    backgroundColor: station.surfaceMid,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderTopColor: station.glossSubtle,
    borderLeftColor: 'rgba(255,255,255,0.2)',
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.15)',
  },
  nameplateInner: {
    alignItems: 'center',
  },
  nameplateShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  brandSmall: {
    fontFamily: 'Inter-Bold',
    fontSize: 9,
    color: station.textMuted,
    letterSpacing: 3,
  },
  brandLarge: {
    fontFamily: 'RobotoMono',
    fontSize: 18,
    fontWeight: '700',
    color: station.textPrimary,
    letterSpacing: 3,
    marginTop: 2,
  },
  modelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  modelDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: station.accent,
    shadowColor: station.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  modelText: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    color: station.textMuted,
    letterSpacing: 2,
  },
  bezelSection: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: station.surfaceDark,
  },
  sourceSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: station.surfaceMid,
  },
  sectionLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: station.textSecondary,
    letterSpacing: 2,
  },
  buttonGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  sourceButton: {
    flex: 1,
    position: 'relative',
  },
  sourceButtonPressed: {
    transform: [{ translateY: 4 }],
  },
  sourceButtonInner: {
    backgroundColor: station.surfaceDark,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    gap: 6,
    transform: [{ translateY: -4 }],
    borderWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
    borderLeftColor: 'rgba(255,255,255,0.06)',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  sourceButtonInnerPressed: {
    transform: [{ translateY: 0 }],
    borderTopColor: 'transparent',
  },
  sourceButtonShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#1A1A1C',
    borderRadius: 10,
    zIndex: -1,
  },
  sourceIcon: {
    fontSize: 28,
    color: station.accent,
  },
  sourceLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: station.white,
    letterSpacing: 2,
  },
  loadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: station.accent,
  },
  loadingText: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    color: station.accent,
    letterSpacing: 2,
  },
  tabBarContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 8,
  },
});
