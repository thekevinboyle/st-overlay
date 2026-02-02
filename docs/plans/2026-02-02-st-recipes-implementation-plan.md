# ST Recipes - Implementation Plan

**Date:** 2026-02-02
**Design:** [2026-02-02-st-recipes-design.md](./2026-02-02-st-recipes-design.md)

## Phase 1: Project Setup & Core Navigation

### 1.1 Install Dependencies
```bash
npx expo install expo-image-picker expo-media-library expo-sharing expo-gl gl-react gl-react-expo react-native-gesture-handler
```

### 1.2 Add Roboto Mono Font
- Download Roboto Mono from Google Fonts
- Add to `/assets/fonts/`
- Update `_layout.tsx` to load the font

### 1.3 Restructure App Routes
Replace tabs template with linear flow:
- `/app/index.tsx` - Camera/photo selection screen
- `/app/data-input.tsx` - Brew data form
- `/app/editor.tsx` - Style editor (filters, frames, card positioning)
- `/app/export.tsx` - Final preview + share/save

### 1.4 Create Asset Directories
```
/assets
  /fonts
    RobotoMono-Regular.ttf
    RobotoMono-Medium.ttf
    RobotoMono-Bold.ttf
  /frames
    (user will add branded frame PNGs)
  /images
    (app icons, splash)
```

---

## Phase 2: Camera & Photo Selection Screen

### 2.1 Create Home Screen (`/app/index.tsx`)
- Full-screen camera preview using `expo-camera` or camera via `expo-image-picker`
- Large capture button at bottom
- "Choose from Library" button
- Minimal Superthing logo in top corner
- On photo selection, navigate to `/data-input` with image URI in params

### 2.2 Permissions Handling
- Request camera permissions
- Request photo library permissions
- Graceful fallback if denied

---

## Phase 3: Brew Data Input Form

### 3.1 Create BrewDataForm Component (`/components/BrewDataForm.tsx`)
Data fields (all optional):
- `coffeeName` - Text input
- `roaster` - Text input
- `origin` - Text input
- `dose` - Numeric input (grams)
- `water` - Numeric input (grams)
- `ratio` - Text input (e.g., "1:15")
- `grindSize` - Text input
- `temperature` - Numeric input (°C)
- `brewTime` - Text input (e.g., "3:30")
- `brewMethod` - Dropdown (V60, Espresso, Aeropress, Chemex, French Press, Other)
- `flavorNotes` - Tag/chip input (multiple values)
- `rating` - Star rating (1-5)

### 3.2 Create Data Input Screen (`/app/data-input.tsx`)
- Scrollable form with grouped sections
- Photo thumbnail preview at top
- "Next" button to proceed to editor
- Pass image URI + brew data to editor screen

### 3.3 UI Components
- Custom text inputs with Roboto Mono
- Dropdown/picker for brew method
- Tag input for flavor notes
- Star rating component

---

## Phase 4: Filter System

### 4.1 Create Filter Definitions (`/lib/filters.ts`)
Define the 3 filters with adjustable parameters:

**Coral Haze:**
- Saturation: +0.1
- Warmth: +0.15
- Shadows: lifted
- Coral color overlay at 15% opacity

**VHS Café:**
- Saturation: -0.2
- Grain intensity: 0.3
- Scan lines: subtle
- Chromatic aberration: slight
- Warmth: +0.1

**Film Grain:**
- Warmth: +0.12
- Contrast: soft curve
- Grain intensity: 0.2
- Black point: lifted slightly

### 4.2 Create FilterPreview Component (`/components/FilterPreview.tsx`)
- Uses `gl-react-expo` for WebGL rendering
- Takes image URI and filter name as props
- Renders filtered image in real-time
- Exports method to capture filtered result

### 4.3 Create Shader Files (`/lib/shaders/`)
- `coral-haze.glsl` - Warm coral color grading
- `vhs-cafe.glsl` - Analog VHS effect
- `film-grain.glsl` - Classic film look
- `common.glsl` - Shared utilities (grain, vignette)

---

## Phase 5: Frame Overlays

### 5.1 Create FrameOverlay Component (`/components/FrameOverlay.tsx`)
- Renders transparent PNG frame over photo
- Scales frame to match photo aspect ratio
- Frame assets loaded from `/assets/frames/`

