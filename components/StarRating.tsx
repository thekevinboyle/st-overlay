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
      {Array.from({ length: max }, (_, i) => {
        const isFilled = i < rating;
        return (
          <TouchableOpacity
            key={i}
            onPress={() => onChange(i + 1)}
            style={[styles.star, isFilled && styles.starFilled]}
            activeOpacity={0.7}
          >
            <Text style={[styles.starText, isFilled && styles.starTextFilled]}>
              {isFilled ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        );
      })}
      {rating > 0 && (
        <TouchableOpacity onPress={() => onChange(0)} style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brand.warmGray,
    borderRadius: 4,
  },
  starFilled: {
    backgroundColor: brand.coral,
  },
  starText: {
    fontSize: 20,
    color: brand.gray,
  },
  starTextFilled: {
    color: brand.white,
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
  },
  clearText: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    color: brand.gray,
  },
});
