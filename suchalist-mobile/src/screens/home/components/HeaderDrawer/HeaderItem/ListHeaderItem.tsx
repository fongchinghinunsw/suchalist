import Text from '@/components/base/Text';
import {selectListMap, tasksActions} from '@/stores/tasks/tasks';
import Icon from '@react-native-vector-icons/ionicons';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {ListHeader} from '../types';
import DeleteListModal from '@/components/modal/DeleteListModal';
import {ComponentProps, useState} from 'react';

type Option = {
  title: string;
  icon: {
    name: ComponentProps<typeof Icon>['name'];
    color: string;
    size: number;
  };
  onSelect: () => void;
  style?: StyleProp<ViewStyle>;
};

type Props = {
  listHeader: ListHeader;
  isDeletableList: boolean;
  onPress: (taskListId: string) => void;
  onDrag?: () => void;
};

export default function ListHeaderItem({
  listHeader: {id},
  isDeletableList,
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

  const menuOptions: Option[] = [];
  if (isDeletableList) {
    menuOptions.push({
      title: 'Delete List',
      icon: {
        name: 'trash-outline',
        color: 'red',
        size: 16,
      },
      onSelect: toggleDeleteListModal,
      style: styles.menuOption,
    });
  }

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
        {menuOptions.length > 0 && (
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
              {menuOptions.map(option => (
                <MenuOption
                  key={option.title}
                  style={option.style}
                  onSelect={option.onSelect}>
                  <Icon
                    name={option.icon.name}
                    color={option.icon.color}
                    size={option.icon.size}
                  />
                  <Text>{option.title}</Text>
                </MenuOption>
              ))}
            </MenuOptions>
          </Menu>
        )}
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
