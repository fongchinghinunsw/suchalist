import Text from '@/components/base/Text';
import DeleteListModal from '@/components/modal/DeleteListModal';
import {selectListMap, tasksActions} from '@/stores/tasks/tasks';
import Icon from '@react-native-vector-icons/ionicons';
import {ComponentProps, useState} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {ListHeader} from '../types';
import BaseHeaderItem from './BaseHeaderItem';
import RenameListModal from '@/components/modal/RenameListModal';

type Option = {
  title: string;
  icon: {
    name: ComponentProps<typeof Icon>['name'];
    color?: ComponentProps<typeof Icon>['color'];
    size: number;
  };
  onSelect: () => void;
  style?: StyleProp<ViewStyle>;
};

type Props = {
  listHeader: ListHeader;
  hasOptions: boolean;
  icon?: {
    name?: ComponentProps<typeof Icon>['name'];
  };
  onPress: (taskListId: string) => void;
  onDrag?: () => void;
};

export default function ListHeaderItem({
  listHeader: {id},
  hasOptions,
  icon = {},
  onPress,
  onDrag,
}: Props) {
  const dispatch = useDispatch();

  const listMap = useSelector(selectListMap);
  const list = listMap[id];

  const [isRenameListModalVisible, setIsRenameListModalVisible] =
    useState(false);
  const [isDeleteListModalVisible, setIsDeleteListModalVisible] =
    useState(false);

  const toggleRenameListModal = () => {
    setIsRenameListModalVisible(!isRenameListModalVisible);
  };

  const toggleDeleteListModal = () => {
    setIsDeleteListModalVisible(!isDeleteListModalVisible);
  };

  const onRenameList = (newTitle: string) => {
    dispatch(tasksActions.renameList({list, newTitle}));
    toggleRenameListModal();
  };

  const onDeleteList = () => {
    dispatch(tasksActions.deleteList(id));
  };

  const menuOptions: Option[] = [];
  if (hasOptions) {
    menuOptions.push({
      title: 'Rename List',
      icon: {
        name: 'create-outline',
        size: 16,
      },
      onSelect: toggleRenameListModal,
      style: styles.menuOption,
    });

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
      <BaseHeaderItem
        icon={{name: icon.name ?? 'list-outline'}}
        title={list.title}
        rightSection={
          menuOptions.length > 0 && (
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
          )
        }
        onPress={() => onPress(id)}
        onLongPress={onDrag}
      />
      <RenameListModal
        defaultTitle={list.title}
        isVisible={isRenameListModalVisible}
        onRenameList={onRenameList}
        onCancel={toggleRenameListModal}
      />
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
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
