import SimpleModal from '@renderer/components/base/SimpleModal';
import TextInput from '@renderer/components/base/form/TextInput';
import useForm from '@renderer/hooks/useForm';
import * as z from 'zod';

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
    onAddList(data.title);
    setValue('title', '');
  };

  const onCloseModal = () => {
    onClose();
    setValue('title', '');
  };

  return (
    <SimpleModal
      title="Add a new list"
      isOpen={isOpen}
      isConfirmButtonDisabled={!isValid}
      Content={<TextInput name="title" label="List Title" control={control} />}
      onConfirm={handleSubmit(onConfirm)}
      onCancel={onCloseModal}
      onClose={onCloseModal}
    />
  );
}
