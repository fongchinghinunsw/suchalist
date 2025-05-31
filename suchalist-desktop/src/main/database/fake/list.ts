import { ListRow } from '../types/list';
import {
  DEFAULT_LIST_ID,
  EXERCISE_LIST_ID,
  GROCERY_LIST_ID,
  LEISURE_FOLDER_ID,
  MOVIE_LIST_ID,
  MUSIC_LIST_ID,
  PERSONAL_IMPROVEMENT_FOLDER_ID,
  STUDY_LIST_ID
} from './id';

export const DEFAULT_LIST: ListRow = {
  id: DEFAULT_LIST_ID,
  title: 'Default',
  folderId: undefined,
  createdAt: new Date(2025, 3, 5).toISOString(),
  updatedAt: new Date(2025, 3, 5).toISOString()
};

export const GROCERY_LIST: ListRow = {
  id: GROCERY_LIST_ID,
  title: 'Grocery',
  order: 0,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};

export const EXERCISE_LIST: ListRow = {
  id: EXERCISE_LIST_ID,
  folderId: PERSONAL_IMPROVEMENT_FOLDER_ID,
  title: 'Exercise',
  folderOrder: 0,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};

export const STUDY_LIST: ListRow = {
  id: STUDY_LIST_ID,
  folderId: PERSONAL_IMPROVEMENT_FOLDER_ID,
  title: 'Study',
  folderOrder: 1,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};

export const MOVIE_LIST: ListRow = {
  id: MOVIE_LIST_ID,
  folderId: LEISURE_FOLDER_ID,
  title: 'Movie',
  folderOrder: 0,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};

export const MUSIC_LIST: ListRow = {
  id: MUSIC_LIST_ID,
  folderId: LEISURE_FOLDER_ID,
  title: 'Music',
  folderOrder: 1,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};
