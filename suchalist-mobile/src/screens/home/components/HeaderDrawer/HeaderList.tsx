import {useState} from 'react';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import FolderHeaderItem from './HeaderItem/FolderHeaderItem';
import ListHeaderItem from './HeaderItem/ListHeaderItem';
import {Header} from './types';

type Props = {
  headers: Header[];
  onPress: (taskListId: string) => void;
};

export default function HeaderList({headers, onPress}: Props) {
  const [resources, setResources] = useState(headers);

  const renderItem = ({item, drag}: RenderItemParams<Header>) => {
    return (
      <ScaleDecorator>
        {item.type === 'FOLDER' ? (
          <FolderHeaderItem
            folderHeader={item}
            onPress={onPress}
            onDrag={drag}
          />
        ) : (
          <ListHeaderItem listHeader={item} onPress={onPress} onDrag={drag} />
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
