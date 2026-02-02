# ST Recipes - Design Document

**Date:** 2026-02-02
**Status:** Approved

## Overview

A mobile app for Superthing Coffee to create shareable brew cards. Users photograph their brew, input recipe data, apply filters and branded frames, then share to social media.

No accounts, no cloud, no stored recipes. Fully local, fast, lightweight.

## Core Flow

1. User takes/selects a photo of their brew
2. Inputs brew data (all fields optional)
3. Picks a filter (Coral Haze, VHS Café, or Film Grain)
4. Chooses a branded Superthing frame overlay
5. Positions data card overlay on image
6. Share via native share sheet or save to camera roll

## Brew Data Fields

- **Coffee**: Name, Roaster, Origin
- **Recipe**: Dose (g), Water (g), Ratio, Grind size, Temperature, Time
- **Method**: Brew method (V60, Espresso, Aeropress, etc.)
- **Tasting**: Flavor notes (tags), Rating (stars)

All fields optional for flexibility.

## Screen Flow

### Screen 1: Home/Camera
- Full-screen camera viewfinder with capture button
- "Choose from library" option
- Minimal Superthing branding (logo in corner)
- Roboto Mono typography throughout

### Screen 2: Brew Data Input
- Clean form with grouped fields
- Fields can be left blank
- "Next" button to continue

### Screen 3: Style Editor
- Photo preview with live filter/frame/overlay preview
- Bottom sections for:
  - Filters (horizontal scroll, 3 options)
  - Frames (horizontal scroll, branded assets)
  - Card position (drag to reposition)
- "Export" button when satisfied

### Screen 4: Export
- Final preview
- Two buttons: "Share" (native sheet) / "Save" (camera roll)

## Visual Design

### Brand Styling
- **Colors**: Coral (#f29496), Peach (#f29165), Soft Yellow (#efda82), Black, White
- **Typography**: Roboto Mono throughout
- **UI style**: Minimalist, generous whitespace, playful touches

### Data Card Overlay
- Semi-transparent background (white or black at ~80% opacity)
- Auto-picks light/dark based on image content
- Monospace text for technical "brew log" feel
- Compact layout:

```
┌─────────────────────────┐
│  ETHIOPIA YIRGACHEFFE   │
│  Superthing Coffee      │
│                         │
│  18g → 270g   1:15      │
│  V60  94°C  3:30        │
│  Medium-fine            │
│                         │
│  Blueberry, Citrus      │
│  ★★★★☆                  │
└─────────────────────────┘
```

- Draggable to position anywhere on image
- Subtle Superthing logo watermark in card corner

## The Three Filters

### 1. Coral Haze (The Signature)
- Warm peachy-coral color wash
- Slightly lifted shadows
- Gentle saturation boost on warm tones
- Matches Superthing brand palette
- Best for: bright, inviting shots

### 2. VHS Café (The Weird One)
- Subtle film grain overlay
- Slight color bleed/chromatic aberration
- Faint horizontal scan lines (tasteful)
- Desaturated with warm/amber shift
- Best for: moody, nostalgic, quirky shots

### 3. Film Grain (The Classic)
- Portra 400-inspired warmth
- Natural grain texture
- Soft contrast curve
- Slightly faded blacks
- Best for: universally flattering

All filters applied via WebGL shaders for real-time preview performance.

## Technical Architecture

### Stack
- React Native + Expo (SDK 52+)
- Expo Router for navigation
- Expo Image Picker (camera/library)
- Expo GL + gl-react for WebGL filters
- Expo Media Library (save to camera roll)
- Expo Sharing (native share sheet)

### Project Structure
```
/app
  _layout.tsx        # Root layout
  index.tsx          # Home/Camera screen
  data-input.tsx     # Brew data form
  editor.tsx         # Style editor
  export.tsx         # Final preview + share/save

/components
  BrewDataForm.tsx   # Form with all fields
  FilterPreview.tsx  # WebGL filter application
  FrameOverlay.tsx   # Branded frame renderer
  DataCard.tsx       # Draggable data overlay

/assets
  /frames            # Branded frame PNGs
  /filters           # Shader files or LUT images

/lib
  filters.ts         # Filter definitions
  image-export.ts    # Composite export logic
```

### Image Export Flow
1. Capture GL view (filtered photo) as image
2. Composite frame overlay on top
3. Render data card at positioned coordinates
4. Export final composite as PNG/JPEG

## V1 Scope

### In Scope
- Photo capture or library selection
- Manual brew data entry (11 fields, all optional)
- 3 filters (Coral Haze, VHS Café, Film Grain)
- Branded frame overlays (from provided assets)
- Draggable data card overlay
- Share via native share sheet
- Save to camera roll
- iOS build (Android follows same codebase)

### Out of Scope (Future)
- Recipe templates / saved recipes
- Brewing app integrations (Decent, Acaia)
- Coffee bag scanning / OCR
- User accounts / cloud sync
- Video support
- Additional filter packs
- In-app social feed

## Asset Requirements

- Frame assets: Transparent PNGs with designated "safe zone" for photo content
- Frames should work for both portrait and landscape orientations
- Recommended frame resolution: 1080x1350 (4:5) and 1080x1920 (9:16) variants

## Considerations

- Support both portrait and landscape photos
- May want light/dark card theme toggle
- Filters should be performant on mid-range devices
