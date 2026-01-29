import type { CSSProperties } from 'react';

export interface AccessibilityTranslations {
  /** Widget title */
  title: string;
  /** Text size label */
  textSize: string;
  /** Line spacing label */
  lineSpacing: string;
  /** Letter spacing label */
  letterSpacing: string;
  /** Invert colors label */
  invertColors: string;
  /** Grayscale label */
  grayscale: string;
  /** Underline links label */
  underlineLinks: string;
  /** Big cursor label */
  bigCursor: string;
  /** Reading guide label */
  readingGuide: string;
  /** Hide images label */
  hideImages: string;
  /** Reset button label */
  reset: string;
  /** "Normal" value display */
  normal: string;
  /** Close button aria-label */
  close: string;
  /** Text adjustments section label */
  textAdjustments?: string;
  /** Visual adjustments section label */
  visualAdjustments?: string;
  /** Navigation aids section label */
  navigationAids?: string;
  /** Hide widget for 24 hours button label */
  hideWidget?: string;
  /** Hide widget description/help text */
  hideWidgetDescription?: string;
}

export interface AccessibilitySettings {
  textSize: number;
  lineHeight: number;
  letterSpacing: number;
  invertColors: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
  hideImages: boolean;
}

export interface AccessibilityWidgetStyles {
  /** Button styles */
  button?: CSSProperties;
  /** Button styles when on dark background */
  buttonLight?: CSSProperties;
  /** Button styles when on light background */
  buttonDark?: CSSProperties;
  /** Panel container styles */
  panel?: CSSProperties;
  /** Panel header styles */
  panelHeader?: CSSProperties;
  /** Panel content area styles */
  panelContent?: CSSProperties;
  /** Individual setting item styles */
  settingItem?: CSSProperties;
  /** Control button styles (+/-) */
  controlButton?: CSSProperties;
  /** Toggle switch track styles */
  toggleTrack?: CSSProperties;
  /** Toggle switch thumb styles */
  toggleThumb?: CSSProperties;
  /** Reset button styles */
  resetButton?: CSSProperties;
  /** Overlay styles */
  overlay?: CSSProperties;
}

export interface AccessibilityWidgetClassNames {
  /** Button class name */
  button?: string;
  /** Panel container class name */
  panel?: string;
  /** Panel header class name */
  panelHeader?: string;
  /** Panel content area class name */
  panelContent?: string;
  /** Individual setting item class name */
  settingItem?: string;
  /** Control button class name (+/-) */
  controlButton?: string;
  /** Toggle switch class name */
  toggle?: string;
  /** Reset button class name */
  resetButton?: string;
  /** Overlay class name */
  overlay?: string;
}

export interface AccessibilityWidgetProps {
  /** Translation strings for i18n */
  translations: AccessibilityTranslations;
  /** Text direction - 'ltr' or 'rtl' */
  dir?: 'ltr' | 'rtl';
  /** Custom inline styles */
  styles?: AccessibilityWidgetStyles;
  /** Custom class names */
  classNames?: AccessibilityWidgetClassNames;
  /** Position of the floating button */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** Storage key for persisting settings */
  storageKey?: string;
  /** Storage key for persisting widget visibility state */
  visibilityStorageKey?: string;
  /** Callback when settings change */
  onSettingsChange?: (settings: AccessibilitySettings) => void;
  /** Initial settings override */
  defaultSettings?: Partial<AccessibilitySettings>;
  /** Z-index for the widget */
  zIndex?: number;
  /** Disable local storage persistence */
  disablePersistence?: boolean;
  /** Custom button icon (React node) */
  buttonIcon?: React.ReactNode;
  /** Primary color for theming */
  primaryColor?: string;
  /** Aria label for the main button */
  buttonAriaLabel?: string;
}
