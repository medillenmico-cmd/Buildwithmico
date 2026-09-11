---
name: BuildWithMico
description: A cinematic portfolio for connected lead systems built by Mico.
colors:
  void-black: '#050505'
  deep-surface: '#0a0a0a'
  graphite-card: '#101010'
  signal-white: '#ffffff'
  operational-gray: '#b5b5b5'
  muted-gray: '#9a9a9a'
  interface-line: 'rgba(255, 255, 255, 0.1)'
  interface-line-strong: 'rgba(255, 255, 255, 0.18)'
  quiet-glass: 'rgba(255, 255, 255, 0.04)'
typography:
  display:
    fontFamily: 'Geist, Arial, Helvetica, sans-serif'
    fontSize: 'clamp(3.2rem, 7.1vw, 7.1rem)'
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Geist, Arial, Helvetica, sans-serif'
    fontSize: 'clamp(2.75rem, 5vw, 5.5rem)'
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: '-0.04em'
  body:
    fontFamily: 'Geist, Arial, Helvetica, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'Geist Mono, monospace'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: '0.04em'
rounded:
  surface-sm: '16px'
  surface-md: '19px'
  surface-lg: '22px'
  project: '26px'
  pill: '999px'
spacing:
  compact: '8px'
  control: '12px'
  group: '24px'
  section-mobile: '76px'
  section-desktop: '152px'
components:
  button-primary:
    backgroundColor: '{colors.signal-white}'
    textColor: '{colors.void-black}'
    rounded: '{rounded.pill}'
    padding: '14px 20px'
  button-secondary:
    backgroundColor: 'transparent'
    textColor: '{colors.signal-white}'
    rounded: '{rounded.pill}'
    padding: '14px 20px'
  project-card:
    backgroundColor: '{colors.graphite-card}'
    textColor: '{colors.signal-white}'
    rounded: '{rounded.project}'
    padding: '16px'
  capability-card:
    backgroundColor: '{colors.graphite-card}'
    textColor: '{colors.signal-white}'
    rounded: '{rounded.surface-md}'
    padding: '28px'
---

# Design System: BuildWithMico

## Overview

**Creative North Star: "The Living Systems Console"**

BuildWithMico feels like entering a quiet, cinematic control room for connected lead systems. The atmosphere is near-black, metallic, and precise; the content remains human through Mico's portrait, direct first-person copy, and real project imagery. The abstract hero animation supports the world through technical rings, light trails, and controlled motion, while the portfolio's proof comes from visible workflow logic and implementation detail.

The system is expressive through scale, pacing, and purposeful motion rather than added color or decorative effects. Surfaces are restrained and tactile. Interfaces should feel engineered, premium, and legible—never like a generic SaaS template or a speculative AI product.

**Key Characteristics:**

- Cinematic near-black atmosphere with signal-white hierarchy.
- Large, tightly composed Geist headings and concise supporting copy.
- Rounded dark surfaces with quiet borders and ambient depth.
- Subtle grids and controlled motion used to explain systems.
- Mico's portrait, project imagery, and the abstract hero animation remain established identity assets.
- Proof and connected workflow logic lead; decoration supports.

## Colors

The palette is deliberately monochromatic: white carries priority, restrained grays carry explanation, and near-black layers create depth.

### Primary

- **Signal White:** Primary headings, selected controls, focus treatment, and active system states.

### Neutral

- **Void Black:** The continuous page background and darkest visual field.
- **Deep Surface:** Quiet inset media and section surfaces.
- **Graphite Card:** Repeated cards and proof containers.
- **Operational Gray:** Body copy that must remain clearly readable.
- **Muted Gray:** Secondary facts and nonessential metadata only.
- **Interface Line / Interface Line Strong:** Local component boundaries and states, never repeated section dividers.
- **Quiet Glass:** Rare tonal lift for contextual controls and grouped proof.

**The Signal Restraint Rule.** White is the only visual accent. Its scarcity creates hierarchy; no unrelated accent colors are introduced.

**The One Divider Rule.** The only prominent full-width divider is between the final call to action and footer metadata. Cards may use quiet local borders when they clarify a surface.

## Typography

**Display Font:** Geist Sans (with Arial and Helvetica fallbacks)  
**Body Font:** Geist Sans (with Arial and Helvetica fallbacks)  
**Label/Mono Font:** Geist Mono (with monospace fallback)

