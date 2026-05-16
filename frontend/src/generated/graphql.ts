import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:3001/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Character = {
  __typename?: 'Character';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Status;
  updatedAt: Scalars['DateTime']['output'];
};

export type CharacterConnection = {
  __typename?: 'CharacterConnection';
  nodes: Array<Character>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CharacterFilterInput = {
  gender?: InputMaybe<Gender>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
};

export type CharacterPaginationInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum CharacterSort {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC'
}

export type CharacterStats = {
  __typename?: 'CharacterStats';
  alive: Scalars['Int']['output'];
  dead: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  unknown: Scalars['Int']['output'];
};

export type CreateCharacterInput = {
  description: Scalars['String']['input'];
  gender: Gender;
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: Status;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCharacter: Character;
};


export type MutationCreateCharacterArgs = {
  input: CreateCharacterInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  nextSkip?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  character?: Maybe<Character>;
  characterIds: Array<Scalars['Int']['output']>;
  characterStats: CharacterStats;
  characters: CharacterConnection;
};


export type QueryCharacterArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCharacterStatsArgs = {
  filter?: InputMaybe<CharacterFilterInput>;
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<CharacterFilterInput>;
  pagination?: InputMaybe<CharacterPaginationInput>;
  sort?: InputMaybe<CharacterSort>;
};

export enum Status {
  Alive = 'ALIVE',
  Dead = 'DEAD',
  Unknown = 'UNKNOWN'
}

export type Subscription = {
  __typename?: 'Subscription';
  characterAdded: Character;
};

export type GetCharactersQueryVariables = Exact<{
  filter?: InputMaybe<CharacterFilterInput>;
  pagination?: InputMaybe<CharacterPaginationInput>;
  sort?: InputMaybe<CharacterSort>;
}>;


export type GetCharactersQuery = { __typename?: 'Query', characters: { __typename?: 'CharacterConnection', totalCount: number, nodes: Array<{ __typename?: 'Character', id: number, image: string, name: string, status: Status, gender: Gender, description: string, createdAt: any, updatedAt: any }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, nextSkip?: number | null, endCursor?: string | null } } };

export type GetCharacterQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCharacterQuery = { __typename?: 'Query', character?: { __typename?: 'Character', id: number, image: string, name: string, status: Status, gender: Gender, description: string, createdAt: any, updatedAt: any } | null };

export type GetCharacterIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCharacterIdsQuery = { __typename?: 'Query', characterIds: Array<number> };

export type GetCharacterStatsQueryVariables = Exact<{
  filter?: InputMaybe<CharacterFilterInput>;
}>;


export type GetCharacterStatsQuery = { __typename?: 'Query', characterStats: { __typename?: 'CharacterStats', total: number, alive: number, dead: number, unknown: number } };

export type CharacterAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CharacterAddedSubscription = { __typename?: 'Subscription', characterAdded: { __typename?: 'Character', id: number, image: string, name: string, status: Status, gender: Gender, description: string, createdAt: any, updatedAt: any } };



export const GetCharactersDocument = `
    query GetCharacters($filter: CharacterFilterInput, $pagination: CharacterPaginationInput, $sort: CharacterSort) {
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

export const useGetCharactersQuery = <
      TData = GetCharactersQuery,
      TError = unknown
    >(
      variables?: GetCharactersQueryVariables,
      options?: Omit<UseQueryOptions<GetCharactersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCharactersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCharactersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCharacters'] : ['GetCharacters', variables],
    queryFn: fetcher<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, variables),
    ...options
  }
    )};

useGetCharactersQuery.getKey = (variables?: GetCharactersQueryVariables) => variables === undefined ? ['GetCharacters'] : ['GetCharacters', variables];


useGetCharactersQuery.fetcher = (variables?: GetCharactersQueryVariables) => fetcher<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, variables);

export const GetCharacterDocument = `
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

export const useGetCharacterQuery = <
      TData = GetCharacterQuery,
      TError = unknown
    >(
      variables: GetCharacterQueryVariables,
      options?: Omit<UseQueryOptions<GetCharacterQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCharacterQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCharacterQuery, TError, TData>(
      {
    queryKey: ['GetCharacter', variables],
    queryFn: fetcher<GetCharacterQuery, GetCharacterQueryVariables>(GetCharacterDocument, variables),
    ...options
  }
    )};

useGetCharacterQuery.getKey = (variables: GetCharacterQueryVariables) => ['GetCharacter', variables];


useGetCharacterQuery.fetcher = (variables: GetCharacterQueryVariables) => fetcher<GetCharacterQuery, GetCharacterQueryVariables>(GetCharacterDocument, variables);

export const GetCharacterIdsDocument = `
    query GetCharacterIds {
  characterIds
}
    `;

export const useGetCharacterIdsQuery = <
      TData = GetCharacterIdsQuery,
      TError = unknown
    >(
      variables?: GetCharacterIdsQueryVariables,
      options?: Omit<UseQueryOptions<GetCharacterIdsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCharacterIdsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCharacterIdsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCharacterIds'] : ['GetCharacterIds', variables],
    queryFn: fetcher<GetCharacterIdsQuery, GetCharacterIdsQueryVariables>(GetCharacterIdsDocument, variables),
    ...options
  }
    )};

useGetCharacterIdsQuery.getKey = (variables?: GetCharacterIdsQueryVariables) => variables === undefined ? ['GetCharacterIds'] : ['GetCharacterIds', variables];


useGetCharacterIdsQuery.fetcher = (variables?: GetCharacterIdsQueryVariables) => fetcher<GetCharacterIdsQuery, GetCharacterIdsQueryVariables>(GetCharacterIdsDocument, variables);

export const GetCharacterStatsDocument = `
    query GetCharacterStats($filter: CharacterFilterInput) {
  characterStats(filter: $filter) {
    total
    alive
    dead
    unknown
  }
}
    `;

export const useGetCharacterStatsQuery = <
      TData = GetCharacterStatsQuery,
      TError = unknown
    >(
      variables?: GetCharacterStatsQueryVariables,
      options?: Omit<UseQueryOptions<GetCharacterStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCharacterStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCharacterStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCharacterStats'] : ['GetCharacterStats', variables],
    queryFn: fetcher<GetCharacterStatsQuery, GetCharacterStatsQueryVariables>(GetCharacterStatsDocument, variables),
    ...options
  }
    )};

useGetCharacterStatsQuery.getKey = (variables?: GetCharacterStatsQueryVariables) => variables === undefined ? ['GetCharacterStats'] : ['GetCharacterStats', variables];


useGetCharacterStatsQuery.fetcher = (variables?: GetCharacterStatsQueryVariables) => fetcher<GetCharacterStatsQuery, GetCharacterStatsQueryVariables>(GetCharacterStatsDocument, variables);

export const CharacterAddedDocument = `
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