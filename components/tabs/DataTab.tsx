import { View, Text, TextInput, StyleSheet } from 'react-native';
import { station } from '@/constants/Colors';
import { BrewData, BREW_METHODS, GRIND_SIZES } from '@/lib/types';
import SectionHeader from '@/components/layout/SectionHeader';
import RotaryKnob from '@/components/controls/RotaryKnob';
import NumericStepper from '@/components/controls/NumericStepper';
import SegmentButtons from '@/components/controls/SegmentButtons';

interface DataTabProps {
  brewData: BrewData;
  onChange: (data: BrewData) => void;
}

export default function DataTab({ brewData, onChange }: DataTabProps) {
  const updateField = (field: keyof BrewData, value: string | string[] | number) => {
    onChange({ ...brewData, [field]: value });
  };

  // Parse numeric values for controls
  const doseValue = parseFloat(brewData.dose) || 18;
  const waterValue = parseFloat(brewData.water) || 270;
  const tempValue = parseFloat(brewData.temperature) || 93;

  // Auto-calculate ratio
  const ratio = doseValue > 0 ? (waterValue / doseValue).toFixed(1) : '0';

  return (
    <View style={styles.container}>
      {/* COFFEE Section */}
      <SectionHeader label="Coffee" />
      <View style={styles.section}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>NAME</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ethiopia Yirgacheffe"
            placeholderTextColor={station.textMuted}
            value={brewData.coffeeName}
            onChangeText={(v) => updateField('coffeeName', v)}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Text style={styles.inputLabel}>ROASTER</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Roaster"
              placeholderTextColor={station.textMuted}
              value={brewData.roaster}
              onChangeText={(v) => updateField('roaster', v)}
            />
          </View>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Text style={styles.inputLabel}>ORIGIN</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Origin"
              placeholderTextColor={station.textMuted}
              value={brewData.origin}
              onChangeText={(v) => updateField('origin', v)}
            />
          </View>
        </View>
      </View>

      {/* RECIPE Section */}
      <SectionHeader label="Recipe" />
      <View style={styles.section}>
        <View style={styles.knobRow}>
          <RotaryKnob
            value={doseValue}
            onChange={(v) => updateField('dose', v.toString())}
            min={5}
            max={50}
            step={0.5}
            label="Dose"
            unit="g"
            size={70}
          />
          <RotaryKnob
            value={waterValue}
            onChange={(v) => updateField('water', v.toString())}
            min={30}
            max={500}
            step={5}
            label="Water"
            unit="g"
            size={70}
          />
        </View>

        {/* Ratio display */}
        <View style={styles.ratioDisplay}>
          <Text style={styles.ratioLabel}>RATIO</Text>
          <View style={styles.ratioValue}>
            <Text style={styles.ratioText}>1:{ratio}</Text>
          </View>
        </View>
      </View>

      {/* METHOD Section */}
      <SectionHeader label="Method" />
      <View style={styles.section}>
        <SegmentButtons
          options={BREW_METHODS}
          selected={brewData.brewMethod || 'v60'}
          onChange={(id) => updateField('brewMethod', id)}
          scrollable
        />
      </View>

      {/* DETAILS Section */}
      <SectionHeader label="Details" />
      <View style={styles.section}>
        <View style={styles.row}>
          <NumericStepper
            value={tempValue}
            onChange={(v) => updateField('temperature', v.toString())}
            min={80}
            max={100}
            step={1}
            unit="°C"
            label="Temperature"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>BREW TIME</Text>
          <TextInput
            style={styles.textInput}
            placeholder="3:30"
            placeholderTextColor={station.textMuted}
            value={brewData.brewTime}
            onChangeText={(v) => updateField('brewTime', v)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>GRIND SIZE</Text>
          <SegmentButtons
            options={GRIND_SIZES}
            selected={brewData.grindSize || 'medium'}
            onChange={(id) => updateField('grindSize', id)}
            scrollable
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  section: {
    gap: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    gap: 6,
  },
  inputLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: station.textSecondary,
    letterSpacing: 1.5,
  },
  textInput: {
    fontFamily: 'RobotoMono',
    fontSize: 15,
    color: station.textPrimary,
    backgroundColor: station.white,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: station.surfaceMid,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  knobRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  ratioDisplay: {
    alignItems: 'center',
    gap: 4,
  },
  ratioLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: station.textSecondary,
    letterSpacing: 1.5,
  },
  ratioValue: {
    backgroundColor: station.lcdBg,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: station.surfaceDark,
  },
  ratioText: {
    fontFamily: 'RobotoMono',
    fontSize: 18,
    color: station.lcdText,
    fontWeight: '600',
  },
});
