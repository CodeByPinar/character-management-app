'use client';

import { Heart, Sparkles } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { ThemeToggle } from './ThemeToggle';

export function AppHeader() {
  const { favoriteCount } = useFavorites();

  return (
    <header className="app-header">
      <div className="title-lockup">
        <div className="brand-mark" aria-hidden="true">
          <Sparkles size={22} />
        </div>
        <div>
          <h1>Character Management</h1>
          <p>Curated multiverse character index</p>
        </div>
      </div>

      <div className="header-actions">
        <div className="favorite-counter" title="Favorite count">
          <Heart size={17} fill="currentColor" />
          <span>{favoriteCount}</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
