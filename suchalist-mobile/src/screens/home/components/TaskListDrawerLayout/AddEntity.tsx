import Icon from '@react-native-vector-icons/ionicons';
import React, {useRef, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

export default function AddEntity() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState({top: 0, left: 0});
  const buttonRef = useRef<View>(null);

  const options = ['Option A', 'Option B'];
  const popupHeight = 100;

  const onSelect = (value: string) => {
    setSelected(value);
    setVisible(false);
  };

  const toggleOptions = () => {
    console.log('toggle');
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      console.log({x, y, width, height});
      let top = y - popupHeight;
      setPopupPos({top, left: x - width});
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
              left: popupPos.left,
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
