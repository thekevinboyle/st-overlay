import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { brand } from '@/constants/Colors';
import { BrewData } from '@/lib/types';

interface DataCardProps {
  data: BrewData;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  containerSize: { width: number; height: number };
  theme?: 'light' | 'dark';
}

export default function DataCard({
  data,
  position,
  onPositionChange,
  containerSize,
  theme = 'light',
}: DataCardProps) {
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const scale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.02);
    })
    .onUpdate((event) => {
      translateX.value = Math.max(
        0,
        Math.min(containerSize.width - 200, position.x + event.translationX)
      );
      translateY.value = Math.max(
        0,
        Math.min(containerSize.height - 150, position.y + event.translationY)
      );
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      onPositionChange({ x: translateX.value, y: translateY.value });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const isDark = theme === 'dark';
  const cardBg = isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)';
  const textColor = isDark ? brand.white : brand.black;
  const secondaryColor = isDark ? '#aaa' : brand.gray;

  const hasData = data.coffeeName || data.dose || data.brewMethod;

  if (!hasData) return null;

  const renderStars = () => {
    if (!data.rating) return null;
    return '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, { backgroundColor: cardBg }, animatedStyle]}>
        {data.coffeeName && (
          <Text style={[styles.coffeeName, { color: textColor }]} numberOfLines={1}>
            {data.coffeeName.toUpperCase()}
          </Text>
        )}
        {data.roaster && (
          <Text style={[styles.roaster, { color: secondaryColor }]} numberOfLines={1}>
            {data.roaster}
          </Text>
        )}

        {(data.dose || data.water || data.ratio) && (
          <View style={styles.recipeRow}>
            {data.dose && data.water && (
              <Text style={[styles.recipe, { color: textColor }]}>
                {data.dose}g → {data.water}g
              </Text>
            )}
            {data.ratio && (
              <Text style={[styles.recipe, { color: textColor }]}>
                {data.ratio}
              </Text>
            )}
          </View>
        )}

        {(data.brewMethod || data.temperature || data.brewTime) && (
          <Text style={[styles.details, { color: secondaryColor }]}>
            {[data.brewMethod, data.temperature && `${data.temperature}°C`, data.brewTime]
              .filter(Boolean)
              .join('  ')}
          </Text>
        )}

        {data.grindSize && (
          <Text style={[styles.details, { color: secondaryColor }]}>
            {data.grindSize}
          </Text>
        )}

        {data.flavorNotes.length > 0 && (
          <Text style={[styles.flavors, { color: brand.coral }]}>
            {data.flavorNotes.join(', ')}
          </Text>
        )}

        {data.rating > 0 && (
          <Text style={[styles.rating, { color: brand.coral }]}>
            {renderStars()}
          </Text>
        )}

        <Text style={[styles.watermark, { color: secondaryColor }]}>
          SUPERTHING
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    padding: 14,
    borderRadius: 8,
    minWidth: 180,
    maxWidth: 220,
  },
  coffeeName: {
    fontFamily: 'RobotoMono',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  roaster: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    marginBottom: 10,
  },
  recipeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  recipe: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    marginBottom: 2,
  },
  flavors: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    marginTop: 8,
    fontStyle: 'italic',
  },
  rating: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    marginTop: 6,
    letterSpacing: 2,
  },
  watermark: {
    fontFamily: 'RobotoMono',
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 10,
    opacity: 0.5,
  },
});
