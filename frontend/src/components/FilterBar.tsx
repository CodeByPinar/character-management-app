'use client';

import { Grid3X3, List, RotateCcw, Search, Star } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useFavorites } from '@/hooks/useFavorites';
import { useViewMode } from '@/hooks/useViewMode';
import {
  parseGender,
  parseResultView,
  parseSearch,
  parseSort,
  parseStatus,
} from '@/lib/query-state';
import type { CharacterSort, Gender, ResultView, Status } from '@/lib/types';

export function FilterBar() {
  const [rawStatus, setRawStatus] = useQueryState('status', { defaultValue: '' });
  const [rawGender, setRawGender] = useQueryState('gender', { defaultValue: '' });
  const [rawSearch, setRawSearch] = useQueryState('search', { defaultValue: '' });
  const [rawSort, setRawSort] = useQueryState('sort', { defaultValue: 'CREATED_AT_DESC' });
  const [rawView, setRawView] = useQueryState('view', { defaultValue: 'all' });
  const [viewMode, setViewMode] = useViewMode();
  const { favoriteCount } = useFavorites();

  const status = parseStatus(rawStatus);
  const gender = parseGender(rawGender);
  const search = parseSearch(rawSearch);
  const sort = parseSort(rawSort);
  const resultView = parseResultView(rawView);
  const hasFilters = Boolean(status || gender || search || sort !== 'CREATED_AT_DESC' || resultView !== 'all');

  const handleReset = () => {
    setRawStatus(null);
    setRawGender(null);
    setRawSearch(null);
    setRawSort(null);
    setRawView(null);
  };

  return (
    <section className="filter-panel" aria-label="Character filters">
      <div className="search-field">
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search by name or description"
          value={search}
          onChange={(event) => setRawSearch(event.target.value || null)}
        />
      </div>

      <select
        value={status}
        aria-label="Filter by status"
        onChange={(event) => setRawStatus((event.target.value as Status | '') || null)}
      >
        <option value="">All statuses</option>
        <option value="ALIVE">Alive</option>
        <option value="DEAD">Dead</option>
        <option value="UNKNOWN">Unknown</option>
      </select>

      <select
        value={gender}
        aria-label="Filter by gender"
        onChange={(event) => setRawGender((event.target.value as Gender | '') || null)}
      >
        <option value="">All genders</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="UNKNOWN">Unknown</option>
      </select>

      <select
        value={sort}
        aria-label="Sort characters"
        onChange={(event) => setRawSort(event.target.value as CharacterSort)}
      >
        <option value="CREATED_AT_DESC">Newest first</option>
        <option value="CREATED_AT_ASC">Oldest first</option>
        <option value="NAME_ASC">Name A-Z</option>
        <option value="NAME_DESC">Name Z-A</option>
      </select>

      <div className="segmented-control" aria-label="Result set">
        <button
          type="button"
          className={resultView === 'all' ? 'is-active' : ''}
          onClick={() => setRawView('all')}
        >
          All
        </button>
        <button
          type="button"
          className={resultView === 'favorites' ? 'is-active' : ''}
          onClick={() => setRawView('favorites' satisfies ResultView)}
        >
          <Star size={15} aria-hidden="true" />
          Favorites
          <span>{favoriteCount}</span>
        </button>
      </div>

      <div className="view-toggle" aria-label="View mode">
        <button
          type="button"
          className={viewMode === 'grid' ? 'is-active' : ''}
          aria-label="Grid view"
          title="Grid view"
          onClick={() => setViewMode('grid')}
        >
          <Grid3X3 size={17} />
        </button>
        <button
          type="button"
          className={viewMode === 'list' ? 'is-active' : ''}
          aria-label="List view"
          title="List view"
          onClick={() => setViewMode('list')}
        >
          <List size={18} />
        </button>
      </div>

      {hasFilters ? (
        <button type="button" className="reset-button" onClick={handleReset}>
          <RotateCcw size={15} />
          Reset
        </button>
      ) : null}
    </section>
  );
}
