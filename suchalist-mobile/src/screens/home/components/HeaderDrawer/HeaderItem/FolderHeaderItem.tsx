import Text from '@/components/base/Text';
import {selectListsMap, tasksActions} from '@/stores/tasks/tasks';
import Icon from '@react-native-vector-icons/ionicons';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useDispatch, useSelector} from 'react-redux';
import ListHeaderItem from './ListHeaderItem';
import {FolderHeader} from '../types';
import {List} from '@/services/task-service/types';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

type Props = {
  folderHeader: FolderHeader;
  onPress: (taskListId: string) => void;
  onDrag: () => void;
};

export default function FolderHeaderItem({
  folderHeader: {id, title, lists: listsHeader},
  onPress,
  onDrag,
}: Props) {
  const dispatch = useDispatch();

  const listsMap = useSelector(selectListsMap);

  const [lists, setLists] = useState(
    listsHeader.map(list => listsMap[list.id]),
  );

  const [isExpanded, setIsExpanded] = useState(false);

  const onDeleteFolder = () => {
    dispatch(tasksActions.removeFolder(id));
  };

  const onToggleListItem = () => {
    setIsExpanded(!isExpanded);
  };

  const renderItem = ({item, drag: listDrag}: RenderItemParams<List>) => {
    return (
      <ScaleDecorator>
        <ListHeaderItem
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
          <Menu>
            <MenuTrigger>
              <Icon name="ellipsis-horizontal-outline" size={16} />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  padding: 8,
                  borderRadius: 10,
                },
              }}>
              <MenuOption style={styles.menuOption}>
                <Icon name="list-outline" size={16} />
                <Text>Add List</Text>
              </MenuOption>
              <MenuOption style={styles.menuOption} onSelect={onDeleteFolder}>
                <Icon name="trash-outline" color="red" size={16} />
                <Text>Delete Folder</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
          <Icon name={folderItemIconName} size={16} />
        </View>
      </Pressable>
      {isExpanded && (
        <View style={styles.listsContainer}>
          <DraggableFlatList
            data={lists}
            onDragEnd={({data}) => setLists(data)}
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
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
