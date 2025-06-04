import {
  DEFAULT_LIST,
  EXERCISE_LIST,
  GROCERY_LIST,
  MOVIE_LIST,
  MUSIC_LIST,
  STUDY_LIST
} from '@common/fake/list';
import { ListRow, toListRow } from '../types/list';

export const DEFAULT_LIST_ROW: ListRow = toListRow(DEFAULT_LIST);

export const GROCERY_LIST_ROW: ListRow = toListRow(GROCERY_LIST);

export const EXERCISE_LIST_ROW: ListRow = toListRow(EXERCISE_LIST);

export const STUDY_LIST_ROW: ListRow = toListRow(STUDY_LIST);

export const MOVIE_LIST_ROW: ListRow = toListRow(MOVIE_LIST);

export const MUSIC_LIST_ROW: ListRow = toListRow(MUSIC_LIST);
