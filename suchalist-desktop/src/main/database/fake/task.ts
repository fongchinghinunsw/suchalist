import { TaskRow } from '@/database/types/task';
import {
  DEFAULT_TASKS,
  EXERCISE_TASKS,
  GROCERY_TASKS,
  MOVIE_TASKS,
  MUSIC_TASKS,
  STUDY_TASKS
} from '@common/fake/task';
import { Task } from '@common/types/task';

export const DEFAULT_TASK_ROWS: TaskRow[] = DEFAULT_TASKS.map(toTaskRow);

export const GROCERY_TASK_ROWS: TaskRow[] = GROCERY_TASKS.map(toTaskRow);

export const EXERCISE_TASK_ROWS: TaskRow[] = EXERCISE_TASKS.map(toTaskRow);

export const STUDY_TASK_ROWS: TaskRow[] = STUDY_TASKS.map(toTaskRow);

export const MOVIE_TASK_ROWS: TaskRow[] = MOVIE_TASKS.map(toTaskRow);

export const MUSIC_TASK_ROWS: TaskRow[] = MUSIC_TASKS.map(toTaskRow);

function toTaskRow(task: Task): TaskRow {
  return {
    ...task,
    isCompleted: task.isCompleted ? 1 : 0,
    isStarred: task.isStarred ? 1 : 0
  };
}
