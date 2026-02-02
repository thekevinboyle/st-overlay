import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { brand } from '@/constants/Colors';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);

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
      <View style={styles.header}>
        <Text style={styles.logo}>SUPERTHING</Text>
        <Text style={styles.subtitle}>COFFEE RECIPES</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.coffeeIcon}>☕</Text>
        </View>

        <Text style={styles.instruction}>
          Take a photo of your brew or choose from your library
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => pickImage(true)}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'Loading...' : 'Take Photo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => pickImage(false)}
          disabled={loading}
        >
          <Text style={styles.secondaryButtonText}>
            Choose from Library
          </Text>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'RobotoMono',
    fontSize: 28,
    fontWeight: '700',
    color: brand.black,
    letterSpacing: 4,
  },
  subtitle: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    color: brand.coral,
    letterSpacing: 2,
    marginTop: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: brand.coral,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  coffeeIcon: {
    fontSize: 48,
  },
  instruction: {
    fontFamily: 'RobotoMono',
    fontSize: 16,
    color: brand.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 12,
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
