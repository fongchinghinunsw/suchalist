import {DEFAULT_LIST_ID} from '@/services/task-service/fake/id';
import {List, Task} from '@/services/task-service/types';

const TASKS: Task[] = [
  {
    id: '1',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '2',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    isCompleted: false,
    isStarred: true,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '3',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    isCompleted: true,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '4',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '5',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '6',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
];

export const LIST: List = {
  id: 'FAKE_LIST',
  title: 'Default',
  tasks: TASKS,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
