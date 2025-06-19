import { List } from './list';

export type Folder = {
  id: string;
  title: string;
  order: number;
  lists: List[];
  createdAt: string;
  updatedAt: string;
};

export function isFolder(resource: List | Folder): resource is Folder {
  return Array.isArray((resource as Folder).lists);
}
