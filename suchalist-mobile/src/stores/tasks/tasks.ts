import {
  Header,
  isFolderHeader,
} from '@/screens/home/components/HeaderDrawer/types';
import {List, Task} from '@/services/task-service/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';
import {EditTask, NewTask} from './types';
import {getId} from './utils';
import {DEFAULT_LIST_ID} from '@/services/task-service/fake/id';

type ListsMap = {
  [listId: string]: List;
};

export type TasksState = {
  currentTaskListId: string;
  listsMap: ListsMap;
  headers: Header[];
};

const initialTasksState: TasksState = {
  currentTaskListId: DEFAULT_LIST_ID,
  listsMap: {},
  headers: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    hydrate(_state, action: PayloadAction<TasksState>) {
      return action.payload;
    },
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
      console.log('addList', action.payload);

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

      console.log('addList', state.headers);
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
    removeList(
      state,
      action: PayloadAction<{
        listId: string;
        folderId?: string;
      }>,
    ) {
      const {listId, folderId} = action.payload;
      delete state.listsMap[listId];

      if (folderId) {
        // Remove listId from folder's lists
        const folder = state.headers.find(
          h => h.type === 'FOLDER' && h.id === folderId,
        );
        if (folder && 'lists' in folder) {
          folder.lists = folder.lists.filter(list => list.id !== listId);
        }
      } else {
        // Remove list directly from headers
        state.headers = state.headers.filter(
          header => !(header.type === 'LIST' && header.id === listId),
        );
      }

      // Reset currentTaskListId if it was the one removed
      if (state.currentTaskListId === listId) {
        state.currentTaskListId = DEFAULT_LIST_ID;
      }
    },
    removeFolder(state, action: PayloadAction<string>) {
      const folderId = action.payload;

      // Find the folder
      const folder = state.headers.find(
        h => h.type === 'FOLDER' && h.id === folderId,
      );

      if (folder && isFolderHeader(folder)) {
        // Delete all lists in the folder from listsMap
        for (const list of folder.lists) {
          delete state.listsMap[list.id];
        }

        if (
          folder.lists.map(list => list.id).includes(state.currentTaskListId)
        ) {
          // If currentTaskListId was inside this folder, reset it
          state.currentTaskListId = DEFAULT_LIST_ID;
        }
      }

      // Remove the folder from headers
      state.headers = state.headers.filter(
        header => !(header.type === 'FOLDER' && header.id === folderId),
      );
    },
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
