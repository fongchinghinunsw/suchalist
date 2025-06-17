import { deleteFolderRowById } from '@/database/repository/folder/delete_folder_by_id';

export function deleteFolder(id: string) {
  deleteFolderRowById(id);
}