**Character:** Geist Sans gives the page a direct, modern voice; Geist Mono is reserved for compact system language and utility details. Typography is confident through scale and spacing, not all-caps decoration.

### Hierarchy

- **Display:** Tight, medium-weight statements used for the hero and final CTA.
- **Headline:** Large section statements that establish a new reading beat.
- **Title:** Compact project and capability names with close supporting copy.
- **Body:** Plain-language explanation at a comfortable measure and at least 16px.
- **Label:** Sparse utility text and tool chips; never a decorative eyebrow or section number.

**The Proof Before Metrics Rule.** Large type gives project evidence and system logic priority. “1+ Years of Overall Experience” remains truthful but visually supporting.

## Layout

The page uses a single narrative scroll with a full-viewport cinematic hero followed by generous content sections capped around 1540px. Wide layouts use asymmetric two-column compositions for introductions and paired project proof. The spatial rhythm alternates expansive section openings with denser evidence clusters.

At tablet widths, multi-column regions collapse in reading order. At mobile widths, navigation stays compact, project evidence becomes linear, tap targets remain at least 44px, and repeated capability content tightens rather than becoming a long stack of oversized cards. DOM order and visual order stay aligned.

**The Journey Spine Rule.** Capture → Qualify → Follow Up → Track → Book is the page's recurring structural thread. Process and service capabilities should attach to that journey rather than repeat it as separate inventories.

## Elevation & Depth

Depth is primarily tonal and atmospheric. Dark surfaces separate through small luminance changes, restrained local borders, image treatment, and ambient shadows that appear most clearly during interaction. The page does not use gratuitous glass effects or persistent glow.

### Shadow Vocabulary

- **Ambient Card Lift:** A broad near-black shadow used on interactive cards during hover or active states.
- **Focused Signal:** A small white halo reserved for the active point in a connected workflow.
- **Cinematic Field:** Soft radial or vignette depth behind existing imagery, never an unrelated color gradient.

**The Flat-at-Rest Rule.** Surfaces stay quiet until state, hierarchy, or system progression gives depth a job.

## Shapes

Rounded dark surfaces use a restrained family from compact 16px panels to 26px project cards. Pills are reserved for actions, tool chips, and compact status language. Fine corner marks may frame real imagery as an interface motif, but they never become section labels or decoration without content.

## Components

### Buttons

- **Shape:** Fully rounded pill controls with a minimum 44px hit area.
- **Primary:** Signal-white fill with void-black text for the page's main conversion action.
- **Secondary:** Transparent dark control with a quiet local border.
- **Hover / Focus:** Small translation or tonal change; keyboard focus is high-contrast and visible.

### Chips

- **Style:** Compact Geist Mono text inside quiet outlined pills.
- **Use:** Names tools or implementation capabilities only. Chips do not carry fabricated outcomes or ornamental metadata.

### Cards / Containers

- **Corner Style:** Rounded surfaces with a larger radius for project proof and a tighter radius for capabilities.
- **Background:** Near-black tonal layers, never bright glass panels.
- **Shadow Strategy:** Flat at rest; ambient lift only for genuine interactive states.
- **Border:** Quiet, local, and functional.
- **Internal Padding:** Compact enough to keep related evidence together.

### Navigation

The fixed navigation uses plain Geist labels, generous invisible hit areas, restrained default opacity, and a clear active underline. It contains no numbering or decorative prefixes.

### Connected Journey

The signature interface is a living five-stage system path: Capture, Qualify, Follow Up, Track, and Book. It uses sequence, controlled motion, and attached capability evidence to make Mico's connected-system work visible without fabricating product screenshots.

## Do's and Don'ts

### Do:

- **Do** use Mico's portrait, existing project imagery, and the abstract black-and-white hero animation as established assets.
- **Do** let real project evidence and implementation logic carry credibility.
- **Do** define GoHighLevel (GHL), customer relationship management (CRM), and conversion rate optimization (CRO) in plain language when first introduced.
- **Do** use the five-stage journey to connect process and service capabilities.
- **Do** preserve reduced-motion behavior and clear keyboard states.

### Don't:

- **Don't** invent clients, outcomes, statistics, screenshots, testimonials, or capabilities.
- **Don't** restore uppercase section labels, section numbering, card numbering, metadata eyebrows, or decorative top labels.
- **Don't** add repeated divider lines, random accent colors, gratuitous glass, excessive glow, or generic AI-template styling.
- **Don't** let the experience metric overpower project proof.
- **Don't** replace the incumbent site with an unrelated redesign.
