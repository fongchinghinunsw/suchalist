import React from 'react';
import {Keyboard, View} from 'react-native';

import Button from '@/components/base/Button';
import Text from '@/components/base/Text';
import DropdownInput from '@/components/base/form/DropdownInput';
import Switch from '@/components/base/form/Switch';
import TextInput from '@/components/base/form/TextInput';
import DateTimePicker from '@/components/task/DateTimePicker/DateTimePicker';
import useForm from '@/hooks/useForm';
import {getTaskId, Task} from '@/stores/tasks';
import {
  AddTaskFormProps,
  AddTaskFormSchema,
  addTaskFormSchema,
  RECURRENCE_OPTIONS,
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
      isAllDay: true,
      datetime: defaultDate ?? new Date(),
      recurrenceType: '',
    },
  });

  const selectedDatetimeValue = watch('datetime');
  const isAllDayValue = watch('isAllDay');

  const onDateTimePickerConfirm = (date: Date) => setValue('datetime', date);

  const onSubmit = (data: AddTaskFormSchema) => {
    const {title, datetime, isAllDay, recurrenceType} = data;

    if (isAllDay) {
      datetime.setHours(0, 0, 0, 0);
    }

    const newTaskId = getTaskId(title);
    const newTask: Task = {
      id: newTaskId,
      title,
      date: datetime.toISOString(),
      isAllDay,
      isCompleted: false,
      recurrence: recurrenceType
        ? {
            type: recurrenceType,
            originalParentId: newTaskId,
          }
        : undefined,
    };

    onAddTask(newTask);
    Keyboard.dismiss();
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Task</Text>
      <TextInput name="title" label="Title" control={control} />
      <Switch name="isAllDay" label="All-day" control={control} />
      <DateTimePicker
        name="datetime"
        value={selectedDatetimeValue}
        androidOptions={{
          mode: isAllDayValue ? 'date' : 'datetime',
        }}
        iosOptions={{
          mode: 'datetime',
          display: 'inline',
        }}
        control={control}
        onConfirm={onDateTimePickerConfirm}
      />
      <DropdownInput
        name="recurrenceType"
        label="Repeat"
        placeholder="Repeat"
        control={control}
        options={RECURRENCE_OPTIONS}
      />
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
