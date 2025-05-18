import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../../tasks';
import {getId} from '../../utils/utils';
import {isFolder, List} from '@/services/task-service/types';
import {
  isFolderHeader,
  ListHeader,
} from '@/screens/home/components/HeaderDrawer/types';

export default function addList(
  state: TasksState,
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
    // Add the new list to the headers list
    state.headers.push(listHeader);
  }

  store(state, folderId, newList);
}

function store(state: TasksState, folderId: string | undefined, newList: List) {
  if (folderId) {
    const folder = state.resources.find(resource => resource.id === folderId);

    // Add the new list to the folder
    if (folder && isFolder(folder)) {
      folder.lists.push(newList);
    }
  } else {
    state.resources.push(newList);
  }
}
