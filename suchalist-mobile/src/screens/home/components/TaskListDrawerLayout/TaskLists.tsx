import {useState} from 'react';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import TaskFolderItem from './TaskFolderItem';
import TaskListItem from './TaskListItem';
import {Header} from './types';

type Props = {
  headers: Header[];
  onPress: (taskListId: string) => void;
};

export default function TaskLists({headers, onPress}: Props) {
  const [resources, setResources] = useState(headers);

  const renderItem = ({item, drag, isActive}: RenderItemParams<Header>) => {
    return (
      <ScaleDecorator>
        {item.type === 'FOLDER' ? (
          <TaskFolderItem folderHeader={item} onPress={onPress} onDrag={drag} />
        ) : (
          <TaskListItem listHeader={item} onPress={onPress} onDrag={drag} />
        )}
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={resources}
      onDragEnd={({data}) => setResources(data)}
      keyExtractor={resource => resource.id}
      renderItem={renderItem}
      dragItemOverflow={false}
    />
  );
}
