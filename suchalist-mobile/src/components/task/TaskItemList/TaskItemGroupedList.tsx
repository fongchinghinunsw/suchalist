import Text from '@/components/base/Text';
import {RootState} from '@/stores';
import {Task, TaskWithDueDate} from '@/stores/tasks/types';
import {Theme} from '@/stores/theme';
import {useMemo} from 'react';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import TaskItem from '../TaskItem';
import {StyleSheet, View} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import {getColor} from '@/constants/styles';
import {styles as commonStyles} from './common';

type Props = {
  tasks: TaskWithDueDate[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onTaskItemPress: (task: Task) => void;
  showAddTaskDrawer: (defaultDate: Date) => void;
};

export default function TaskItemGroupedList({
  tasks,
  setIsCompleted,
  onTaskItemPress,
  showAddTaskDrawer,
}: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

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
        setIsCompleted={setIsCompleted}
        onPress={onTaskItemPress}
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
