import { Folder, isFolder } from '@common/types/folder';
import { PayloadAction } from '@reduxjs/toolkit';
import { TasksState } from '../../tasks';

export default function renameFolder(
  state: TasksState,
  action: PayloadAction<{
    folder: Folder;
    newTitle: string;
  }>
) {
  const { folder, newTitle } = action.payload;

  state.folderMap[folder.id].title = newTitle;

  store(state, folder.id, newTitle);

  window.database.renameFolder(folder.id, newTitle);
}

function store(state: TasksState, folderId: string, newTitle: string) {
  const index = state.resources.findIndex(
    (resource) => isFolder(resource) && resource.id === folderId
  );
  state.resources[index].title = newTitle;
}
