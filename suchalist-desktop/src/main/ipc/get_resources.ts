import { getResources } from '@/database/service/resource';
import { ipcMainHandle } from '../../common/utils/ipc/wrappers';

export function registerGetResourcesHandler() {
  ipcMainHandle('getResources', () => getResources());
}