### 5.2 Frame Asset Requirements
Document for user:
- Transparent PNG format
- Safe zone marked for photo content
- Recommended sizes: 1080x1350 (4:5), 1080x1920 (9:16)
- Naming convention: `frame-{name}.png`

---

## Phase 6: Data Card Overlay

### 6.1 Create DataCard Component (`/components/DataCard.tsx`)
- Renders brew data in styled card format
- Semi-transparent background (white/black at 80%)
- Auto light/dark based on image brightness
- Roboto Mono typography
- Superthing logo watermark
- Layout matches design spec

### 6.2 Make Card Draggable
- Use `react-native-gesture-handler` for pan gestures
- Card can be positioned anywhere on image
- Store position as percentage for export

---

## Phase 7: Style Editor Screen

### 7.1 Create Editor Screen (`/app/editor.tsx`)
- Main preview area showing:
  - Filtered photo
  - Frame overlay
  - Draggable data card
- Bottom control panel with tabs:
  - Filters (horizontal scroll of 3 options)
  - Frames (horizontal scroll of available frames)
- "Export" button when satisfied

### 7.2 Create FilterSelector Component (`/components/FilterSelector.tsx`)
- Horizontal scroll of filter thumbnails
- Shows filter name below each
- Highlights selected filter
- Coral-colored selection indicator

### 7.3 Create FrameSelector Component (`/components/FrameSelector.tsx`)
- Horizontal scroll of frame thumbnails
- "None" option first
- Shows frame name below each

---

## Phase 8: Export & Sharing

### 8.1 Create Export Screen (`/app/export.tsx`)
- Full-screen final preview
- Two action buttons:
  - "Share" - Opens native share sheet
  - "Save" - Saves to camera roll

### 8.2 Create Image Compositing Logic (`/lib/image-export.ts`)
Export flow:
1. Capture GL view (filtered photo) as image
2. Composite frame overlay on top
3. Render data card at positioned coordinates
4. Return final image as base64 or URI

### 8.3 Implement Share/Save
- Use `expo-sharing` for native share sheet
- Use `expo-media-library` for camera roll save
- Handle permissions for media library

---

## Phase 9: Polish & Testing

### 9.1 Typography
- Ensure Roboto Mono loads correctly
- Consistent font weights throughout

### 9.2 Theming
- Light/dark mode support
- Brand colors applied consistently

### 9.3 Performance
- Optimize GL rendering
- Lazy load frames
- Image resizing for performance

### 9.4 Testing
- Test on iOS simulator
- Test all 3 filters
- Test share/save flows
- Test with various image sizes/orientations

---

## File Structure Summary

```
/app
  _layout.tsx
  index.tsx              # Camera/photo selection
  data-input.tsx         # Brew data form
  editor.tsx             # Style editor
  export.tsx             # Final preview + share/save

/components
  BrewDataForm.tsx
  FilterPreview.tsx
  FilterSelector.tsx
  FrameOverlay.tsx
  FrameSelector.tsx
  DataCard.tsx
  StarRating.tsx
  TagInput.tsx

/assets
  /fonts
    RobotoMono-Regular.ttf
    RobotoMono-Medium.ttf
    RobotoMono-Bold.ttf
  /frames
    (branded frame PNGs)
  /images
    icon.png
    splash-icon.png

/constants
  Colors.ts              # Brand colors

/lib
  filters.ts             # Filter definitions
  image-export.ts        # Compositing logic
  /shaders
    coral-haze.glsl
    vhs-cafe.glsl
    film-grain.glsl
    common.glsl

/docs
  /plans
    2026-02-02-st-recipes-design.md
    2026-02-02-st-recipes-implementation-plan.md
```

---

## Implementation Order

1. **Phase 1** - Setup, dependencies, navigation structure
2. **Phase 2** - Camera/photo selection working
3. **Phase 3** - Brew data form complete
4. **Phase 6** - Data card component (can test standalone)
5. **Phase 4** - Filter system with GL rendering
6. **Phase 5** - Frame overlay component
7. **Phase 7** - Editor screen integrating all components
8. **Phase 8** - Export and sharing
9. **Phase 9** - Polish and testing

## Dependencies to Install

```bash
npx expo install \
  expo-image-picker \
  expo-media-library \
  expo-sharing \
  expo-camera \
  expo-gl \
  react-native-gesture-handler \
  @shopify/react-native-skia
```

Note: Using `@shopify/react-native-skia` instead of `gl-react` as it's more actively maintained and has better Expo support.
