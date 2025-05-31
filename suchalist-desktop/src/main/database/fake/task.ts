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
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Update Suchalist',
    note: 'Publish the new version in App Store',
    isCompleted: false,
    isStarred: true,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Talk with Jacob',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Pay for mortgage',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: new Date(2025, 3, 8).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: '1:1 with Dave',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: new Date(2025, 3, 10).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Buy apple',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    completedAt: new Date(2025, 3, 12).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Talk to Jake, then talk with David about the project progress',
    dueDate: new Date(2025, 4, 12).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 4, 12).toISOString(),
    updatedAt: new Date(2025, 4, 12).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Go on date with Jason',
    dueDate: new Date(2025, 6, 6).toISOString(),
    isCompleted: true,
    isStarred: true,
    createdAt: new Date(2025, 6, 6).toISOString(),
    updatedAt: new Date(2025, 6, 6).toISOString(),
    completedAt: new Date(2025, 3, 9).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Coding with Sassy',
    dueDate: new Date(2025, 6, 9).toISOString(),
    isCompleted: true,
    isStarred: false,
    createdAt: new Date(2025, 6, 9).toISOString(),
    updatedAt: new Date(2025, 6, 9).toISOString(),
    completedAt: new Date(2025, 3, 3).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Coding with Cindy',
    dueDate: new Date(2025, 6, 9).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 6, 9).toISOString(),
    updatedAt: new Date(2025, 6, 9).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Shopping in South Village',
    dueDate: new Date(2025, 3, 13).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 13).toISOString(),
    updatedAt: new Date(2025, 3, 13).toISOString()
  },
  {
    id: getId(),
    listId: DEFAULT_LIST_ID,
    title: 'Testing my app',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: true,
    isStarred: false,
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
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: true,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Fish',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: true,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Apple',
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Cornliflower',
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Beef',
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  },
  {
    id: getId(),
    listId: GROCERY_LIST_ID,
    title: 'Lamb',
    dueDate: new Date(2025, 3, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  }
];

export const EXERCISE_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Jogging',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Running',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Ping Pong',
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Basketball',
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  },
  {
    id: getId(),
    listId: EXERCISE_LIST_ID,
    title: 'Football',
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  }
];

export const STUDY_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: STUDY_LIST_ID,
    title: 'Math',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: STUDY_LIST_ID,
    title: 'Calculus',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  }
];

export const MOVIE_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Terminator',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Predator 1',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  },
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Predator 2',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  },
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Predator 3',
    dueDate: new Date(2025, 3, 7).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  },
  {
    id: getId(),
    listId: MOVIE_LIST_ID,
    title: 'Squid Game - The Movie',
    dueDate: new Date(2025, 3, 11).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  }
];

export const MUSIC_TASKS: TaskRow[] = [
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Crystal Math',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString()
  },
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Let it go',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  },
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Summertime Sadness',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  },
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Ghost',
    dueDate: new Date(2025, 3, 8).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  },
  {
    id: getId(),
    listId: MUSIC_LIST_ID,
    title: 'Nomi XD - BLAH',
    dueDate: new Date(2025, 3, 10).toISOString(),
    isCompleted: false,
    isStarred: false,
    createdAt: new Date(2025, 3, 6).toISOString(),
    updatedAt: new Date(2025, 3, 6).toISOString()
  }
];
