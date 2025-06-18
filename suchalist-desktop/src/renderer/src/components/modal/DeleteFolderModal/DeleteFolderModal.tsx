import Modal from '../../base/Modal';
import Content from './Content';

type Props = {
  folderName: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteListModal({ folderName, isOpen, onConfirm, onCancel }: Props) {
  return (
    <Modal
      title={`${folderName} will be deleted forever.`}
      isOpen={isOpen}
      Content={<Content onConfirm={onConfirm} onCancel={onCancel} />}
      onClose={onCancel}
    />
  );
}
