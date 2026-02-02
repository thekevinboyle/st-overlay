# Feature: Brew Station UI Redesign

## Summary

Transform ST Recipes from a 4-screen linear flow into "Brew Station" - a single-screen tabbed workspace with Y2K Tech-Optimism aesthetic. The redesign introduces a new monochrome/silver + coral color system, skeuomorphic controls (rotary knobs, faders, toggles, cartridge selectors), and equipment-like interactions with haptic feedback.

## User Story

As a **specialty coffee enthusiast**
I want to **document my brews using an interface that feels like premium coffee equipment**
So that **the experience of creating brew cards feels as intentional and satisfying as the brewing ritual itself**

## Problem Statement

The current 4-screen linear flow feels like a generic app. Users navigate through disconnected screens, losing context of their photo while entering data. The interface lacks the tactile, equipment-like feel that resonates with specialty coffee culture.

## Solution Statement

Consolidate the app into a single workspace where:
1. Photo preview is always visible (like a device's main display)
2. Four tabs (DATA, STYLE, FRAME, EXPORT) switch control panels below the photo
3. Skeuomorphic controls (knobs, faders, toggles) make interactions feel physical
4. New Y2K-inspired metallic/silver palette with coral accents creates premium equipment aesthetic
5. Haptic feedback reinforces the tactile nature of each interaction

## Metadata

| Field | Value |
|-------|-------|
| Type | REFACTOR |
| Complexity | HIGH |
| Systems Affected | All screens, all components, navigation, color system, typography |
| Dependencies | expo-haptics (new), Inter font (new) |
| Estimated Tasks | 24 |

---

## UX Design

### Before State
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                              BEFORE: LINEAR FLOW                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║   ┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐             ║
║   │  HOME   │ ───► │  DATA   │ ───► │ EDITOR  │ ───► │ EXPORT  │             ║
║   │         │      │  INPUT  │      │         │      │         │             ║
║   │ Camera/ │      │ Form    │      │ Filters │      │ Share/  │             ║
║   │ Library │      │ Fields  │      │ Frames  │      │ Save    │             ║
║   └─────────┘      └─────────┘      └─────────┘      └─────────┘             ║
║                                                                               ║
║   USER_FLOW: Select photo → Fill form → Choose style → Export                 ║
║   PAIN_POINT: Photo not visible during data entry, disjointed experience      ║
║   DATA_FLOW: imageUri → brewData JSON → filter/frame params → export          ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

### After State
```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                          AFTER: TABBED WORKSPACE                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║   ┌───────────────────────────────────────────────────────────┐               ║
║   │                                                           │               ║
║   │              PHOTO DISPLAY (always visible)               │               ║
║   │              Metallic bezel, live preview                 │               ║
║   │                                                           │               ║
║   └───────────────────────────────────────────────────────────┘               ║
║                                                                               ║
║   ┌───────────────────────────────────────────────────────────┐               ║
║   │                    CONTROL PANEL                          │               ║
║   │              (content changes per tab)                    │               ║
║   │                                                           │               ║
║   │   DATA: Knobs, steppers, segment buttons                  │               ║
║   │   STYLE: Filter cartridges, intensity fader               │               ║
║   │   FRAME: Frame slots, card position, theme toggle         │               ║
║   │   EXPORT: LED status, share/save buttons                  │               ║
║   └───────────────────────────────────────────────────────────┘               ║
║                                                                               ║
║   ┌────────┬────────┬────────┬────────────────┐                               ║
║   │  DATA  │ STYLE  │ FRAME  │    EXPORT      │  ← Physical tab buttons       ║
║   └────────┴────────┴────────┴────────────────┘                               ║
║                                                                               ║
║   USER_FLOW: Select photo → Tabs become active → Switch freely → Export       ║
║   VALUE_ADD: Photo always visible, non-linear exploration, equipment feel     ║
║   DATA_FLOW: All state local to single screen, no param serialization         ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

### Interaction Changes

| Location | Before | After | User Impact |
|----------|--------|-------|-------------|
| Navigation | 4 separate screens | 1 screen + 4 tabs | Photo always visible while editing |
| Data input | Text fields | Rotary knobs + steppers | Tactile, precise adjustments |
| Filter selection | Thumbnail grid | Cartridge slots | "Loading a filter" feeling |
| Method selection | Chips | Segment buttons with press depth | Physical button feedback |
| Theme toggle | Button tap | Sliding switch | Satisfying mechanical action |
| Feedback | Visual only | Haptic + visual | Equipment-like responsiveness |

---

## Mandatory Reading

**CRITICAL: Implementation agent MUST read these files before starting any task:**

| Priority | File | Lines | Why Read This |
|----------|------|-------|---------------|
| P0 | `app/editor.tsx` | 1-300 | Current tab pattern, photo preview, state management |
| P0 | `constants/Colors.ts` | all | Color system structure to REPLACE |
| P0 | `components/DataCard.tsx` | 1-70 | Reanimated + gesture pattern to MIRROR |
| P1 | `app/index.tsx` | 367-395 | 3D button pattern to EXTEND for skeuomorphic controls |
| P1 | `lib/types.ts` | all | BrewData interface, FilterName type |
| P1 | `components/MethodPicker.tsx` | all | Selection state pattern |
| P2 | `app/_layout.tsx` | all | Root layout, font loading |
| P2 | `app/data-input.tsx` | all | Form field patterns to adapt |

**External Documentation:**

| Source | Section | Why Needed |
|--------|---------|------------|
| [Expo Haptics v14](https://docs.expo.dev/versions/latest/sdk/haptics/) | ImpactFeedbackStyle, NotificationFeedbackType | Haptic patterns for controls |
| [Reanimated v4 Gestures](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/handling-gestures/) | Gesture composition | Circular drag for knobs |
| [Expo Google Fonts](https://docs.expo.dev/guides/using-custom-fonts/) | expo-font with Google Fonts | Loading Inter font |

---

## Patterns to Mirror

**NAMING_CONVENTION:**
```typescript
// SOURCE: components/DataCard.tsx:11-17
// COPY THIS PATTERN for all component props:
interface DataCardProps {
  data: BrewData;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  containerSize: { width: number; height: number };
  theme?: 'light' | 'dark';
}
```

**ANIMATION_PATTERN (Reanimated):**
```typescript
// SOURCE: components/DataCard.tsx:27-58
// COPY THIS PATTERN for gesture-based controls:
const scale = useSharedValue(1);
const panGesture = Gesture.Pan()
  .onStart(() => {
    scale.value = withSpring(1.05);
  })
  .onUpdate((event) => {
    // Update values
  })
  .onEnd(() => {
    scale.value = withSpring(1);
  });

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));
```

**TAB_PATTERN:**
```typescript
// SOURCE: app/editor.tsx:174-188
// COPY THIS PATTERN for tab bar:
type EditorTab = 'filters' | 'frames' | 'card';
const [activeTab, setActiveTab] = useState<EditorTab>('filters');

