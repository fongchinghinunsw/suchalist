import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Text from '../base/Text';
import Button from '../base/Button';

type Props = {
  taskName: string;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteTaskModal({
  taskName,
  isVisible,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text size="large" style={styles.title}>
            "{taskName}" will be deleted forever.
          </Text>
          <Text style={styles.description}>
            You will not be able to undo this action.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button
            mode="contained"
            style={styles.deleteButton}
            onPress={onConfirm}>
            Delete Task
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '30%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  textContainer: {
    gap: 20,
    flex: 1,
  },
  title: {
    color: '#000',
    fontWeight: 800,
  },
  description: {
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  deleteButton: {
    backgroundColor: '#F00',
  },
});
