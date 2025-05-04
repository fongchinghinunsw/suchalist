import React from 'react';
import {Keyboard, View} from 'react-native';

import Button from '@/components/base/Button';
import Text from '@/components/base/Text';
import TextInput from '@/components/base/form/TextInput';
import DateTimePicker from '@/components/task/DateTimePicker/DateTimePicker';
import useForm from '@/hooks/useForm';
import {
  AddTaskFormProps,
  AddTaskFormSchema,
  addTaskFormSchema,
  styles,
} from './common';

export default function AddTaskForm({
  defaultDate,
  onAddTask,
  onClose,
}: AddTaskFormProps) {
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: {isValid},
  } = useForm<AddTaskFormSchema>({
    schema: addTaskFormSchema,
    defaultValues: {
      dueDate: defaultDate ?? new Date(),
      // recurrenceType: '',
    },
  });

  const watchDueDateValue = watch('dueDate');

  const onDateTimePickerConfirm = (date: Date) => setValue('dueDate', date);

  const onSubmit = (data: AddTaskFormSchema) => {
    const {title, dueDate} = data;

    onAddTask({
      title,
      dueDate: dueDate.toISOString(),
      // recurrence: recurrenceType
      //   ? {
      //       type: recurrenceType,
      //     }
      //   : undefined,
    });
    Keyboard.dismiss();
    onClose();
  };

  const mode = 'date';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Task</Text>
      <TextInput name="title" label="Title" control={control} />
      <DateTimePicker
        name="dueDate"
        value={watchDueDateValue}
        androidOptions={{
          mode,
        }}
        iosOptions={{
          mode,
          display: 'inline',
        }}
        control={control}
        onConfirm={onDateTimePickerConfirm}
      />
      {/* <DropdownInput
        name="recurrenceType"
        label="Repeat"
        placeholder="Repeat"
        control={control}
        options={RECURRENCE_OPTIONS}
      /> */}
      <Button
        mode="contained"
        disabled={!isValid}
        style={styles.addTaskButton}
        onPress={handleSubmit(onSubmit)}>
        Add Task
      </Button>
    </View>
  );
}
