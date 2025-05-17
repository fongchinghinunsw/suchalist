import Button from '@/components/base/Button';
import TextInput from '@/components/base/form/TextInput';
import DeleteTaskModal from '@/components/modal/DeleteTaskModal';
import DateTimePicker from '@/components/task/DateTimePicker/DateTimePicker';
import useForm from '@/hooks/useForm';
import {RootStackParamList} from '@/navigations/RootStack';
import {tasksActions} from '@/stores/tasks/tasks';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import * as z from 'zod';

const schema = z.object({
  title: z.string(),
  note: z.string().optional(),
  dueDate: z.date().optional(),
});

type Schema = z.infer<typeof schema>;

export default function TaskDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'TaskDetails'>>();
  const {task} = route.params;

  const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] =
    useState(false);

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
      note: task.note,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      // recurrenceType: task.recurrence?.type ?? '',
    },
  });

  useEffect(() => {
    trigger(); // triggers all form validations when component is mounted
  }, [getValues, trigger]);

  const onSaveTask = (data: Schema) => {
    const {title, note, dueDate} = data;
    dispatch(
      tasksActions.editTask({
        id: task.id,
        task: {
          title,
          note,
          dueDate: dueDate?.toISOString(),
        },
      }),
    );
    navigation.pop();
  };

  const toggleDeleteTaskModal = () => {
    setIsDeleteTaskModalVisible(!isDeleteTaskModalVisible);
  };

  const onDeleteTask = (listId: string, taskId: string) => {
    dispatch(tasksActions.deleteTask({listId, taskId}));
    setIsDeleteTaskModalVisible(false);
    navigation.goBack();
  };

  const watchDueDateValue = watch('dueDate');

  const onDateTimePickerConfirm = (date: Date) => setValue('dueDate', date);

  const mode = 'date';

  const isSaveTaskButtonDisabled = !isValid || isLoading;

  return (
    <View style={styles.container}>
      <TextInput
        name="title"
        label="Title"
        autoCapitalize="none"
        control={control}
      />
      <TextInput
        name="note"
        label="Note"
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
      {/* <DropdownInput
        name="recurrenceType"
        label="Repeat"
        placeholder="Repeat"
        control={control}
        options={RECURRENCE_OPTIONS}
      /> */}
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
        onPress={() => toggleDeleteTaskModal()}>
        Delete your task
      </Button>

      <DeleteTaskModal
        taskName={task.title}
        isVisible={isDeleteTaskModalVisible}
        onConfirm={() => onDeleteTask(task.taskListId, task.id)}
        onCancel={toggleDeleteTaskModal}
      />
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
