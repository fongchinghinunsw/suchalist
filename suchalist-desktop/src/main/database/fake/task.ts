import { TaskRow } from '@/database/types/task';
import { getId } from '@common/utils/id';
import {
  DEFAULT_LIST_ID,
  EXERCISE_LIST_ID,
  GROCERY_LIST_ID,
  MOVIE_LIST_ID,
  MUSIC_LIST_ID,
  STUDY_LIST_ID
} from './id';

export const DEFAULT_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Deliver the pizza',
    note: null,
    dueDate: null,
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Update Suchalist',
    note: 'Publish the new version in App Store',
    dueDate: null,
    isCompleted: 0,
    isStarred: 1,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Talk with Jacob',
    note: null,
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Pay for mortgage',
    note: null,
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: 1,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: new Date(2025, 3, 8).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: '1:1 with Dave',
    note: null,
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: 1,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: new Date(2025, 3, 10).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Buy apple',
    note: null,
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: 1,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: new Date(2025, 3, 12).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Talk to Jake, then talk with David about the project progress',
    note: null,
    dueDate: new Date(2025, 4, 12).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 4, 12).toISOString(),
    updatedAt: new Date(2025, 4, 12).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Go on date with Jason',
    note: null,
    dueDate: new Date(2025, 6, 6).toISOString(),
    isCompleted: 1,
    isStarred: 1,
    createdAt: new Date(2025, 6, 6).toISOString(),
    updatedAt: new Date(2025, 6, 6).toISOString(),
    completedAt: new Date(2025, 3, 9).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Coding with Sassy',
    note: null,
    dueDate: new Date(2025, 6, 9).toISOString(),
    isCompleted: 1,
    isStarred: 0,
    createdAt: new Date(2025, 6, 9).toISOString(),
    updatedAt: new Date(2025, 6, 9).toISOString(),
    completedAt: new Date(2025, 3, 3).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Coding with Cindy',
    note: null,
    dueDate: new Date(2025, 6, 9).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 6, 9).toISOString(),
    updatedAt: new Date(2025, 6, 9).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Shopping in South Village',
    note: null,
    dueDate: new Date(2025, 3, 13).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 13).toISOString(),
    updatedAt: new Date(2025, 3, 13).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Testing my app',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 1,
    isStarred: 0,
    createdAt: new Date(2025, 8, 10).toISOString(),
    updatedAt: new Date(2025, 8, 10).toISOString(),
    completedAt: new Date(2025, 3, 5).toISOString()
  }
];

export const GROCERY_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Orange',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 1,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Fish',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 1,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Apple',
    note: null,
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Cornliflower',
    note: null,
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Beef',
    note: null,
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Lamb',
    note: null,
    dueDate: new Date(2025, 3, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  }
];

export const EXERCISE_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Jogging',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Running',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Ping Pong',
    note: null,
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Basketball',
    note: null,
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Football',
    note: null,
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  }
];

export const STUDY_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: STUDY_LIST_ID,
    title: 'Math',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: STUDY_LIST_ID,
    title: 'Calculus',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  }
];

export const MOVIE_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Terminator',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Predator 1',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Predator 2',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Predator 3',
    note: null,
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Squid Game - The Movie',
    note: null,
    dueDate: new Date(2025, 3, 11).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  }
];

export const MUSIC_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Crystal Math',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Let it go',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Summertime Sadness',
    note: null,
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Ghost',
    note: null,
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  },
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Nomi XD - BLAH',
    note: null,
    dueDate: new Date(2025, 3, 10).toISOString(),
    isCompleted: 0,
    isStarred: 0,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString(),
    completedAt: null
  }
];
