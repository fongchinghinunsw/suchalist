import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

export enum RecurrenceType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // ISO String
  isCompleted: boolean;
  recurrence?: {
    type: RecurrenceType;
    originalParentId: string; // id of the first recurring task being created
  };
};

export type NewTask = Omit<Task, 'id' | 'isCompleted' | 'recurrence'> & {
  recurrence?: {
    type: RecurrenceType;
  };
};

export type EditTask = Omit<Task, 'isCompleted' | 'recurrence'> & {
  recurrence?: {
    type: RecurrenceType;
  };
};

const initialTasks: Task[] = [
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

const initialTasksState = {
  tasks: initialTasks,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    addTask(state, action: PayloadAction<NewTask>) {
      const {recurrence} = action.payload;

      console.log('hi');
      const taskId = uuid.v4();
      console.log('hieee', taskId);
      const newTask: Task = {
        ...action.payload,
        id: taskId,
        isCompleted: false,
        recurrence:
          recurrence === undefined
            ? undefined
            : {
                ...recurrence,
                originalParentId: taskId,
              },
      };
      console.log({newTask});

      // const index = state.tasks.findIndex(
      //   task =>
      //     new Date(task.dueDate).getTime() >
      //     new Date(newTask.dueDate).getTime(),
      // );

      // if (index === -1) {
      //   const tasks = mayBeCreateNextNRecurringTasks(newTask, [], 4);
      //   state.tasks.push(...[newTask, ...tasks]);
      //   // console.log('addTask', state.tasks);
      // } else {
      //   state.tasks.splice(index, 0, newTask);
      // }
    },
    removeTask(state, action: PayloadAction<string>) {
      const index = state.tasks.findIndex(task => task.id === action.payload);

      state.tasks.splice(index, 1);
    },
    editTask(state, action: PayloadAction<EditTask>) {
      const {recurrence} = action.payload;

      const index = state.tasks.findIndex(
        task => task.id === action.payload.id,
      );

      console.log('index', index);
      console.log(state.tasks[index]);

      console.log('hi', {
        ...state.tasks[index],
        ...action.payload,
      });

      state.tasks[index] = {
        ...state.tasks[index],
        ...action.payload,
        recurrence:
          recurrence === undefined
            ? undefined
            : {
                ...recurrence,
                originalParentId: state.tasks[index].id,
              },
      };
    },
    setIsCompleted(
      state,
      action: PayloadAction<{
        id: string;
        isCompleted: boolean;
      }>,
    ) {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index].isCompleted = action.payload.isCompleted;

        const tasks = mayBeCreateNextNRecurringTasks(
          state.tasks[index],
          state.tasks.slice(index + 1),
          4,
        );
        state.tasks.push(...tasks);
        state.tasks.sort();
        // console.log('setIsCompleted', state.tasks);
      }
    },
    removePastFinishedTasks(state) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      state.tasks = state.tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return !task.isCompleted || taskDate >= today;
      });
    },
  },
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

const mayBeCreateNextNRecurringTasks = (
  task: Task,
  tasks: Task[],
  N: number,
) => {
  const newTasks: Task[] = [];

  // if it's not a recurring task, we do nothing
  if (task.recurrence === undefined) {
    return newTasks;
  }

  const existingRecurringTasks: Task[] = [];
  for (let i = 0; i < tasks.length; i++) {
    const recurrence = tasks[i].recurrence;
    if (recurrence === undefined) {
      continue;
    }

    if (recurrence.originalParentId === task.recurrence.originalParentId) {
      existingRecurringTasks.push(tasks[i]);
    }
  }

  let currentTask =
    existingRecurringTasks[existingRecurringTasks.length - 1] ?? task;

  while (existingRecurringTasks.length + newTasks.length < N) {
    const nextDate = new Date(currentTask.dueDate);

    if (currentTask.recurrence === undefined) {
      return newTasks;
    }

    switch (currentTask.recurrence.type) {
      case RecurrenceType.DAILY:
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case RecurrenceType.WEEKLY:
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case RecurrenceType.MONTHLY:
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
    }

    const newTask = {
      ...task,
      id: getTaskId(task.title),
      date: nextDate.toISOString(),
      isCompleted: false,
      recurrence: {
        ...task.recurrence,
      },
    };
    newTasks.push(newTask);

    currentTask = newTask;
  }

  return newTasks;
};

export const getTaskId = (title: string) => {
  return `${title}:${new Date().toISOString()}`;
};
