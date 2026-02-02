# ST Recipes Redesign: "Brew Station"

**Date:** 2026-02-02
**Status:** Approved
**Design Framework:** Rasmus Widing PRP + frontend-design skill

---

## Design Direction

### Concept
The app is reimagined as **"Brew Station"** - a premium piece of coffee equipment brought to screen. It's a dedicated device for documenting brews, not just another app.

### Aesthetic Pillars
- **Era**: Y2K Tech-Optimism (translucent plastics, glossy surfaces, designed objects)
- **Palette**: Monochrome/silver + coral pop ("Silver Machine")
- **Typography**: Monospace (data) + Neo-grotesque (UI)
- **Interactions**: Skeuomorphic controls - knobs, faders, physical switches
- **Structure**: Tabbed workspace - photo always visible, tabs for modes

### Inspiration References
- Teenage Engineering OP-1 / TP-7
- iMac G3, early iPod
- La Marzocco touchscreen interfaces
- Nothing Phone design language

---

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Surface Light | `#E8E8ED` | Main background, raised panels |
| Surface Mid | `#C4C4CC` | Bezels, inactive controls |
| Surface Dark | `#2A2A2E` | Photo bezel, deep recesses |
| Accent (Coral) | `#F29496` | Active states, indicators, highlights |
| Accent Glow | `#F29496` @ 30% | Subtle glow behind active elements |
| Text Primary | `#1A1A1C` | Headlines, important labels |
| Text Secondary | `#6B6B73` | Descriptions, hints |
| Pure White | `#FFFFFF` | Glossy highlights, LED indicators |

---

## Typography

### UI Labels & Navigation
- **Font**: Inter or SF Pro Display (neo-grotesque)
- **Tabs**: 11px, semibold, letter-spacing: 2px
- **Section headers**: 13px, bold, uppercase
- **Buttons**: 14px, semibold

### Data & Values
- **Font**: JetBrains Mono or SF Mono
- **Brew data display**: 14px, medium weight
- **Input fields**: 16px, regular
- **Data card overlay**: All mono, various weights

### The Rule
If it's *data about coffee* → monospace
If it's *UI navigation* → sans-serif

---

## Screen Structure

```
┌─────────────────────────────────┐
│  ┌───────────────────────────┐  │  ← Photo Display (always visible)
│  │                           │  │     Metallic bezel frame
│  │      PHOTO PREVIEW        │  │     Shows live filter/frame preview
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │  ← Control Panel Area
│  │                           │  │     Changes based on active tab
│  │    ACTIVE TAB CONTENT     │  │     Skeuomorphic controls
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌─────┬─────┬─────┬─────────┐  │  ← Tab Bar (physical buttons)
│  │ DATA│STYLE│FRAME│ EXPORT  │  │     Glossy, pressable
│  └─────┴─────┴─────┴─────────┘  │     Coral highlight on active
└─────────────────────────────────┘
```

---

## Skeuomorphic Control Kit

### 1. Rotary Knob
For: grind size, temperature, ratio

```
     ╭───────╮
    ╱    │    ╲      ← Metallic ring with notches
   │     │     │     ← Center indicator line
   │     ●     │     ← Glossy center cap
    ╲         ╱
     ╰───────╯
   GRIND  ●━━━━○
   [  MEDIUM  ]      ← LCD-style value display
```

- Circular drag gesture to adjust
- Haptic tick at each notch
- Recessed value display below

### 2. Physical Toggle
For: light/dark card theme

```
┌─────────────────┐
│ ◀ LIGHT ║█████│ │  ← Sliding switch
└─────────────────┘
```

- Slides with spring overshoot
- Recessed track, raised handle
- Haptic click on toggle

### 3. Segment Buttons
For: brew method selection

```
┌──────┬──────┬──────┬──────┐
│  V60 │AERO- │ESPRO │ MORE │
│  ●   │PRESS │      │  ▾   │  ← Coral dot = selected
└──────┴──────┴──────┴──────┘
```

- Physical button depression
- Radio behavior (one active)
- Coral indicator dot

### 4. Numeric Stepper
For: dose, water, time

```
┌───┬─────────┬───┐
│ − │  18.0g  │ + │
└───┴─────────┴───┘
```

- Hold for rapid increment
- LCD-style number display
- Raised +/- buttons

### 5. Fader/Slider
For: filter intensity

```
○━━━━━━━━━●━━━━━━━━━━━━━○
0%       75%          100%
```

- Physical fader knob on track
- Value label follows knob
- Snaps to 5% increments

### 6. Filter Cartridge
For: filter selection

```
┌─────┐
│     │
│CORAL│  ← Raised, insertable look
│  ●  │  ← Coral dot = loaded
└─────┘
```

