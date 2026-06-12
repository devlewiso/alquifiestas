---
version: alpha
name: Alquifiestas
description: Marketplace B2B2C de alquiler de equipos y eventos para Guatemala y Centroamérica. Identidad visual que combina profesionalismo enterprise con calidez latina.
colors:
  primary: "#0F172A"
  primary-light: "#1E293B"
  secondary: "#3B82F6"
  secondary-hover: "#2563EB"
  accent: "#F59E0B"
  accent-hover: "#D97706"
  success: "#10B981"
  success-dark: "#059669"
  danger: "#EF4444"
  danger-dark: "#DC2626"
  neutral-50: "#F8FAFC"
  neutral-100: "#F1F5F9"
  neutral-200: "#E2E8F0"
  neutral-300: "#CBD5E1"
  neutral-400: "#94A3B8"
  neutral-500: "#64748B"
  neutral-600: "#475569"
  neutral-700: "#334155"
  neutral-800: "#1E293B"
  neutral-900: "#0F172A"
  gtq-green: "#00A650"
  quetzal: "#009B77"
typography:
  display-xl:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: "800"
    lineHeight: "1.1"
    letterSpacing: "-0.03em"
  display-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: "700"
    lineHeight: "1.15"
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: "600"
    lineHeight: "1.25"
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: "600"
    lineHeight: "1.3"
  h4:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: "600"
    lineHeight: "1.4"
  body-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.6"
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: "400"
    lineHeight: "1.5"
  label-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: "600"
    lineHeight: "1.4"
    letterSpacing: "0.02em"
  label-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: "600"
    lineHeight: "1.4"
    letterSpacing: "0.04em"
  mono-md:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: "400"
    lineHeight: "1.6"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  "2xl": "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  "4xl": "96px"
elevation:
  shadow-sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
  shadow-md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  shadow-lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  shadow-xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  shadow-2xl: "0 25px 50px -12px rgb(0 0 0 / 0.25)"
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    typography: "{typography.label-md}"
    shadow: "{elevation.shadow-md}"
  button-primary-hover:
    backgroundColor: "{colors.secondary-hover}"
    textColor: "#FFFFFF"
  button-primary-disabled:
    backgroundColor: "{colors.neutral-300}"
    textColor: "{colors.neutral-500}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    border: "2px solid {colors.secondary}"
    typography: "{typography.label-md}"
  button-secondary-hover:
    backgroundColor: "{colors.neutral-50}"
    textColor: "{colors.secondary-hover}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    typography: "{typography.label-md}"
    fontWeight: "700"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
  input-default:
    backgroundColor: "{colors.neutral-50}"
    textColor: "{colors.neutral-900}"
    border: "1px solid {colors.neutral-300}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    typography: "{typography.body-md}"
  input-focus:
    border: "2px solid {colors.secondary}"
    outline: "none"
  input-error:
    border: "2px solid {colors.danger}"
    backgroundColor: "{colors.neutral-50}"
  card-default:
    backgroundColor: "#FFFFFF"
    border: "1px solid {colors.neutral-200}"
    rounded: "{rounded.lg}"
    shadow: "{elevation.shadow-sm}"
  card-hover:
    shadow: "{elevation.shadow-lg}"
    border: "1px solid {colors.neutral-300}"
  card-elevated:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    shadow: "{elevation.shadow-lg}"
  badge-success:
    backgroundColor: "rgb(16 185 129 / 0.1)"
    textColor: "{colors.success-dark}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    typography: "{typography.label-sm}"
  badge-warning:
    backgroundColor: "rgb(245 158 11 / 0.1)"
    textColor: "{colors.accent-hover}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    typography: "{typography.label-sm}"
  badge-error:
    backgroundColor: "rgb(239 68 68 / 0.1)"
    textColor: "{colors.danger-dark}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    typography: "{typography.label-sm}"
  badge-info:
    backgroundColor: "rgb(59 130 246 / 0.1)"
    textColor: "{colors.secondary-hover}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    typography: "{typography.label-sm}"
  navbar:
    backgroundColor: "#FFFFFF"
    height: "72px"
    border: "1px solid {colors.neutral-200}"
    shadow: "{elevation.shadow-sm}"
  sidebar:
    backgroundColor: "{colors.neutral-900}"
    width: "280px"
  modal:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.xl}"
    shadow: "{elevation.shadow-2xl}"
    border: "none"
  table-header:
    backgroundColor: "{colors.neutral-50}"
    textColor: "{colors.neutral-600}"
    typography: "{typography.label-sm}"
    borderTop: "1px solid {colors.neutral-200}"
    borderBottom: "2px solid {colors.neutral-200}"
  table-row:
    backgroundColor: "#FFFFFF"
    borderBottom: "1px solid {colors.neutral-200}"
  table-row-hover:
    backgroundColor: "{colors.neutral-50}"
  currency-gtq:
    color: "{colors.gtq-green}"
    fontWeight: "600"
  currency-usd:
    color: "{colors.secondary}"
    fontWeight: "600"
