import {
  Folder,
  isFolder,
  isList,
  List,
  Resource,
} from '@/services/task-service/types';
import {FolderHeader, Header, ListHeader} from './types';

export function toHeaders(resources: Resource[]): Header[] {
  return resources
    .map(resource => {
      if (isFolder(resource)) {
        return {
          type: 'FOLDER',
          id: resource.id,
          title: resource.title,
          lists: resource.lists.map(toListHeader),
        };
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
    title: resource.title,
    lists: resource.lists.map(toListHeader),
  };
}

export function toListHeader(resource: List): ListHeader {
  return {
    type: 'LIST',
    id: resource.id,
    title: resource.title,
  };
}
