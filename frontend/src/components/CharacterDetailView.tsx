'use client';

import { ArrowLeft, CalendarDays, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import type { Character } from '@/lib/types';

export function CharacterDetailView({ character }: { character: Character }) {
  const { favoriteSet, toggleFavorite } = useFavorites();
  const isFavorite = favoriteSet.has(character.id);
  const createdAt = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(character.createdAt));

  return (
    <main className="detail-shell">
      <Link href="/" className="back-link">
        <ArrowLeft size={18} />
        Back to characters
      </Link>

      <motion.section
        className="detail-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <div className="detail-image-frame">
          <img src={character.image} alt={character.name} />
        </div>

        <div className="detail-content">
          <div className="detail-heading-row">
            <div>
              <h1>{character.name}</h1>
              <p>Character profile and full description</p>
            </div>
            <button
              type="button"
              className={`favorite-button detail-favorite ${isFavorite ? 'is-active' : ''}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => toggleFavorite(character.id)}
            >
              <Heart size={21} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="chip-row">
            <span className={`status-chip status-${character.status.toLowerCase()}`}>
              <span aria-hidden="true" />
              {character.status}
            </span>
            <span className={`gender-chip gender-${character.gender.toLowerCase()}`}>
              {character.gender}
            </span>
          </div>

          <p className="detail-description">{character.description}</p>

          <div className="detail-meta">
            <CalendarDays size={18} />
            Added {createdAt}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
