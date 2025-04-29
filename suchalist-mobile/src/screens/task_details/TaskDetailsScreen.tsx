import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import * as z from 'zod';
import Button from '@/components/base/Button';
import TextInput from '@/components/base/form/TextInput';
import useForm from '@/hooks/useForm';
import {RootStackParamList} from '@/navigations/RootStack';
import {useDispatch} from 'react-redux';
import {tasksActions} from '@/stores/tasks';
import {StackNavigationProp} from '@react-navigation/stack';
import Switch from '@/components/base/form/Switch';

const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  isAllDay: z.boolean(),
});

type Schema = z.infer<typeof schema>;

export default function TaskDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'TaskDetails'>>();
  const {task} = route.params;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {isValid, isLoading},
  } = useForm<Schema>({
    schema,
    defaultValues: task,
  });

  const onSaveTask = (data: Schema) => {
    dispatch(tasksActions.editTask({...data, id: task.id}));
  };

  const onDeleteTask = (id: string) => {
    dispatch(tasksActions.removeTask(id));
    navigation.goBack();
  };

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
      <Switch name="isAllDay" label="All-day" control={control} />
      <Button
        mode="contained"
        disabled={isSaveTaskButtonDisabled}
        loading={isLoading}
        onPress={handleSubmit(onSaveTask)}>
        Save Task
      </Button>
      <Button
        mode="contained"
        tone="danger"
        onPress={() => onDeleteTask(task.id)}>
        Delete Task
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
