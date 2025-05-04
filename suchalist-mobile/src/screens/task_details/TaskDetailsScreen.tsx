import Button from '@/components/base/Button';
import DropdownInput from '@/components/base/form/DropdownInput';
import TextInput from '@/components/base/form/TextInput';
import DateTimePicker from '@/components/task/DateTimePicker/DateTimePicker';
import useForm from '@/hooks/useForm';
import {RootStackParamList} from '@/navigations/RootStack';
import {tasksActions} from '@/stores/tasks/tasks';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import * as z from 'zod';
import {RECURRENCE_OPTIONS} from '../home/components/AddTaskForm/common';

const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date(),
  // recurrenceType: z.union([z.nativeEnum(RecurrenceType), z.literal('')]),
});

type Schema = z.infer<typeof schema>;

export default function TaskDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'TaskDetails'>>();
  const {task} = route.params;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: {isValid, isLoading},
  } = useForm<Schema>({
    schema,
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      // recurrenceType: task.recurrence?.type ?? '',
    },
  });

  useEffect(() => {
    console.log({values: getValues()});
    trigger(); // triggers all form validations when component is mounted
  }, [getValues, trigger]);

  const onSaveTask = (data: Schema) => {
    const {title, description, dueDate} = data;
    dispatch(
      tasksActions.editTask({
        id: task.id,
        title,
        description,
        dueDate: dueDate.toISOString(),
        // recurrence:
        //   recurrenceType === undefined || recurrenceType === ''
        //     ? undefined
        //     : {
        //         type: recurrenceType,
        //       },
      }),
    );
  };

  const onDeleteTask = (id: string) => {
    dispatch(tasksActions.removeTask(id));
    navigation.goBack();
  };

  const watchDueDateValue = watch('dueDate');

  const onDateTimePickerConfirm = (date: Date) => setValue('dueDate', date);

  const mode = 'date';

  const isSaveTaskButtonDisabled = !isValid || isLoading;
  console.log({isValid, isLoading});

  return (
    <View style={styles.container}>
      <TextInput
        name="title"
        label="Title"
        autoCapitalize="none"
        control={control}
      />
      <TextInput
        name="description"
        label="Description"
        autoCapitalize="none"
        multiline={true}
        control={control}
      />
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
      <DropdownInput
        name="recurrenceType"
        label="Repeat"
        placeholder="Repeat"
        control={control}
        options={RECURRENCE_OPTIONS}
      />
      <Button
        mode="contained"
        disabled={isSaveTaskButtonDisabled}
        loading={isLoading}
        onPress={handleSubmit(onSaveTask)}>
        Save your task
      </Button>
      <Button
        mode="contained"
        tone="danger"
        onPress={() => onDeleteTask(task.id)}>
        Delete your task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 8,
  },
});
