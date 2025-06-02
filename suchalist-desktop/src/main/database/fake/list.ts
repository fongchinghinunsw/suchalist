import {
  DEFAULT_LIST,
  EXERCISE_LIST,
  GROCERY_LIST,
  MOVIE_LIST,
  MUSIC_LIST,
  STUDY_LIST
} from '@common/fake/list';
import { ListRow, ListRowSchema } from '../types/list';

export const DEFAULT_LIST_ROW: ListRow = ListRowSchema.parse(DEFAULT_LIST);

export const GROCERY_LIST_ROW: ListRow = ListRowSchema.parse(GROCERY_LIST);

export const EXERCISE_LIST_ROW: ListRow = ListRowSchema.parse(EXERCISE_LIST);

export const STUDY_LIST_ROW: ListRow = ListRowSchema.parse(STUDY_LIST);

export const MOVIE_LIST_ROW: ListRow = ListRowSchema.parse(MOVIE_LIST);

export const MUSIC_LIST_ROW: ListRow = ListRowSchema.parse(MUSIC_LIST);
