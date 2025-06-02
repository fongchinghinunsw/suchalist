import { LEISURE_FOLDER, PERSONAL_IMPROVEMENT_FOLDER } from '@common/fake/folder';
import { Folder } from '@common/types/folder';
import { FolderRow } from '../types/folder';

export const PERSONAL_IMPROVEMENT_FOLDER_ROW: FolderRow = toFolderRow(PERSONAL_IMPROVEMENT_FOLDER);

export const LEISURE_FOLDER_ROW: FolderRow = toFolderRow(LEISURE_FOLDER);

function toFolderRow(folder: Folder): FolderRow {
  return {
    ...folder
  };
}
