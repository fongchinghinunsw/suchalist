import Text from '@/components/base/Text';
import Icon from '@react-native-vector-icons/ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
import {FolderHeader, ListHeader} from '../types';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {tasksActions} from '@/stores/tasks/tasks';
import {useDispatch} from 'react-redux';

type Props = {
  listHeader: ListHeader;
  folderHeader?: FolderHeader;
  onPress: (taskListId: string) => void;
  onDrag: () => void;
};

export default function ListHeaderItem({
  listHeader: {id, title},
  folderHeader,
  onPress,
  onDrag,
}: Props) {
  const dispatch = useDispatch();

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
