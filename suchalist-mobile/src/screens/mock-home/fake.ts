import {DEFAULT_LIST_ID} from '@/stores/tasks/fakes';
import {Task} from '@/stores/tasks/types';

export const TASKS: Task[] = [
  {
    id: '1',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '2',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '3',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    isCompleted: true,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '4',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '5',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: '6',
    taskListId: DEFAULT_LIST_ID,
    title: 'Preview Task',
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
];
