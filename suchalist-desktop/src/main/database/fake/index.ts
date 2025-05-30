import { Folder, List, Task } from '@common/types/task';
import { LEISURE_FOLDER, PERSONAL_IMPROVEMENT_FOLDER } from './folder';
import {
  DEFAULT_LIST,
  EXERCISE_LIST,
  GROCERY_LIST,
  MOVIE_LIST,
  MUSIC_LIST,
  STUDY_LIST
} from './list';
import {
  DEFAULT_TASKS,
  EXERCISE_TASKS,
  GROCERY_TASKS,
  MOVIE_TASKS,
  MUSIC_TASKS,
  STUDY_TASKS
} from './task';

export const FOLDERS: Omit<Folder, 'lists'>[] = [PERSONAL_IMPROVEMENT_FOLDER, LEISURE_FOLDER];

export const LISTS: List[] = [
  DEFAULT_LIST,
  GROCERY_LIST,
  EXERCISE_LIST,
  STUDY_LIST,
  MOVIE_LIST,
  MUSIC_LIST
];

export const TASKS: Task[] = [
  ...DEFAULT_TASKS,
  ...GROCERY_TASKS,
  ...EXERCISE_TASKS,
  ...STUDY_TASKS,
  ...MOVIE_TASKS,
  ...MUSIC_TASKS
];
