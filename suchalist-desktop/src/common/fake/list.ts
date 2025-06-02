import {
  DEFAULT_LIST_ID,
  EXERCISE_LIST_ID,
  GROCERY_LIST_ID,
  LEISURE_FOLDER_ID,
  MOVIE_LIST_ID,
  MUSIC_LIST_ID,
  PERSONAL_IMPROVEMENT_FOLDER_ID,
  STUDY_LIST_ID
} from '@common/fake/id';
import { List } from '../types/list';
import {
  DEFAULT_TASKS,
  EXERCISE_TASKS,
  GROCERY_TASKS,
  MOVIE_TASKS,
  MUSIC_TASKS,
  STUDY_TASKS
} from './task';

export const DEFAULT_LIST: List = {
  id: DEFAULT_LIST_ID,
  title: 'Default',
  folderId: undefined,
  tasks: DEFAULT_TASKS,
  createdAt: new Date(2025, 3, 5).toISOString(),
  updatedAt: new Date(2025, 3, 5).toISOString()
};

export const GROCERY_LIST: List = {
  id: GROCERY_LIST_ID,
  title: 'Grocery',
  order: 0,
  tasks: GROCERY_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};

export const EXERCISE_LIST: List = {
  id: EXERCISE_LIST_ID,
  folderId: PERSONAL_IMPROVEMENT_FOLDER_ID,
  title: 'Exercise',
  folderOrder: 0,
  tasks: EXERCISE_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};

export const STUDY_LIST: List = {
  id: STUDY_LIST_ID,
  folderId: PERSONAL_IMPROVEMENT_FOLDER_ID,
  title: 'Study',
  folderOrder: 1,
  tasks: STUDY_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};

export const MOVIE_LIST: List = {
  id: MOVIE_LIST_ID,
  folderId: LEISURE_FOLDER_ID,
  title: 'Movie',
  folderOrder: 0,
  tasks: MOVIE_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};

export const MUSIC_LIST: List = {
  id: MUSIC_LIST_ID,
  folderId: LEISURE_FOLDER_ID,
  title: 'Music',
  folderOrder: 1,
  tasks: MUSIC_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString()
};
