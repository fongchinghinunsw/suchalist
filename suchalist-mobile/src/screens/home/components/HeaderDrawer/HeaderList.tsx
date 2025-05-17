import {tasksActions} from '@/stores/tasks/tasks';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useDispatch} from 'react-redux';
import FolderHeaderItem from './HeaderItem/FolderHeaderItem';
import ListHeaderItem from './HeaderItem/ListHeaderItem';
import {Header} from './types';

type Props = {
  headers: Header[];
  onPress: (taskListId: string) => void;
};

export default function HeaderList({headers, onPress}: Props) {
  const dispatch = useDispatch();

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
      data={headers}
      onDragEnd={({from, to}) => {
        dispatch(tasksActions.reorderTopLevelResources({from, to}));
      }}
      keyExtractor={resource => resource.id}
      renderItem={renderItem}
      dragItemOverflow={false}
    />
  );
}
