import {Header, ListHeader} from '@/screens/home/components/HeaderDrawer/types';
import {
  DEFAULT_LIST_ID,
  STARRED_LIST_ID,
  TODAY_LIST_ID,
} from '@/services/task-service/fake/id';
import {FAKE_RESOURCES} from '@/services/task-service/task-service';
import {Folder, List, Resource, Task} from '@/services/task-service/types';
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';
import addFolder from './reducers/add_folder';
import addList from './reducers/add_list';
import addTask from './reducers/add_task';
import deleteFolder from './reducers/delete_folder';
import deleteList from './reducers/delete_list';
import deleteTask from './reducers/delete_task';
import editTask from './reducers/edit_task';
import reorderListsWithinFolder from './reducers/reorder_lists_within_folder';
import reorderTopLevelResources from './reducers/reorder_top_level_resources';
import setIsCompleted from './reducers/set_is_completed';
import setIsStarred from './reducers/set_is_starred';

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
  resources: FAKE_RESOURCES,
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
    addTask,
    deleteTask,
    editTask,
    setIsCompleted,
    setIsStarred,
    addList,
    addFolder,
    deleteList,
    deleteFolder,
    reorderListsWithinFolder,
    reorderTopLevelResources,
  },
});

const selectTasksState = (state: RootState) => state.tasks;

export const selectCurrentList = (state: RootState): List => {
  return state.tasks.listMap[state.tasks.currentTaskListId] ?? [];
};

export const selectCurrentTasks = (state: RootState): Task[] => {
  return state.tasks.listMap[state.tasks.currentTaskListId]?.tasks ?? [];
};

export const selectListMap = createSelector(
  [selectTasksState],
  tasks => tasks.listMap,
);

export const selectFolderMap = (state: RootState): FolderMap => {
  return state.tasks.folderMap ?? {};
};

export const selectIsCurrentListGenerated = createSelector(
  [selectTasksState],
  tasks => {
    return (
      tasks.currentTaskListId === STARRED_LIST_ID ||
      tasks.currentTaskListId === TODAY_LIST_ID
    );
  },
);

const selectAllHeaders = createSelector(
  [selectTasksState],
  tasks => tasks.headers,
);

export const selectHeaders = createSelector(
  [selectAllHeaders],
  (headers): Header[] =>
    headers.filter(
      (header: Header) =>
        header.id !== DEFAULT_LIST_ID &&
        header.id !== STARRED_LIST_ID &&
        header.id !== TODAY_LIST_ID,
    ),
);

export const selectDefaultListHeader = createSelector(
  [selectListMap],
  (listMap): ListHeader => ({
    type: 'LIST',
    ...listMap[DEFAULT_LIST_ID],
  }),
);

export const selectStarredListHeader = createSelector(
  [selectListMap],
  (listMap): ListHeader => ({
    type: 'LIST',
    ...listMap[STARRED_LIST_ID],
  }),
);

export const selectTodayListHeader = createSelector(
  [selectListMap],
  (listMap): ListHeader => ({
    type: 'LIST',
    ...listMap[TODAY_LIST_ID],
  }),
);

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
