import Text from '@/components/base/Text';
import {selectListMap, tasksActions} from '@/stores/tasks/tasks';
import Icon from '@react-native-vector-icons/ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {FolderHeader, ListHeader} from '../types';

type Props = {
  listHeader: ListHeader;
  folderHeader?: FolderHeader;
  onPress: (taskListId: string) => void;
  onDrag: () => void;
};

export default function ListHeaderItem({
  listHeader: {id},
  folderHeader,
  onPress,
  onDrag,
}: Props) {
  const dispatch = useDispatch();

  const listMap = useSelector(selectListMap);
  const {title} = listMap[id];

  const onDeleteList = () => {
    dispatch(tasksActions.removeList({listId: id, folderId: folderHeader?.id}));
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress(id)}
      onLongPress={onDrag}
      delayLongPress={250}>
      <View style={styles.title}>
        <Icon name="list-outline" size={16} />
        <Text size="large">{title}</Text>
      </View>
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
          <MenuOption style={styles.menuOption} onSelect={onDeleteList}>
            <Icon name="trash-outline" color="red" size={16} />
            <Text>Delete List</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
