import {Folder, isFolder, List, Resource} from '@/services/task-service/types';

export function getListFromResources(
  listId: string,
  resources: Resource[],
):
  | {
      list: List;
      folder: Folder | undefined;
    }
  | undefined {
  for (const resource of resources) {
    if (isFolder(resource)) {
      const list = resource.lists.find(l => l.id === listId);

      if (list) {
        return {
          list,
          folder: resource,
        };
      }
    } else if (resource.id === listId) {
      return {
        list: resource,
        folder: undefined,
      };
    }
  }
}
