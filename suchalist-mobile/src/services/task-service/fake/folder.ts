import {getId} from '@/stores/tasks/utils';
import {FolderResource} from '../task-service';
import {EXERCISE_LIST_ID, GROCERY_LIST_ID} from './list';

export const FOLDER_2024: FolderResource = {
  id: getId(),
  title: '2024',
  lists: [EXERCISE_LIST_ID, GROCERY_LIST_ID],
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};
