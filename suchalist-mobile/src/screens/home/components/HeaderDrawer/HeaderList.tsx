import Divider from '@/components/base/Divider';
import {
  selectDefaultListHeader,
  selectNextSevenDaysListHeader,
  selectStarredListHeader,
  selectTodayListHeader,
  tasksActions,
} from '@/stores/tasks/tasks';
import {StyleSheet} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useDispatch, useSelector} from 'react-redux';
import FolderHeaderItem from './HeaderItem/FolderHeaderItem';
import ListHeaderItem from './HeaderItem/ListHeaderItem';
import {Header} from './types';

type Props = {
  headers: Header[];
  onPress: (taskListId: string) => void;
};

export default function HeaderList({headers, onPress}: Props) {
  const dispatch = useDispatch();
  const defaultListHeader = useSelector(selectDefaultListHeader);
  const starredListHeader = useSelector(selectStarredListHeader);
  const todayListHeader = useSelector(selectTodayListHeader);
  const nextSevenDaysListHeader = useSelector(selectNextSevenDaysListHeader);

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
          <ListHeaderItem
            listHeader={item}
            hasOptions={true}
            onPress={onPress}
            onDrag={drag}
          />
        )}
      </ScaleDecorator>
    );
  };

  return (
    <>
      <ListHeaderItem
        listHeader={defaultListHeader}
        hasOptions={false}
        onPress={onPress}
      />
      <ListHeaderItem
        listHeader={starredListHeader}
        hasOptions={false}
        icon={{
          name: 'star',
        }}
        onPress={onPress}
      />
      <ListHeaderItem
        listHeader={todayListHeader}
        hasOptions={false}
        icon={{
          name: 'calendar-number-outline',
        }}
        onPress={onPress}
      />
      <ListHeaderItem
        listHeader={nextSevenDaysListHeader}
        hasOptions={false}
        icon={{
          name: 'calendar-outline',
        }}
        onPress={onPress}
      />
      <Divider styles={styles.divider} />
      <DraggableFlatList
        data={headers}
        onDragEnd={({from, to}) => {
          dispatch(
            tasksActions.reorderTopLevelResources({from: from + 1, to: to + 1}),
          );
        }}
        keyExtractor={resource => resource.id}
        renderItem={renderItem}
        dragItemOverflow={false}
        style={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  divider: {
    marginHorizontal: 10,
  },
});
