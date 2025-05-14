import {getColor} from '@/constants/styles';
import {selectTheme} from '@/stores/theme';
import Icon from '@react-native-vector-icons/ionicons';
import React, {RefObject, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import AddFolderModal from '@/components/modal/AddFolderModal';
import AddListModal from '@/components/modal/AddListModal';
import {selectHeaders, tasksActions} from '@/stores/tasks/tasks';
import {DrawerLayoutMethods} from 'react-native-gesture-handler/ReanimatedDrawerLayout';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import HeaderList from './HeaderList';

const ADD_BUTTON_RIGHT_OFFSET = 16;

export const Content = ({
  drawerRef,
}: {
  drawerRef: RefObject<DrawerLayoutMethods | null>;
}) => {
  const theme = useSelector(selectTheme);
  const headers = useSelector(selectHeaders);

  console.log('Content', headers);

  const dispatch = useDispatch();

  const [isAddListModalVisible, setIsAddListModalVisible] = useState(false);
  const [isAddFolderModalVisible, setIsAddFolderModalVisible] = useState(false);

  const onPress = (taskListId: string) => {
    dispatch(tasksActions.setCurrentTaskListId(taskListId));
    drawerRef.current?.closeDrawer();
  };

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => drawerRef.current?.openDrawer());

  const onAddFolder = (title: string) => {
    dispatch(tasksActions.addFolder(title));
    toggleAddFolderModal();
  };

  const onAddList = (title: string) => {
    dispatch(tasksActions.addList({title}));
    toggleAddListModal();
  };

  const toggleAddListModal = () => {
    setIsAddListModalVisible(!isAddListModalVisible);
  };

  const toggleAddFolderModal = () => {
    setIsAddFolderModalVisible(!isAddFolderModalVisible);
  };

  return (
    <View style={styles.drawerContainer}>
      <HeaderList headers={headers} onPress={onPress} />
      <GestureDetector gesture={tapGesture}>
        <View style={styles.dragButton}>
          <Icon name="chevron-forward-outline" color={getColor(theme, 400)} />
        </View>
      </GestureDetector>
      <Menu style={styles.addMenu}>
        <MenuTrigger>
          <Icon name="add-outline" size={24} color="#fff" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              padding: 8,
              borderRadius: 10,
            },
          }}>
          <MenuOption style={styles.menuOption} onSelect={toggleAddListModal}>
            <Icon name="list-outline" size={16} />
            <Text>Add List</Text>
          </MenuOption>
          <MenuOption style={styles.menuOption} onSelect={toggleAddFolderModal}>
            <Icon name="folder-open-outline" size={16} />
            <Text>Add Folder</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>

      <AddListModal
        isVisible={isAddListModalVisible}
        onAddList={onAddList}
        onCancel={toggleAddListModal}
      />

      <AddFolderModal
        isVisible={isAddFolderModalVisible}
        onAddFolder={onAddFolder}
        onCancel={toggleAddFolderModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#FFF',
    height: '100%',
  },
  dragButton: {
    position: 'absolute',
    top: '45%',
    right: -18,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#FFF',
  },
  addMenu: {
    position: 'absolute',
    bottom: 24,
    right: ADD_BUTTON_RIGHT_OFFSET,
    padding: 12,
    backgroundColor: '#0080ff',
    borderRadius: 8,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
