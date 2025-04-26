import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {Keyboard, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import * as z from 'zod';
import {getColor} from '../constants/styles';
import useForm from '../hooks/useForm';
import {getTaskId, RecurrenceType, Task} from '../stores/tasks';
import Button from './base/Button';
import Text from './base/Text';
import TextInput from './base/form/TextInput';
import DropdownInput from './base/form/DropdownInput';
import {DropDownPropsInterface} from 'react-native-paper-dropdown';

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

  // const [recurrence, setRecurrence] = useState<RecurrenceType | undefined>();

  const closeDrawer = () => {
    Keyboard.dismiss();
    setShowDatePicker(false);
    onClose();
  };

  const handleDateChange = (_: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

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
    closeDrawer();
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'position' : undefined}
    //   style={styles.drawerContent}>
    <>
      <Text style={styles.drawerTitle}>New Task</Text>
      <TextInput name="title" label="Title" control={control} />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}>
        <Text>
          {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
        </Text>
      </TouchableOpacity>

      {/* TODO: Add theme color */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* <Picker
        selectedValue={recurrence}
        onValueChange={itemValue => setRecurrence(itemValue)}
        style={styles.input}>
        <Picker.Item label="Does not repeat" value={undefined} />
        <Picker.Item label="Every day" value={RecurrenceType.DAILY} />
        <Picker.Item label="Every week" value={RecurrenceType.WEEKLY} />
        <Picker.Item label="Every month" value={RecurrenceType.MONTHLY} />
      </Picker> */}

      <DropdownInput
        name="recurrenceType"
        label="Repeat"
        placeholder="Repeat"
        control={control}
        options={RECURRENCE_OPTIONS}
      />

      <Button mode="contained" onPress={handleSubmit(handleAdd)}>
        Add Task
      </Button>
    </>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
