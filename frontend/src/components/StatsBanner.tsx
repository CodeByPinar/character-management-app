'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { gql } from 'graphql-request';
import { Activity, CircleHelp, Skull, Users } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { graphqlClient } from '@/lib/graphql-client';
import { validateQueryState } from '@/lib/query-state';
import type { CharacterStats } from '@/lib/types';

const GET_CHARACTER_STATS = gql`
  query GetCharacterStats($filter: CharacterFilterInput) {
    characterStats(filter: $filter) {
      total
      alive
      dead
      unknown
    }
  }
`;

export function StatsBanner() {
  const [rawStatus] = useQueryState('status', { defaultValue: '' });
  const [rawGender] = useQueryState('gender', { defaultValue: '' });
  const [rawSearch] = useQueryState('search', { defaultValue: '' });
  const [rawSort] = useQueryState('sort', { defaultValue: 'CREATED_AT_DESC' });
  const [rawView] = useQueryState('view', { defaultValue: 'all' });
  const { favoriteIds } = useFavorites();

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
  }, [favoriteIdsKey, queryState.gender, queryState.search, queryState.view]);

  const favoritesViewWithoutItems = queryState.view === 'favorites' && favoriteIds.length === 0;

  const { data } = useQuery({
    queryKey: ['characterStats', filter, favoriteIdsKey],
    enabled: !favoritesViewWithoutItems,
    queryFn: async () => {
      const result = await graphqlClient.request<{ characterStats: CharacterStats }>(
        GET_CHARACTER_STATS,
        { filter: Object.keys(filter).length ? filter : undefined },
      );

      return result.characterStats;
    },
  });

  const stats = favoritesViewWithoutItems
    ? { total: 0, alive: 0, dead: 0, unknown: 0 }
    : data ?? { total: 0, alive: 0, dead: 0, unknown: 0 };

  return (
    <section className="stats-banner" aria-label="Character statistics">
      <StatCard icon={<Users size={20} />} label="Total" value={stats.total} tone="total" />
      <StatCard icon={<Activity size={20} />} label="Alive" value={stats.alive} tone="alive" />
      <StatCard icon={<Skull size={20} />} label="Dead" value={stats.dead} tone="dead" />
      <StatCard icon={<CircleHelp size={20} />} label="Unknown" value={stats.unknown} tone="unknown" />
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  tone: 'total' | 'alive' | 'dead' | 'unknown';
}) {
  const animatedValue = useAnimatedNumber(value);

  return (
    <motion.div
      className={`stat-card tone-${tone}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="stat-card-top">
        <span>{label}</span>
        <span className="stat-card-icon" aria-hidden="true">
          {icon}
        </span>
      </div>
      <strong>{animatedValue}</strong>
    </motion.div>
  );
}

function useAnimatedNumber(value: number) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startValue = displayValue;
    const delta = value - startValue;
    const start = performance.now();
    const duration = 420;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayValue(Math.round(startValue + delta * easeOutCubic(progress)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return displayValue;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}
