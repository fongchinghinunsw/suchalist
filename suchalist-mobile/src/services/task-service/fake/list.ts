import {List} from '../types';
import {
  DEFAULT_LIST_ID,
  EXERCISE_LIST_ID,
  GROCERY_LIST_ID,
  MOVIE_LIST_ID,
  MUSIC_LIST_ID,
  STUDY_LIST_ID,
} from './id';
import {
  DEFAULT_TASKS,
  EXERCISE_TASKS,
  GROCERY_TASKS,
  MOVIE_TASKS,
  MUSIC_TASKS,
  STUDY_TASKS,
} from './task';

export const DEFAULT_LIST: List = {
  id: DEFAULT_LIST_ID,
  title: 'Default',
  tasks: DEFAULT_TASKS,
  createdAt: new Date(2025, 3, 5).toISOString(),
  updatedAt: new Date(2025, 3, 5).toISOString(),
};

export const GROCERY_LIST: List = {
  id: GROCERY_LIST_ID,
  title: 'Grocery',
  tasks: GROCERY_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};

export const EXERCISE_LIST: List = {
  id: EXERCISE_LIST_ID,
  title: 'Exercise',
  tasks: EXERCISE_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};

export const STUDY_LIST: List = {
  id: STUDY_LIST_ID,
  title: 'Study',
  tasks: STUDY_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};

export const MOVIE_LIST: List = {
  id: MOVIE_LIST_ID,
  title: 'Movie',
  tasks: MOVIE_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};

export const MUSIC_LIST: List = {
  id: MUSIC_LIST_ID,
  title: 'Music',
  tasks: MUSIC_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};
