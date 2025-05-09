import Icon from '@react-native-vector-icons/ionicons';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function AddEntity() {
  const [visible, setVisible] = useState(false);
  const [popupPos, setPopupPos] = useState({top: 0, right: 0});
  const buttonRef = useRef<View>(null);
  const {width: screenWidth} = Dimensions.get('window');

  const popupHeight = 100;

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

      <Modal transparent animationType="none" visible={visible}>
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
