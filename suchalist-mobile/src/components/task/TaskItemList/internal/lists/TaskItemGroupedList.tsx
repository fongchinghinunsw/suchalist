import Text from '@/components/base/Text';
import {getColor} from '@/constants/styles';
import {Task} from '@/services/task-service/types';
import {TaskWithDueDate} from '@/stores/tasks/types';
import {selectTheme} from '@/stores/theme';
import Icon from '@react-native-vector-icons/ionicons';
import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import TaskItem from '../TaskItem/TaskItem';
import {styles as commonStyles} from './styles';

type Props = {
  tasks: TaskWithDueDate[];
  showAddTaskDrawer: (defaultDate: Date) => void;
  onTaskItemPress: (task: Task) => void;
  onStarTask: (id: string, isStarred: boolean) => void;
  onDeleteTask: (listId: string, taskId: string) => void;
  onCompleteTask: (task: Task) => void;
  onUncompleteTask: (task: Task) => void;
};

export default function TaskItemGroupedList({
  tasks,
  showAddTaskDrawer,
  onTaskItemPress,
  onStarTask,
  onDeleteTask,
  onCompleteTask,
  onUncompleteTask,
}: Props) {
  const theme = useSelector(selectTheme);

  const sections = useMemo(() => {
    const grouped: Record<string, TaskWithDueDate[]> = {};

    tasks.forEach(task => {
      const date = new Date(task.dueDate).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(task);
    });

    return Object.entries(grouped).map(([date, groupedTasks]) => ({
      title: date,
      data: groupedTasks,
    }));
  }, [tasks]);

  const renderItem = (task: TaskWithDueDate) => (
    <Animated.View key={task.id} layout={LinearTransition}>
      <TaskItem
        task={task}
        onPress={onTaskItemPress}
        onStarTask={onStarTask}
        onDeleteTask={onDeleteTask}
        onCompleteTask={onCompleteTask}
        onUncompleteTask={onUncompleteTask}
      />
    </Animated.View>
  );

  return (
    <View>
      {sections.map(section => {
        const {title, data} = section;
        return (
          <View key={section.title}>
            <View style={styles.headerContainer}>
              <Text shade={800} style={styles.headerText}>
                {section.title}
              </Text>
              <Icon
                name="add"
                size={20}
                color="blue"
                style={{color: getColor(theme, 500)}}
                onPress={() => showAddTaskDrawer(new Date(title))}
              />
            </View>
            <View style={commonStyles.container}>
              {data.map(task => {
                return renderItem(task);
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
});
