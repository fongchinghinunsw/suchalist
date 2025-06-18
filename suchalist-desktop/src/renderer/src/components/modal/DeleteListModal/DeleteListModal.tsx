import Modal from '../../base/Modal';
import Content from './Content';

type Props = {
  listName: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteListModal({ listName, isOpen, onConfirm, onCancel }: Props) {
  return (
    <Modal
      title={`${listName} will be deleted forever`}
      isOpen={isOpen}
      Content={<Content onConfirm={onConfirm} onCancel={onCancel} />}
      onClose={onCancel}
    />
  );
}
