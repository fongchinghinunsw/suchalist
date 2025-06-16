import {
  DEFAULT_LIST_ID,
  NEXT_SEVEN_DAYS_LIST_ID,
  STARRED_LIST_ID,
  TODAY_LIST_ID
} from '@common/constants/list';
import Divider from '@renderer/components/base/Divider';
import { selectHeaders, tasksActions } from '@renderer/stores/tasks/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import FolderHeaderItem from './HeaderItem/FolderHeaderItem';
import ListHeaderItem from './HeaderItem/ListHeaderItem';
import { isFolderHeader } from './types';

const BUILT_IN_LISTS = [DEFAULT_LIST_ID, STARRED_LIST_ID, TODAY_LIST_ID, NEXT_SEVEN_DAYS_LIST_ID];

export default function Headers() {
  const headers = useSelector(selectHeaders);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onListHeaderClick = (taskListId: string) => {
    dispatch(tasksActions.setCurrentTaskListId(taskListId));
    if (location.pathname !== '/') {
      navigate('/');
    }
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
            hasOption={false}
            onListHeaderClick={onListHeaderClick}
          />
        );
      })}
      <Divider className="my-2" />
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
            hasOption={true}
            onListHeaderClick={onListHeaderClick}
          />
        );
      })}
    </div>
  );
}
