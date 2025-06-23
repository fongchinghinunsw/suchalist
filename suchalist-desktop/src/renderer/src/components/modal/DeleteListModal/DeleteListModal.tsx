import SimpleModal from '@renderer/components/base/SimpleModal';

type Props = {
  listName: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteListModal({ listName, isOpen, onConfirm, onCancel }: Props) {
  return (
    <SimpleModal
      title={`${listName} will be deleted forever.`}
      isOpen={isOpen}
      Content={<div>You will not be able to undo this action.</div>}
      onConfirm={onConfirm}
      onCancel={onCancel}
      onClose={onCancel}
    />
  );
}