{(['filters', 'frames', 'card'] as EditorTab[]).map((tab) => (
  <TouchableOpacity
    key={tab}
    style={[styles.tab, activeTab === tab && styles.tabActive]}
    onPress={() => setActiveTab(tab)}
  >
    <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
      {tab.toUpperCase()}
    </Text>
    {activeTab === tab && <View style={styles.tabIndicator} />}
  </TouchableOpacity>
))}
```

**3D_BUTTON_PATTERN:**
```typescript
// SOURCE: app/index.tsx:367-395
// COPY THIS PATTERN for skeuomorphic depth:
buttonInner: {
  backgroundColor: brand.ink,
  paddingVertical: 20,
  borderRadius: 4,
  transform: [{ translateY: -4 }],
},
buttonShadow: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '100%',
  backgroundColor: brand.espresso,
  borderRadius: 4,
  zIndex: -1,
},
```

**COLOR_SYSTEM_PATTERN:**
```typescript
// SOURCE: constants/Colors.ts:1-40
// COPY THIS PATTERN for new colors:
export const brand = {
  // Primary palette
  coral: '#f29496',
  // ... more colors
};

export const theme = {
  bg: { primary: brand.cream, /* ... */ },
  text: { primary: brand.ink, /* ... */ },
  shadow: { sm: { /* shadow props */ } },
};
```

---

## Files to Change

| File | Action | Justification |
|------|--------|---------------|
| `constants/Colors.ts` | UPDATE | New Y2K silver/metallic palette |
| `app/_layout.tsx` | UPDATE | Add Inter font loading |
| `app/index.tsx` | REWRITE | Launch screen with source buttons |
| `app/station.tsx` | CREATE | New main workspace (replaces editor) |
| `app/data-input.tsx` | DELETE | Merged into station.tsx DATA tab |
| `app/editor.tsx` | DELETE | Merged into station.tsx |
| `app/export.tsx` | DELETE | Merged into station.tsx EXPORT tab |
| `components/controls/RotaryKnob.tsx` | CREATE | Skeuomorphic rotary control |
| `components/controls/PhysicalToggle.tsx` | CREATE | Sliding toggle switch |
| `components/controls/SegmentButtons.tsx` | CREATE | Radio button group with depth |
| `components/controls/NumericStepper.tsx` | CREATE | +/- stepper with LCD display |
| `components/controls/FaderSlider.tsx` | CREATE | Physical fader control |
| `components/controls/FilterCartridge.tsx` | CREATE | Insertable filter selector |
| `components/layout/PhotoBezel.tsx` | CREATE | Metallic photo frame |
| `components/layout/ControlPanel.tsx` | CREATE | Tab content container |
| `components/layout/TabBar.tsx` | CREATE | Physical tab buttons |
| `components/layout/SectionHeader.tsx` | CREATE | Equipment-style section labels |
| `components/tabs/DataTab.tsx` | CREATE | DATA tab content |
| `components/tabs/StyleTab.tsx` | CREATE | STYLE tab content |
| `components/tabs/FrameTab.tsx` | CREATE | FRAME tab content |
| `components/tabs/ExportTab.tsx` | CREATE | EXPORT tab content |
| `components/DataCard.tsx` | UPDATE | Adapt to new color system |
| `lib/types.ts` | UPDATE | Add new types for controls |

---

## NOT Building (Scope Limits)

Explicit exclusions to prevent scope creep:

- **Sound effects** - Optional feature, defer to polish phase
- **Persistence** - No AsyncStorage for "last used" values yet
- **Custom fonts beyond Inter** - JetBrains Mono deferred, use system mono
- **Advanced haptics** - Start with basic patterns, enhance later
- **Filter intensity slider** - V2 feature, filters at 100% initially
- **Grain toggle** - V2 feature
- **Format selector (PNG/JPG)** - Default to PNG, add later

---

## Step-by-Step Tasks

Execute in order. Each task is atomic and independently verifiable.

---

### Phase 1: Foundation

#### Task 1: UPDATE `constants/Colors.ts` - New Color System

- **ACTION**: Replace existing colors with Y2K silver/metallic palette
- **IMPLEMENT**:
```typescript
export const station = {
  // Surfaces
  surfaceLight: '#E8E8ED',
  surfaceMid: '#C4C4CC',
  surfaceDark: '#2A2A2E',

  // Accent
  accent: '#F29496',
  accentGlow: 'rgba(242, 148, 150, 0.3)',

  // Text
  textPrimary: '#1A1A1C',
  textSecondary: '#6B6B73',

  // Highlights
  white: '#FFFFFF',
  glossHighlight: 'rgba(255, 255, 255, 0.8)',

  // Shadows
  shadowColor: '#A0A0A8',
  shadowDark: 'rgba(0, 0, 0, 0.15)',
};

