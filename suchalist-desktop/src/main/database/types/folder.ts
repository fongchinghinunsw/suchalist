import { Folder } from '@common/types/folder';

export type FolderRow = {
  id: string;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export function toFolderRow(folder: Folder): FolderRow {
  return {
    ...folder
  };
}

export function toFolder(folderRow: FolderRow): Omit<Folder, 'lists'> {
  return {
    ...folderRow
  };
}
