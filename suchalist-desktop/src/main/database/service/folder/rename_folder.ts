import { updateFolderTitleById } from '@/database/repository/folder/update_folder_title_by_id';

export function renameFolder(id: string, newTitle: string) {
  return updateFolderTitleById(id, newTitle);
}
