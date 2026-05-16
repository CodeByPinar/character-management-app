export type Status = 'ALIVE' | 'DEAD' | 'UNKNOWN';
export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';
export type CharacterSort = 'NAME_ASC' | 'NAME_DESC' | 'CREATED_AT_ASC' | 'CREATED_AT_DESC';
export type ResultView = 'all' | 'favorites';
export type ViewMode = 'grid' | 'list';

export interface Character {
  id: number;
  image: string;
  name: string;
  status: Status;
  gender: Gender;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  nextSkip: number | null;
  endCursor: string | null;
}

export interface CharacterConnection {
  nodes: Character[];
  totalCount: number;
  pageInfo: PageInfo;
}

export interface CharacterStats {
  total: number;
  alive: number;
  dead: number;
  unknown: number;
}
