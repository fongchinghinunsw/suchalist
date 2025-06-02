import { LEISURE_FOLDER_ID, PERSONAL_IMPROVEMENT_FOLDER_ID } from '@common/fake/id';
import { Folder } from '@common/types/folder';
import { EXERCISE_LIST, MOVIE_LIST, MUSIC_LIST, STUDY_LIST } from './list';

export const PERSONAL_IMPROVEMENT_FOLDER: Folder = {
  id: PERSONAL_IMPROVEMENT_FOLDER_ID,
  title: 'Personal Improvement 🧘🏻',
  order: 1,
  lists: [EXERCISE_LIST, STUDY_LIST],
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 15).toISOString()
};

export const LEISURE_FOLDER: Folder = {
  id: LEISURE_FOLDER_ID,
  title: 'Leisure 🎮',
  order: 2,
  lists: [MOVIE_LIST, MUSIC_LIST],
  createdAt: new Date(2025, 4, 10).toISOString(),
  updatedAt: new Date(2025, 5, 14).toISOString()
};
