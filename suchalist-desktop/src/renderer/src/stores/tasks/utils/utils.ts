import {
  DEFAULT_LIST_ID,
  NEXT_SEVEN_DAYS_LIST_ID,
  STARRED_LIST_ID,
  TODAY_LIST_ID
} from '@common/constants/list';
import { isFolder } from '@common/types/folder';
import { isList, List } from '@common/types/list';
import { Task } from '@common/types/task';
import { toFolderHeader, toListHeader } from '@renderer/components/task/HeaderList/utils';
import { TasksState } from '../tasks';

export async function getTasksState(): Promise<TasksState> {
  const resources = await window.database.getResources();

  const state: TasksState = {
    resources,
    currentTaskListId: DEFAULT_LIST_ID,
    listMap: {},
    folderMap: {},
    headers: []
  };

  const now = new Date().toISOString();

  const starredList: List = {
    id: STARRED_LIST_ID,
    title: 'Starred',
    tasks: [],
    createdAt: now,
    updatedAt: now
  };

  const todayList: List = {
    id: TODAY_LIST_ID,
    title: 'Today',
    tasks: [],
    createdAt: now,
    updatedAt: now
  };

  const nextSevenDaysList: List = {
    id: NEXT_SEVEN_DAYS_LIST_ID,
    title: 'Next 7 Days',
    tasks: [],
    createdAt: now,
    updatedAt: now
  };

  resources.forEach((resource) => {
    if (isFolder(resource)) {
      const folder = resource;

      state.folderMap[folder.id] = folder;

      folder.lists.forEach((list) => {
        state.listMap[list.id] = list;

        list.tasks.forEach((task) => {
          if (task.isStarred) {
            starredList.tasks.push(task);
          }

          if (isDueToday(task)) {
            todayList.tasks.push(task);
          }

          if (isDueWithinNextDays(task, 7)) {
            nextSevenDaysList.tasks.push(task);
          }
        });
      });

      state.headers.push(toFolderHeader(folder));
      return;
    }

    if (isList(resource)) {
      const list = resource;

      state.listMap[list.id] = list;

      list.tasks.forEach((task) => {
        if (task.isStarred) {
          starredList.tasks.push(task);
        }

        if (isDueToday(task)) {
          todayList.tasks.push(task);
        }

        if (isDueWithin7Days(task)) {
          nextSevenDaysList.tasks.push(task);
        }
      });

      if (list.id !== DEFAULT_LIST_ID) {
        state.headers.push(toListHeader(list));
      }

      return;
    }

    return;
  });

  state.listMap[STARRED_LIST_ID] = starredList;
  state.listMap[TODAY_LIST_ID] = todayList;
  state.listMap[NEXT_SEVEN_DAYS_LIST_ID] = nextSevenDaysList;

  return state;
}

export const isDueToday = (task: Task) => {
  return isDueWithinNextDays(task, 1);
};

export const isDueWithin7Days = (task: Task) => {
  return isDueWithinNextDays(task, 7);
};

export const isDueWithinNextDays = (task: Task, days: number) => {
  const dueDate = task.dueDate;

  if (!dueDate) {
    return false;
  }

  const now = new Date();
  const due = new Date(dueDate);

  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffInTime = due.getTime() - now.getTime();
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  return diffInDays < days;
};
