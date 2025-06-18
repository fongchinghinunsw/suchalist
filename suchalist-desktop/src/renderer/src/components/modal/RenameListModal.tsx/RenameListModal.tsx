import useForm from '@renderer/hooks/useForm';
import * as z from 'zod';
import Modal from '../../base/Modal';
import Content from './Content';

const renameListSchema = z.object({
  title: z.string().trim().min(1)
});

type RenameListSchema = z.infer<typeof renameListSchema>;

type Props = {
  defaultTitle: string;
  isOpen: boolean;
  onRenameList: (newTitle: string) => void;
  onClose: () => void;
};

export default function RenameListModal({ defaultTitle, isOpen, onRenameList, onClose }: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid }
  } = useForm<RenameListSchema>({
    schema: renameListSchema,
    defaultValues: {
      title: defaultTitle
    }
  });

  const onConfirm = (data: RenameListSchema) => {
    onRenameList(data.title);
    setValue('title', '');
  };

  const onCloseModal = () => {
    onClose();
    setValue('title', '');
  };

  return (
    <Modal
      title="Rename the list"
      isOpen={isOpen}
      Content={
        <Content
          isConfirmDisabled={!isValid}
          control={control}
          onConfirm={handleSubmit(onConfirm)}
          onCancel={onCloseModal}
        />
      }
      onClose={onCloseModal}
    />
  );
}
