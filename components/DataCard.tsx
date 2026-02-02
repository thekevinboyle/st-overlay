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
  const rotate = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.05);
      rotate.value = withSpring(-1);
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
      rotate.value = withSpring(0);
      onPositionChange({ x: translateX.value, y: translateY.value });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const isDark = theme === 'dark';
  const cardBg = isDark ? 'rgba(29, 25, 23, 0.95)' : 'rgba(250, 248, 245, 0.96)';
  const textColor = isDark ? brand.cream : brand.ink;
  const secondaryColor = isDark ? '#9a9694' : brand.gray;
  const borderColor = isDark ? 'rgba(250, 248, 245, 0.15)' : 'rgba(45, 41, 38, 0.12)';
  const accentBg = isDark ? 'rgba(242, 148, 150, 0.2)' : 'rgba(242, 148, 150, 0.15)';

  const hasData = data.coffeeName || data.dose || data.brewMethod;

  if (!hasData) return null;

  const renderStars = () => {
    if (!data.rating) return null;
    return '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, { backgroundColor: cardBg, borderColor }, animatedStyle]}>
        {/* Top decorative line */}
        <View style={[styles.topLine, { backgroundColor: brand.coral }]} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.label, { color: secondaryColor }]}>BREW CARD</Text>
          <Text style={[styles.divider, { color: secondaryColor }]}>№</Text>
        </View>

        {/* Coffee name - prominent */}
        {data.coffeeName && (
          <View style={[styles.nameContainer, { backgroundColor: accentBg }]}>
            <Text style={[styles.coffeeName, { color: textColor }]} numberOfLines={1}>
              {data.coffeeName.toUpperCase()}
            </Text>
          </View>
        )}

        {/* Roaster & Origin */}
        {(data.roaster || data.origin) && (
          <View style={styles.subHeader}>
            {data.roaster && (
              <Text style={[styles.roaster, { color: secondaryColor }]}>
                ↳ {data.roaster}
              </Text>
            )}
            {data.origin && (
              <Text style={[styles.origin, { color: brand.coral }]}>
                [{data.origin}]
              </Text>
            )}
          </View>
        )}

        {/* Divider */}
        <View style={[styles.dottedLine, { borderColor: secondaryColor }]} />

        {/* Recipe Grid */}
        {(data.dose || data.water || data.ratio) && (
          <View style={styles.recipeSection}>
            <View style={styles.recipeRow}>
              {data.dose && (
                <View style={styles.recipeItem}>
                  <Text style={[styles.recipeLabel, { color: secondaryColor }]}>IN</Text>
                  <Text style={[styles.recipeValue, { color: textColor }]}>{data.dose}g</Text>
                </View>
              )}
              {data.dose && data.water && (
                <Text style={[styles.recipeArrow, { color: brand.coral }]}>→</Text>
              )}
              {data.water && (
                <View style={styles.recipeItem}>
                  <Text style={[styles.recipeLabel, { color: secondaryColor }]}>OUT</Text>
                  <Text style={[styles.recipeValue, { color: textColor }]}>{data.water}g</Text>
                </View>
              )}
              {data.ratio && (
                <View style={[styles.ratioBox, { borderColor }]}>
                  <Text style={[styles.ratioText, { color: textColor }]}>{data.ratio}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Brew details */}
        {(data.brewMethod || data.temperature || data.brewTime) && (
          <View style={styles.detailsRow}>
            {data.brewMethod && (
              <Text style={[styles.detail, { color: textColor }]}>
                ◉ {data.brewMethod}
              </Text>
            )}
            {data.temperature && (
              <Text style={[styles.detail, { color: secondaryColor }]}>
                {data.temperature}°C
              </Text>
            )}
            {data.brewTime && (
              <Text style={[styles.detail, { color: secondaryColor }]}>
                ⏱ {data.brewTime}
              </Text>
            )}
          </View>
        )}

        {data.grindSize && (
          <Text style={[styles.grind, { color: secondaryColor }]}>
            ▸ {data.grindSize}
          </Text>
        )}

        {/* Flavor notes */}
        {data.flavorNotes && data.flavorNotes.length > 0 && (
          <View style={styles.flavorsContainer}>
            <Text style={[styles.flavorsLabel, { color: secondaryColor }]}>NOTES:</Text>
            <Text style={[styles.flavors, { color: brand.coral }]}>
              {data.flavorNotes.join(' · ')}
            </Text>
          </View>
        )}

        {/* Rating */}
        {data.rating > 0 && (
          <View style={styles.ratingRow}>
            <Text style={[styles.rating, { color: brand.coral }]}>
              {renderStars()}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: borderColor }]}>
          <Text style={[styles.watermark, { color: secondaryColor }]}>
            ✦ SUPERTHING ✦
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    minWidth: 185,
    maxWidth: 220,
    borderWidth: 1,
    borderRadius: 2,
    overflow: 'hidden',
  },
  topLine: {
    height: 4,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  label: {
    fontFamily: 'RobotoMono',
    fontSize: 8,
    letterSpacing: 2,
    fontWeight: '600',
  },
  divider: {
    fontFamily: 'RobotoMono',
    fontSize: 8,
  },
  nameContainer: {
    marginHorizontal: 10,
    marginVertical: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  coffeeName: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  roaster: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
  },
  origin: {
    fontFamily: 'RobotoMono',
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 1,
  },
  dottedLine: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    marginHorizontal: 10,
    marginVertical: 6,
  },
  recipeSection: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  recipeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recipeItem: {
    alignItems: 'center',
  },
  recipeLabel: {
    fontFamily: 'RobotoMono',
    fontSize: 7,
    letterSpacing: 1,
  },
  recipeValue: {
    fontFamily: 'RobotoMono',
    fontSize: 13,
    fontWeight: '700',
  },
  recipeArrow: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    fontWeight: '700',
  },
  ratioBox: {
    marginLeft: 'auto',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratioText: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    fontWeight: '700',
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  detail: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    fontWeight: '600',
  },
  grind: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  flavorsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  flavorsLabel: {
    fontFamily: 'RobotoMono',
    fontSize: 7,
    letterSpacing: 1,
    marginBottom: 2,
  },
  flavors: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  ratingRow: {
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  rating: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    letterSpacing: 2,
  },
  footer: {
    borderTopWidth: 1,
    paddingVertical: 6,
    alignItems: 'center',
  },
  watermark: {
    fontFamily: 'RobotoMono',
    fontSize: 7,
    letterSpacing: 3,
    opacity: 0.6,
  },
});
