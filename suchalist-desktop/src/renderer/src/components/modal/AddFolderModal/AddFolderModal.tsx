import TextInput from '@renderer/components/base/form/TextInput';
import SimpleModal from '@renderer/components/base/SimpleModal';
import useForm from '@renderer/hooks/useForm';
import * as z from 'zod';

const addFolderSchema = z.object({
  title: z.string().trim().min(1)
});

type AddFolderSchema = z.infer<typeof addFolderSchema>;

type Props = {
  isOpen: boolean;
  onAddFolder: (title: string) => void;
  onClose: () => void;
};

export default function AddFolderModal({ isOpen, onAddFolder, onClose }: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid }
  } = useForm<AddFolderSchema>({
    schema: addFolderSchema,
    defaultValues: {
      title: ''
    }
  });

  const onConfirm = (data: AddFolderSchema) => {
    onAddFolder(data.title);
    setValue('title', '');
  };

  const onCloseModal = () => {
    onClose();
    setValue('title', '');
  };

  return (
    <SimpleModal
      title="Add a new folder"
      isOpen={isOpen}
      isConfirmButtonDisabled={!isValid}
      Content={<TextInput name="title" label="Folder Title" control={control} />}
      onConfirm={handleSubmit(onConfirm)}
      onCancel={onCloseModal}
      onClose={onCloseModal}
    />
  );
}
