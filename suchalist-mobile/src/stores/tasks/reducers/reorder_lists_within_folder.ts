import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {isFolderHeader} from '@/screens/home/components/HeaderDrawer/types';
import {isFolder} from '@/services/task-service/types';

export default function reorderListsWithinFolder(
  state: TasksState,
  action: PayloadAction<{
    folderHeaderId: string;
    from: number;
    to: number;
  }>,
) {
  const {folderHeaderId, from, to} = action.payload;

  if (from === to) {
    return;
  }

  // Update folder's lists in folderMap based on the new list headers
  const [movedResource] = state.folderMap[folderHeaderId].lists.splice(from, 1);
  state.folderMap[folderHeaderId].lists.splice(to, 0, movedResource);

  // Modify folder header (may not be needed, headers should be deterministic and generated at app start, but could be good for performance
  // so that no need to generate the whole headers by processing all the resources again)
  const folderHeader = state.headers.find(
    header => header.id === folderHeaderId,
  );
  if (folderHeader && isFolderHeader(folderHeader)) {
    const [movedHeader] = folderHeader.lists.splice(from, 1);
    folderHeader.lists.splice(to, 0, movedHeader);
  }

  const folder = state.resources.find(
    resource => resource.id === folderHeaderId && isFolder(resource),
  );

  if (folder && isFolder(folder)) {
    const [movedHeader] = folder.lists.splice(from, 1);
    folder.lists.splice(to, 0, movedHeader);
  }
}
