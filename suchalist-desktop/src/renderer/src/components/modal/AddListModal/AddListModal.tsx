import useForm from '@renderer/hooks/useForm';
import * as z from 'zod';
import Modal from '../../base/Modal';
import Content from './Content';

const addListSchema = z.object({
  title: z.string().trim().min(1)
});

type AddListSchema = z.infer<typeof addListSchema>;

type Props = {
  isOpen: boolean;
  onAddList: (title: string) => void;
  onClose: () => void;
};

export default function AddListModal({ isOpen, onAddList, onClose }: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid }
  } = useForm<AddListSchema>({
    schema: addListSchema,
    defaultValues: {
      title: ''
    }
  });

  const onConfirm = (data: AddListSchema) => {
    console.log('onConfirm');
    onAddList(data.title);
    setValue('title', '');
  };

  const onCloseModal = () => {
    onClose();
    setValue('title', '');
  };

  return (
    <Modal
      title="Add a new list"
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