- Slot/bay housing feeling
- Press to "insert" filter
- Selected state shows loaded

---

## Tab Screens

### Launch Screen (No Photo)

Photo area shows "NO INPUT" with subtle static texture. Brand nameplate "SUPERTHING BREW STATION" in embossed style. Two large source buttons: CAMERA and LIBRARY. Tabs dimmed until photo loaded.

### DATA Tab

**Sections:**
1. **COFFEE** - Name (text input with history dropdown), Roaster, Origin (two-column)
2. **RECIPE** - Dose knob, Water knob, auto-calculated Ratio display
3. **METHOD** - Segment buttons (V60, Aeropress, Espresso, More...)
4. **DETAILS** - Grind knob, Temperature knob, Time stepper
5. **TASTING** - Flavor tags input, Star rating

All fields optional. Smart defaults from last session.

### STYLE Tab

**Sections:**
1. **PROCESSING MODE** - Filter cartridges in horizontal slots (RAW, CORAL, VHS, FILM)
2. **INTENSITY** - Fader slider 0-100%
3. **GRAIN** - Toggle control for film grain amount

### FRAME Tab

**Sections:**
1. **SELECT FRAME** - Horizontal scroll of frame thumbnails in slot housing
2. **CARD POSITION** - Mini preview with draggable card indicator
3. **CARD THEME** - Light/Dark toggle switch

Frames display as borders AROUND the photo, not overlays on top.

### EXPORT Tab

**Sections:**
1. **Status LEDs** - Three dots that light coral when ready
2. **SHARE button** - Large, glossy coral, opens share sheet
3. **SAVE button** - Secondary silver, saves to camera roll
4. **FORMAT selector** - PNG/JPG segment buttons

---

## Motion & Haptics

### Transitions
- **Tab switch**: 150ms crossfade with directional slide
- **Controls**: Spring physics (tension: 300, friction: 20)
- **Photo load**: CRT-style horizontal scan line sweep

### Button Press Physics
```
Rest:    translateY(0), shadow: 0 4px
Pressed: translateY(3px), shadow: 0 1px
Release: Spring back with 50ms overshoot
```

### Haptic Patterns
| Action | Haptic |
|--------|--------|
| Tab switch | Light tap |
| Button press | Medium impact |
| Knob notch | Soft tick |
| Toggle switch | Selection click |
| Export complete | Success (triple pulse) |

### Sound (optional, off by default)
- Mechanical clicks for toggles
- Soft "chunk" for filter selection
- Camera shutter on export

---

## Glossy Effect Recipe (CSS/RN)

For raised, pressable elements:

```css
/* Rest state */
background: linear-gradient(180deg, #F0F0F5 0%, #D8D8E0 100%);
border-top: 1px solid rgba(255,255,255,0.8);
box-shadow: 0 4px 0 #A0A0A8, 0 4px 8px rgba(0,0,0,0.15);

/* Pressed state */
background: linear-gradient(180deg, #D8D8E0 0%, #E8E8ED 100%);
box-shadow: 0 1px 0 #A0A0A8;
transform: translateY(3px);
```

For coral accent buttons, replace grays with coral gradient.

---

## Technical Notes

### Dependencies to Add
- `react-native-reanimated` - Spring physics, gesture handling
- `expo-haptics` - Haptic feedback patterns
- `expo-av` - Optional sound effects

### Component Architecture
```
/components
  /controls
    RotaryKnob.tsx
    PhysicalToggle.tsx
    SegmentButtons.tsx
    NumericStepper.tsx
    FaderSlider.tsx
    FilterCartridge.tsx
  /layout
    PhotoBezel.tsx
    ControlPanel.tsx
    TabBar.tsx
    SectionHeader.tsx
  /screens
    DataTab.tsx
    StyleTab.tsx
    FrameTab.tsx
    ExportTab.tsx
```

### Screen Structure Change
- Remove linear 4-screen flow
- Single screen with persistent photo + tab switching
- Entry: source selection → loads photo → tabs become active

---

## Implementation Priority

1. **Foundation**: New color system, typography, tab structure
2. **Control Kit**: Build reusable skeuomorphic components
3. **Tabs**: Wire up DATA, STYLE, FRAME, EXPORT content
4. **Polish**: Animations, haptics, sound effects
5. **Launch State**: No-photo state with source selection

---

## Summary

The redesign transforms ST Recipes from a standard app flow into "Brew Station" - a tactile, equipment-like interface that celebrates the precision and ritual of specialty coffee. The Y2K Tech-Optimism aesthetic brings warmth and playfulness while the skeuomorphic controls make every interaction feel satisfying and intentional.
