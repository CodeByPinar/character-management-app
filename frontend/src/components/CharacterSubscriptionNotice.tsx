'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Bell, X } from 'lucide-react';
import { createClient } from 'graphql-ws';
import { useEffect, useState } from 'react';
import { graphqlWsEndpoint } from '@/lib/graphql-client';
import type { Character } from '@/lib/types';

const CHARACTER_ADDED_SUBSCRIPTION = `
  subscription CharacterAdded {
    characterAdded {
      id
      image
      name
      status
      gender
      description
      createdAt
      updatedAt
    }
  }
`;

export function CharacterSubscriptionNotice() {
  const queryClient = useQueryClient();
  const [latestCharacter, setLatestCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const client = createClient({
      url: graphqlWsEndpoint,
      retryAttempts: 3,
    });

    const dispose = client.subscribe<{ characterAdded: Character }>(
      { query: CHARACTER_ADDED_SUBSCRIPTION },
      {
        next: ({ data }) => {
          if (!data?.characterAdded) {
            return;
          }

          setLatestCharacter(data.characterAdded);
          queryClient.invalidateQueries({ queryKey: ['characters'] });
          queryClient.invalidateQueries({ queryKey: ['characterStats'] });
        },
        error: () => undefined,
        complete: () => undefined,
      },
    );

    return () => dispose();
  }, [queryClient]);

  if (!latestCharacter) {
    return null;
  }

  return (
    <div className="subscription-notice" role="status">
      <Bell size={18} />
      <span>
        New character added: <strong>{latestCharacter.name}</strong>
      </span>
      <button type="button" aria-label="Dismiss notification" onClick={() => setLatestCharacter(null)}>
        <X size={16} />
      </button>
    </div>
  );
}
