import { TaskRow, toTaskRow } from '@/database/types/task';
import {
  DEFAULT_TASKS,
  EXERCISE_TASKS,
  GROCERY_TASKS,
  MOVIE_TASKS,
  MUSIC_TASKS,
  STUDY_TASKS
} from '@common/fake/task';

export const DEFAULT_TASK_ROWS: TaskRow[] = DEFAULT_TASKS.map((task) => toTaskRow(task));

export const GROCERY_TASK_ROWS: TaskRow[] = GROCERY_TASKS.map((task) => toTaskRow(task));

export const EXERCISE_TASK_ROWS: TaskRow[] = EXERCISE_TASKS.map((task) => toTaskRow(task));

export const STUDY_TASK_ROWS: TaskRow[] = STUDY_TASKS.map((task) => toTaskRow(task));

export const MOVIE_TASK_ROWS: TaskRow[] = MOVIE_TASKS.map((task) => toTaskRow(task));

export const MUSIC_TASK_ROWS: TaskRow[] = MUSIC_TASKS.map((task) => toTaskRow(task));
