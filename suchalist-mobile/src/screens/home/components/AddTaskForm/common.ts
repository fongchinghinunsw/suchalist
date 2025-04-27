import * as z from 'zod';
import {RecurrenceType, Task} from '../../../../stores/tasks';
import {DropDownPropsInterface} from 'react-native-paper-dropdown';
import {StyleSheet} from 'react-native';
import {getColor} from '../../../../constants/styles';

export const addTaskFormSchema = z.object({
  title: z.string(),
  datetime: z.date(),
  recurrenceType: z.union([z.nativeEnum(RecurrenceType), z.literal('')]),
});

export type AddTaskFormSchema = z.infer<typeof addTaskFormSchema>;

export type AddTaskFormProps = {
  defaultDate?: Date;
  onAddTask: (task: Task) => void;
  onClose: () => void;
};

export const RECURRENCE_OPTIONS: DropDownPropsInterface['list'] = [
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  title: {
    color: getColor('neutral', 800),
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  addTaskButton: {
    marginTop: 10,
  },
});
