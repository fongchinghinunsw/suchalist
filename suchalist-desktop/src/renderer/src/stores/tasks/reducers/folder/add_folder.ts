import { Folder } from '@common/types/folder';
import { getId } from '@common/utils/id';
import { PayloadAction } from '@reduxjs/toolkit';
import { TasksState } from '../../tasks';

export default function addFolder(state: TasksState, action: PayloadAction<string>) {
  const folderId = getId();
  const title = action.payload;
  const now = new Date().toISOString();

  const newFolder: Folder = {
    id: folderId,
    title,
    order: 0, // TODO
    lists: [],
    createdAt: now,
    updatedAt: now
  };

  state.folderMap[folderId] = newFolder;

  state.headers.push({
    type: 'FOLDER',
    id: folderId,
    lists: []
  });

  store(state, newFolder);
}

function store(state: TasksState, newFolder: Folder) {
  state.resources.push(newFolder);
}
