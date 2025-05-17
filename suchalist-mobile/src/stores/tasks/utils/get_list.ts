import {isFolder, List, Resource} from '@/services/task-service/types';

export function getListFromResources(
  listId: string,
  resources: Resource[],
): List | undefined {
  for (const resource of resources) {
    if (isFolder(resource)) {
      const list = resource.lists.find(l => l.id === listId);

      if (list) {
        return list;
      }
    } else if (resource.id === listId) {
      return resource;
    }
  }
}
