import { useState, useEffect, useCallback } from 'react';
import type { AccessibilitySettings } from '../types';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: 0,
  lineHeight: 0,
  letterSpacing: 0,
  invertColors: false,
  grayscale: false,
  underlineLinks: false,
  bigCursor: false,
  readingGuide: false,
  hideImages: false,
};

interface UseAccessibilitySettingsOptions {
  storageKey?: string;
  defaultSettings?: Partial<AccessibilitySettings>;
  onSettingsChange?: (settings: AccessibilitySettings) => void;
  disablePersistence?: boolean;
}

export function useAccessibilitySettings({
  storageKey = 'accessibility-settings',
  defaultSettings,
  onSettingsChange,
  disablePersistence = false,
}: UseAccessibilitySettingsOptions = {}) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const initial = { ...DEFAULT_SETTINGS, ...defaultSettings };

    if (!disablePersistence && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          return { ...initial, ...JSON.parse(saved) };
        }
      } catch {
        // Ignore localStorage errors
      }
    }

    return initial;
  });

  // Persist settings
  useEffect(() => {
    if (!disablePersistence && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(settings));
      } catch {
        // Ignore localStorage errors
      }
    }
    onSettingsChange?.(settings);
  }, [settings, storageKey, onSettingsChange, disablePersistence]);

  // Apply settings to DOM
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Text size
    const textScale = 1 + settings.textSize * 0.05;
    root.style.setProperty('--a11y-text-scale', String(textScale));
    body.classList.toggle('a11y-text-scaled', settings.textSize !== 0);

    // Line height
    const lineHeight = 1.5 + settings.lineHeight * 0.2;
    root.style.setProperty('--a11y-line-height', String(lineHeight));
    body.classList.toggle('a11y-line-height-active', settings.lineHeight !== 0);

    // Letter spacing
    const letterSpacing = settings.letterSpacing * 0.05;
    root.style.setProperty('--a11y-letter-spacing', `${letterSpacing}em`);
    body.classList.toggle('a11y-letter-spacing-active', settings.letterSpacing !== 0);

    // Toggle classes
    body.classList.toggle('a11y-invert', settings.invertColors);
    body.classList.toggle('a11y-grayscale', settings.grayscale);
    body.classList.toggle('a11y-underline-links', settings.underlineLinks);
    body.classList.toggle('a11y-big-cursor', settings.bigCursor);
    body.classList.toggle('a11y-reading-guide', settings.readingGuide);
    body.classList.toggle('a11y-hide-images', settings.hideImages);

    return () => {
      // Cleanup on unmount
      root.style.removeProperty('--a11y-text-scale');
      root.style.removeProperty('--a11y-line-height');
      root.style.removeProperty('--a11y-letter-spacing');
      body.classList.remove(
        'a11y-text-scaled',
        'a11y-line-height-active',
        'a11y-letter-spacing-active',
        'a11y-invert',
        'a11y-grayscale',
        'a11y-underline-links',
        'a11y-big-cursor',
        'a11y-reading-guide',
        'a11y-hide-images'
      );
    };
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleSetting = useCallback((key: keyof AccessibilitySettings) => {
    setSettings((prev) => {
      const current = prev[key];
      if (typeof current === 'boolean') {
        return { ...prev, [key]: !current };
      }
      return prev;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS, ...defaultSettings });
  }, [defaultSettings]);

  const incrementSetting = useCallback((
    key: 'textSize' | 'lineHeight' | 'letterSpacing',
    min = -2,
    max = 2
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: Math.min(max, prev[key] + 1),
    }));
  }, []);

  const decrementSetting = useCallback((
    key: 'textSize' | 'lineHeight' | 'letterSpacing',
    min = -2,
    max = 2
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: Math.max(min, prev[key] - 1),
    }));
  }, []);

  return {
    settings,
    updateSetting,
    toggleSetting,
    resetSettings,
    incrementSetting,
    decrementSetting,
  };
}
