import useForm from '@/hooks/useForm';
import * as z from 'zod';
import TextInput from '../base/form/TextInput';
import Modal from '../base/Modal';

export const addFolderSchema = z.object({
  title: z.string().min(1),
});

export type AddFolderSchema = z.infer<typeof addFolderSchema>;

type Props = {
  isVisible: boolean;
  onAddFolder: (title: string) => void;
  onCancel: () => void;
};

export default function AddListModal({
  isVisible,
  onAddFolder,
  onCancel,
}: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {isValid},
  } = useForm<AddFolderSchema>({
    schema: addFolderSchema,
    defaultValues: {
      title: '',
    },
  });

  const onConfirm = (data: AddFolderSchema) => {
    onAddFolder(data.title);
    setValue('title', '');
  };

  return (
    <Modal
      title="Add a new folder"
      content={
        <TextInput
          name="title"
          label="Folder Title"
          mode="outlined"
          autoCapitalize="none"
          control={control}
        />
      }
      isVisible={isVisible}
      primaryButton={{
        label: 'Add Folder',
        disabled: !isValid,
        onClick: handleSubmit(onConfirm),
      }}
      secondaryButton={{
        label: 'Cancel',
        onClick: onCancel,
      }}
      onDismiss={onCancel}
    />
  );
}
