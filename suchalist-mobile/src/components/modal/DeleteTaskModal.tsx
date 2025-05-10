import {StyleSheet} from 'react-native';
import Modal from '../base/Modal';

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
    <Modal
      title={`${taskName} will be deleted forever.`}
      description="You will not be able to undo this action."
      isVisible={isVisible}
      primaryButton={{
        label: 'Delete Task',
        onClick: onConfirm,
        style: styles.deleteButton,
      }}
      secondaryButton={{
        label: 'Cancel',
        onClick: onCancel,
      }}
      onDismiss={onCancel}
    />
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: '#F00',
  },
});
