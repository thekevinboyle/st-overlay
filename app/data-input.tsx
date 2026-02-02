import { useState } from 'react';
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
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { brand } from '@/constants/Colors';
import { BrewData, emptyBrewData } from '@/lib/types';
import StarRating from '@/components/StarRating';
import TagInput from '@/components/TagInput';
import MethodPicker from '@/components/MethodPicker';

export default function DataInputScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [brewData, setBrewData] = useState<BrewData>(emptyBrewData);

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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Brew Details</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.preview} />
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>COFFEE</Text>
            <TextInput
              style={styles.input}
              placeholder="Coffee Name"
              placeholderTextColor={brand.gray}
              value={brewData.coffeeName}
              onChangeText={(v) => updateField('coffeeName', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Roaster"
              placeholderTextColor={brand.gray}
              value={brewData.roaster}
              onChangeText={(v) => updateField('roaster', v)}
            />
            <TextInput
              style={styles.input}
              placeholder="Origin"
              placeholderTextColor={brand.gray}
              value={brewData.origin}
              onChangeText={(v) => updateField('origin', v)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RECIPE</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Dose (g)"
                placeholderTextColor={brand.gray}
                keyboardType="numeric"
                value={brewData.dose}
                onChangeText={(v) => updateField('dose', v)}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Water (g)"
                placeholderTextColor={brand.gray}
                keyboardType="numeric"
                value={brewData.water}
                onChangeText={(v) => updateField('water', v)}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Ratio (1:15)"
                placeholderTextColor={brand.gray}
                value={brewData.ratio}
                onChangeText={(v) => updateField('ratio', v)}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Grind Size"
                placeholderTextColor={brand.gray}
                value={brewData.grindSize}
                onChangeText={(v) => updateField('grindSize', v)}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Temp (°C)"
                placeholderTextColor={brand.gray}
                keyboardType="numeric"
                value={brewData.temperature}
                onChangeText={(v) => updateField('temperature', v)}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Time (3:30)"
                placeholderTextColor={brand.gray}
                value={brewData.brewTime}
                onChangeText={(v) => updateField('brewTime', v)}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>METHOD</Text>
            <MethodPicker
              value={brewData.brewMethod}
              onChange={(v) => updateField('brewMethod', v)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TASTING</Text>
            <TagInput
              tags={brewData.flavorNotes}
              onChange={(v) => updateField('flavorNotes', v)}
              placeholder="Add flavor notes..."
            />
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>Rating</Text>
              <StarRating
                rating={brewData.rating}
                onChange={(v) => updateField('rating', v)}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Style Your Photo →</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.white,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    fontWeight: '600',
    color: brand.coral,
    letterSpacing: 2,
    marginBottom: 12,
  },
  input: {
    fontFamily: 'RobotoMono',
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    color: brand.black,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ratingLabel: {
    fontFamily: 'RobotoMono',
    fontSize: 14,
    color: brand.gray,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nextButton: {
    backgroundColor: brand.black,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 16,
    fontWeight: '600',
    color: brand.white,
    letterSpacing: 1,
  },
});
