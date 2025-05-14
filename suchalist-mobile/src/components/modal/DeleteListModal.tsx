import {StyleSheet} from 'react-native';
import Modal from '../base/Modal';

type Props = {
  listName: string;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteListModal({
  listName,
  isVisible,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      title={`${listName} will be deleted forever.`}
      content="You will not be able to undo this action."
      isVisible={isVisible}
      primaryButton={{
        label: 'Delete List',
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
