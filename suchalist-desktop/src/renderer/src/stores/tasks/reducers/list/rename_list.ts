import { isFolder } from '@common/types/folder';
import { List } from '@common/types/list';
import { PayloadAction } from '@reduxjs/toolkit';
import { TasksState } from '../../tasks';

export default function renameList(
  state: TasksState,
  action: PayloadAction<{
    list: List;
    newTitle: string;
  }>
) {
  const { list, newTitle } = action.payload;

  state.listMap[list.id].title = newTitle;

  store(state, list.id, newTitle);

  window.database.renameList(list.id, newTitle);
}

function store(state: TasksState, listId: string, newTitle: string) {
  state.resources.forEach((resource) => {
    if (isFolder(resource)) {
      resource.lists.forEach((list) => {
        if (listId === list.id) {
          list.title = newTitle;
        }
      });
    } else if (resource.id === listId) {
      resource.title = newTitle;
    }
  });
}
