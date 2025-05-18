import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../../tasks';
import {Folder, isFolder} from '@/services/task-service/types';

export default function renameFolder(
  state: TasksState,
  action: PayloadAction<{
    folder: Folder;
    newTitle: string;
  }>,
) {
  const {folder, newTitle} = action.payload;

  state.folderMap[folder.id].title = newTitle;

  store(state, folder.id, newTitle);
}

function store(state: TasksState, folderId: string, newTitle: string) {
  const index = state.resources.findIndex(
    resource => isFolder(resource) && resource.id === folderId,
  );
  state.resources[index].title = newTitle;
}
