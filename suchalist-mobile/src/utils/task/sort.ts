import {Task} from '@/services/task-service/types';
import {CompletedTask} from '@/stores/tasks/types';

/**
 *  Sort the tasks so that most recently created tasks come first
 */
export function sortTasksByCreatedAt<T extends Task>(tasks: T[]): T[] {
  return tasks.slice().sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return bTime - aTime;
  });
}

/**
 *  Sort the tasks so that most recently completed tasks come first
 */
export function sortTasksByCompletedAt(
  tasks: CompletedTask[],
): CompletedTask[] {
  return tasks.slice().sort((a, b) => {
    const aTime = new Date(a.completedAt).getTime();
    const bTime = new Date(b.completedAt).getTime();
    return bTime - aTime;
  });
}
