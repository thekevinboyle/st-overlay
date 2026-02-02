import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { brand } from '@/constants/Colors';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ tags, onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tag}
              onPress={() => removeTag(index)}
              activeOpacity={0.7}
            >
              <Text style={styles.tagText}>{tag}</Text>
              <View style={styles.tagRemoveContainer}>
                <Text style={styles.tagRemove}>×</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={brand.gray}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={addTag}
          returnKeyType="done"
        />
        {inputValue.trim() && (
          <TouchableOpacity style={styles.addButton} onPress={addTag} activeOpacity={0.8}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.white,
    borderWidth: 2,
    borderColor: brand.coral,
    borderRadius: 4,
    overflow: 'hidden',
  },
  tagText: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    fontWeight: '600',
    color: brand.ink,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagRemoveContainer: {
    backgroundColor: brand.coral,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tagRemove: {
    fontSize: 14,
    color: brand.white,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'RobotoMono',
    fontSize: 15,
    backgroundColor: brand.white,
    borderRadius: 4,
    padding: 14,
    color: brand.ink,
    borderWidth: 2,
    borderColor: brand.warmGray,
  },
  addButton: {
    paddingHorizontal: 16,
    backgroundColor: brand.ink,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    fontWeight: '700',
    color: brand.cream,
    letterSpacing: 1,
  },
});
