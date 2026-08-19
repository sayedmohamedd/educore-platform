---
name: Modern EdTech Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#6b38d4'
  on-secondary: '#ffffff'
  secondary-container: '#8455ef'
  on-secondary-container: '#fffbff'
  tertiary: '#00685d'
  on-tertiary: '#ffffff'
  tertiary-container: '#008376'
  on-tertiary-container: '#f4fffb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#71f8e4'
  tertiary-fixed-dim: '#4fdbc8'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005048'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is built on a foundation of **Modern Minimalism** infused with **Soft Tactility**. It balances the precision of an educational tool with a youthful, inspiring energy. The brand personality is optimistic and approachable, avoiding corporate stiffness in favor of a "human-centric" digital environment.

Visual interest is generated through:
- **Atmospheric Depth:** Using floating elements and soft, blurred background shapes to create a sense of space.
- **Dynamic Gradients:** High-energy transitions between indigo and violet to highlight progression and achievement.
- **Generous Whitespace:** Prioritizing cognitive ease by allowing content to breathe, ensuring the learning experience never feels cluttered.
- **Soft Geometry:** Utilizing large corner radii to make the interface feel safe and welcoming.

## Colors
The palette is centered around vibrant, cool tones that signify intelligence and growth. 
- **Primary Action:** The Indigo-to-Violet gradient is the signature "Hero" treatment. It should be reserved for high-impact CTAs, progress indicators, and active states.
- **Semantic Clarity:** Status colors are saturated and clear, providing immediate feedback on student performance or system alerts.
- **Neutral Foundation:** We use a Slate-based neutral scale (`#0F172A` to `#F8FAFC`) to maintain a premium, polished feel that is softer than pure black/white.
- **Interactive States:** Hover states for primary elements shift toward a deeper Indigo (`#4F46E5`) or increase shadow depth rather than just changing opacity.

## Typography
The typography uses **Plus Jakarta Sans** across all levels to maintain a cohesive, modern, and slightly rounded aesthetic. 
- **Headlines:** Use Bold (700) or ExtraBold (800) for headlines to create a strong visual hierarchy. Tighten letter spacing slightly on larger display sizes.
- **Body Text:** Use Regular (400) for readability. Ensure a line height of at least 1.5x the font size for long-form educational content.
- **Hierarchy:** Use color (Secondary Text: `#64748B`) rather than just size to distinguish between primary information and metadata.

## Layout & Spacing
This design system utilizes a strict **8px linear scale**.
- **Grid:** A 12-column fluid grid for desktop with 24px gutters. On mobile, transition to a 4-column grid with 16px margins.
- **Rhythm:** Use generous vertical padding (`40px` to `64px`) between sections on public-facing pages to reinforce the premium, "airy" feel.
- **Dashboard Layout:** Features a fixed left sidebar (280px) and a fluid content area. Use "Cards" as the primary layout engine for dashboard widgets, with 24px internal padding.

## Elevation & Depth
Depth is created through **Ambient Shadows** and tonal layering. Avoid harsh, dark shadows.
- **Surface Level (0dp):** The main background (`#F8FAFC`).
- **Card Level (1dp):** White surfaces with a very soft shadow: `0px 4px 20px rgba(15, 23, 42, 0.05)`.
- **Hover State (2dp):** When interacting with cards or buttons, the shadow expands and softens: `0px 10px 30px rgba(15, 23, 42, 0.08)`.
- **Overlay Level (3dp):** Dialogs and Modals use a significant blur and a deeper shadow: `0px 20px 50px rgba(15, 23, 42, 0.12)`.
- **Glassmorphism:** Use background blurs (12px to 20px) on navigation bars and floating shapes to add a layer of sophistication.

## Shapes
The shape language is defined by large, friendly radii. 
- **Interactive Elements:** Buttons and Inputs share a `14px` radius, providing a modern, "squircle" feel that is easy on the eyes.
- **Containers:** Cards use a `20px` radius to clearly distinguish them from the background.
- **Specialty Shapes:** Use "Pill" shapes for tags/chips and decorative background elements. Ensure all icons have rounded caps and joins to match the `Plus Jakarta Sans` letterforms.

## Components
- **Buttons:** 
    - *Primary:* Gradient fill (Indigo-Violet), white text, `14px` radius, subtle drop shadow.
    - *Secondary:* Indigo border (`2px`), transparent background, `14px` radius.
- **Cards:** White background, `20px` radius, `24px` padding. On hover, they should lift slightly (-4px Y-axis) and the shadow should intensify.
- **Input Fields:** `14px` radius, `#F1F5F9` background, `#E2E8F0` border. On focus, the border transitions to Primary Indigo with a soft outer glow.
- **Navigation:** 
    - *Sidebar:* Clean, minimal icons. Active state uses a soft Indigo tint (`#EEF2FF`) with a `12px` radius on the background highlight.
    - *Navbar:* Semi-transparent background blur (Glassmorphism) with a thin bottom border (`#E2E8F0`).
- **Data Visualization:** Use rounded ends on bar charts. Tables should have rounded corners on the header and first/last rows, avoiding heavy vertical lines in favor of soft horizontal dividers.
- **Empty States:** Use friendly, soft-colored illustrations and centered typography with a clear "Call to Action" button.