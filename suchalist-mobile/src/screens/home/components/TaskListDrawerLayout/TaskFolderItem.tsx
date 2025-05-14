import Text from '@/components/base/Text';
import {selectListsMap} from '@/stores/tasks/tasks';
import {List} from '@/stores/tasks/types';
import Icon from '@react-native-vector-icons/ionicons';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useSelector} from 'react-redux';
import TaskListItem from './TaskListItem';
import {FolderHeader} from './types';

type Props = {
  folderHeader: FolderHeader;
  onPress: (taskListId: string) => void;
  onDrag: () => void;
};

export default function TaskFolderItem({
  folderHeader: {title, lists: listsHeader},
  onPress,
  onDrag,
}: Props) {
  const listsMap = useSelector(selectListsMap);

  const [lists, setLists] = useState(listsHeader.map(list => listsMap[list]));

  const [isExpanded, setIsExpanded] = useState(false);

  const onToggleListItem = () => {
    setIsExpanded(!isExpanded);
  };

  const renderItem = ({
    item,
    drag: listDrag,
    isActive: listIsActive,
  }: RenderItemParams<List>) => {
    return (
      <ScaleDecorator>
        <TaskListItem
          listHeader={{
            type: 'LIST',
            ...item,
          }}
          onPress={() => onPress(item.id)}
          onDrag={listDrag}
        />
      </ScaleDecorator>
    );
  };

  const folderItemIconName = isExpanded
    ? 'chevron-down-outline'
    : 'chevron-back-outline';

  return (
    <View>
      <Pressable
        style={styles.container}
        onPress={onToggleListItem}
        onLongPress={onDrag}
        delayLongPress={250}>
        <View style={styles.titleContainer}>
          <Icon name="folder-open-outline" size={16} />
          <Text size="large">{title}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="ellipsis-horizontal-outline" size={16} />
          <Icon name={folderItemIconName} size={16} />
        </View>
      </Pressable>
      {isExpanded && (
        <View style={styles.listsContainer}>
          <DraggableFlatList
            data={lists}
            onDragEnd={({data}) => {
              console.log('TaskFolderItem onDragEnd', data);
              setLists(data);
            }}
            keyExtractor={list => list.id}
            renderItem={renderItem}
            dragItemOverflow={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listsContainer: {
    paddingLeft: 12,
  },
});
