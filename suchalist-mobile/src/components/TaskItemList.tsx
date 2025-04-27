import React, {useMemo} from 'react';
import {
  SectionList,
  StyleSheet,
  View,
  SectionListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import TaskItem from './TaskItem';
import {Task} from '@/stores/tasks';
import {Theme} from '@/stores/theme';
import {useSelector} from 'react-redux';
import {RootState} from '@/stores';
import {getColor} from '@/constants/styles';
import Icon from '@react-native-vector-icons/ionicons';
import Text from './base/Text';

type Props = {
  tasks: Task[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onEndReached: () => void;
  showAddTaskDrawer: (defaultDate: Date) => void;
  onTaskItemPress: (task: Task) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function TaskItemList({
  tasks,
  setIsCompleted,
  onEndReached,
  showAddTaskDrawer,
  onTaskItemPress,
  onScroll,
}: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  const sections = useMemo(() => {
    const grouped: Record<string, Task[]> = {};

    tasks.forEach(task => {
      const date = new Date(task.date).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(task);
    });

    return Object.entries(grouped).map(([date, data]) => ({
      title: date,
      data: data.slice().sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return a.isCompleted ? -1 : 1;
      }),
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
