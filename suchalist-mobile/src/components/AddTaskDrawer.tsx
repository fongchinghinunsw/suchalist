import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {getTaskId, RecurrenceType, Task} from '../stores/tasks';
import Button from './base/Button';
import Text from './base/Text';
import {getColor} from '../constants/styles';

export type Props = {
  defaultDate?: Date;
  onAddTask: (task: Task) => void;
  onClose: () => void;
};

export default function AddTaskDrawer({
  defaultDate,
  onAddTask,
  onClose,
}: Props) {
  const [newTitle, setNewTitle] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultDate ?? new Date());

  const [recurrence, setRecurrence] = useState<RecurrenceType | undefined>();

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

  const handleAdd = () => {
    if (!newTitle || !selectedDate) {
      return;
    }

    const newTaskId = getTaskId(newTitle);
    const newTask: Task = {
      id: newTaskId,
      title: newTitle,
      date: selectedDate.toISOString(),
      isCompleted: false,
      recurrence: recurrence
        ? {
            type: recurrence,
            originalParentId: newTaskId,
          }
        : undefined,
    };

    onAddTask(newTask);
    setNewTitle('');
    setSelectedDate(new Date());
    closeDrawer();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : undefined}
      style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newTitle}
        onChangeText={setNewTitle}
      />
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

      <Picker
        selectedValue={recurrence}
        onValueChange={itemValue => setRecurrence(itemValue)}
        style={styles.input}>
        <Picker.Item label="Does not repeat" value={undefined} />
        <Picker.Item label="Every day" value={RecurrenceType.DAILY} />
        <Picker.Item label="Every week" value={RecurrenceType.WEEKLY} />
        <Picker.Item label="Every month" value={RecurrenceType.MONTHLY} />
      </Picker>

      <Button mode="contained" onPress={handleAdd}>
        Add Task
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  drawerContent: {
    flex: 1,
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
