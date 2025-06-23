import SimpleModal from '@renderer/components/base/SimpleModal';

type Props = {
  folderName: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteListModal({ folderName, isOpen, onConfirm, onCancel }: Props) {
  return (
    <SimpleModal
      title={`${folderName} will be deleted forever.`}
      isOpen={isOpen}
      Content={<div>You will not be able to undo this action.</div>}
      onConfirm={onConfirm}
      onCancel={onCancel}
      onClose={onCancel}
    />
  );
}