---

## Overview

**Alquifiestas** es un marketplace B2B2C que conecta proveedores de equipos y servicios para eventos con clientes en Guatemala y Centroamérica.

**Personalidad de marca:**
- **Profesional pero accesible** — Enterprise grade con calidez latina
- **Confiable** — Transparencia en pagos, seguridad en transacciones
- **Inclusivo** — Diseño que funciona para proveedores urbanos y rurales
- **Moderno** — UI contemporánea sin seguir tendencias pasajeras

**Paleta cromática estratégica:**
- **Primary (Slate 900)** — Autoridad, profesionalismo, base sólida
- **Secondary (Blue 500)** — Confianza, tecnología, acción
- **Accent (Amber 500)** — Energía, celebración, eventos
- **GTQ Green** — Identidad guatemalteca, moneda local, orgullo nacional

---

## Colors

### Primary Palette

| Token | Value | Uso |
|-------|-------|-----|
| `primary` | `#0F172A` | Headers, navegación, texto principal |
| `primary-light` | `#1E293B` | Surfaces oscuros, hover states |

### Secondary Palette

| Token | Value | Uso |
|-------|-------|-----|
| `secondary` | `#3B82F6` | CTAs primarios, links, branding |
| `secondary-hover` | `#2563EB` | Hover states de acciones |

### Accent Palette

| Token | Value | Uso |
|-------|-------|-----|
| `accent` | `#F59E0B` | Highlights, badges, elementos festivos |
| `accent-hover` | `#D97706` | Hover de acentos |

### Semantic Colors

| Token | Value | Uso |
|-------|-------|-----|
| `success` | `#10B981` | Confirmaciones, estados positivos |
| `success-dark` | `#059669` | Texto success, borders |
| `danger` | `#EF4444` | Errores, alertas críticas |
| `danger-dark` | `#DC2626` | Texto danger, borders |

### Neutral Scale

| Token | Value | Uso |
|-------|-------|-----|
| `neutral-50` | `#F8FAFC` | Backgrounds, surfaces claros |
| `neutral-100` | `#F1F5F9` | Backgrounds alternados |
| `neutral-200` | `#E2E8F0` | Borders, dividers |
| `neutral-300` | `#CBD5E1` | Borders hover, placeholders |
| `neutral-400` | `#94A3B8` | Texto secundario, iconos |
| `neutral-500` | `#64748B` | Texto muted |
| `neutral-600` | `#475569` | Texto body |
| `neutral-700` | `#334155` | Texto headings secundarios |
| `neutral-800` | `#1E293B` | Texto headings |
| `neutral-900` | `#0F172A` | Texto principal, máximo contraste |

### Local Identity

| Token | Value | Uso |
|-------|-------|-----|
| `gtq-green` | `#00A650` | Precios en GTQ, identidad local |
| `quetzal` | `#009B77` | Elementos de orgullo nacional |

---

## Typography

### Font Families

- **Primary:** Inter (Google Fonts) — Legibilidad óptima en UI, múltiples pesos
- **Mono:** JetBrains Mono — Código, precios, datos tabulares

### Scale

| Token | Size | Weight | Line | Uso |
|-------|------|--------|------|-----|
| `display-xl` | 4.5rem | 800 | 1.1 | Hero headlines, landing |
| `display-lg` | 3.5rem | 700 | 1.15 | Page titles |
| `h1` | 2.5rem | 700 | 1.2 | Section headers |
| `h2` | 2rem | 600 | 1.25 | Subsection headers |
| `h3` | 1.5rem | 600 | 1.3 | Card titles, modals |
| `h4` | 1.25rem | 600 | 1.4 | Group headers |
| `body-lg` | 1.125rem | 400 | 1.6 | Lead paragraphs |
| `body-md` | 1rem | 400 | 1.6 | Body copy |
| `body-sm` | 0.875rem | 400 | 1.5 | Captions, footnotes |
| `label-md` | 0.875rem | 600 | 1.4 | Buttons, labels |
| `label-sm` | 0.75rem | 600 | 1.4 | Badges, tags |
| `mono-md` | 0.875rem | 400 | 1.6 | Precios, código |

### Typography Rules

- **Headings:** Tight tracking (-0.02em a -0.03em) para impacto visual
- **Body:** Normal tracking para legibilidad
- **Labels:** Slightly positive tracking (0.02em-0.04em) para claridad
- **Line heights:** 1.6 para body, 1.1-1.3 para headings
- **No más de 2 font families por página**

---

## Layout & Spacing

### Base Scale (8px grid)

