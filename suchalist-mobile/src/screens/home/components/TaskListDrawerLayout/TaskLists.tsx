import {UnreachableError} from '@/components/base/UnreachableError';
import {Resource} from '@/stores/tasks/types';
import TaskFolderItem from './TaskFolderItem';
import TaskListItem from './TaskListItem';

type Props = {
  resources: Resource[];
  onPress: (taskListId: string) => void;
};

export default function TaskLists({resources, onPress}: Props) {
  console.log({resources});
  return resources.map(resource => {
    switch (resource.type) {
      case 'FOLDER':
        return (
          <TaskFolderItem
            key={resource.id}
            taskFolder={resource}
            onPress={onPress}
          />
        );
      case 'LIST':
        return (
          <TaskListItem
            key={resource.id}
            taskList={resource}
            onPress={onPress}
          />
        );
      default:
        throw new UnreachableError(resource);
    }
  });
}
