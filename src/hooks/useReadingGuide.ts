import { useEffect, useRef } from 'react';

export function useReadingGuide(enabled: boolean, primaryColor = '#2d2d2d') {
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (lineRef.current) {
        lineRef.current.remove();
        lineRef.current = null;
      }
      return;
    }

    // Create reading guide line
    const line = document.createElement('div');
    line.className = 'a11y-reading-guide-line';
    line.setAttribute('aria-hidden', 'true');
    line.style.cssText = `
      position: fixed;
      left: 0;
      right: 0;
      height: 2px;
      background: ${primaryColor};
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      pointer-events: none;
      z-index: 9997;
      transition: top 0.1s ease-out;
    `;
    document.body.appendChild(line);
    lineRef.current = line;

    const handleMouseMove = (e: MouseEvent) => {
      if (lineRef.current) {
        lineRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (lineRef.current) {
        lineRef.current.remove();
        lineRef.current = null;
      }
    };
  }, [enabled, primaryColor]);
}
