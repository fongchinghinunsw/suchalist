import { useClose } from '@headlessui/react';
import Button from './Button';
import Modal, { ModalProps } from './Modal';

type Props = Omit<ModalProps, 'Footer'> & FooterProps;

export default function SimpleModal({
  isConfirmButtonDisabled = false,
  onConfirm,
  onCancel,
  ...modalProps
}: Props) {
  return (
    <Modal
      {...modalProps}
      Content={<div className="pt-4">{modalProps.Content}</div>}
      Footer={
        <Footer
          isConfirmButtonDisabled={isConfirmButtonDisabled}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      }
    />
  );
}

type FooterProps = {
  isConfirmButtonDisabled?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function Footer({ isConfirmButtonDisabled = false, onConfirm, onCancel }: FooterProps) {
  const closeDialog = useClose();

  const onConfirmButtonClick = () => {
    onConfirm();
    closeDialog();
  };

  const onCancelButtonClick = () => {
    onCancel();
    closeDialog();
  };

  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button mode="outlined" tone="neutral" onClick={onCancelButtonClick}>
        Cancel
      </Button>
      <Button mode="contained" disabled={isConfirmButtonDisabled} onClick={onConfirmButtonClick}>
        Confirm
      </Button>
    </div>
  );
}
