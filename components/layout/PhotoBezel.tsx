import { View, Text, StyleSheet, Image } from 'react-native';
import { station } from '@/constants/Colors';
import { FilterName } from '@/lib/types';
import { getFrameById } from '@/lib/frames';

const BEZEL_PADDING = 6;
const FRAME_BORDER = 16;

interface PhotoBezelProps {
  imageUri: string | null;
  filter: FilterName;
  frameId: string | null;
  children?: React.ReactNode;
  aspectRatio?: number;
}

export default function PhotoBezel({
  imageUri,
  filter,
  frameId,
  children,
  aspectRatio = 4 / 5,
}: PhotoBezelProps) {
  const selectedFrame = frameId ? getFrameById(frameId) : null;

  return (
    <View style={styles.bezel}>
      {/* Inner screen area */}
      <View style={[styles.screen, { aspectRatio }]}>
        {imageUri ? (
          <>
            {selectedFrame ? (
              /* Frame surrounds the photo */
              <View style={styles.frameContainer}>
                <Image
                  source={selectedFrame.source}
                  style={styles.frameImage}
                  resizeMode="cover"
                />
                {/* Photo window inside frame */}
                <View style={styles.photoWindow}>
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.photo}
                    resizeMode="cover"
                  />
                  {/* Filter overlay on photo */}
                  {filter !== 'none' && (
                    <View
                      style={[
                        styles.filterOverlay,
                        filter === 'coral-haze' && styles.coralFilter,
                        filter === 'vhs-cafe' && styles.vhsFilter,
                        filter === 'film-grain' && styles.filmFilter,
                      ]}
                    />
                  )}
                  {filter === 'vhs-cafe' && <View style={styles.scanLines} />}
                  {/* Children (DataCard) inside photo area */}
                  {children}
                </View>
              </View>
            ) : (
              /* No frame - just photo */
              <View style={styles.noFrameContainer}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.photo}
                  resizeMode="cover"
                />
                {filter !== 'none' && (
                  <View
                    style={[
                      styles.filterOverlay,
                      filter === 'coral-haze' && styles.coralFilter,
                      filter === 'vhs-cafe' && styles.vhsFilter,
                      filter === 'film-grain' && styles.filmFilter,
                    ]}
                  />
                )}
                {filter === 'vhs-cafe' && <View style={styles.scanLines} />}
                {children}
              </View>
            )}
          </>
        ) : (
          /* No input state */
          <View style={styles.noInput}>
            <View style={styles.noInputLabel}>
              <Text style={styles.noInputText}>NO INPUT</Text>
            </View>
          </View>
        )}
      </View>

      {/* Bezel highlight */}
      <View style={styles.bezelHighlight} />
    </View>
  );
}

const styles = StyleSheet.create({
  bezel: {
    width: '100%',
    backgroundColor: station.surfaceDark,
    borderRadius: 10,
    padding: BEZEL_PADDING,
    // Bezel border effect
    borderWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    borderLeftColor: 'rgba(255,255,255,0.04)',
    borderRightColor: 'rgba(0,0,0,0.2)',
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  bezelHighlight: {
    position: 'absolute',
    top: 3,
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 1,
  },
  screen: {
    width: '100%',
    backgroundColor: '#1A1A1E',
    borderRadius: 4,
    overflow: 'hidden',
  },
  frameContainer: {
    flex: 1,
    position: 'relative',
  },
  frameImage: {
    width: '100%',
    height: '100%',
  },
  photoWindow: {
    position: 'absolute',
    top: FRAME_BORDER,
    left: FRAME_BORDER,
    right: FRAME_BORDER,
    bottom: FRAME_BORDER,
    overflow: 'hidden',
  },
  noFrameContainer: {
    flex: 1,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  filterOverlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  coralFilter: {
    backgroundColor: 'rgba(242, 148, 150, 0.18)',
  },
  vhsFilter: {
    backgroundColor: 'rgba(60, 45, 35, 0.3)',
  },
  filmFilter: {
    backgroundColor: 'rgba(255, 235, 210, 0.1)',
  },
  scanLines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.06,
  },
  noInput: {
    flex: 1,
    backgroundColor: '#0A0A0C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noInputLabel: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: station.surfaceMid,
  },
  noInputText: {
    fontFamily: 'RobotoMono',
    fontSize: 12,
    color: station.textMuted,
    letterSpacing: 2,
  },
});
