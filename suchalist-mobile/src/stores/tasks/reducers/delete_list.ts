import {isFolderHeader} from '@/screens/home/components/HeaderDrawer/types';
import {DEFAULT_LIST_ID} from '@/services/task-service/fake/id';
import {isList} from '@/services/task-service/types';
import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {getListFromResources} from '../utils/get_list';

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

  store(state, listId);
}

function store(state: TasksState, listId: string) {
  const result = getListFromResources(listId, state.resources);
  if (result) {
    const {folder} = result;
    if (folder) {
      // Remove the list from the folder
      folder.lists = folder.lists.filter(l => !(l.id === listId));
    } else {
      // Remove list directly from resource
      state.resources = state.resources.filter(
        resource => !(isList(resource) && resource.id === listId),
      );
    }
  }
}
