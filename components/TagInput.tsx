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
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tag}
            onPress={() => removeTag(index)}
          >
            <Text style={styles.tagText}>{tag}</Text>
            <Text style={styles.tagRemove}>×</Text>
          </TouchableOpacity>
        ))}
      </View>
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
          <TouchableOpacity style={styles.addButton} onPress={addTag}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.coral,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  tagText: {
    fontFamily: 'RobotoMono',
    fontSize: 13,
    color: brand.white,
  },
  tagRemove: {
    fontSize: 16,
    color: brand.white,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'RobotoMono',
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 14,
    color: brand.black,
  },
  addButton: {
    width: 48,
    backgroundColor: brand.black,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: brand.white,
    fontWeight: '600',
  },
});
