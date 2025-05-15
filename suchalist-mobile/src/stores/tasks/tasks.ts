import {
  Header,
  isFolderHeader,
  ListHeader,
} from '@/screens/home/components/HeaderDrawer/types';
import {DEFAULT_LIST_ID} from '@/services/task-service/fake/id';
import {Folder, List, Task} from '@/services/task-service/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';
import {EditTask, NewTask} from './types';
import {getId} from './utils';

type ListMap = {
  [listId: string]: List;
};

type FolderMap = {
  [folderId: string]: Folder;
};

export type TasksState = {
  currentTaskListId: string;
  listMap: ListMap;
  folderMap: FolderMap;
  headers: Header[];
};

const initialTasksState: TasksState = {
  currentTaskListId: DEFAULT_LIST_ID,
  listMap: {},
  folderMap: {},
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
      const currentTasks = state.listMap[state.currentTaskListId].tasks;

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
    deleteTask(state, action: PayloadAction<string>) {
      const currentTasks = state.listMap[state.currentTaskListId].tasks;

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
      const currentTasks = state.listMap[state.currentTaskListId].tasks;

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
      const currentTasks = state.listMap[state.currentTaskListId].tasks;

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
    addList(
      state,
      action: PayloadAction<{
        title: string;
        folderId?: string;
      }>,
    ) {
      const listId = getId();
      const {title, folderId} = action.payload;
      const now = new Date().toISOString();

      const newList: List = {
        id: listId,
        folderId,
        title,
        tasks: [],
        createdAt: now,
        updatedAt: now,
      };

      state.listMap[listId] = newList;

      const listHeader: ListHeader = {
        type: 'LIST',
        id: listId,
      };

      if (folderId) {
        state.folderMap[folderId].lists.push(newList);
        const folderHeader = state.headers.find(
          header => isFolderHeader(header) && header.id === folderId,
        );
        if (folderHeader && isFolderHeader(folderHeader)) {
          folderHeader.lists.push(listHeader);
        }
      } else {
        state.headers.push(listHeader);
      }
    },
    addFolder(state, action: PayloadAction<string>) {
      const folderId = getId();
      const title = action.payload;
      const now = new Date().toISOString();

      state.folderMap[folderId] = {
        id: folderId,
        title,
        lists: [],
        createdAt: now,
        updatedAt: now,
      };

      state.headers.push({
        type: 'FOLDER',
        id: folderId,
        lists: [],
      });
    },
    deleteList(state, action: PayloadAction<string>) {
      const listId = action.payload;

      const folderId = state.listMap[listId].folderId;

      delete state.listMap[listId];

      if (folderId) {
        // Remove listId from folder's lists
        const folder = state.headers.find(
          h => h.type === 'FOLDER' && h.id === folderId,
        );
        if (folder && isFolderHeader(folder)) {
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
    deleteFolder(state, action: PayloadAction<string>) {
      const folderId = action.payload;

      // Find the folder
      const folder = state.headers.find(
        h => h.type === 'FOLDER' && h.id === folderId,
      );

      if (folder && isFolderHeader(folder)) {
        // Delete all lists in the folder from listsMap
        for (const list of folder.lists) {
          delete state.listMap[list.id];
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
  return state.tasks.listMap[state.tasks.currentTaskListId]?.tasks ?? [];
};

export const selectListMap = (state: RootState): ListMap => {
  return state.tasks.listMap ?? {};
};

export const selectFolderMap = (state: RootState): FolderMap => {
  return state.tasks.folderMap ?? {};
};

export const selectHeaders = (state: RootState): Header[] =>
  state.tasks.headers ?? [];

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
