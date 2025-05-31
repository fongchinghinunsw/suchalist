import { List } from './list';

export type Folder = {
  id: string;
  title: string;
  order: number;
  lists: List[];
  createdAt: string;
  updatedAt: string;
};

/**
 * Type guard to check if a resource is a Folder.
 */
export function isFolder(resource: List | Folder): resource is Folder {
  return Array.isArray((resource as Folder).lists);
}
