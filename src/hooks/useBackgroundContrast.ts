import { useState, useEffect, useCallback, type RefObject } from 'react';

export function useBackgroundContrast(buttonRef: RefObject<HTMLButtonElement | null>) {
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  const detectBackground = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Temporarily hide button to get element behind
    const originalPointerEvents = button.style.pointerEvents;
    button.style.pointerEvents = 'none';
    const elementBehind = document.elementFromPoint(x, y);
    button.style.pointerEvents = originalPointerEvents;

    if (elementBehind) {
      const bgColor = window.getComputedStyle(elementBehind).backgroundColor;
      const rgb = bgColor.match(/\d+/g);

      if (rgb && rgb.length >= 3) {
        // Calculate relative luminance
        const luminance =
          (0.299 * parseInt(rgb[0], 10) +
            0.587 * parseInt(rgb[1], 10) +
            0.114 * parseInt(rgb[2], 10)) /
          255;
        setIsDarkBackground(luminance < 0.5);
      }
    }
  }, [buttonRef]);

  useEffect(() => {
    detectBackground();

    window.addEventListener('scroll', detectBackground);
    window.addEventListener('resize', detectBackground);

    return () => {
      window.removeEventListener('scroll', detectBackground);
      window.removeEventListener('resize', detectBackground);
    };
  }, [detectBackground]);

  return isDarkBackground;
}
