import useForm from '@/hooks/useForm';
import * as z from 'zod';
import TextInput from '../base/form/TextInput';
import Modal from '../base/Modal';

export const renameFolderSchema = z.object({
  title: z.string().trim().min(1),
});

export type RenameFolderSchema = z.infer<typeof renameFolderSchema>;

type Props = {
  defaultTitle: string;
  isVisible: boolean;
  onRenameFolder: (newTitle: string) => void;
  onCancel: () => void;
};

export default function RenameFolderModal({
  defaultTitle,
  isVisible,
  onRenameFolder,
  onCancel,
}: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {isValid},
  } = useForm<RenameFolderSchema>({
    schema: renameFolderSchema,
    defaultValues: {
      title: defaultTitle,
    },
  });

  const onConfirm = (data: RenameFolderSchema) => {
    onRenameFolder(data.title);
    setValue('title', '');
  };

  return (
    <Modal
      title="Rename the folder"
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
        label: 'Rename Folder',
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
