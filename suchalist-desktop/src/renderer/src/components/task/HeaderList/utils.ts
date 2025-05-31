import { Folder, isFolder } from '@common/types/folder';
import { isList, List } from '@common/types/list';
import { Resource } from '@common/types/resource';
import { FolderHeader, Header, ListHeader } from './types';

export function toHeaders(resources: Resource[]): Header[] {
  return resources
    .map((resource) => {
      if (isFolder(resource)) {
        return toFolderHeader(resource);
      }

      if (isList(resource)) {
        return toListHeader(resource);
      }

      return null;
    })
    .filter((h): h is Header => h !== null);
}

export function toFolderHeader(resource: Folder): FolderHeader {
  return {
    type: 'FOLDER',
    id: resource.id,
    lists: resource.lists.map(toListHeader)
  };
}

export function toListHeader(resource: List): ListHeader {
  return {
    type: 'LIST',
    id: resource.id
  };
}
