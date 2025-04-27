import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React from 'react';
import {Keyboard, View} from 'react-native';

import Button from '../../../../components/base/Button';
import Text from '../../../../components/base/Text';
import DropdownInput from '../../../../components/base/form/DropdownInput';
import TextInput from '../../../../components/base/form/TextInput';
import useForm from '../../../../hooks/useForm';
import {getTaskId, Task} from '../../../../stores/tasks';
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
      datetime: defaultDate ?? new Date(),
      recurrenceType: '',
    },
  });

  const selectedDatetime = watch('datetime');

  const onShowDatePicker = () => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: watch('datetime') ?? new Date(),
      onChange: (_, date?: Date) => {
        if (date) {
          setValue('datetime', date);
        }
      },
    });
  };

  const onDismissDatePicker = () => {
    DateTimePickerAndroid.dismiss('date');
  };

  const onShowTimePicker = () => {
    DateTimePickerAndroid.open({
      mode: 'time',
      value: watch('datetime') ?? new Date(),
      onChange: (_, date?: Date) => {
        if (date) {
          setValue('datetime', date);
        }
      },
    });
  };

  const onDismissTimePicker = () => {
    DateTimePickerAndroid.dismiss('time');
  };

  const closeForm = () => {
    Keyboard.dismiss();
    onDismissDatePicker();
    onDismissTimePicker();
    onClose();
  };

  const onSubmit = (data: AddTaskFormSchema) => {
    const {title, datetime, recurrenceType} = data;

    const newTaskId = getTaskId(title);
    const newTask: Task = {
      id: newTaskId,
      title,
      date: datetime.toISOString(),
      isCompleted: false,
      recurrence: recurrenceType
        ? {
            type: recurrenceType,
            originalParentId: newTaskId,
          }
        : undefined,
    };
    console.log({newTask});
    // onAddTask(newTask);
    // closeForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Task</Text>
      <TextInput name="title" label="Title" control={control} />

      <TextInput
        name="datetime"
        label="Date"
        editable={false}
        control={control}
        onPress={onShowDatePicker}
        value={selectedDatetime.toLocaleDateString()}
      />
      <TextInput
        name="datetime"
        label="Time"
        editable={false}
        control={control}
        onPress={onShowTimePicker}
        value={selectedDatetime.toLocaleTimeString()}
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
