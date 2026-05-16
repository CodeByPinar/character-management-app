import { FilterBar } from '@/components/FilterBar';
import { CharacterGrid } from '@/components/CharacterGrid';
import { AppHeader } from '@/components/AppHeader';
import { CharacterSubscriptionNotice } from '@/components/CharacterSubscriptionNotice';
import { StatsBanner } from '@/components/StatsBanner';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="app-shell">
      <AppHeader />
      <Suspense fallback={null}>
        <StatsBanner />
        <FilterBar />
        <CharacterGrid />
        <CharacterSubscriptionNotice />
      </Suspense>
    </main>
  );
}
