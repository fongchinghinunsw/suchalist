import {UnreachableError} from '@/components/base/UnreachableError';
import TaskFolderItem from './TaskFolderItem';
import TaskListItem from './TaskListItem';
import {Header} from './types';

type Props = {
  headers: Header[];
  onPress: (taskListId: string) => void;
};

export default function TaskLists({headers, onPress}: Props) {
  return headers.map(header => {
    switch (header.type) {
      case 'FOLDER':
        return (
          <TaskFolderItem
            key={header.id}
            folderHeader={header}
            onPress={onPress}
          />
        );
      case 'LIST':
        return (
          <TaskListItem key={header.id} listHeader={header} onPress={onPress} />
        );
      default:
        throw new UnreachableError(header);
    }
  });
}
