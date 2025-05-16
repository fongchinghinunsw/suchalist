import {
  toFolderHeader,
  toListHeader,
} from '@/screens/home/components/HeaderDrawer/utils';
import {DEFAULT_LIST_ID} from '@/services/task-service/fake/id';
import {isFolder, isList, Resource} from '@/services/task-service/types';
import uuid from 'react-native-uuid';
import {TasksState} from './tasks';

export const getId = () => {
  return uuid.v4();
};

export async function getTasksState(
  resources: Resource[],
): Promise<TasksState> {
  const state: TasksState = {
    resources,
    currentTaskListId: DEFAULT_LIST_ID,
    listMap: {},
    folderMap: {},
    headers: [],
  };

  resources.forEach(resource => {
    if (isFolder(resource)) {
      resource.lists.forEach(list => {
        state.listMap[list.id] = list;
      });
      state.folderMap[resource.id] = resource;
      state.headers.push(toFolderHeader(resource));
      return;
    }

    if (isList(resource)) {
      state.listMap[resource.id] = resource;
      state.headers.push(toListHeader(resource));
      return;
    }

    return;
  });

  return state;
}
