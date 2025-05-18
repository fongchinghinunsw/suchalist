import useForm from '@/hooks/useForm';
import * as z from 'zod';
import TextInput from '../base/form/TextInput';
import Modal from '../base/Modal';

export const addListSchema = z.object({
  title: z.string().trim().min(1),
});

export type AddListSchema = z.infer<typeof addListSchema>;

type Props = {
  isVisible: boolean;
  onAddList: (title: string) => void;
  onCancel: () => void;
};

export default function AddListModal({isVisible, onAddList, onCancel}: Props) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {isValid},
  } = useForm<AddListSchema>({
    schema: addListSchema,
    defaultValues: {
      title: '',
    },
  });

  const onConfirm = (data: AddListSchema) => {
    onAddList(data.title);
    setValue('title', '');
  };

  return (
    <Modal
      title="Add a new list"
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
        label: 'Add List',
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
