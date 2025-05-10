import AddFolderModal from '@/components/modal/AddFolderModal';
import AddListModal from '@/components/modal/AddListModal';
import {tasksActions} from '@/stores/tasks/tasks';
import Icon from '@react-native-vector-icons/ionicons';
import React, {useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

const BUTTON_RIGHT_OFFSET = 16;

export default function AddEntity() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAddListModalVisible, setIsAddListModalVisible] = useState(false);
  const [isAddFolderModalVisible, setIsAddFolderModalVisible] = useState(false);

  const [popupPos, setPopupPos] = useState({bottom: 0, right: 0});
  const buttonRef = useRef<View>(null);
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

  const onAddList = (title: string) => {
    dispatch(tasksActions.addList(title));
    toggleAddListModal();
  };

  const toggleAddListModal = () => {
    setIsMenuVisible(false);
    setIsAddListModalVisible(!isAddListModalVisible);
  };

  const onAddFolder = (title: string) => {
    dispatch(tasksActions.addFolder(title));
    toggleAddFolderModal();
  };

  const toggleAddFolderModal = () => {
    setIsMenuVisible(false);
    setIsAddFolderModalVisible(!isAddFolderModalVisible);
  };

  const toggleOptions = () => {
    console.log('toggle');
    buttonRef.current?.measureInWindow((x, y, width) => {
      console.log({x, y, width});
      console.log({screenHeight, screenWidth});
      console.log({insets});
      const bottom = screenHeight - y + 6;
      const right = BUTTON_RIGHT_OFFSET;

      setPopupPos({bottom, right});
      setIsMenuVisible(true);
    });
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <Pressable ref={buttonRef} style={styles.button} onPress={toggleOptions}>
        <Icon name="add-outline" size={24} color="#fff" />
      </Pressable>

      {isMenuVisible && (
        <>
          {/* Backdrop */}
          <Animated.View style={StyleSheet.absoluteFill}>
            <Pressable
              onPress={() => setIsMenuVisible(false)}
              style={styles.backdrop}
            />
          </Animated.View>

          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[
              styles.popup,
              {
                bottom: popupPos.bottom,
                right: popupPos.right,
              },
            ]}>
            <View>
              <Pressable style={styles.option} onPress={toggleAddListModal}>
                <Icon name="list-outline" />
                <Text>Add List</Text>
              </Pressable>
              <Pressable style={styles.option} onPress={toggleAddFolderModal}>
                <Icon name="folder-open-outline" />
                <Text>Add Folder</Text>
              </Pressable>
            </View>
          </Animated.View>
        </>
      )}

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
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: BUTTON_RIGHT_OFFSET,
    padding: 12,
    backgroundColor: '#0080ff',
    borderRadius: 8,
  },
  backdrop: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  popup: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
