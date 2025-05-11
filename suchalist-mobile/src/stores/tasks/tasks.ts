import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DEFAULT_LIST,
  DEFAULT_LIST_ID,
  EXERCISE_LIST,
  EXERCISE_LIST_ID,
  GROCERY_LIST,
  GROCERY_LIST_ID,
  HEADERS,
} from './fakes';
import {EditTask, NewTask, Task, List} from './types';
import {getId} from './utils';
import {RootState} from '..';
import {Header} from '@/screens/home/components/TaskListDrawerLayout/types';

type ListsMap = {
  [listId: string]: List;
};

type TasksState = {
  currentTaskListId: string;
  listsMap: ListsMap;
  headers: Header[];
};

const initialTasksState: TasksState = {
  currentTaskListId: DEFAULT_LIST_ID,
  listsMap: {
    [DEFAULT_LIST_ID]: DEFAULT_LIST,
    [GROCERY_LIST_ID]: GROCERY_LIST,
    [EXERCISE_LIST_ID]: EXERCISE_LIST,
  },
  headers: HEADERS,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    setCurrentTaskListId(state, action: PayloadAction<string>) {
      state.currentTaskListId = action.payload;
    },
    addTask(state, action: PayloadAction<NewTask>) {
      const currentTasks = state.listsMap[state.currentTaskListId].tasks;

      const taskId = getId();

      const now = new Date().toISOString();
      const newTask: Task = {
        ...action.payload,
        id: taskId,
        taskListId: state.currentTaskListId,
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

      const index = currentTasks.findIndex(task => {
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
      currentTasks.splice(index === -1 ? 0 : index, 0, newTask);
    },
    removeTask(state, action: PayloadAction<string>) {
      const currentTasks = state.listsMap[state.currentTaskListId].tasks;

      const index = currentTasks.findIndex(task => task.id === action.payload);

      currentTasks.splice(index, 1);
    },
    editTask(
      state,
      action: PayloadAction<{
        id: string;
        task: EditTask;
      }>,
    ) {
      const currentTasks = state.listsMap[state.currentTaskListId].tasks;

      const now = new Date().toISOString();

      const index = currentTasks.findIndex(
        task => task.id === action.payload.id,
      );

      console.log('editing task', {
        ...currentTasks[index],
        ...action.payload.task,
      });

      currentTasks[index] = {
        ...currentTasks[index],
        ...action.payload.task,
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
      const currentTasks = state.listsMap[state.currentTaskListId].tasks;

      const index = currentTasks.findIndex(
        task => task.id === action.payload.id,
      );
      if (index !== -1) {
        currentTasks[index].isCompleted = action.payload.isCompleted;

        // const tasks = mayBeCreateNextNRecurringTasks(
        //   state.tasks[index],
        //   state.tasks.slice(index + 1),
        //   4,
        // );
        // state.tasks.push(...tasks);
        currentTasks.sort();
        // console.log('setIsCompleted', state.tasks);
      }
    },
    addList(state, action: PayloadAction<string>) {
      const listId = getId();
      const title = action.payload;
      const now = new Date().toISOString();

      state.listsMap[listId] = {
        id: listId,
        title,
        tasks: [],
        createdAt: now,
        updatedAt: now,
      };

      state.headers.push({
        type: 'LIST',
        id: listId,
        title,
      });
    },
    addFolder(state, action: PayloadAction<string>) {
      const folderId = getId();
      const title = action.payload;

      state.headers.push({
        type: 'FOLDER',
        id: folderId,
        title,
        lists: [],
      });
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

export const selectCurrentTasks = (state: RootState): Task[] => {
  return state.tasks.listsMap[state.tasks.currentTaskListId]?.tasks ?? [];
};

export const selectListsMap = (state: RootState): ListsMap => {
  return state.tasks.listsMap ?? {};
};

export const selectHeaders = (state: RootState): Header[] =>
  state.tasks.headers ?? [];

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
