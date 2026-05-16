import { z } from 'zod';
import type { CharacterSort, Gender, ResultView, Status, ViewMode } from './types';

export const statusSchema = z.enum(['ALIVE', 'DEAD', 'UNKNOWN']).or(z.literal(''));
export const genderSchema = z.enum(['MALE', 'FEMALE', 'UNKNOWN']).or(z.literal(''));
export const sortSchema = z.enum(['NAME_ASC', 'NAME_DESC', 'CREATED_AT_ASC', 'CREATED_AT_DESC']);
export const resultViewSchema = z.enum(['all', 'favorites']);
export const viewModeSchema = z.enum(['grid', 'list']);
export const searchSchema = z.string().trim().max(80);

export const queryStateSchema = z.object({
  status: statusSchema,
  gender: genderSchema,
  search: searchSchema,
  sort: sortSchema,
  view: resultViewSchema,
});

export type ValidatedQueryState = z.infer<typeof queryStateSchema>;

export function parseStatus(value: string): Status | '' {
  return statusSchema.catch('').parse(value) as Status | '';
}

export function parseGender(value: string): Gender | '' {
  return genderSchema.catch('').parse(value) as Gender | '';
}

export function parseSort(value: string): CharacterSort {
  return sortSchema.catch('CREATED_AT_DESC').parse(value);
}

export function parseResultView(value: string): ResultView {
  return resultViewSchema.catch('all').parse(value);
}

export function parseViewMode(value: string | null): ViewMode {
  return viewModeSchema.catch('grid').parse(value ?? 'grid');
}

export function parseSearch(value: string): string {
  return searchSchema.catch('').parse(value);
}

export function validateQueryState(input: {
  status: string;
  gender: string;
  search: string;
  sort: string;
  view: string;
}): ValidatedQueryState {
  return queryStateSchema.parse({
    status: parseStatus(input.status),
    gender: parseGender(input.gender),
    search: parseSearch(input.search),
    sort: parseSort(input.sort),
    view: parseResultView(input.view),
  });
}
