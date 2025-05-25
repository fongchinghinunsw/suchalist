import { LEISURE_FOLDER, PERSONAL_IMPROVEMENT_FOLDER } from './fake/folder';
import { DEFAULT_LIST, GROCERY_LIST } from './fake/list';
import { Resource } from './types';

const now = new Date().toISOString();

export const INITIAL_RESOURCES: Resource[] = [
  {
    ...DEFAULT_LIST,
    tasks: [],
    createdAt: now,
    updatedAt: now
  }
];

export const FAKE_RESOURCES: Resource[] = [
  DEFAULT_LIST,
  PERSONAL_IMPROVEMENT_FOLDER,
  LEISURE_FOLDER,
  GROCERY_LIST
];

export const getResources = async (): Promise<Resource[]> => {
  return FAKE_RESOURCES;
};
