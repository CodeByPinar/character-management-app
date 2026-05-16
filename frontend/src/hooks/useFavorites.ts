'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

const FAVORITES_KEY = 'character-management:favorites:v1';

function readFavorites() {
  if (typeof window === 'undefined') {
    return [] as number[];
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((value): value is number => Number.isInteger(value))
      : [];
  } catch {
    return [];
  }
}

function writeFavorites(favoriteIds: number[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  window.dispatchEvent(new CustomEvent('favorites:changed', { detail: favoriteIds }));
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    setFavoriteIds(readFavorites());
  }, []);

  useEffect(() => {
    const syncFavorites = () => setFavoriteIds(readFavorites());
    window.addEventListener('storage', syncFavorites);
    window.addEventListener('favorites:changed', syncFavorites);

    return () => {
      window.removeEventListener('storage', syncFavorites);
      window.removeEventListener('favorites:changed', syncFavorites);
    };
  }, []);

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const toggleFavorite = useCallback((id: number) => {
    const current = readFavorites();
    const nextFavorites = current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id].sort((a, b) => a - b);

    writeFavorites(nextFavorites);
  }, []);

  return {
    favoriteIds,
    favoriteCount: favoriteIds.length,
    favoriteSet,
    isFavorite: useCallback((id: number) => favoriteSet.has(id), [favoriteSet]),
    toggleFavorite,
  };
}
