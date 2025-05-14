import {StyleSheet} from 'react-native';
import Modal from '../base/Modal';

type Props = {
  folderName: string;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteListModal({
  folderName,
  isVisible,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      title={`${folderName} will be deleted forever.`}
      content="You will not be able to undo this action."
      isVisible={isVisible}
      primaryButton={{
        label: 'Delete Folder',
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
