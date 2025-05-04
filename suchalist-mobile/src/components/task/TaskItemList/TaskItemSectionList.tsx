import Text from '@/components/base/Text';
import {RootState} from '@/stores';
import {Task, TaskWithDueDate} from '@/stores/tasks/types';
import {Theme} from '@/stores/theme';
import React, {useMemo} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import TaskItem from '../TaskItem';
import Icon from '@react-native-vector-icons/ionicons';
import {getColor} from '@/constants/styles';
import {sortTasks} from '@/utils/task/sort';

type Props = {
  tasks: TaskWithDueDate[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onEndReached: () => void;
  showAddTaskDrawer: (defaultDate: Date) => void;
  onTaskItemPress: (task: Task) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function TaskItemSectionList({
  tasks,
  setIsCompleted,
  onEndReached,
  showAddTaskDrawer,
  onTaskItemPress,
  onScroll,
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
      data: sortTasks(groupedTasks),
    }));
  }, [tasks]);

  const renderItem: SectionListRenderItem<Task> = ({item}) => (
    <Animated.View layout={LinearTransition}>
      <TaskItem
        task={item}
        setIsCompleted={setIsCompleted}
        onPress={onTaskItemPress}
      />
    </Animated.View>
  );

  return (
    <SectionList
      onScroll={onScroll}
      sections={sections}
      keyExtractor={item => item.id}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.header}>
          <Text shade={800} style={styles.headerText}>
            {title}
          </Text>
          <Icon
            name="add"
            size={20}
            color="blue"
            style={{color: getColor(theme, 500)}}
            onPress={() => showAddTaskDrawer(new Date(title))}
          />
        </View>
      )}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
    />
  );
}

const styles = StyleSheet.create({
  header: {
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
