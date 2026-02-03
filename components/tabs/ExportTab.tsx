import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { station } from '@/constants/Colors';

interface ExportTabProps {
  onShare: () => void;
  onSave: () => void;
  isReady: boolean;
  isSaving: boolean;
}

export default function ExportTab({
  onShare,
  onSave,
  isReady,
  isSaving,
}: ExportTabProps) {
  const handleShare = () => {
    if (!isReady || isSaving) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onShare();
  };

  const handleSave = () => {
    if (!isReady || isSaving) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSave();
  };

  const handleSuccess = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View style={styles.container}>
      {/* Status LEDs */}
      <View style={styles.statusRow}>
        <View style={styles.statusLabel}>
          <Text style={styles.statusText}>STATUS</Text>
        </View>
        <View style={styles.leds}>
          <View style={[styles.led, isReady && styles.ledActive]} />
          <View style={[styles.led, isReady && styles.ledActive]} />
          <View style={[styles.led, isReady && styles.ledActive]} />
        </View>
        <Text style={[styles.statusValue, isReady && styles.statusValueActive]}>
          {isSaving ? 'PROCESSING...' : isReady ? 'READY' : 'NO IMAGE'}
        </Text>
      </View>

      {/* Output section */}
      <View style={styles.outputSection}>
        <View style={styles.outputHeader}>
          <Text style={styles.outputTitle}>OUTPUT</Text>
          <View style={styles.outputLine} />
        </View>

        {/* Share Button */}
        <TouchableOpacity
          onPress={handleShare}
          activeOpacity={0.9}
          disabled={!isReady || isSaving}
          style={[styles.shareButton, (!isReady || isSaving) && styles.buttonDisabled]}
        >
          <View style={styles.shareButtonInner}>
            <Text style={styles.shareIcon}>↗</Text>
            <Text style={styles.shareText}>SHARE</Text>
          </View>
          <View style={styles.shareButtonShadow} />
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.9}
          disabled={!isReady || isSaving}
          style={[styles.saveButton, (!isReady || isSaving) && styles.buttonDisabled]}
        >
          <View style={styles.saveButtonInner}>
            <Text style={styles.saveIcon}>↓</Text>
            <Text style={styles.saveText}>SAVE TO CAMERA ROLL</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Info panel */}
      <View style={styles.infoPanel}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>FORMAT</Text>
          <Text style={styles.infoValue}>PNG</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>QUALITY</Text>
          <Text style={styles.infoValue}>HIGH</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: station.surfaceDark,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  statusLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: station.textMuted,
    letterSpacing: 1.5,
  },
  leds: {
    flexDirection: 'row',
    gap: 6,
  },
  led: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: station.ledOff,
  },
  ledActive: {
    backgroundColor: station.ledOn,
    shadowColor: station.ledOn,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  statusValue: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    color: station.textMuted,
    letterSpacing: 1,
  },
  statusValueActive: {
    color: station.accent,
  },
  outputSection: {
    gap: 12,
  },
  outputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  outputTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    color: station.textSecondary,
    letterSpacing: 2,
  },
  outputLine: {
    flex: 1,
    height: 1,
    backgroundColor: station.surfaceMid,
  },
  shareButton: {
    position: 'relative',
  },
  shareButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: station.accent,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    transform: [{ translateY: -4 }],
    // Glossy effect
    borderWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    borderLeftColor: 'rgba(255,255,255,0.1)',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  shareButtonShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#C07072',
    borderRadius: 12,
    zIndex: -1,
  },
  shareIcon: {
    fontSize: 20,
    color: station.white,
    fontWeight: '700',
  },
  shareText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: station.white,
    letterSpacing: 2,
  },
  saveButton: {
    borderWidth: 2,
    borderColor: station.surfaceMid,
    borderRadius: 12,
    backgroundColor: station.surfaceLight,
  },
  saveButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  saveIcon: {
    fontSize: 18,
    color: station.textSecondary,
    fontWeight: '600',
  },
  saveText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: station.textSecondary,
    letterSpacing: 1,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  infoPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: station.surfaceMid,
  },
  infoRow: {
    alignItems: 'center',
    gap: 4,
  },
  infoLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
    color: station.textMuted,
    letterSpacing: 1,
  },
  infoValue: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    color: station.textSecondary,
  },
});
