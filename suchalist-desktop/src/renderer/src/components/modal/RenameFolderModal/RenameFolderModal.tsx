import SimpleModal from '@renderer/components/base/SimpleModal';
import TextInput from '@renderer/components/base/form/TextInput';
import useForm from '@renderer/hooks/useForm';
import * as z from 'zod';

const renameFolderSchema = z.object({
  title: z.string().trim().min(1)
});

type RenameFolderSchema = z.infer<typeof renameFolderSchema>;

type Props = {
  defaultTitle: string;
  isOpen: boolean;
  onRenameFolder: (newTitle: string) => void;
  onClose: () => void;
};

export default function RenameFolderModal({
  defaultTitle,
  isOpen,
  onRenameFolder,
  onClose
}: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid }
  } = useForm<RenameFolderSchema>({
    schema: renameFolderSchema,
    defaultValues: {
      title: defaultTitle
    }
  });

  const onConfirm = (data: RenameFolderSchema) => {
    onRenameFolder(data.title);
    setValue('title', '');
  };

  const onCloseModal = () => {
    onClose();
    setValue('title', '');
  };

  return (
    <SimpleModal
      title="Rename the list"
      isOpen={isOpen}
      isConfirmButtonDisabled={!isValid}
      Content={<TextInput name="title" label="List Title" control={control} />}
      onConfirm={handleSubmit(onConfirm)}
      onCancel={onCloseModal}
      onClose={onCloseModal}
    />
  );
}
