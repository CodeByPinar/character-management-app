import { notFound } from 'next/navigation';
import { CharacterDetailView } from '@/components/CharacterDetailView';
import { graphqlEndpoint } from '@/lib/graphql-client';
import type { Character } from '@/lib/types';

export const revalidate = 60;
export const dynamicParams = true;

const GET_CHARACTER_IDS = `
  query GetCharacterIds {
    characterIds
  }
`;

const GET_CHARACTER = `
  query GetCharacter($id: Int!) {
    character(id: $id) {
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

export async function generateStaticParams() {
  try {
    const data = await requestGraphQL<{ characterIds: number[] }>(GET_CHARACTER_IDS);
    return data.characterIds.map((id) => ({ id: String(id) }));
  } catch {
    return [];
  }
}

export default async function CharacterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  if (!Number.isInteger(id)) {
    notFound();
  }

  const data = await requestGraphQL<{ character: Character | null }>(GET_CHARACTER, { id });

  if (!data.character) {
    notFound();
  }

  return <CharacterDetailView character={data.character} />;
}

async function requestGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with ${response.status}`);
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length || !payload.data) {
    throw new Error(payload.errors?.[0]?.message ?? 'GraphQL request failed');
  }

  return payload.data;
}
