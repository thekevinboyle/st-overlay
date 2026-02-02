import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { brand } from '@/constants/Colors';
import { FilterName, filters } from '@/lib/types';

interface FilterSelectorProps {
  imageUri: string;
  selected: FilterName;
  onChange: (filter: FilterName) => void;
}

const filterOrder: FilterName[] = ['none', 'coral-haze', 'vhs-cafe', 'film-grain'];

const filterIcons: Record<FilterName, string> = {
  'none': '○',
  'coral-haze': '◐',
  'vhs-cafe': '▤',
  'film-grain': '◉',
};

export default function FilterSelector({ imageUri, selected, onChange }: FilterSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>FILTERS</Text>
        <View style={styles.labelLine} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filterOrder.map((filterName) => {
          const filter = filters[filterName];
          const isSelected = selected === filterName;

          return (
            <TouchableOpacity
              key={filterName}
              style={[styles.filterItem, isSelected && styles.filterItemSelected]}
              onPress={() => onChange(filterName)}
              activeOpacity={0.7}
            >
              <View style={[styles.thumbnail, isSelected && styles.thumbnailSelected]}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.thumbnailImage}
                />
                {filterName !== 'none' && (
                  <View
                    style={[
                      styles.filterOverlay,
                      filterName === 'coral-haze' && styles.coralOverlay,
                      filterName === 'vhs-cafe' && styles.vhsOverlay,
                      filterName === 'film-grain' && styles.filmOverlay,
                    ]}
                  />
                )}
                <View style={[styles.iconBadge, isSelected && styles.iconBadgeSelected]}>
                  <Text style={[styles.iconText, isSelected && styles.iconTextSelected]}>
                    {filterIcons[filterName]}
                  </Text>
                </View>
              </View>
              <Text style={[styles.filterName, isSelected && styles.filterNameSelected]}>
                {filter.label.toUpperCase()}
              </Text>
              {isSelected && <View style={styles.selectedDot} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 10,
  },
  label: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    fontWeight: '700',
    color: brand.gray,
    letterSpacing: 2,
  },
  labelLine: {
    flex: 1,
    height: 1,
    backgroundColor: brand.warmGray,
  },
  scrollContent: {
    paddingHorizontal: 14,
    gap: 14,
  },
  filterItem: {
    alignItems: 'center',
  },
  filterItemSelected: {
    // Selected state handled by children
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: brand.warmGray,
    backgroundColor: brand.warmGray,
  },
  thumbnailSelected: {
    borderColor: brand.coral,
    borderWidth: 3,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  filterOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  coralOverlay: {
    backgroundColor: 'rgba(242, 148, 150, 0.25)',
  },
  vhsOverlay: {
    backgroundColor: 'rgba(80, 60, 40, 0.35)',
  },
  filmOverlay: {
    backgroundColor: 'rgba(255, 230, 200, 0.2)',
  },
  iconBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: brand.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBadgeSelected: {
    backgroundColor: brand.coral,
  },
  iconText: {
    fontSize: 10,
    color: brand.gray,
  },
  iconTextSelected: {
    color: brand.white,
  },
  filterName: {
    fontFamily: 'RobotoMono',
    fontSize: 9,
    fontWeight: '600',
    color: brand.gray,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  filterNameSelected: {
    color: brand.ink,
  },
  selectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: brand.coral,
    marginTop: 4,
  },
});
