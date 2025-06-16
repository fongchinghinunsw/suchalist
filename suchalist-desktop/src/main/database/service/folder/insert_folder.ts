import { insertFolderRow } from '@/database/repository/folder/insert_folder_row';
import { Folder } from '@common/types/folder';

export function insertFolder(folder: Folder) {
  insertFolderRow(folder);
}
