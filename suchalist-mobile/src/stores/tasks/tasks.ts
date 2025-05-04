import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FAKE_TASKS} from './fakes';
import {EditTask, NewTask, Task} from './types';
import {getTaskId, mayBeCreateNextNRecurringTasks} from './utils';

const initialTasks: Task[] = FAKE_TASKS;

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
      const taskId = getTaskId();
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
