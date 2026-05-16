'use client';

import { useCallback, useEffect, useState } from 'react';
import { parseViewMode } from '@/lib/query-state';
import type { ViewMode } from '@/lib/types';

const VIEW_MODE_KEY = 'character-management:view-mode:v1';

function readViewMode() {
  if (typeof window === 'undefined') {
    return 'grid' as ViewMode;
  }

  return parseViewMode(window.localStorage.getItem(VIEW_MODE_KEY));
}

export function useViewMode() {
  const [viewMode, setViewModeState] = useState<ViewMode>('grid');

  useEffect(() => {
    const syncViewMode = () => setViewModeState(readViewMode());
    syncViewMode();
    window.addEventListener('storage', syncViewMode);
    window.addEventListener('view-mode:changed', syncViewMode);

    return () => {
      window.removeEventListener('storage', syncViewMode);
      window.removeEventListener('view-mode:changed', syncViewMode);
    };
  }, []);

  const setViewMode = useCallback((nextMode: ViewMode) => {
    setViewModeState(nextMode);
    window.localStorage.setItem(VIEW_MODE_KEY, nextMode);
    window.dispatchEvent(new CustomEvent('view-mode:changed', { detail: nextMode }));
  }, []);

  return [viewMode, setViewMode] as const;
}
