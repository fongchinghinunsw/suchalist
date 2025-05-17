import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {isFolderHeader} from '@/screens/home/components/HeaderDrawer/types';
import {isFolder, isList} from '@/services/task-service/types';
import {DEFAULT_LIST_ID} from '@/services/task-service/fake/id';

export default function deleteList(
  state: TasksState,
  action: PayloadAction<string>,
) {
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

    const folder = state.resources.find(resource => resource.id === folderId);

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
}
