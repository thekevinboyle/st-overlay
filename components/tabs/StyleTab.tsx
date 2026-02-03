import { View, Text, StyleSheet } from 'react-native';
import { station } from '@/constants/Colors';
import { FilterName } from '@/lib/types';
import SectionHeader from '@/components/layout/SectionHeader';
import FilterCartridge from '@/components/controls/FilterCartridge';

interface StyleTabProps {
  filter: FilterName;
  onFilterChange: (filter: FilterName) => void;
}

export default function StyleTab({ filter, onFilterChange }: StyleTabProps) {
  return (
    <View style={styles.container}>
      <SectionHeader label="Processing Mode" />
      <View style={styles.section}>
        <FilterCartridge
          selected={filter}
          onChange={onFilterChange}
        />
      </View>

      {/* Filter description */}
      <View style={styles.description}>
        {filter === 'none' && (
          <FilterDescription
            title="RAW"
            subtitle="Original photo, no processing"
            details="Clean and unfiltered - let the photo speak for itself."
          />
        )}
        {filter === 'coral-haze' && (
          <FilterDescription
            title="CORAL HAZE"
            subtitle="Warm peachy tones"
            details="Signature Superthing warmth. Lifted shadows, gentle saturation boost."
          />
        )}
        {filter === 'vhs-cafe' && (
          <FilterDescription
            title="VHS CAFÉ"
            subtitle="Retro analog vibes"
            details="Nostalgic warmth with subtle grain and scan lines. For the weird ones."
          />
        )}
        {filter === 'film-grain' && (
          <FilterDescription
            title="FILM GRAIN"
            subtitle="Portra 400 inspired"
            details="Natural film warmth with soft contrast. Universally flattering."
          />
        )}
      </View>
    </View>
  );
}

interface FilterDescriptionProps {
  title: string;
  subtitle: string;
  details: string;
}

function FilterDescription({ title, subtitle, details }: FilterDescriptionProps) {
  return (
    <View style={descStyles.container}>
      <View style={descStyles.header}>
        <View style={descStyles.led} />
        <Text style={descStyles.title}>{title}</Text>
      </View>
      <Text style={descStyles.subtitle}>{subtitle}</Text>
      <Text style={descStyles.details}>{details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    paddingHorizontal: 8,
  },
});

const descStyles = StyleSheet.create({
  container: {
    backgroundColor: station.surfaceDark,
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  led: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: station.accent,
    shadowColor: station.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  title: {
    fontFamily: 'RobotoMono',
    fontSize: 14,
    fontWeight: '700',
    color: station.white,
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: station.accent,
  },
  details: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: station.textMuted,
    lineHeight: 18,
  },
});
