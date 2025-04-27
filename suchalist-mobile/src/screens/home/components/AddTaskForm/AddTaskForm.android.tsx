import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React from 'react';
import {Keyboard, Pressable, View} from 'react-native';

import Button from '@/components/base/Button';
import Text from '@/components/base/Text';
import DropdownInput from '@/components/base/form/DropdownInput';
import TextInput from '@/components/base/form/TextInput';
import useForm from '@/hooks/useForm';
import {getTaskId, Task} from '@/stores/tasks';
import {
  AddTaskFormProps,
  AddTaskFormSchema,
  addTaskFormSchema,
  RECURRENCE_OPTIONS,
  styles,
} from './common';
import Switch from '@/components/base/form/Switch';

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

  const showTimePicker = !isAllDayValue;

  const onShowDatePicker = () => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: watch('datetime') ?? new Date(),
      onChange: (event, date?: Date) => {
        console.log(event.type);
        console.log({date, selectedDatetimeValue});
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
    closeForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Task</Text>
      <TextInput name="title" label="Title" control={control} />

      <Switch name="isAllDay" label="All-day" control={control} />

      <Pressable onPress={onShowDatePicker}>
        <TextInput
          name="datetime"
          label="Date"
          editable={false}
          control={control}
          value={selectedDatetimeValue.toLocaleDateString()}
        />
      </Pressable>

      {showTimePicker && (
        <Pressable onPress={onShowTimePicker}>
          <TextInput
            name="datetime"
            label="Time"
            editable={false}
            control={control}
            value={selectedDatetimeValue.toLocaleTimeString()}
          />
        </Pressable>
      )}

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
