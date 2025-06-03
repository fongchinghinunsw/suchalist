import {
  DEFAULT_LIST_ID,
  NEXT_SEVEN_DAYS_LIST_ID,
  STARRED_LIST_ID,
  TODAY_LIST_ID
} from '@common/constants/list';
import { selectHeaders, tasksActions } from '@renderer/stores/tasks/tasks';
import { useDispatch, useSelector } from 'react-redux';
import FolderHeaderItem from './HeaderItem/FolderHeaderItem';
import ListHeaderItem from './HeaderItem/ListHeaderItem';
import { isFolderHeader } from './types';

const BUILT_IN_LISTS = [DEFAULT_LIST_ID, STARRED_LIST_ID, TODAY_LIST_ID, NEXT_SEVEN_DAYS_LIST_ID];

export default function Headers() {
  const headers = useSelector(selectHeaders);

  const dispatch = useDispatch();

  const onListHeaderClick = (taskListId: string) => {
    dispatch(tasksActions.setCurrentTaskListId(taskListId));
  };

  return (
    <div>
      {BUILT_IN_LISTS.map((id) => {
        return (
          <ListHeaderItem
            key={id}
            listHeader={{
              type: 'LIST',
              id
            }}
            onListHeaderClick={onListHeaderClick}
          />
        );
      })}
      {headers.map((header) => {
        if (isFolderHeader(header)) {
          return (
            <FolderHeaderItem
              key={header.id}
              folderHeader={header}
              onListHeaderClick={onListHeaderClick}
            />
          );
        }

        return (
          <ListHeaderItem
            key={header.id}
            listHeader={header}
            onListHeaderClick={onListHeaderClick}
          />
        );
      })}
    </div>
  );
}
