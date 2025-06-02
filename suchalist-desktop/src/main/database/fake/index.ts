import { TaskRow } from '@/database/types/task';
import { FolderRow } from '../types/folder';
import { ListRow } from '../types/list';
import { LEISURE_FOLDER_ROW, PERSONAL_IMPROVEMENT_FOLDER_ROW } from './folder';
import {
  DEFAULT_LIST_ROW,
  EXERCISE_LIST_ROW,
  GROCERY_LIST_ROW,
  MOVIE_LIST_ROW,
  MUSIC_LIST_ROW,
  STUDY_LIST_ROW
} from './list';
import {
  DEFAULT_TASK_ROWS,
  EXERCISE_TASK_ROWS,
  GROCERY_TASK_ROWS,
  MOVIE_TASK_ROWS,
  MUSIC_TASK_ROWS,
  STUDY_TASK_ROWS
} from './task';

export const FOLDER_ROWS: FolderRow[] = [PERSONAL_IMPROVEMENT_FOLDER_ROW, LEISURE_FOLDER_ROW];

export const LIST_ROWS: ListRow[] = [
  DEFAULT_LIST_ROW,
  GROCERY_LIST_ROW,
  EXERCISE_LIST_ROW,
  STUDY_LIST_ROW,
  MOVIE_LIST_ROW,
  MUSIC_LIST_ROW
];

export const TASK_ROWS: TaskRow[] = [
  ...DEFAULT_TASK_ROWS,
  ...GROCERY_TASK_ROWS,
  ...EXERCISE_TASK_ROWS,
  ...STUDY_TASK_ROWS,
  ...MOVIE_TASK_ROWS,
  ...MUSIC_TASK_ROWS
];
