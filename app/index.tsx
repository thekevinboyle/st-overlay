import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { brand, theme } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [pressed, setPressed] = useState<'camera' | 'library' | null>(null);

  // Animations
  const floatAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Floating animation for the icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Gentle pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Entry animations
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideUp, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const pickImage = async (useCamera: boolean) => {
    setLoading(true);

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
        router.push({
          pathname: '/data-input',
          params: { imageUri: result.assets[0].uri },
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative corner elements */}
      <View style={styles.cornerTL}>
        <Text style={styles.cornerText}>✦</Text>
      </View>
      <View style={styles.cornerTR}>
        <Text style={styles.cornerText}>✦</Text>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeIn,
            transform: [{ translateY: slideUp }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoSmall}>✧ BREW WITH ✧</Text>
            <Text style={styles.logo}>SUPERTHING</Text>
            <View style={styles.underline} />
          </View>
        </View>

        {/* Center illustration area */}
        <View style={styles.illustrationArea}>
          <Animated.View
            style={[
              styles.iconOuter,
              {
                transform: [
                  { translateY: floatAnim },
                  { scale: pulseAnim },
                ],
              },
            ]}
          >
            <View style={styles.iconMiddle}>
              <View style={styles.iconInner}>
                <Text style={styles.coffeeIcon}>☕</Text>
              </View>
            </View>
            {/* Decorative rings */}
            <View style={styles.ring1} />
            <View style={styles.ring2} />
          </Animated.View>

          <View style={styles.taglineContainer}>
            <Text style={styles.tagline}>CAPTURE YOUR BREW</Text>
            <Text style={styles.taglineSub}>share the recipe</Text>
          </View>
        </View>

        {/* Instruction */}
        <View style={styles.instructionContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.instruction}>
            snap a photo or pick from library
          </Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              pressed === 'camera' && styles.buttonPressed,
            ]}
            onPressIn={() => setPressed('camera')}
            onPressOut={() => setPressed(null)}
            onPress={() => pickImage(true)}
            disabled={loading}
            activeOpacity={1}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonIcon}>📸</Text>
              <Text style={styles.primaryButtonText}>
                {loading ? 'LOADING...' : 'TAKE PHOTO'}
              </Text>
            </View>
            <View style={styles.buttonShadow} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              pressed === 'library' && styles.secondaryButtonPressed,
            ]}
            onPressIn={() => setPressed('library')}
            onPressOut={() => setPressed(null)}
            onPress={() => pickImage(false)}
            disabled={loading}
            activeOpacity={1}
          >
            <Text style={styles.secondaryButtonText}>
              ↳ CHOOSE FROM LIBRARY
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Bottom decorative */}
      <View style={styles.bottomDecor}>
        <Text style={styles.bottomText}>
          ─── ☕ ─── specialty recipes ─── ☕ ───
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.cream,
  },
  cornerTL: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  cornerTR: {
    position: 'absolute',
    top: 60,
    right: 24,
  },
  cornerText: {
    fontFamily: 'RobotoMono',
    fontSize: 20,
    color: brand.coral,
    opacity: 0.6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
  },
  header: {
    paddingTop: 80,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoSmall: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    color: brand.gray,
    letterSpacing: 4,
    marginBottom: 4,
  },
  logo: {
    fontFamily: 'RobotoMono',
    fontSize: 32,
    fontWeight: '700',
    color: brand.ink,
    letterSpacing: 6,
  },
  underline: {
    width: 60,
    height: 3,
    backgroundColor: brand.coral,
    marginTop: 8,
    borderRadius: 2,
  },
  illustrationArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconOuter: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMiddle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: brand.peach,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow.lg,
  },
  iconInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: brand.coral,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: brand.white,
  },
  coffeeIcon: {
    fontSize: 44,
  },
  ring1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: brand.coral,
    borderStyle: 'dashed',
    opacity: 0.3,
  },
  ring2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: brand.peach,
    borderStyle: 'dotted',
    opacity: 0.2,
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  tagline: {
    fontFamily: 'RobotoMono',
    fontSize: 18,
    fontWeight: '700',
    color: brand.ink,
    letterSpacing: 3,
  },
  taglineSub: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    color: brand.gray,
    letterSpacing: 2,
    marginTop: 4,
  },
  instructionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  dividerLine: {
    width: 40,
    height: 1,
    backgroundColor: brand.warmGray,
  },
  instruction: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    color: brand.gray,
    letterSpacing: 1,
    textTransform: 'lowercase',
  },
  buttonContainer: {
    gap: 16,
    paddingBottom: 20,
  },
  primaryButton: {
    position: 'relative',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: brand.ink,
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: brand.ink,
    transform: [{ translateY: -4 }],
  },
  buttonShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: brand.espresso,
    borderRadius: 4,
    zIndex: -1,
  },
  buttonPressed: {
    transform: [{ translateY: 2 }],
  },
  buttonIcon: {
    fontSize: 18,
  },
  primaryButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 15,
    fontWeight: '700',
    color: brand.cream,
    letterSpacing: 2,
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: brand.warmGray,
    borderRadius: 4,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  secondaryButtonPressed: {
    backgroundColor: brand.warmGray,
    borderStyle: 'solid',
  },
  secondaryButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 13,
    fontWeight: '600',
    color: brand.gray,
    letterSpacing: 1,
  },
  bottomDecor: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  bottomText: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    color: brand.warmGray,
    letterSpacing: 1,
  },
});
