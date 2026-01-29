import { useState, useEffect, useCallback } from 'react';

interface UseWidgetVisibilityOptions {
  storageKey?: string;
  disablePersistence?: boolean;
}

const HIDE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useWidgetVisibility({
  storageKey = 'a11y-widget-visibility',
  disablePersistence = false,
}: UseWidgetVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (disablePersistence || typeof window === 'undefined') {
      return true;
    }

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { hiddenUntil } = JSON.parse(saved);
        const now = Date.now();
        // If hiddenUntil is in the future, widget is hidden
        if (hiddenUntil && hiddenUntil > now) {
          return false;
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    return true;
  });

  const [hiddenUntil, setHiddenUntil] = useState<number | null>(() => {
    if (disablePersistence || typeof window === 'undefined') {
      return null;
    }

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { hiddenUntil: until } = JSON.parse(saved);
        const now = Date.now();
        if (until && until > now) {
          return until;
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    return null;
  });

  // Check visibility periodically and on mount
  useEffect(() => {
    if (disablePersistence || typeof window === 'undefined') {
      return;
    }

    const checkVisibility = () => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const { hiddenUntil: until } = JSON.parse(saved);
          const now = Date.now();
          
          if (until && until > now) {
            setIsVisible(false);
            setHiddenUntil(until);
          } else {
            setIsVisible(true);
            setHiddenUntil(null);
            // Clean up expired entry
            localStorage.removeItem(storageKey);
          }
        }
      } catch {
        // Ignore localStorage errors
      }
    };

    checkVisibility();

    // Check every minute to handle the 24h expiration
    const interval = setInterval(checkVisibility, 60000);
    return () => clearInterval(interval);
  }, [storageKey, disablePersistence]);

  const hideWidget = useCallback(() => {
    const now = Date.now();
    const newHiddenUntil = now + HIDE_DURATION_MS;
    
    setIsVisible(false);
    setHiddenUntil(newHiddenUntil);

    if (!disablePersistence && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify({ hiddenUntil: newHiddenUntil }));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [storageKey, disablePersistence]);

  const showWidget = useCallback(() => {
    setIsVisible(true);
    setHiddenUntil(null);

    if (!disablePersistence && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [storageKey, disablePersistence]);

  const getRemainingTime = useCallback(() => {
    if (!hiddenUntil) return 0;
    const remaining = hiddenUntil - Date.now();
    return Math.max(0, remaining);
  }, [hiddenUntil]);

  const formatRemainingTime = useCallback(() => {
    const remaining = getRemainingTime();
    if (remaining === 0) return '';
    
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, [getRemainingTime]);

  return {
    isVisible,
    hiddenUntil,
    hideWidget,
    showWidget,
    getRemainingTime,
    formatRemainingTime,
  };
}
