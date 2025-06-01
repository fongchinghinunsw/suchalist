import { Folder, isFolder } from '@common/types/folder';
import { List } from '@common/types/list';
import { Resource } from '@common/types/resource';

export function getListFromResources(
  listId: string,
  resources: Resource[]
):
  | {
      list: List;
      folder: Folder | undefined;
    }
  | undefined {
  for (const resource of resources) {
    if (isFolder(resource)) {
      const list = resource.lists.find((l) => l.id === listId);

      if (list) {
        return {
          list,
          folder: resource
        };
      }
    } else if (resource.id === listId) {
      return {
        list: resource,
        folder: undefined
      };
    }
  }

  return;
}
