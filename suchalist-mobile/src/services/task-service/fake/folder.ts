import {getId} from '@/stores/tasks/utils';
import {Folder} from '../types';
import {EXERCISE_LIST, MOVIE_LIST, MUSIC_LIST, STUDY_LIST} from './list';

export const PERSONAL_IMPROVEMENT_FOLDER: Folder = {
  id: getId(),
  title: 'Personal Improvement 🧘🏻',
  lists: [EXERCISE_LIST, STUDY_LIST],
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 15).toISOString(),
};

export const LEISURE_FOLDER: Folder = {
  id: getId(),
  title: 'Leisure 🎮',
  lists: [MOVIE_LIST, MUSIC_LIST],
  createdAt: new Date(2025, 4, 10).toISOString(),
  updatedAt: new Date(2025, 5, 14).toISOString(),
};