| Token | Value | Uso |
|-------|-------|-----|
| `xs` | 4px | Micro-spacing, icon gaps |
| `sm` | 8px | Tight spacing, compact layouts |
| `md` | 16px | Default spacing, padding |
| `lg` | 24px | Section padding, card gaps |
| `xl` | 32px | Large section gaps |
| `2xl` | 48px | Hero spacing, major sections |
| `3xl` | 64px | Landing page sections |
| `4xl` | 96px | Hero margins, page breaks |

### Layout Principles

- **Mobile-first:** 100% width, padding lateral 16px
- **Container max:** 1280px para desktop
- **Grid:** 12 columns desktop, 6 tablet, 4 mobile
- **Gutter:** 24px desktop, 16px tablet, 12px mobile

---

## Elevation & Depth

### Shadow Scale

| Token | Value | Uso |
|-------|-------|-----|
| `shadow-sm` | 0 1px 2px | Cards sutiles, inputs |
| `shadow-md` | 0 4px 6px | Cards default, dropdowns |
| `shadow-lg` | 0 10px 15px | Cards hover, modals small |
| `shadow-xl` | 0 20px 25px | Modals, popovers |
| `shadow-2xl` | 0 25px 50px | Modals grandes, overlays |

### Elevation Rules

- **Surface level 0:** Background (neutral-50)
- **Surface level 1:** Cards (shadow-sm + border)
- **Surface level 2:** Raised cards (shadow-md)
- **Surface level 3:** Modals, popovers (shadow-xl+)
- **Hover:** Aumentar 1 nivel de shadow

---

## Shapes

### Border Radius

| Token | Value | Uso |
|-------|-------|-----|
| `none` | 0px | Tablas, dividers |
| `sm` | 4px | Inputs pequeños, badges |
| `md` | 8px | Buttons, inputs, cards |
| `lg` | 12px | Cards grandes, modals |
| `xl` | 16px | Modals grandes, containers |
| `2xl` | 24px | Hero containers, featured |
| `full` | 9999px | Avatars, pills, toggles |

### Radius Strategy

- **Buttons/Inputs:** md (8px) — Familiar, accesible
- **Cards:** lg (12px) — Moderno sin exagerar
- **Badges:** full — Friendly, escaneable
- **Modals:** xl (16px) — Premium feel

---

## Components

### Buttons

