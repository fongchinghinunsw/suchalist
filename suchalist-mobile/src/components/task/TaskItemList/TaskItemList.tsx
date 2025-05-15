import {TaskWithDueDate} from '@/stores/tasks/types';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CompletedTaskItemList from './internal/CompletedTaskItemList';
import TaskItemGroupedList from './internal/TaskItemGroupedList';
import TaskItemUngroupedList from './internal/TaskItemUngroupedList';
import Divider from '@/components/base/Divider';
import AddTaskItem from './internal/AddTaskItem';
import {isTaskWithDueDate, Task} from '@/services/task-service/types';
import {tasksActions} from '@/stores/tasks/tasks';
import {useDispatch} from 'react-redux';

type Props = {
  tasks: Task[];
  showAddTaskDrawer: (defaultDate: Date) => void;
  onTaskItemPress: (task: Task) => void;
  onAddTask: (task: {title: string}) => void;
  onRemoveTask: (id: string) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function TaskItemList({
  tasks,
  showAddTaskDrawer,
  onTaskItemPress,
  onAddTask,
  onRemoveTask,
  onScroll,
}: Props) {
  const dispatch = useDispatch();

  const completedTasks: Task[] = [];
  const tasksWithoutDueDate: Task[] = [];
  const tasksWithDueDate: TaskWithDueDate[] = [];

  tasks.forEach(task => {
    if (task.isCompleted) {
      completedTasks.push(task);
      return;
    }

    if (isTaskWithDueDate(task)) {
      tasksWithDueDate.push(task);
      return;
    }

    tasksWithoutDueDate.push(task);
  });

  const onCompleteTask = (id: string) => {
    dispatch(tasksActions.setIsCompleted({id, isCompleted: true}));
  };

  const onUncompleteTask = (id: string) => {
    dispatch(tasksActions.setIsCompleted({id, isCompleted: false}));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} onScroll={onScroll}>
      <AddTaskItem onAddTask={onAddTask} />
      <TaskItemUngroupedList
        tasks={tasksWithoutDueDate}
        onTaskItemPress={onTaskItemPress}
        onRemoveTask={onRemoveTask}
        onCompleteTask={onCompleteTask}
        onUncompleteTask={onUncompleteTask}
      />
      <TaskItemGroupedList
        tasks={tasksWithDueDate}
        onTaskItemPress={onTaskItemPress}
        showAddTaskDrawer={showAddTaskDrawer}
        onRemoveTask={onRemoveTask}
        onCompleteTask={onCompleteTask}
        onUncompleteTask={onUncompleteTask}
      />
      <Divider />
      <CompletedTaskItemList
        tasks={completedTasks}
        onTaskItemPress={onTaskItemPress}
        onRemoveTask={onRemoveTask}
        onCompleteTask={onCompleteTask}
        onUncompleteTask={onUncompleteTask}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
