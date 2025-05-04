import uuid from 'react-native-uuid';
import {Task, TaskWithDueDate} from './types';

// export const mayBeCreateNextNRecurringTasks = (
//   task: Task,
//   tasks: Task[],
//   N: number,
// ) => {
//   const newTasks: Task[] = [];

//   // if it's not a recurring task, we do nothing
//   if (task.recurrence === undefined) {
//     return newTasks;
//   }

//   const existingRecurringTasks: Task[] = [];
//   for (let i = 0; i < tasks.length; i++) {
//     const recurrence = tasks[i].recurrence;
//     if (recurrence === undefined) {
//       continue;
//     }

//     if (recurrence.originalParentId === task.recurrence.originalParentId) {
//       existingRecurringTasks.push(tasks[i]);
//     }
//   }

//   let currentTask =
//     existingRecurringTasks[existingRecurringTasks.length - 1] ?? task;

//   while (existingRecurringTasks.length + newTasks.length < N) {
//     const nextDate = new Date(currentTask.dueDate);

//     if (currentTask.recurrence === undefined) {
//       return newTasks;
//     }

//     switch (currentTask.recurrence.type) {
//       case RecurrenceType.DAILY:
//         nextDate.setDate(nextDate.getDate() + 1);
//         break;
//       case RecurrenceType.WEEKLY:
//         nextDate.setDate(nextDate.getDate() + 7);
//         break;
//       case RecurrenceType.MONTHLY:
//         nextDate.setMonth(nextDate.getMonth() + 1);
//         break;
//     }

//     const newTask = {
//       ...task,
//       id: getTaskId(),
//       date: nextDate.toISOString(),
//       isCompleted: false,
//         recurrence: {
//           ...task.recurrence,
//         },
//     };
//     newTasks.push(newTask);

//     currentTask = newTask;
//   }

//   return newTasks;
// };

export const getTaskId = () => {
  return uuid.v4();
};

export function isTaskWithDueDate(task: Task): task is TaskWithDueDate {
  return task.dueDate !== undefined;
}
