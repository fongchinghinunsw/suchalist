import { Task } from '@common/types/task';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@renderer/components/base/Button';
import Text from '@renderer/components/base/Text';
import TextInput from '@renderer/components/base/TextInput';
import { selectTheme } from '@renderer/stores/theme';
import { getBorderColorClassName } from '@renderer/utils/styles/borderColor';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as z from 'zod';

const schema = z.object({
  title: z.string(),
  note: z.string().optional(),
  dueDate: z.date().optional()
});

type Schema = z.infer<typeof schema>;

type Props = {
  task: Task;
};

export default function TaskDetails({ task }: Props) {
  const theme = useSelector(selectTheme);

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid, isLoading }
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task.title,
      note: task.note,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined
    }
  });
  console.log('dueDate:', task.dueDate ? new Date(task.dueDate) : undefined);

  useEffect(() => {
    trigger(); // triggers all form validations when component is mounted
  }, [trigger]);

  // const onSaveTask = (data: Schema) => {
  //   const { title, note, dueDate } = data;
  //   dispatch(
  //     tasksActions.editTask({
  //       task,
  //       editTask: {
  //         title,
  //         note,
  //         dueDate: dueDate?.toISOString()
  //       }
  //     })
  //   );
  //   navigation.pop();
  // };

  const toggleDeleteTaskModal = () => {
    // setIsDeleteTaskModalVisible(!isDeleteTaskModalVisible);
  };

  const onDeleteTask = (deletingTask: Task) => {
    // dispatch(tasksActions.deleteTask({ task: deletingTask }));
    // setIsDeleteTaskModalVisible(false);
    // navigation.goBack();
  };

  const watchDueDateValue = watch('dueDate');
  console.log('watchDueDateValue', watchDueDateValue);

  const onDateTimePickerConfirm = (date: Date) => setValue('dueDate', date);

  const isSaveTaskButtonDisabled = !isValid || isLoading;

  return (
    <div
      className={clsx(
        'w-[40%] h-full border rounded-xl p-4 bg-white flex flex-col gap-4',
        getBorderColorClassName(theme, 400)
      )}
    >
      <Text size="large">{task.title}</Text>
      <div className="flex flex-col gap-3">
        <TextInput name="title" label="Title" control={control} />
        <TextInput name="note" label="Note" control={control} />
        {/* <DateTimePicker
          name="dueDate"
          label="Due Date"
          value={watchDueDateValue}
          control={control}
          onChange={onDateTimePickerConfirm}
        /> */}
      </div>
      <div className="flex gap-3">
        <Button mode="contained" disabled={isSaveTaskButtonDisabled} onClick={() => {}}>
          Save task
        </Button>
        <Button mode="contained" tone="danger" onClick={() => {}}>
          Delete task
        </Button>
      </div>
    </div>
  );
}
