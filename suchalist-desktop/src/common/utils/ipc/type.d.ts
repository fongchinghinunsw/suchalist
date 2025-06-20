import { Resource } from '@common/types/resource';

type IpcMapping = {
  getResources: Resource[];
  addTask: void;
  deleteTask: void;
  editTask: void;
  updateTaskIsStarred: void;
  updateTaskIsCompleted: void;
  addList: void;
  renameList: void;
  deleteList: void;
  addFolder: void;
  renameFolder: void;
  deleteFolder: void;
};
