import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { brand } from '@/constants/Colors';
import { FilterName, filters } from '@/lib/types';

interface FilterSelectorProps {
  imageUri: string;
  selected: FilterName;
  onChange: (filter: FilterName) => void;
}

const filterOrder: FilterName[] = ['none', 'coral-haze', 'vhs-cafe', 'film-grain'];

export default function FilterSelector({ imageUri, selected, onChange }: FilterSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>FILTERS</Text>
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
              </View>
              <Text style={[styles.filterName, isSelected && styles.filterNameSelected]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  label: {
    fontFamily: 'RobotoMono',
    fontSize: 11,
    fontWeight: '600',
    color: brand.gray,
    letterSpacing: 2,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 12,
  },
  filterItem: {
    alignItems: 'center',
    opacity: 0.7,
  },
  filterItemSelected: {
    opacity: 1,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: brand.coral,
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
    backgroundColor: 'rgba(100, 80, 60, 0.3)',
  },
  filmOverlay: {
    backgroundColor: 'rgba(255, 220, 180, 0.15)',
  },
  filterName: {
    fontFamily: 'RobotoMono',
    fontSize: 10,
    color: brand.gray,
    marginTop: 6,
  },
  filterNameSelected: {
    color: brand.coral,
    fontWeight: '600',
  },
});
