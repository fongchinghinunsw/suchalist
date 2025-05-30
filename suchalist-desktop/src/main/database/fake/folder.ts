import { Folder } from '../../shared/type';
import { LEISURE_FOLDER_ID, PERSONAL_IMPROVEMENT_FOLDER_ID } from './id';
import { EXERCISE_LIST, MOVIE_LIST, MUSIC_LIST, STUDY_LIST } from './list';

export const PERSONAL_IMPROVEMENT_FOLDER: Folder = {
  id: PERSONAL_IMPROVEMENT_FOLDER_ID,
  title: 'Personal Improvement 🧘🏻',
  lists: [EXERCISE_LIST, STUDY_LIST],
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 15).toISOString()
};

export const LEISURE_FOLDER: Folder = {
  id: LEISURE_FOLDER_ID,
  title: 'Leisure 🎮',
  lists: [MOVIE_LIST, MUSIC_LIST],
  createdAt: new Date(2025, 4, 10).toISOString(),
  updatedAt: new Date(2025, 5, 14).toISOString()
};
