import { LEISURE_FOLDER, PERSONAL_IMPROVEMENT_FOLDER } from '@common/fake/folder';
import { FolderRow, FolderRowSchema } from '../types/folder';

export const PERSONAL_IMPROVEMENT_FOLDER_ROW: FolderRow = FolderRowSchema.parse(
  PERSONAL_IMPROVEMENT_FOLDER
);

export const LEISURE_FOLDER_ROW: FolderRow = FolderRowSchema.parse(LEISURE_FOLDER);
