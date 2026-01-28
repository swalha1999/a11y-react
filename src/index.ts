// Main component
export { AccessibilityWidget } from './AccessibilityWidget';

// Types
export type {
  AccessibilityWidgetProps,
  AccessibilityTranslations,
  AccessibilitySettings,
  AccessibilityWidgetStyles,
  AccessibilityWidgetClassNames,
} from './types';

// Translations
export { en, ar } from './translations';

// Hooks (for advanced usage)
export {
  useAccessibilitySettings,
  useReadingGuide,
  useBackgroundContrast,
} from './hooks';

// Styles
export {
  injectAccessibilityStyles,
  removeAccessibilityStyles,
  accessibilityStylesCSS,
} from './styles';

// Icons (for custom button icons)
export {
  AccessibilityIcon,
  TextSizeIcon,
  LineHeightIcon,
  LetterSpacingIcon,
  InvertIcon,
  GrayscaleIcon,
  LinkIcon,
  CursorIcon,
  ReadingGuideIcon,
  ImageIcon,
  ResetIcon,
  CloseIcon,
} from './icons';
