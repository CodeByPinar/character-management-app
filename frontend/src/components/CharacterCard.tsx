'use client';

import { forwardRef } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Character, ViewMode } from '@/lib/types';

const statusLabels: Record<string, string> = {
  ALIVE: 'Alive',
  DEAD: 'Dead',
  UNKNOWN: 'Unknown',
};

const genderLabels: Record<string, string> = {
  MALE: 'Male',
  FEMALE: 'Female',
  UNKNOWN: 'Unknown',
};

export const CharacterCard = forwardRef<
  HTMLDivElement,
  {
    character: Character;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    viewMode?: ViewMode;
  }
>(
  (
    { character, isFavorite, onToggleFavorite, viewMode = 'grid' },
    ref
  ) => {
    const createdAt = new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(character.createdAt));

    return (
      <motion.article
        ref={ref}
        layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`character-card ${viewMode === 'list' ? 'is-list' : ''}`}
    >
      <button
        type="button"
        className={`favorite-button ${isFavorite ? 'is-active' : ''}`}
        aria-label={isFavorite ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`}
        title={isFavorite ? 'Remove favorite' : 'Add favorite'}
        onClick={() => onToggleFavorite(character.id)}
      >
        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      <Link href={`/characters/${character.id}`} className="character-card-link">
        <div className="character-image-frame">
          <img
            src={character.image}
            alt={character.name}
            onError={(event) => {
              event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                character.name,
              )}&background=6c63ff&color=fff&size=400`;
            }}
          />
        </div>

        <div className="character-card-content">
          <div className="character-card-heading">
            <h3>{character.name}</h3>
            <span>Added {createdAt}</span>
          </div>

          <div className="chip-row">
            <span className={`status-chip status-${character.status.toLowerCase()}`}>
              <span aria-hidden="true" />
              {statusLabels[character.status]}
            </span>
            <span className={`gender-chip gender-${character.gender.toLowerCase()}`}>
              {genderLabels[character.gender]}
            </span>
          </div>

          <p>{character.description}</p>
        </div>
      </Link>
    </motion.article>
  );
});
