import {Task} from '@/services/task-service/types';

export const sortTasks = (tasks: Task[]) => {
  return tasks.slice().sort((a, b) => {
    const aHasDate = a.dueDate !== undefined;
    const bHasDate = b.dueDate !== undefined;

    // Both have dates: sort by completion and then by dueDate
    if (aHasDate && bHasDate) {
      if (a.isCompleted === b.isCompleted) {
        return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
      }
      return a.isCompleted ? 1 : -1;
    }

    // Only a is missing date: push it to top
    if (!aHasDate && bHasDate) {
      return -1;
    }

    // Only b is missing date: push a below b
    if (aHasDate && !bHasDate) {
      return 1;
    }

    // Neither has date: keep original order
    return 0;
  });
};
