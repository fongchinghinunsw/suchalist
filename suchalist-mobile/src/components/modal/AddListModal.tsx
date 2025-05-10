import Modal from '../base/Modal';

type Props = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AddListModal({isVisible, onConfirm, onCancel}: Props) {
  return (
    <Modal
      title="Add a new list"
      description="Hahaha"
      isVisible={isVisible}
      primaryButton={{
        label: 'Add List',
        onClick: onConfirm,
      }}
      secondaryButton={{
        label: 'Cancel',
        onClick: onCancel,
      }}
      onDismiss={onCancel}
    />
  );
}
