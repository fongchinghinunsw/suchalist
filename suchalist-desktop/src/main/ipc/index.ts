import { registerGetListHandler } from './get_list';
import { registerGetResourcesHandler } from './get_resources';
import { registerSelectAndSavePhotoHandler } from './select_and_save_photo';

export function registerIpcHandlers() {
  registerGetListHandler();
  registerGetResourcesHandler();
  registerSelectAndSavePhotoHandler();
}
