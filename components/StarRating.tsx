import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { brand } from '@/constants/Colors';

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  max?: number;
}

export default function StarRating({ rating, onChange, max = 5 }: StarRatingProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: max }, (_, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onChange(i + 1)}
          style={styles.star}
        >
          <Text style={[styles.starText, i < rating && styles.starFilled]}>
            {i < rating ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
  },
  star: {
    padding: 4,
  },
  starText: {
    fontSize: 24,
    color: brand.gray,
  },
  starFilled: {
    color: brand.coral,
  },
});
