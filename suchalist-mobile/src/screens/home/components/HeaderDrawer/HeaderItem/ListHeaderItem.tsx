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
import {ListHeader} from '../types';
import DeleteListModal from '@/components/modal/DeleteListModal';
import {useState} from 'react';

type Props = {
  listHeader: ListHeader;
  onPress: (taskListId: string) => void;
  onDrag?: () => void;
};

export default function ListHeaderItem({
  listHeader: {id},
  onPress,
  onDrag,
}: Props) {
  const dispatch = useDispatch();

  const listMap = useSelector(selectListMap);
  const list = listMap[id];

  const [isDeleteListModalVisible, setIsDeleteListModalVisible] =
    useState(false);

  const toggleDeleteListModal = () => {
    setIsDeleteListModalVisible(!isDeleteListModalVisible);
  };

  const onDeleteList = () => {
    dispatch(tasksActions.deleteList(id));
  };

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => onPress(id)}
        onLongPress={onDrag}
        delayLongPress={250}>
        <View style={styles.title}>
          <Icon name="list-outline" size={16} />
          <Text size="large">{list.title}</Text>
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
            <MenuOption
              style={styles.menuOption}
              onSelect={toggleDeleteListModal}>
              <Icon name="trash-outline" color="red" size={16} />
              <Text>Delete List</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </Pressable>
      <DeleteListModal
        listName={list.title}
        isVisible={isDeleteListModalVisible}
        onConfirm={onDeleteList}
        onCancel={toggleDeleteListModal}
      />
    </>
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
