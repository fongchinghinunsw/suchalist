import React, {useState} from 'react';
import {Keyboard, View} from 'react-native';
import Button from '../../../../components/base/Button';
import Text from '../../../../components/base/Text';
import DateTimePickerIOS from '../../../../components/base/form/DateTimePickerIOS';
import DropdownInput from '../../../../components/base/form/DropdownInput';
import TextInput from '../../../../components/base/form/TextInput';
import useForm from '../../../../hooks/useForm';
import {getTaskId, Task} from '../../../../stores/tasks';
import {
  AddTaskFormProps,
  addTaskFormSchema,
  AddTaskFormSchema,
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
    formState: {isValid},
  } = useForm<AddTaskFormSchema>({
    schema: addTaskFormSchema,
    defaultValues: {
      datetime: defaultDate ?? new Date(),
      recurrenceType: '',
    },
  });

  const selectedDatetime = watch('datetime');

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const onShowDateTimePicker = () => {
    setShowDateTimePicker(true);
  };

  const onDismissDateTimePicker = () => {
    setShowDateTimePicker(false);
  };

  const closeForm = () => {
    Keyboard.dismiss();
    onDismissDateTimePicker();
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

    onAddTask(newTask);
    closeForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Task</Text>
      <TextInput name="title" label="Title" control={control} />

      <TextInput
        name="datetime"
        label="Time"
        editable={false}
        control={control}
        value={selectedDatetime.toLocaleString()}
        onPress={onShowDateTimePicker}
      />
      <DateTimePickerIOS
        name="datetime"
        label="Time"
        control={control}
        isVisible={showDateTimePicker}
        onConfirm={onDismissDateTimePicker}
        onDismiss={onDismissDateTimePicker}
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
