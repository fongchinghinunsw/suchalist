import { registerGetListHandler } from './get_list';
import { registerGetResourcesHandler } from './get_resources';
import { registerAddListHandler } from './list/add_list';
import registerRemovePhotoHandler from './remove_photo';
import { registerSelectAndSavePhotoHandler } from './select_and_save_photo';
import { registerDeleteTaskHandler } from './task/delete_task';
import { registerEditTaskHandler } from './task/edit_task';
import { registerAddTaskHandler } from './task/insert_task';
import { registerUpdateTaskIsCompletedHandler } from './update_task_is_completed';
import { registerUpdateTaskIsStarredHandler } from './update_task_is_starred';

export function registerIpcHandlers() {
  registerGetListHandler();
  registerGetResourcesHandler();
  registerSelectAndSavePhotoHandler();
  registerRemovePhotoHandler();

  registerAddTaskHandler();
  registerDeleteTaskHandler();
  registerEditTaskHandler();
  registerUpdateTaskIsCompletedHandler();
  registerUpdateTaskIsStarredHandler();

  registerAddListHandler();
}
