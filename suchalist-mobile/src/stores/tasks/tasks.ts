import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FAKE_TASKS} from './fakes';
import {EditTask, NewTask, Task} from './types';
import {getId} from './utils';

const initialTasks: Task[] = FAKE_TASKS;

const initialTasksState = {
  tasks: initialTasks,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    addTask(state, action: PayloadAction<NewTask>) {
      // const {recurrence} = action.payload;
      const taskId = getId();

      const now = new Date().toISOString();
      const newTask: Task = {
        ...action.payload,
        id: taskId,
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        // recurrence:
        //   recurrence === undefined
        //     ? undefined
        //     : {
        //         ...recurrence,
        //         originalParentId: taskId,
        //       },
      };
      console.log({newTask});

      const index = state.tasks.findIndex(task => {
        if (newTask.dueDate == null) {
          return task.dueDate !== undefined;
        } else {
          if (task.dueDate == null) {
            return false;
          }

          return (
            new Date(task.dueDate).getTime() >
            new Date(newTask.dueDate).getTime()
          );
        }
      });
      state.tasks.splice(index === -1 ? 0 : index, 0, newTask);
    },
    removeTask(state, action: PayloadAction<string>) {
      const index = state.tasks.findIndex(task => task.id === action.payload);

      state.tasks.splice(index, 1);
    },
    editTask(state, action: PayloadAction<EditTask>) {
      const now = new Date().toISOString();

      const index = state.tasks.findIndex(
        task => task.id === action.payload.id,
      );

      console.log('hi', {
        ...state.tasks[index],
        ...action.payload,
      });

      state.tasks[index] = {
        ...state.tasks[index],
        ...action.payload,
        updatedAt: now,
        // recurrence:
        //   recurrence === undefined
        //     ? undefined
        //     : {
        //         ...recurrence,
        //         originalParentId: state.tasks[index].id,
        //       },
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

        // const tasks = mayBeCreateNextNRecurringTasks(
        //   state.tasks[index],
        //   state.tasks.slice(index + 1),
        //   4,
        // );
        // state.tasks.push(...tasks);
        state.tasks.sort();
        // console.log('setIsCompleted', state.tasks);
      }
    },
    // removePastFinishedTasks(state) {
    //   const today = new Date();
    //   today.setHours(0, 0, 0, 0);
    //   state.tasks = state.tasks.filter(task => {
    //     const taskDate = new Date(task.dueDate);
    //     return !task.isCompleted || taskDate >= today;
    //   });
    // },
  },
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