export const glossy = {
  rest: {
    background: 'linear-gradient(180deg, #F0F0F5 0%, #D8D8E0 100%)',
    borderTop: '1px solid rgba(255,255,255,0.8)',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: '#A0A0A8',
  },
  pressed: {
    background: 'linear-gradient(180deg, #D8D8E0 0%, #E8E8ED 100%)',
    shadowOffset: { width: 0, height: 1 },
  },
};
```
- **KEEP**: Existing `brand` object for backwards compatibility during migration
- **VALIDATE**: `npx tsc --noEmit`

#### Task 2: UPDATE `app/_layout.tsx` - Add Inter Font

- **ACTION**: Add Inter font alongside existing RobotoMono
- **IMPLEMENT**:
```typescript
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const [loaded] = useFonts({
  'RobotoMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  'Inter': Inter_400Regular,
  'Inter-SemiBold': Inter_600SemiBold,
  'Inter-Bold': Inter_700Bold,
});
```
- **INSTALL**: `npx expo install @expo-google-fonts/inter expo-font`
- **VALIDATE**: `npx expo start --web` - fonts load without error

#### Task 3: INSTALL Dependencies

- **ACTION**: Add expo-haptics for tactile feedback
- **COMMAND**: `npx expo install expo-haptics`
- **VALIDATE**: `npx tsc --noEmit` - no type errors

#### Task 4: UPDATE `lib/types.ts` - Add Control Types

- **ACTION**: Add types for new skeuomorphic controls
- **IMPLEMENT**:
```typescript
export type StationTab = 'data' | 'style' | 'frame' | 'export';

