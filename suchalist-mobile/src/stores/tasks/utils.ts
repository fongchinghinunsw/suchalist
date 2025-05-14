import {
  toFolderHeader,
  toListHeader,
} from '@/screens/home/components/HeaderDrawer/utils';
import {getResources} from '@/services/task-service/task-service';
import {isFolder, isList} from '@/services/task-service/types';
import uuid from 'react-native-uuid';
import {TasksState} from './tasks';
import {DEFAULT_LIST_ID} from '@/services/task-service/fake/id';

export const getId = () => {
  return uuid.v4();
};

export async function getFakeTasksState(): Promise<TasksState> {
  const resources = await getResources();

  const state: TasksState = {
    currentTaskListId: DEFAULT_LIST_ID,
    listsMap: {},
    headers: [],
  };

  resources.forEach(resource => {
    if (isFolder(resource)) {
      resource.lists.forEach(list => {
        state.listsMap[list.id] = list;
      });
      state.headers.push(toFolderHeader(resource));
      return;
    }

    if (isList(resource)) {
      state.listsMap[resource.id] = resource;
      state.headers.push(toListHeader(resource));
      return;
    }

    return;
  });

  return state;
}
