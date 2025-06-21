import { useClose } from '@headlessui/react';
import Button from '@renderer/components/base/Button';
import TextInput from '@renderer/components/base/form/TextInput';
import { HookFormFieldProps } from '@renderer/hooks/useForm';

interface Props extends HookFormFieldProps {
  isConfirmDisabled: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Content({
  control,
  isConfirmDisabled,
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
      <TextInput name="title" label="List Title" control={control} />
      <div className="flex justify-end gap-2 mt-4">
        <Button mode="outlined" tone="neutral" onClick={onCancel}>
          Cancel
        </Button>
        <Button mode="contained" disabled={isConfirmDisabled} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
