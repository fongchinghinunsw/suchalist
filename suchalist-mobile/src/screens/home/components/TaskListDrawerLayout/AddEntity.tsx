import {tasksActions} from '@/stores/tasks/tasks';
import Icon from '@react-native-vector-icons/ionicons';
import React, {useRef, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';

export default function AddEntity() {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [popupPos, setPopupPos] = useState({top: 0, right: 0});
  const buttonRef = useRef<View>(null);
  const {width: screenWidth} = Dimensions.get('window');

  const popupHeight = 100;

  const onAddList = () => {
    dispatch(tasksActions.addList('list1'));
  };

  const onAddFolder = () => {
    dispatch(tasksActions.addList('folder1'));
  };

  const toggleOptions = () => {
    console.log('toggle');
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      console.log({x, y, width, height});
      let top = y - popupHeight;
      setPopupPos({top, right: screenWidth - x - width});
      setVisible(true);
    });
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <Pressable ref={buttonRef} style={styles.button} onPress={toggleOptions}>
        <Icon name="add-outline" size={24} color="#fff" />
      </Pressable>

      <Modal
        isVisible={visible}
        backdropColor="transparent"
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={toggleOptions}>
        <View
          style={[
            styles.popup,
            {
              top: popupPos.top,
              right: popupPos.right,
            },
          ]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 32,
    right: 32,
    position: 'absolute',
  },
  button: {
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
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
