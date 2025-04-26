import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {Keyboard, Platform, StyleSheet, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {DropDownPropsInterface} from 'react-native-paper-dropdown';
import * as z from 'zod';
import {getColor} from '../constants/styles';
import useForm from '../hooks/useForm';
import {getTaskId, RecurrenceType, Task} from '../stores/tasks';
import Button from './base/Button';
import Text from './base/Text';
import DropdownInput from './base/form/DropdownInput';
import TextInput from './base/form/TextInput';

const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  recurrenceType: z.union([z.nativeEnum(RecurrenceType), z.literal('')]),
});

type Schema = z.infer<typeof schema>;

const RECURRENCE_OPTIONS: DropDownPropsInterface['list'] = [
  {
    label: 'No Repeat',
    value: '',
  },
  {
    label: 'Daily',
    value: RecurrenceType.DAILY,
  },
  {
    label: 'Weekly',
    value: RecurrenceType.WEEKLY,
  },
  {
    label: 'Monthly',
    value: RecurrenceType.MONTHLY,
  },
];

export type Props = {
  defaultDate?: Date;
  onAddTask: (task: Task) => void;
  onClose: () => void;
};

export default function AddTaskForm({defaultDate, onAddTask, onClose}: Props) {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<Schema>({
    schema,
    defaultValues: {
      recurrenceType: '',
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultDate ?? new Date());

  const onShowDatePicker = Platform.select({
    ios: () => {
      setShowDatePicker(true);
    },
    android: () => {
      DateTimePickerAndroid.open({
        mode: 'date',
        value: new Date(),
        onChange: handleDateChange,
      });
    },
  });

  const closeDrawer = Platform.select({
    ios: () => {
      Keyboard.dismiss();
      setShowDatePicker(false);
      onClose();
    },
    android: () => {
      Keyboard.dismiss();
      DateTimePickerAndroid.dismiss('date');
      onClose();
    },
  });

  const handleDateChange = (_: DateTimePickerEvent, date?: Date) => {
    console.log({date});
    if (date) {
      setSelectedDate(date);
    }
  };

  const onConfirmDateTime = () => setShowDatePicker(false);

  const handleAdd = (data: Schema) => {
    if (!isValid) {
      return;
    }

    const {title, recurrenceType} = data;

    const newTaskId = getTaskId(title);
    const newTask: Task = {
      id: newTaskId,
      title,
      date: selectedDate.toISOString(),
      isCompleted: false,
      recurrence: recurrenceType
        ? {
            type: recurrenceType,
            originalParentId: newTaskId,
          }
        : undefined,
    };

    onAddTask(newTask);
    setSelectedDate(new Date());
    closeDrawer?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.drawerTitle}>New Task</Text>
      <TextInput name="title" label="Title" control={control} />

      <TextInput
        name="datetime"
        label="Time"
        editable={Platform.OS === 'android' ? true : false}
        control={control}
        onPress={onShowDatePicker}
        value={selectedDate ? selectedDate.toLocaleDateString() : undefined}
      />

      {Platform.OS === 'ios' && (
        <Portal>
          <Modal
            visible={showDatePicker}
            onDismiss={() => setShowDatePicker(false)}
            contentContainerStyle={styles.addTaskModal}>
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="inline"
              onChange={handleDateChange}
            />
            <Button
              mode="outlined"
              style={styles.confirmDateTimeButton}
              onPress={onConfirmDateTime}>
              Confirm
            </Button>
          </Modal>
        </Portal>
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
        style={styles.addTaskButton}
        onPress={handleSubmit(handleAdd)}>
        Add Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawerContent: {
    padding: 16,
    paddingBottom: 32,
  },
  drawerTitle: {
    color: getColor('neutral', 800),
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  addTaskModal: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  confirmDateTimeButton: {
    marginTop: 20,
  },
  addTaskButton: {
    marginTop: 10,
  },
});
