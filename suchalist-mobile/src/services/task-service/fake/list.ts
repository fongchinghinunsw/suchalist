import {getId} from '@/stores/tasks/utils';
import {ListResource} from '../task-service';

export const DEFAULT_LIST_ID = 'DEFAULT';

export const DEFAULT_LIST: ListResource = {
  type: 'LIST',
  id: DEFAULT_LIST_ID,
  title: 'Default',
  createdAt: new Date(2025, 3, 5).toISOString(),
  updatedAt: new Date(2025, 3, 5).toISOString(),
};

export const GROCERY_LIST_ID = getId();

export const GROCERY_LIST: ListResource = {
  type: 'LIST',
  id: GROCERY_LIST_ID,
  title: 'Grocery',
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};

export const EXERCISE_LIST_ID = getId();

export const EXERCISE_LIST: ListResource = {
  type: 'LIST',
  id: EXERCISE_LIST_ID,
  title: 'Exercise',
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};
