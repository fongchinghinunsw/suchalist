import {Header} from '@/screens/home/components/TaskListDrawerLayout/types';
import {Task, List, Folder} from './types';
import {getId} from './utils';

export const DEFAULT_LIST_ID = 'DEFAULT';

export const DEFAULT_TASKS: Task[] = [
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Deliver the pizza',
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Update Suchalist',
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Watch Big Bang Theory',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Pay for mortgage',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: '1:1 with Dave',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Buy apple',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Talk to Jake, then talk with David about the project progress',
    dueDate: new Date(2025, 4, 12).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 4, 12).toISOString(),
    updatedAt: new Date(2025, 4, 12).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Go on date with Jason',
    dueDate: new Date(2025, 6, 6).toISOString(),
    isCompleted: true,
    createdAt: new Date(2025, 6, 6).toISOString(),
    updatedAt: new Date(2025, 6, 6).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Coding with Sassy',
    dueDate: new Date(2025, 6, 9).toISOString(),
    isCompleted: true,
    createdAt: new Date(2025, 6, 9).toISOString(),
    updatedAt: new Date(2025, 6, 9).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Coding with Cindy',
    dueDate: new Date(2025, 6, 9).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 6, 9).toISOString(),
    updatedAt: new Date(2025, 6, 9).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Shopping in South Village',
    dueDate: new Date(2025, 3, 13).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 13).toISOString(),
    updatedAt: new Date(2025, 3, 13).toISOString(),
  },
  {
    id: getId(),
    taskListId: DEFAULT_LIST_ID,
    title: 'Testing my app',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: true,
    createdAt: new Date(2025, 8, 10).toISOString(),
    updatedAt: new Date(2025, 8, 10).toISOString(),
  },
];

export const DEFAULT_LIST: List = {
  id: DEFAULT_LIST_ID,
  title: 'Default',
  tasks: DEFAULT_TASKS,
  createdAt: new Date(2025, 3, 5).toISOString(),
  updatedAt: new Date(2025, 3, 5).toISOString(),
};

export const GROCERY_LIST_ID = getId();

export const GROCERY_TASKS: Task[] = [
  {
    id: getId(),
    taskListId: GROCERY_LIST_ID,
    title: 'Orange',
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: GROCERY_LIST_ID,
    title: 'Fish',
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: GROCERY_LIST_ID,
    title: 'Apple',
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: GROCERY_LIST_ID,
    title: 'Cornliflower',
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
  },
  {
    id: getId(),
    taskListId: GROCERY_LIST_ID,
    title: 'Cornliflower',
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
  },
  {
    id: getId(),
    taskListId: GROCERY_LIST_ID,
    title: 'Cornliflower',
    dueDate: new Date(2025, 3, 10).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
];

export const GROCERY_LIST: List = {
  id: GROCERY_LIST_ID,
  title: 'Grocery',
  tasks: GROCERY_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};

export const EXERCISE_LIST_ID = getId();

export const EXERCISE_TASKS: Task[] = [
  {
    id: getId(),
    taskListId: EXERCISE_LIST_ID,
    title: 'Jogging',
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: EXERCISE_LIST_ID,
    title: 'Running',
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: EXERCISE_LIST_ID,
    title: 'Ping Pong',
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
  },
  {
    id: getId(),
    taskListId: EXERCISE_LIST_ID,
    title: 'Basketball',
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
  },
  {
    id: getId(),
    taskListId: EXERCISE_LIST_ID,
    title: 'Football',
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
  },
];

export const EXERCISE_LIST: List = {
  id: EXERCISE_LIST_ID,
  title: 'Exercise',
  tasks: EXERCISE_TASKS,
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};

export const FOLDER_2024: Folder = {
  id: getId(),
  title: '2024',
  lists: [EXERCISE_LIST_ID, GROCERY_LIST_ID],
  createdAt: new Date(2025, 2, 10).toISOString(),
  updatedAt: new Date(2025, 2, 10).toISOString(),
};

export const HEADERS: Header[] = [
  {
    type: 'FOLDER',
    ...FOLDER_2024,
  },
  {
    type: 'LIST',
    ...DEFAULT_LIST,
  },
];
