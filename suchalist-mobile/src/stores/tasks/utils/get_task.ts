import {Task} from '@/services/task-service/types';

export default function getTask(tasks: Task[], taskId: string) {
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    return tasks[index];
  }
}
