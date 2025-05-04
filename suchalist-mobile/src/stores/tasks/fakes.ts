import {Task} from './types';

export const FAKE_TASKS: Task[] = [
  {
    id: 'no1',
    title: 'No due date item 1',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
  },
  {
    id: 'no2',
    title: 'No due date item 2',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
  },
  {
    id: '1',
    title: '1:1',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Buy apple',
    dueDate: new Date(2025, 3, 5).toISOString(),
    isCompleted: true,
  },
  {
    id: '3',
    title: 'Talk to Jake, then talk with David about the project progress',
    dueDate: new Date(2025, 4, 12).toISOString(),
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Go on date with Jason',
    dueDate: new Date(2025, 6, 6).toISOString(),
    isCompleted: true,
  },
  {
    id: '7',
    title: 'Coding with Sassy',
    dueDate: new Date(2025, 6, 9).toISOString(),
    isCompleted: true,
  },
  {
    id: '8',
    title: 'Coding with Cindy',
    dueDate: new Date(2025, 6, 9).toISOString(),
    isCompleted: false,
  },
  {
    id: '11',
    title: 'Shopping in South Village',
    dueDate: new Date(2025, 3, 13).toISOString(),
    isCompleted: false,
  },
  {
    id: '12',
    title: 'Testing my app',
    dueDate: new Date(2025, 8, 10).toISOString(),
    isCompleted: true,
  },
];