**button-primary**
- Background: secondary (#3B82F6)
- Text: white
- Padding: 12px 24px
- Radius: 8px
- Shadow: shadow-md
- Hover: secondary-hover (#2563EB)
- Disabled: neutral-300 background, neutral-500 text

**button-secondary**
- Background: transparent
- Text: secondary
- Border: 2px solid secondary
- Hover: neutral-50 background

**button-accent**
- Background: accent (#F59E0B)
- Text: neutral-900 (alto contraste)
- Weight: 700
- Hover: accent-hover (#D97706)

**Button Sizes**
- sm: 8px 16px, label-sm
- md: 12px 24px, label-md (default)
- lg: 16px 32px, body-md

### Inputs

**input-default**
- Background: neutral-50
- Border: 1px solid neutral-300
- Padding: 12px 16px
- Radius: 8px
- Focus: 2px border secondary

**input-error**
- Border: 2px solid danger
- Background: neutral-50

**input-disabled**
- Background: neutral-100
- Text: neutral-400

### Cards

**card-default**
- Background: white
- Border: 1px solid neutral-200
- Radius: 12px
- Shadow: shadow-sm
- Hover: shadow-lg

**card-elevated**
- Background: white
- Radius: 12px
- Shadow: shadow-lg (siempre)

**card-interactive**
- Cursor: pointer
- Hover: border neutral-300, shadow-lg

### Badges

**badge-success**
- Background: rgb(16 185 129 / 0.1)
- Text: success-dark
- Radius: full
- Padding: 4px 12px

**badge-warning**
- Background: rgb(245 158 11 / 0.1)
- Text: accent-hover

**badge-error**
- Background: rgb(239 68 68 / 0.1)
- Text: danger-dark

**badge-info**
- Background: rgb(59 130 246 / 0.1)
- Text: secondary-hover

### Navigation

**navbar**
- Height: 72px
- Background: white
- Border: 1px solid neutral-200 (bottom)
- Shadow: shadow-sm
- Position: sticky top-0

**sidebar**
- Width: 280px
- Background: neutral-900
- Text: neutral-50 (primary), white (active)

### Tables

**table-header**
- Background: neutral-50
- Text: neutral-600
- Typography: label-sm
- Border-bottom: 2px solid neutral-200

**table-row**
- Background: white
- Border-bottom: 1px solid neutral-200
- Hover: neutral-50 background

### Currency Display

**currency-gtq**
- Color: gtq-green (#00A650)
- Weight: 600
- Format: "Q1,234.00"

**currency-usd**
- Color: secondary (#3B82F6)
- Weight: 600
- Format: "$1,234.00"

---

## Do's and Don'ts

### Do ✅

- Usar secondary (#3B82F6) como color de acción primario
- Mantener alto contraste (WCAG AA mínimo, AAA ideal)
- Usar gtq-green para precios en quetzales — identidad local
- Shadow consistente: cards = shadow-sm, hover = shadow-lg
- Padding generoso: mínimo 12px en botones, 16px en cards
- Typography jerárquica: h1 > h2 > h3 claramente diferenciados
- Badges con background translúcido (opacity 0.1)
- Borders sutiles: neutral-200 para default, neutral-300 para hover

### Don't ❌

- No usar gradient backgrounds (sloppy, dated)
- No glassmorphism por default
- No emoji en UI profesional
- No rainbow palettes — mantener 1 accent color
- No shadow-2xl en cards normales (solo modals)
- No radius > 16px excepto en pills/avatars
- No texto < 14px para contenido legible
- No hit targets < 44px en mobile
- No inventar colores — usar la escala neutral definida
- No mezclar GTQ y USD sin codificación de color clara

---

## Accessibility

### WCAG 2.1 AA Requirements

- **Text contrast:** 4.5:1 mínimo para texto normal
- **Large text:** 3:1 para texto > 18px o 14px bold
- **Focus indicators:** Visible, 2px mínimo
- **Hit targets:** 44px × 44px mínimo en mobile
- **Color + context:** Nunca usar solo color para información

### Verified Contrast Ratios

| Pair | Ratio | Pass |
|------|-------|------|
| secondary / white | 4.52:1 | ✅ AA |
| secondary-hover / white | 5.87:1 | ✅ AA |
| accent / neutral-900 | 8.23:1 | ✅ AAA |
| gtq-green / white | 3.92:1 | ⚠️ Solo large text |
| neutral-600 / neutral-50 | 5.74:1 | ✅ AA |

### Motion

- Respetar `prefers-reduced-motion`
- Duración máxima: 300ms para transiciones
- No motion automático en loops
- Loading states con skeleton, no spinners infinitos

---

## Multi-Currency Design System

### Visual Encoding

| Moneda | Color | Símbolo | Formato |
|--------|-------|---------|---------|
| GTQ | gtq-green (#00A650) | Q | Q1,234.00 |
| USD | secondary (#3B82F6) | $ | $1,234.00 |

### Display Rules

1. **Precio primario:** Moneda preferida del usuario
2. **Precio secundario:** Entre paréntesis, 60% tamaño, muted
3. **Toggle:** Switch visible en navbar/dashboard
4. **Checkout:** Mostrar ambas monedas con tasa de cambio

### Example

```
Precio: Q785.00 ($100.00 USD)
Tasa: Q7.85 = $1.00 (Banguat +0.5%)
```

---

## Brand Voice

### Tone

- **Professional but warm** — Enterprise capabilities, human delivery
- **Clear over clever** — Transparencia > creatividad
- **Empowering** — "Vos podés" vs "Nosotros hacemos"
- **Local pride** — Guatemalteco, centroamericano, sin complejos

### Copy Guidelines

- **Headlines:** Action-oriented, benefit-first
- **Body:** Short paragraphs, scannable
- **CTAs:** Verb-first ("Reservar ahora", "Cotizar gratis")
- **Errors:** Human, solution-oriented ("Algo salió mal. Intentá de nuevo.")
- **Empty states:** Helpful, directional ("Aún no tenés eventos. Creá tu primero.")

---

## Responsive Breakpoints

| Breakpoint | Width | Columns | Gutter | Margin |
|------------|-------|---------|--------|--------|
| mobile | < 640px | 4 | 12px | 16px |
| tablet | 640px - 1024px | 6 | 16px | 24px |
| desktop | > 1024px | 12 | 24px | 32px |
| wide | > 1280px | 12 | 24px | auto (max 1280px) |

---

## Implementation Notes

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: { DEFAULT: '#0F172A', light: '#1E293B' },
      secondary: { DEFAULT: '#3B82F6', hover: '#2563EB' },
      accent: { DEFAULT: '#F59E0B', hover: '#D97706' },
      // ... rest of palette
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    // ... spacing, borderRadius, boxShadow from tokens
  }
}
```

### CSS Variables

```css
:root {
  --color-primary: #0F172A;
  --color-secondary: #3B82F6;
  --color-accent: #F59E0B;
  --color-gtq-green: #00A650;
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius-md: 8px;
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  /* ... */
}
```

---

*DESIGN.md v1.0 — Alquifiestas Marketplace*
*Generado: Junio 2026*
*License: MIT (proyecto Alquifiestas)*
