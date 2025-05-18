import useForm from '@/hooks/useForm';
import * as z from 'zod';
import TextInput from '../base/form/TextInput';
import Modal from '../base/Modal';

export const renameListSchema = z.object({
  title: z.string().trim().min(1),
});

export type RenameListSchema = z.infer<typeof renameListSchema>;

type Props = {
  defaultTitle: string;
  isVisible: boolean;
  onRenameList: (newTitle: string) => void;
  onCancel: () => void;
};

export default function RenameListModal({
  defaultTitle,
  isVisible,
  onRenameList,
  onCancel,
}: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {isValid},
  } = useForm<RenameListSchema>({
    schema: renameListSchema,
    defaultValues: {
      title: defaultTitle,
    },
  });

  const onConfirm = (data: RenameListSchema) => {
    onRenameList(data.title);
    setValue('title', '');
  };

  return (
    <Modal
      title="Rename the list"
      content={
        <TextInput
          name="title"
          label="List Title"
          mode="outlined"
          autoCapitalize="none"
          control={control}
        />
      }
      isVisible={isVisible}
      primaryButton={{
        label: 'Rename List',
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
