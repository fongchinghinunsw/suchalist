import { useClose } from '@headlessui/react';
import Button from '@renderer/components/base/Button';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Content({
  onConfirm: onConfirmCallback,
  onCancel: onCancelCallback
}: Props) {
  const closeDialog = useClose();

  const onConfirm = () => {
    onConfirmCallback();
    closeDialog();
  };

  const onCancel = () => {
    onCancelCallback();
    closeDialog();
  };

  return (
    <div className="pt-4">
      <div>You will not be able to undo this action.</div>
      <div className="flex justify-end gap-2 mt-4">
        <Button mode="outlined" tone="neutral" onClick={onCancel}>
          Cancel
        </Button>
        <Button mode="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
