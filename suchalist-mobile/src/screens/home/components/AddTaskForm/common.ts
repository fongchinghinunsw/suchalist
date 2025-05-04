import {getColor} from '@/constants/styles';
import {NewTask} from '@/stores/tasks/types';
import {StyleSheet} from 'react-native';
import * as z from 'zod';

export const addTaskFormSchema = z.object({
  title: z.string(),
  dueDate: z.date(),
  // recurrenceType: z.union([z.nativeEnum(RecurrenceType), z.literal('')]),
});

export type AddTaskFormSchema = z.infer<typeof addTaskFormSchema>;

export type AddTaskFormProps = {
  defaultDate?: Date;
  onAddTask: (task: NewTask) => void;
  onClose: () => void;
};

// export const RECURRENCE_OPTIONS: DropDownPropsInterface['list'] = [
//   {
//     label: 'No Repeat',
//     value: '',
//   },
//   {
//     label: 'Daily',
//     value: RecurrenceType.DAILY,
//   },
//   {
//     label: 'Weekly',
//     value: RecurrenceType.WEEKLY,
//   },
//   {
//     label: 'Monthly',
//     value: RecurrenceType.MONTHLY,
//   },
// ];

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