export interface KnobConfig {
  min: number;
  max: number;
  step: number;
  unit: string;
}

export interface SegmentOption {
  id: string;
  label: string;
  icon?: string;
}
```
- **VALIDATE**: `npx tsc --noEmit`

---

### Phase 2: Control Kit

#### Task 5: CREATE `components/controls/RotaryKnob.tsx`

- **ACTION**: Build rotary knob with circular gesture
- **PROPS**:
```typescript
interface RotaryKnobProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  unit: string;
  size?: number;
}
```
- **IMPLEMENT**:
  - Circular drag gesture using Gesture.Pan()
  - Calculate angle from center, map to value range
  - Metallic ring with notch marks
  - Glossy center cap
  - LCD-style value display below
  - Haptic tick on step change via `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)`
- **MIRROR**: `components/DataCard.tsx` gesture pattern
- **VALIDATE**: Create test in station.tsx, knob responds to drag

#### Task 6: CREATE `components/controls/NumericStepper.tsx`

- **ACTION**: Build +/- stepper with LCD display
- **PROPS**:
```typescript
interface NumericStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit: string;
  label: string;
}
```
- **IMPLEMENT**:
  - Recessed LCD-style display in center
  - Raised +/- buttons with press depth
  - Hold for rapid increment (useEffect + setInterval)
  - Haptic on each change
- **MIRROR**: `app/index.tsx:367-395` for button depth
- **VALIDATE**: Stepper increments/decrements correctly

#### Task 7: CREATE `components/controls/SegmentButtons.tsx`

- **ACTION**: Build radio button group with physical depth
- **PROPS**:
```typescript
interface SegmentButtonsProps {
  options: SegmentOption[];
  selected: string;
  onChange: (id: string) => void;
}
```
- **IMPLEMENT**:
  - Row of connected buttons with shared border
  - Selected button depressed with coral indicator dot
  - Haptic on selection change
- **MIRROR**: `components/MethodPicker.tsx` for selection state
- **VALIDATE**: Only one option selectable at a time

#### Task 8: CREATE `components/controls/PhysicalToggle.tsx`

- **ACTION**: Build sliding toggle switch
- **PROPS**:
```typescript
interface PhysicalToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  labelLeft: string;
  labelRight: string;
}
```
- **IMPLEMENT**:
  - Recessed track
  - Raised switch handle that slides with spring physics
  - Labels on each side
  - Haptic click on toggle
- **MIRROR**: Reanimated withSpring for slide animation
- **VALIDATE**: Toggle slides between states

#### Task 9: CREATE `components/controls/FaderSlider.tsx`

- **ACTION**: Build physical fader control
- **PROPS**:
```typescript
interface FaderSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}
```
- **IMPLEMENT**:
  - Horizontal track with metallic finish
  - Raised knob that follows finger
  - Value snaps to step increments
  - Haptic at snap points
- **VALIDATE**: Fader slides smoothly, snaps to values

#### Task 10: CREATE `components/controls/FilterCartridge.tsx`

- **ACTION**: Build insertable filter selector
- **PROPS**:
```typescript
interface FilterCartridgeProps {
  filters: FilterName[];
  selected: FilterName;
  onChange: (filter: FilterName) => void;
}
```
- **IMPLEMENT**:
  - Row of raised "cartridge" blocks
  - Selected cartridge shows coral indicator dot
  - Press animation (depression)
  - Haptic "chunk" on selection
- **MIRROR**: Editor filter selection pattern
- **VALIDATE**: Filter cartridges respond to press

---

### Phase 3: Layout Components

#### Task 11: CREATE `components/layout/PhotoBezel.tsx`

- **ACTION**: Build metallic frame for photo display
- **PROPS**:
```typescript
interface PhotoBezelProps {
  imageUri: string | null;
  filter: FilterName;
  frameId: string | null;
  children?: React.ReactNode; // For DataCard overlay
}
```
- **IMPLEMENT**:
  - Dark metallic outer bezel (`surfaceDark`)
  - Subtle inner bevel/highlight
  - Photo with filter overlay
  - Frame border around photo (not overlay)
  - "NO INPUT" state with static texture when no photo
- **MIRROR**: `app/editor.tsx` photo preview structure
- **VALIDATE**: Bezel renders with and without photo

#### Task 12: CREATE `components/layout/SectionHeader.tsx`

- **ACTION**: Build equipment-style section labels
- **PROPS**:
```typescript
interface SectionHeaderProps {
  label: string;
}
```
- **IMPLEMENT**:
  - Small caps, tracked wide
  - Thin rule line extending to right edge
  - Subtle embossed appearance
- **VALIDATE**: Headers render correctly

#### Task 13: CREATE `components/layout/TabBar.tsx`

- **ACTION**: Build physical tab button bar
- **PROPS**:
```typescript
interface TabBarProps {
  activeTab: StationTab;
  onChange: (tab: StationTab) => void;
  disabled?: boolean;
}
```
- **IMPLEMENT**:
  - Four connected buttons (DATA, STYLE, FRAME, EXPORT)
  - Active tab has coral background, depressed appearance
  - Inactive tabs have metallic silver appearance
  - Haptic on tab switch
  - `disabled` prop dims all tabs (for no-photo state)
- **MIRROR**: `app/editor.tsx:174-188` tab pattern
- **VALIDATE**: Tabs switch correctly, active state visible

#### Task 14: CREATE `components/layout/ControlPanel.tsx`

- **ACTION**: Build container for tab content
- **PROPS**:
```typescript
interface ControlPanelProps {
  children: React.ReactNode;
}
```
- **IMPLEMENT**:
  - Raised surface with metallic finish
  - Rounded top corners
  - Scrollable if content exceeds height
- **VALIDATE**: Panel renders with correct styling

---

### Phase 4: Tab Screens

#### Task 15: CREATE `components/tabs/DataTab.tsx`

- **ACTION**: Build DATA tab content with skeuomorphic controls
- **PROPS**:
```typescript
interface DataTabProps {
  brewData: BrewData;
  onChange: (data: BrewData) => void;
}
```
- **IMPLEMENT**:
  - **COFFEE section**: Coffee name text input, Roaster/Origin two-column
  - **RECIPE section**: Dose knob, Water knob, auto-calculated Ratio display
  - **METHOD section**: SegmentButtons for brew method
  - **DETAILS section**: Grind knob, Temperature knob, Time stepper
  - **TASTING section**: Flavor tags (reuse TagInput), Star rating
- **MIRROR**: `app/data-input.tsx` form structure
- **VALIDATE**: All fields update brewData state

#### Task 16: CREATE `components/tabs/StyleTab.tsx`

- **ACTION**: Build STYLE tab with filter controls
- **PROPS**:
```typescript
interface StyleTabProps {
  filter: FilterName;
  onFilterChange: (filter: FilterName) => void;
}
```
- **IMPLEMENT**:
  - **PROCESSING MODE section**: FilterCartridge component
  - Preview of current filter effect
- **VALIDATE**: Filter selection updates preview

#### Task 17: CREATE `components/tabs/FrameTab.tsx`

- **ACTION**: Build FRAME tab with frame and card controls
- **PROPS**:
```typescript
interface FrameTabProps {
  frameId: string | null;
  onFrameChange: (id: string | null) => void;
  cardPosition: { x: number; y: number };
  onCardPositionChange: (pos: { x: number; y: number }) => void;
  cardTheme: 'light' | 'dark';
  onCardThemeChange: (theme: 'light' | 'dark') => void;
}
```
- **IMPLEMENT**:
  - **SELECT FRAME section**: Horizontal scroll of frame thumbnails in slots
  - **CARD POSITION section**: Mini preview with draggable card
  - **CARD THEME section**: PhysicalToggle for light/dark
- **MIRROR**: `app/editor.tsx` frame selector
- **VALIDATE**: Frame selection and card controls work

#### Task 18: CREATE `components/tabs/ExportTab.tsx`

- **ACTION**: Build EXPORT tab with status and actions
- **PROPS**:
```typescript
interface ExportTabProps {
  onShare: () => void;
  onSave: () => void;
  isReady: boolean;
  isSaving: boolean;
}
```
- **IMPLEMENT**:
  - **Status LEDs**: Three dots, coral when ready
  - **SHARE button**: Large glossy coral button
  - **SAVE button**: Secondary metallic button
  - Haptic success feedback on complete
- **MIRROR**: `app/export.tsx` share/save logic
- **VALIDATE**: Buttons trigger callbacks, LEDs respond to isReady

---

### Phase 5: Main Screen

#### Task 19: CREATE `app/station.tsx` - Main Workspace

- **ACTION**: Build the single-screen tabbed workspace
- **IMPLEMENT**:
  - State for: `imageUri`, `brewData`, `selectedFilter`, `selectedFrameId`, `cardPosition`, `cardTheme`, `activeTab`
  - Layout:
    - SafeAreaView with metallic background
    - PhotoBezel (persistent)
    - ControlPanel with active tab content
    - TabBar
  - Tab content switching based on `activeTab`
  - Export logic from current `app/export.tsx`
- **IMPORTS**: All new components
- **MIRROR**: `app/editor.tsx` for overall structure
- **VALIDATE**: `npx expo start --web` - screen renders, tabs switch

#### Task 20: REWRITE `app/index.tsx` - Launch Screen

- **ACTION**: Transform into equipment-style source selector
- **IMPLEMENT**:
  - PhotoBezel showing "NO INPUT" state with static texture
  - Brand nameplate: "SUPERTHING BREW STATION"
  - Two large source buttons: CAMERA, LIBRARY
  - TabBar in disabled state
  - On photo selection: navigate to `/station` with `imageUri` param
- **MIRROR**: Current `pickImage` logic
- **VALIDATE**: Source selection works, navigates to station

#### Task 21: UPDATE `app/_layout.tsx` - Update Routes

- **ACTION**: Add station route, remove old routes
- **IMPLEMENT**:
```typescript
<Stack.Screen name="index" />
<Stack.Screen name="station" />
```
- **REMOVE**: data-input, editor, export screen definitions
- **VALIDATE**: Navigation works between index and station

#### Task 22: DELETE Old Screens

- **ACTION**: Remove deprecated screen files
- **DELETE**:
  - `app/data-input.tsx`
  - `app/editor.tsx`
  - `app/export.tsx`
- **VALIDATE**: `npx tsc --noEmit` - no import errors

---

### Phase 6: Integration & Polish

#### Task 23: UPDATE `components/DataCard.tsx` - New Colors

- **ACTION**: Update to use new color system
- **IMPLEMENT**:
  - Replace `brand.*` with `station.*` where appropriate
  - Update theme handling for new palette
- **VALIDATE**: DataCard renders correctly in both themes

#### Task 24: Final Integration Test

- **ACTION**: Full flow validation
- **VALIDATE**:
  1. Launch app - shows "NO INPUT" state
  2. Tap CAMERA or LIBRARY - image picker opens
  3. Select image - navigates to station
  4. DATA tab - all controls work, data updates preview
  5. STYLE tab - filter cartridges work
  6. FRAME tab - frame selection, card positioning works
  7. EXPORT tab - share/save buttons work
  8. Haptics fire on all interactions

---

## Testing Strategy

### Manual Test Cases

| Test | Steps | Expected Result |
|------|-------|-----------------|
| Launch state | Open app | "NO INPUT" display, disabled tabs |
| Photo selection | Tap CAMERA, take photo | Navigates to station, photo in bezel |
| Tab switching | Tap each tab | Content changes, haptic fires |
| Rotary knob | Drag in circle | Value changes smoothly, haptic ticks |
| Stepper | Tap +/-, hold | Value inc/dec, rapid on hold |
| Segment buttons | Tap options | Selection changes, one active |
| Toggle | Swipe switch | Slides with spring, haptic click |
| Filter cartridge | Tap filter | Selection changes, haptic chunk |
| Frame selection | Tap frame | Frame appears around photo |
| Card drag | Drag card | Card moves within bounds |
| Export share | Tap SHARE | Native share sheet opens |
| Export save | Tap SAVE | Success message, haptic pulse |

### Edge Cases Checklist

- [ ] No photo selected - tabs disabled
- [ ] Empty brew data - card doesn't render
- [ ] Knob at min/max - stops at bounds
- [ ] Rapid tab switching - no race conditions
- [ ] Orientation change - layout adapts (if supported)

---

## Validation Commands

### Level 1: STATIC_ANALYSIS

```bash
npx tsc --noEmit && npx expo export --platform web --output-dir /tmp/validation-build
```

**EXPECT**: Exit 0, no type errors, build succeeds

### Level 2: COMPONENT_RENDER

```bash
npx expo start --web
```

**EXPECT**: App renders without console errors

### Level 3: FULL_FLOW

Manual validation per Testing Strategy table above.

---

## Acceptance Criteria

- [ ] Single-screen tabbed workspace replaces 4-screen flow
- [ ] Photo always visible during editing
- [ ] All 6 skeuomorphic controls implemented and functional
- [ ] Y2K metallic/silver color palette applied throughout
- [ ] Haptic feedback on all interactions
- [ ] Tab switching works with visual feedback
- [ ] Export (share/save) functionality preserved
- [ ] No TypeScript errors
- [ ] Web build succeeds

---

## Completion Checklist

- [ ] Phase 1: Foundation (Tasks 1-4) complete
- [ ] Phase 2: Control Kit (Tasks 5-10) complete
- [ ] Phase 3: Layout Components (Tasks 11-14) complete
- [ ] Phase 4: Tab Screens (Tasks 15-18) complete
- [ ] Phase 5: Main Screen (Tasks 19-22) complete
- [ ] Phase 6: Integration (Tasks 23-24) complete
- [ ] All validation commands pass
- [ ] All acceptance criteria met

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Circular gesture math complexity | MED | MED | Use atan2 for angle calculation, test extensively |
| Haptics not working on web | HIGH | LOW | Graceful fallback - haptics are native-only, no-op on web |
| Performance with many controls | LOW | MED | Use Reanimated worklets, avoid JS thread blocking |
| Font loading issues | LOW | MED | Fallback to system fonts if Inter fails to load |
| State management complexity | MED | MED | Keep all state in station.tsx, prop drill to tabs |

---

## Notes

### Design Decisions

1. **Single screen vs navigation** - Single screen chosen for "device" feel; all state local, no serialization overhead
2. **Prop drilling over Context** - Matches existing codebase pattern; complexity doesn't warrant Context
3. **Reanimated over Animated API** - Gestures require Reanimated; use consistently for all control animations
4. **Inter font** - Clean neo-grotesque that pairs well with monospace; available via Expo Google Fonts

### Future Enhancements (V2)

- Filter intensity slider
- Grain control toggle
- Sound effects (optional)
- AsyncStorage for last-used values
- PNG/JPG format selector
- JetBrains Mono for true monospace
