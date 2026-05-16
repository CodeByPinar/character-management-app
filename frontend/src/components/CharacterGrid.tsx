'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { gql } from 'graphql-request';
import { useEffect, useMemo, useRef } from 'react';
import { useQueryState } from 'nuqs';
import { CharacterCard } from './CharacterCard';
import { SkeletonGrid } from './SkeletonGrid';
import { useFavorites } from '@/hooks/useFavorites';
import { useViewMode } from '@/hooks/useViewMode';
import { graphqlClient } from '@/lib/graphql-client';
import { validateQueryState } from '@/lib/query-state';
import type { CharacterConnection } from '@/lib/types';

const PAGE_SIZE = 8;

const GET_CHARACTERS = gql`
  query GetCharacters(
    $filter: CharacterFilterInput
    $pagination: CharacterPaginationInput
    $sort: CharacterSort
  ) {
    characters(filter: $filter, pagination: $pagination, sort: $sort) {
      nodes {
        id
        image
        name
        status
        gender
        description
        createdAt
        updatedAt
      }
      totalCount
      pageInfo {
        hasNextPage
        nextSkip
        endCursor
      }
    }
  }
`;

export function CharacterGrid() {
  const [rawStatus] = useQueryState('status', { defaultValue: '' });
  const [rawGender] = useQueryState('gender', { defaultValue: '' });
  const [rawSearch] = useQueryState('search', { defaultValue: '' });
  const [rawSort] = useQueryState('sort', { defaultValue: 'CREATED_AT_DESC' });
  const [rawView] = useQueryState('view', { defaultValue: 'all' });
  const [viewMode] = useViewMode();
  const { favoriteIds, favoriteSet, toggleFavorite } = useFavorites();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const queryState = validateQueryState({
    status: rawStatus,
    gender: rawGender,
    search: rawSearch,
    sort: rawSort,
    view: rawView,
  });

  const favoriteIdsKey = favoriteIds.join(',');
  const filter = useMemo(() => {
    const nextFilter: Record<string, unknown> = {};

    if (queryState.status) {
      nextFilter.status = queryState.status;
    }

    if (queryState.gender) {
      nextFilter.gender = queryState.gender;
    }

    if (queryState.search) {
      nextFilter.search = queryState.search;
    }

    if (queryState.view === 'favorites') {
      nextFilter.ids = favoriteIds;
    }

    return nextFilter;
  }, [favoriteIdsKey, queryState.gender, queryState.search, queryState.status, queryState.view]);

  const favoritesViewWithoutItems = queryState.view === 'favorites' && favoriteIds.length === 0;
  const hasFilter = Object.keys(filter).length > 0;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<CharacterConnection, Error>({
    queryKey: ['characters', filter, queryState.sort, favoriteIdsKey],
    initialPageParam: 0,
    enabled: !favoritesViewWithoutItems,
    queryFn: async ({ pageParam }) => {
      const result = await graphqlClient.request<{ characters: CharacterConnection }>(
        GET_CHARACTERS,
        {
          filter: hasFilter ? filter : undefined,
          pagination: { take: PAGE_SIZE, skip: Number(pageParam ?? 0) },
          sort: queryState.sort,
        },
      );

      return result.characters;
    },
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.nextSkip ?? undefined : undefined,
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '420px 0px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (favoritesViewWithoutItems) {
    return (
      <EmptyState
        title="No favorites yet"
        description="Use the heart button on a character card to build your favorites list."
      />
    );
  }

  if (isLoading) {
    return <SkeletonGrid viewMode={viewMode} />;
  }

  if (isError) {
    return (
      <div className="error-state" role="alert">
        <AlertCircle size={34} />
        <h2>Failed to load characters</h2>
        <p>{error.message || 'Make sure the backend is running at localhost:3001.'}</p>
        <button type="button" className="primary-button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  const characters = data?.pages.flatMap((page) => page.nodes) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  if (characters.length === 0) {
    return (
      <EmptyState
        title="No characters found"
        description="Try adjusting your filters, search term, or favorites view."
      />
    );
  }

  return (
    <section aria-label="Character results">
      <div className="result-summary">
        <span>
          Showing <strong>{characters.length}</strong> of <strong>{totalCount}</strong> characters
        </span>
        {hasNextPage ? <span>Scroll to load more</span> : <span>All caught up</span>}
      </div>

      <motion.div
        layout
        className={viewMode === 'grid' ? 'character-grid' : 'character-list'}
        transition={{ staggerChildren: 0.04 }}
      >
        <AnimatePresence mode="popLayout">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isFavorite={favoriteSet.has(character.id)}
              onToggleFavorite={toggleFavorite}
              viewMode={viewMode}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div ref={sentinelRef} className="load-sentinel" aria-hidden="true" />

      {isFetchingNextPage ? <SkeletonGrid viewMode={viewMode} /> : null}

      {hasNextPage ? (
        <button
          type="button"
          className="load-more-button"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      ) : null}
    </section>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
