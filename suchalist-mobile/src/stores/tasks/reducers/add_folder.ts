import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {getId} from '../utils/utils';
import {Folder} from '@/services/task-service/types';

export default function addFolder(
  state: TasksState,
  action: PayloadAction<string>,
) {
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
}
