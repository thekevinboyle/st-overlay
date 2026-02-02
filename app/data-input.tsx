import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { brand, theme } from '@/constants/Colors';
import { BrewData, emptyBrewData } from '@/lib/types';
import StarRating from '@/components/StarRating';
import TagInput from '@/components/TagInput';
import MethodPicker from '@/components/MethodPicker';

export default function DataInputScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [brewData, setBrewData] = useState<BrewData>(emptyBrewData);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Entry animation
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const updateField = (field: keyof BrewData, value: string | string[] | number) => {
    setBrewData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    router.push({
      pathname: '/editor',
      params: {
        imageUri,
        brewData: JSON.stringify(brewData),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← BACK</Text>
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.headerStep}>STEP 02</Text>
            <Text style={styles.title}>BREW DATA</Text>
          </View>
          <View style={{ width: 60 }} />
        </View>

        <Animated.ScrollView
          style={[styles.scrollView, { opacity: fadeIn }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Photo Preview with decorative frame */}
          {imageUri && (
            <View style={styles.previewContainer}>
              <View style={styles.previewFrame}>
                <Image source={{ uri: imageUri }} style={styles.preview} />
                <View style={styles.previewCornerTL} />
                <View style={styles.previewCornerTR} />
                <View style={styles.previewCornerBL} />
                <View style={styles.previewCornerBR} />
              </View>
              <Text style={styles.previewLabel}>YOUR BREW ↑</Text>
            </View>
          )}

          {/* Coffee Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>01</Text>
              </View>
              <Text style={styles.sectionTitle}>THE COFFEE</Text>
              <View style={styles.sectionLine} />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>NAME</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedField === 'coffeeName' && styles.inputFocused,
                  ]}
                  placeholder="e.g. Ethiopia Yirgacheffe"
                  placeholderTextColor={brand.gray}
                  value={brewData.coffeeName}
                  onChangeText={(v) => updateField('coffeeName', v)}
                  onFocus={() => setFocusedField('coffeeName')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>ROASTER</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === 'roaster' && styles.inputFocused,
                    ]}
                    placeholder="Roaster name"
                    placeholderTextColor={brand.gray}
                    value={brewData.roaster}
                    onChangeText={(v) => updateField('roaster', v)}
                    onFocus={() => setFocusedField('roaster')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>ORIGIN</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === 'origin' && styles.inputFocused,
                    ]}
                    placeholder="Country"
                    placeholderTextColor={brand.gray}
                    value={brewData.origin}
                    onChangeText={(v) => updateField('origin', v)}
                    onFocus={() => setFocusedField('origin')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Recipe Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>02</Text>
              </View>
              <Text style={styles.sectionTitle}>THE RECIPE</Text>
              <View style={styles.sectionLine} />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.row}>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>DOSE</Text>
                  <View style={styles.inputWithUnit}>
                    <TextInput
                      style={[
                        styles.input,
                        styles.inputSmall,
                        focusedField === 'dose' && styles.inputFocused,
                      ]}
                      placeholder="18"
                      placeholderTextColor={brand.gray}
                      keyboardType="numeric"
                      value={brewData.dose}
                      onChangeText={(v) => updateField('dose', v)}
                      onFocus={() => setFocusedField('dose')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <Text style={styles.unitText}>g</Text>
                  </View>
                </View>
                <Text style={styles.arrowText}>→</Text>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>WATER</Text>
                  <View style={styles.inputWithUnit}>
                    <TextInput
                      style={[
                        styles.input,
                        styles.inputSmall,
                        focusedField === 'water' && styles.inputFocused,
                      ]}
                      placeholder="270"
                      placeholderTextColor={brand.gray}
                      keyboardType="numeric"
                      value={brewData.water}
                      onChangeText={(v) => updateField('water', v)}
                      onFocus={() => setFocusedField('water')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <Text style={styles.unitText}>g</Text>
                  </View>
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>RATIO</Text>
                  <TextInput
                    style={[
                      styles.input,
                      styles.inputSmall,
                      focusedField === 'ratio' && styles.inputFocused,
                    ]}
                    placeholder="1:15"
                    placeholderTextColor={brand.gray}
                    value={brewData.ratio}
                    onChangeText={(v) => updateField('ratio', v)}
                    onFocus={() => setFocusedField('ratio')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>GRIND</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === 'grindSize' && styles.inputFocused,
                    ]}
                    placeholder="Medium-fine"
                    placeholderTextColor={brand.gray}
                    value={brewData.grindSize}
                    onChangeText={(v) => updateField('grindSize', v)}
                    onFocus={() => setFocusedField('grindSize')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>TEMP</Text>
                  <View style={styles.inputWithUnit}>
                    <TextInput
                      style={[
                        styles.input,
                        styles.inputSmall,
                        focusedField === 'temperature' && styles.inputFocused,
                      ]}
                      placeholder="94"
                      placeholderTextColor={brand.gray}
                      keyboardType="numeric"
                      value={brewData.temperature}
                      onChangeText={(v) => updateField('temperature', v)}
                      onFocus={() => setFocusedField('temperature')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <Text style={styles.unitText}>°C</Text>
                  </View>
                </View>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>TIME</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedField === 'brewTime' && styles.inputFocused,
                    ]}
                    placeholder="3:30"
                    placeholderTextColor={brand.gray}
                    value={brewData.brewTime}
                    onChangeText={(v) => updateField('brewTime', v)}
                    onFocus={() => setFocusedField('brewTime')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Method Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>03</Text>
              </View>
              <Text style={styles.sectionTitle}>THE METHOD</Text>
              <View style={styles.sectionLine} />
            </View>
            <MethodPicker
              value={brewData.brewMethod}
              onChange={(v) => updateField('brewMethod', v)}
            />
          </View>

          {/* Tasting Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>04</Text>
              </View>
              <Text style={styles.sectionTitle}>THE TASTING</Text>
              <View style={styles.sectionLine} />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>FLAVOR NOTES</Text>
                <TagInput
                  tags={brewData.flavorNotes}
                  onChange={(v) => updateField('flavorNotes', v)}
                  placeholder="Add notes (blueberry, citrus...)"
                />
              </View>

              <View style={styles.ratingContainer}>
                <Text style={styles.inputLabel}>YOUR RATING</Text>
                <StarRating
                  rating={brewData.rating}
                  onChange={(v) => updateField('rating', v)}
                />
              </View>
            </View>
          </View>

          {/* Spacer */}
          <View style={{ height: 40 }} />
        </Animated.ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <View style={styles.nextButtonInner}>
              <Text style={styles.nextButtonText}>STYLE YOUR PHOTO</Text>
              <Text style={styles.nextButtonArrow}>→</Text>
            </View>
            <View style={styles.nextButtonShadow} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.cream,
  },
  keyboardView: {
    flex: 1,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  previewFrame: {
    position: 'relative',
    padding: 8,
    backgroundColor: brand.white,
    ...theme.shadow.md,
  },
  preview: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: brand.warmGray,
  },
  previewCornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 16,
    height: 16,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: brand.coral,
  },
  previewCornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: brand.coral,
  },
  previewCornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 16,
    height: 16,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: brand.coral,
  },
  previewCornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: brand.coral,
  },
  previewLabel: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    color: brand.gray,
    letterSpacing: 2,
    marginTop: 12,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  sectionBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: brand.coral,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionBadgeText: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    fontWeight: '700',
    color: brand.white,
  },
  sectionTitle: {
    fontFamily: 'RobotoMono',
    fontSize: 13,
    fontWeight: '700',
    color: brand.ink,
    letterSpacing: 2,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: brand.warmGray,
    marginLeft: 8,
  },
  inputGroup: {
    gap: 12,
  },
  inputWrapper: {
    gap: 6,
  },
  inputLabel: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    fontWeight: '600',
    color: brand.gray,
    letterSpacing: 2,
  },
  input: {
    fontFamily: 'RobotoMono',
    fontSize: 15,
    backgroundColor: brand.white,
    borderRadius: 4,
    padding: 14,
    color: brand.ink,
    borderWidth: 2,
    borderColor: brand.warmGray,
  },
  inputSmall: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputFocused: {
    borderColor: brand.coral,
    backgroundColor: brand.white,
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  unitText: {
    fontFamily: 'RobotoMono',
    fontSize: 13,
    color: brand.gray,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  arrowText: {
    fontFamily: 'RobotoMono',
    fontSize: 18,
    color: brand.gray,
    marginBottom: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: brand.warmGray,
    borderStyle: 'dashed',
    marginTop: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: brand.warmGray,
    backgroundColor: brand.cream,
  },
  nextButton: {
    position: 'relative',
  },
  nextButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: brand.coral,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: brand.coral,
    transform: [{ translateY: -4 }],
  },
  nextButtonShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: brand.peach,
    borderRadius: 4,
    zIndex: -1,
  },
  nextButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 14,
    fontWeight: '700',
    color: brand.white,
    letterSpacing: 2,
  },
  nextButtonArrow: {
    fontFamily: 'RobotoMono',
    fontSize: 18,
    color: brand.white,
    fontWeight: '700',
  },
});
