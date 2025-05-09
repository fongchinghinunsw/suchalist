import {tasksActions} from '@/stores/tasks/tasks';
import Icon from '@react-native-vector-icons/ionicons';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

export default function AddEntity() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);
  const [popupPos, setPopupPos] = useState({bottom: 0, right: 0});
  const buttonRef = useRef<View>(null);
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

  const popupHeight = 100;

  const onAddList = () => {
    dispatch(tasksActions.addList('list1'));
  };

  const onAddFolder = () => {
    dispatch(tasksActions.addList('folder1'));
  };

  const toggleOptions = () => {
    console.log('toggle');
    buttonRef.current?.measureInWindow((x, y, width) => {
      const bottom = screenHeight - y + 6;
      const right = screenWidth - x - width;
      console.log({insets});

      setPopupPos({bottom, right});
      setVisible(true);
    });
    setVisible(!visible);
  };

  return (
    <>
      <Pressable ref={buttonRef} style={styles.button} onPress={toggleOptions}>
        <Icon name="add-outline" size={24} color="#fff" />
      </Pressable>

      <Modal
        isVisible={visible}
        backdropColor="transparent"
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={[
          styles.popup,
          {
            bottom: popupPos.bottom,
            right: popupPos.right,
          },
        ]}
        onBackdropPress={toggleOptions}>
        <View>
          <Pressable style={styles.option}>
            <Icon name="list-outline" />
            <Text>Add List</Text>
          </Pressable>
          <Pressable style={styles.option}>
            <Icon name="folder-open-outline" />
            <Text>Add Folder</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    padding: 12,
    backgroundColor: '#0080ff',
    borderRadius: 8,
  },
  popup: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 8,
    margin: 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
