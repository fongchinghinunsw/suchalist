import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {isFolderHeader} from '@/screens/home/components/HeaderDrawer/types';
import {DEFAULT_LIST_ID} from '@/services/task-service/fake/id';

export default function deleteFolder(
  state: TasksState,
  action: PayloadAction<string>,
) {
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

    if (folder.lists.map(list => list.id).includes(state.currentTaskListId)) {
      // If currentTaskListId was inside this folder, reset it to the default list
      state.currentTaskListId = DEFAULT_LIST_ID;
    }
  }

  // Remove the folder from headers
  state.headers = state.headers.filter(
    header => !(header.type === 'FOLDER' && header.id === folderId),
  );

  store(state, folderId);
}

function store(state: TasksState, folderId: string) {
  state.resources = state.resources.filter(
    resource => !(resource.id === folderId),
  );
}
