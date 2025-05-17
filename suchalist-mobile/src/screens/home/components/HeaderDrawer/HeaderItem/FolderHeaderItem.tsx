import Text from '@/components/base/Text';
import AddListModal from '@/components/modal/AddListModal';
import DeleteFolderModal from '@/components/modal/DeleteFolderModal';
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

  const [isAddListModalVisible, setIsAddListModalVisible] = useState(false);
  const [isDeleteFolderModalVisible, setIsDeleteFolderModalVisible] =
    useState(false);

  const dispatch = useDispatch();

  const folderMap = useSelector(selectFolderMap);
  const folder = folderMap[folderHeader.id];

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAddListModal = () => {
    setIsAddListModalVisible(!isAddListModalVisible);
  };

  const toggleDeleteFolderModal = () => {
    setIsDeleteFolderModalVisible(!isDeleteFolderModalVisible);
  };

  const onAddList = (title: string) => {
    dispatch(tasksActions.addList({title, folderId: folderHeader.id}));
    toggleAddListModal();
  };

  const onDeleteFolder = () => {
    dispatch(tasksActions.deleteFolder(id));
  };

  const onToggleListItem = () => {
    setIsExpanded(!isExpanded);
  };

  const renderItem = ({item, drag: listDrag}: RenderItemParams<ListHeader>) => {
    return (
      <ScaleDecorator>
        <ListHeaderItem
          listHeader={item}
          isDeletableList={false}
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
          <Text size="large">{folder.title}</Text>
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
              <MenuOption
                style={styles.menuOption}
                onSelect={toggleAddListModal}>
                <Icon name="list-outline" size={16} />
                <Text>Add List</Text>
              </MenuOption>
              <MenuOption
                style={styles.menuOption}
                onSelect={toggleDeleteFolderModal}>
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
            onDragEnd={({from, to}) => {
              dispatch(
                tasksActions.reorderListsWithinFolder({
                  folderHeaderId: id,
                  from,
                  to,
                }),
              );
            }}
            keyExtractor={list => list.id}
            renderItem={renderItem}
            dragItemOverflow={false}
          />
        </View>
      )}
      <AddListModal
        isVisible={isAddListModalVisible}
        onAddList={onAddList}
        onCancel={toggleAddListModal}
      />
      <DeleteFolderModal
        folderName={folder.title}
        isVisible={isDeleteFolderModalVisible}
        onConfirm={onDeleteFolder}
        onCancel={toggleDeleteFolderModal}
      />
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
