import {
  Header,
  isFolderHeader,
  ListHeader,
} from '@/screens/home/components/HeaderDrawer/types';
import {DEFAULT_LIST_ID} from '@/services/task-service/fake/id';
import {
  Folder,
  isFolder,
  isList,
  List,
  Resource,
  Task,
} from '@/services/task-service/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';
import {EditTask, NewTask} from './types';
import {getId} from './utils';
import {RESOURCES} from '@/services/task-service/task-service';

type ListMap = {
  [listId: string]: List;
};

type FolderMap = {
  [folderId: string]: Folder;
};

/**
 * Represents the structure of the task management state.
 */
export type TasksState = {
  /**
   * A list of task lists and task folders.
   */
  resources: Resource[];
  /**
   * The ID of the currently selected or active task list.
   */
  currentTaskListId: string;
  /**
   * A mapping of task list IDs to their corresponding task list data, this
   * can be derived from TasksState.resources. But it's also dynamically
   * populated while the app is running to ensure good performance.
   */
  listMap: ListMap;
  /**
   * A mapping of task folder IDs to their corresponding folder data, this
   * can be derived from TasksState.resources. But it's also dynamically
   * populated while the app is running to ensure good performance.
   */
  folderMap: FolderMap;
  /**
   * An ordered array of headers, which can represent folders or individual task lists, this
   * can be derived from TasksState.resources. But it's also dynamically
   * populated while the app is running to ensure good performance.
   */
  headers: Header[];
};

/**
 * listMap, folderMap and headers can be derived from resources.
 */
const initialTasksState: TasksState = {
  resources: RESOURCES,
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
      console.log('hydating');
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
        const folder = state.resources.find(
          resource => resource.id === folderId,
        );

        // Add the new list to the folder
        if (folder && isFolder(folder)) {
          folder.lists.push(newList);
        }

        // Add the new list to the folder map
        state.folderMap[folderId].lists.push(newList);

        const folderHeader = state.headers.find(
          header => isFolderHeader(header) && header.id === folderId,
        );
        if (folderHeader && isFolderHeader(folderHeader)) {
          // Add the new list to the folder header
          folderHeader.lists.push(listHeader);
        }
      } else {
        // Add the new list to the resources list
        state.resources.push(newList);

        // Add the new list to the headers list
        state.headers.push(listHeader);
      }
    },
    addFolder(state, action: PayloadAction<string>) {
      const folderId = getId();
      const title = action.payload;
      const now = new Date().toISOString();

      const newFolder: Folder = {
        id: folderId,
        title,
        lists: [],
        createdAt: now,
        updatedAt: now,
      };

      state.resources.push(newFolder);

      state.folderMap[folderId] = newFolder;

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
        const folderHeader = state.headers.find(
          h => h.type === 'FOLDER' && h.id === folderId,
        );
        if (folderHeader && isFolderHeader(folderHeader)) {
          folderHeader.lists = folderHeader.lists.filter(
            list => list.id !== listId,
          );
        }

        const folder = state.resources.find(
          resource => resource.id === folderId,
        );

        // Remove the list from the folder
        if (folder && isFolder(folder)) {
          folder.lists = folder.lists.filter(list => !(list.id === listId));
        }
      } else {
        // Remove list directly from headers
        state.headers = state.headers.filter(
          header => !(header.type === 'LIST' && header.id === listId),
        );

        // Remove list directly from resource
        state.resources = state.resources.filter(
          resource => !(isList(resource) && resource.id === listId),
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
          // If currentTaskListId was inside this folder, reset it to the default list
          state.currentTaskListId = DEFAULT_LIST_ID;
        }
      }

      // Remove the folder from headers
      state.headers = state.headers.filter(
        header => !(header.type === 'FOLDER' && header.id === folderId),
      );

      state.resources = state.resources.filter(
        resource => !(resource.id === folderId),
      );
    },
    reorderListWithinFolder(
      state,
      action: PayloadAction<{
        folderHeaderId: string;
        from: number;
        to: number;
      }>,
    ) {
      const {folderHeaderId, from, to} = action.payload;

      if (from === to) {
        return;
      }

      // Update folder's lists in folderMap based on the new list headers
      const [movedResource] = state.folderMap[folderHeaderId].lists.splice(
        from,
        1,
      );
      state.folderMap[folderHeaderId].lists.splice(to, 0, movedResource);

      // Modify folder header (may not be needed, headers should be deterministic and generated at app start, but could be good for performance
      // so that no need to generate the whole headers by processing all the resources again)
      const folderHeader = state.headers.find(
        header => header.id === folderHeaderId,
      );
      if (folderHeader && isFolderHeader(folderHeader)) {
        const [movedHeader] = folderHeader.lists.splice(from, 1);
        folderHeader.lists.splice(to, 0, movedHeader);
      }

      const folder = state.resources.find(
        resource => resource.id === folderHeaderId && isFolder(resource),
      );

      if (folder && isFolder(folder)) {
        const [movedHeader] = folder.lists.splice(from, 1);
        folder.lists.splice(to, 0, movedHeader);
      }
    },
    reorderTopLevelResources(
      state,
      action: PayloadAction<{
        from: number;
        to: number;
      }>,
    ) {
      const {from, to} = action.payload;

      if (from === to) {
        return;
      }

      const [movedResource] = state.resources.splice(from, 1);
      state.resources.splice(to, 0, movedResource);

      const [movedHeader] = state.headers.splice(from, 1);
      state.headers.splice(to, 0, movedHeader);
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
