import {Task} from '@/stores/tasks/types';
import {FOLDER_2024} from './fake/folder';
import {
  DEFAULT_LIST,
  DEFAULT_LIST_ID,
  EXERCISE_LIST_ID,
  GROCERY_LIST_ID,
} from './fake/list';
import {DEFAULT_TASKS, EXERCISE_TASKS, GROCERY_TASKS} from './fake/task';

export type ListResource = {
  type: 'LIST';
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type FolderResource = {
  type: 'FOLDER';
  id: string;
  title: string;
  lists: string[];
  createdAt: string;
  updatedAt: string;
};

export type Resource = FolderResource | ListResource;

export const getResources = async (): Promise<Resource[]> => {
  return [DEFAULT_LIST, FOLDER_2024];
};

export async function fetchTasksForList(listId: string): Promise<Task[]> {
  let list: Task[];
  switch (listId) {
    case DEFAULT_LIST_ID:
      list = DEFAULT_TASKS;
      break;
    case GROCERY_LIST_ID:
      list = GROCERY_TASKS;
      break;
    case EXERCISE_LIST_ID:
      list = EXERCISE_TASKS;
      break;
    default:
      list = [];
  }

  return list;
}
