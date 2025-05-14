import Text from '@/components/base/Text';
import {selectFolderMap, tasksActions} from '@/stores/tasks/tasks';
import Icon from '@react-native-vector-icons/ionicons';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {FolderHeader, ListHeader} from '../types';
import ListHeaderItem from './ListHeaderItem';

type Props = {
  folderHeader: FolderHeader;
  onPress: (taskListId: string) => void;
  onDrag: () => void;
};

export default function FolderHeaderItem({
  folderHeader,
  onPress,
  onDrag,
}: Props) {
  const {id} = folderHeader;

  const dispatch = useDispatch();

  const folderMap = useSelector(selectFolderMap);
  const {title} = folderMap[folderHeader.id];

  const [isExpanded, setIsExpanded] = useState(false);

  const onDeleteFolder = () => {
    dispatch(tasksActions.removeFolder(id));
  };

  const onToggleListItem = () => {
    setIsExpanded(!isExpanded);
  };

  const renderItem = ({item, drag: listDrag}: RenderItemParams<ListHeader>) => {
    return (
      <ScaleDecorator>
        <ListHeaderItem
          listHeader={item}
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
    <>
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
            data={folderHeader.lists}
            onDragEnd={({data}) => {
              console.log('FolderHeaderItem', data);
            }}
            keyExtractor={list => list.id}
            renderItem={renderItem}
            dragItemOverflow={false}
          />
        </View>
      )}
    </>
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
