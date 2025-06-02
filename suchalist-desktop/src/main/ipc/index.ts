import { registerGetListHandler } from './get_list';
import { registerGetResourcesHandler } from './get_resources';

export function registerIpcHandlers() {
  registerGetListHandler();
  registerGetResourcesHandler();
}
