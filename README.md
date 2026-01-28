# @swalha1999/a11y-react

A beautifully designed, accessible, and i18n-ready accessibility widget for React applications.

## Features

- **Professional Design** - Modern UI with smooth animations, gradients, and hover effects
- **Full TypeScript support** - Comprehensive type definitions
- **i18n support** - Pass your own translations object with RTL support
- **Customizable theming** - Primary color theming, inline styles, and class names
- **Fully Accessible** - ARIA attributes, keyboard navigation, focus trapping
- **Persistent settings** - Saves to localStorage (configurable)
- **Backdrop blur** - Modern overlay with blur effect
- **Organized sections** - Settings grouped into logical categories

### Accessibility Features

- **Text Adjustments**: Text size, line spacing, letter spacing
- **Visual Adjustments**: Invert colors, grayscale, hide images
- **Navigation Aids**: Underline links, big cursor, reading guide

## Installation

```bash
npm install @swalha1999/a11y-react
# or
yarn add @swalha1999/a11y-react
# or
pnpm add @swalha1999/a11y-react
```

## Quick Start

```tsx
import { AccessibilityWidget, en, injectAccessibilityStyles } from '@swalha1999/a11y-react';

// Inject global styles once at app initialization
injectAccessibilityStyles();

function App() {
  return (
    <div>
      <AccessibilityWidget translations={en} />
      {/* Your app content */}
    </div>
  );
}
```

## Usage with i18n

```tsx
import { AccessibilityWidget, ar } from '@swalha1999/a11y-react';
import type { AccessibilityTranslations } from '@swalha1999/a11y-react';

// Use built-in Arabic translations with RTL
<AccessibilityWidget translations={ar} dir="rtl" />

// Or provide your own translations
const frTranslations: AccessibilityTranslations = {
  title: 'Accessibilité',
  textSize: 'Taille du texte',
  lineSpacing: 'Interligne',
  letterSpacing: 'Espacement des lettres',
  invertColors: 'Inverser les couleurs',
  grayscale: 'Niveaux de gris',
  underlineLinks: 'Souligner les liens',
  bigCursor: 'Grand curseur',
  readingGuide: 'Guide de lecture',
  hideImages: 'Masquer les images',
  reset: 'Réinitialiser',
  normal: 'Normal',
  close: 'Fermer',
  textAdjustments: 'Ajustements du texte',
  visualAdjustments: 'Ajustements visuels',
  navigationAids: 'Aides à la navigation',
};

<AccessibilityWidget translations={frTranslations} />
```

## Customization

### Theme Color

```tsx
<AccessibilityWidget
  translations={en}
  primaryColor="#007bff" // Blue theme
/>

<AccessibilityWidget
  translations={en}
  primaryColor="#10b981" // Green theme
/>

<AccessibilityWidget
  translations={en}
  primaryColor="#8b5cf6" // Purple theme
/>
```

### Custom Styling

```tsx
<AccessibilityWidget
  translations={en}
  primaryColor="#6366f1"
  styles={{
    button: { boxShadow: '0 4px 20px rgba(99, 102, 241, 0.5)' },
    panel: { borderRadius: 16 },
    settingItem: { background: '#f0f4ff' },
  }}
  classNames={{
    button: 'my-a11y-button',
    panel: 'my-a11y-panel',
  }}
/>
```

### Position

```tsx
<AccessibilityWidget
  translations={en}
  position="bottom-left" // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
/>
```

### Custom Button Icon

```tsx
import { AccessibilityWidget, en } from '@swalha1999/a11y-react';

<AccessibilityWidget
  translations={en}
  buttonIcon={<MyCustomIcon />}
/>
```

### Event Callbacks

```tsx
<AccessibilityWidget
  translations={en}
  onSettingsChange={(settings) => {
    console.log('Settings changed:', settings);
    // Send to analytics, etc.
  }}
/>
```

### Default Settings

```tsx
<AccessibilityWidget
  translations={en}
  defaultSettings={{
    textSize: 1,
    underlineLinks: true,
  }}
/>
```

### Disable Persistence

```tsx
<AccessibilityWidget
  translations={en}
  disablePersistence // Don't save to localStorage
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `translations` | `AccessibilityTranslations` | **required** | Translation strings for the UI |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Button position |
| `primaryColor` | `string` | `'#6366f1'` | Primary theme color (indigo) |
| `zIndex` | `number` | `9999` | Z-index for the widget |
| `storageKey` | `string` | `'accessibility-settings'` | localStorage key |
| `disablePersistence` | `boolean` | `false` | Disable localStorage |
| `defaultSettings` | `Partial<AccessibilitySettings>` | `{}` | Initial settings override |
| `onSettingsChange` | `(settings) => void` | - | Callback when settings change |
| `buttonIcon` | `ReactNode` | Built-in icon | Custom button icon |
| `buttonAriaLabel` | `string` | Uses `translations.title` | Custom aria-label |
| `styles` | `AccessibilityWidgetStyles` | `{}` | Custom inline styles |
| `classNames` | `AccessibilityWidgetClassNames` | `{}` | Custom class names |

## Advanced Usage

### Using Hooks Directly

Build your own custom accessibility UI using the provided hooks:

```tsx
import { useAccessibilitySettings, useReadingGuide } from '@swalha1999/a11y-react';

function MyCustomWidget() {
  const { settings, toggleSetting, resetSettings } = useAccessibilitySettings({
    storageKey: 'my-app-a11y',
    onSettingsChange: (s) => console.log(s),
  });

  useReadingGuide(settings.readingGuide, '#ff0000');

  return (
    <div>
      <button onClick={() => toggleSetting('grayscale')}>
        Toggle Grayscale
      </button>
      <button onClick={() => toggleSetting('invertColors')}>
        Toggle Invert
      </button>
      <button onClick={resetSettings}>
        Reset
      </button>
    </div>
  );
}
```

### Using CSS Instead of JS Injection

If you prefer to include styles in your CSS build:

```tsx
import { accessibilityStylesCSS } from '@swalha1999/a11y-react';

// With styled-components
const GlobalStyles = createGlobalStyle`
  ${accessibilityStylesCSS}
`;

// Or copy to your global CSS file
```

### Custom Icons

Use the exported icons for your own components:

```tsx
import { AccessibilityIcon, GrayscaleIcon } from '@swalha1999/a11y-react';

function MyComponent() {
  return (
    <button>
      <AccessibilityIcon size={24} />
      <span>Settings</span>
    </button>
  );
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
