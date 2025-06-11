import { registerGetListHandler } from './get_list';
import { registerGetResourcesHandler } from './get_resources';
import registerRemovePhotoHandler from './remove_photo';
import { registerSelectAndSavePhotoHandler } from './select_and_save_photo';
import { registerUpdateTaskIsCompletedHandler } from './update_task_is_completed';
import { registerUpdateTaskIsStarredHandler } from './update_task_is_starred';

export function registerIpcHandlers() {
  registerGetListHandler();
  registerGetResourcesHandler();
  registerSelectAndSavePhotoHandler();
  registerRemovePhotoHandler();

  registerUpdateTaskIsCompletedHandler();
  registerUpdateTaskIsStarredHandler();
}
