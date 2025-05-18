import {
  toFolderHeader,
  toListHeader,
} from '@/screens/home/components/HeaderDrawer/utils';
import {
  DEFAULT_LIST_ID,
  STARRED_LIST_ID,
  TODAY_LIST_ID,
} from '@/services/task-service/fake/id';
import {
  isFolder,
  isList,
  List,
  Resource,
  Task,
} from '@/services/task-service/types';
import uuid from 'react-native-uuid';
import {TasksState} from '../tasks';

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

  const now = new Date().toISOString();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDueToday = (task: Task) => {
    if (!task.dueDate) {
      return false;
    }

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime();
  };

  const starredList: List = {
    id: STARRED_LIST_ID,
    title: 'Starred',
    tasks: [],
    createdAt: now,
    updatedAt: now,
  };

  const todayList: List = {
    id: TODAY_LIST_ID,
    title: 'Today',
    tasks: [],
    createdAt: now,
    updatedAt: now,
  };

  resources.forEach(resource => {
    if (isFolder(resource)) {
      resource.lists.forEach(list => {
        state.listMap[list.id] = list;

        list.tasks.forEach(task => {
          if (task.isStarred) {
            starredList.tasks.push(task);
          }

          if (isDueToday(task)) {
            todayList.tasks.push(task);
          }
        });
      });

      state.folderMap[resource.id] = resource;
      state.headers.push(toFolderHeader(resource));
      return;
    }

    if (isList(resource)) {
      resource.tasks.forEach(task => {
        if (task.isStarred) {
          starredList.tasks.push(task);
        }

        if (isDueToday(task)) {
          todayList.tasks.push(task);
        }
      });

      state.listMap[resource.id] = resource;
      state.headers.push(toListHeader(resource));
      return;
    }

    return;
  });

  state.listMap[STARRED_LIST_ID] = starredList;
  state.headers.push({
    type: 'LIST',
    id: STARRED_LIST_ID,
  });

  state.listMap[TODAY_LIST_ID] = todayList;
  state.headers.push({
    type: 'LIST',
    id: TODAY_LIST_ID,
  });

  return state;
}
