import {TaskWithDueDate} from '@/stores/tasks/types';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CompletedTaskItemList from './internal/lists/CompletedTaskItemList';
import TaskItemGroupedList from './internal/lists/TaskItemGroupedList';
import TaskItemUngroupedList from './internal/lists/TaskItemUngroupedList';
import Divider from '@/components/base/Divider';
import AddTaskItem from './internal/AddTaskItem';
import {isTaskWithDueDate, List, Task} from '@/services/task-service/types';
import {tasksActions} from '@/stores/tasks/tasks';
import {useDispatch} from 'react-redux';

type Props = {
  list: List;
  showAddTaskDrawer: (defaultDate: Date) => void;
  onTaskItemPress: (task: Task) => void;
  onAddTask: (task: {title: string}) => void;
  onDeleteTask: (listId: string, taskId: string) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function TaskItemList({
  list,
  showAddTaskDrawer,
  onTaskItemPress,
  onAddTask,
  onDeleteTask,
  onScroll,
}: Props) {
  const dispatch = useDispatch();

  const completedTasks: Task[] = [];
  const tasksWithoutDueDate: Task[] = [];
  const tasksWithDueDate: TaskWithDueDate[] = [];

  list.tasks.forEach(task => {
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

  const onStarTask = (taskId: string, isStarred: boolean) => {
    dispatch(tasksActions.setIsStarred({listId: list.id, taskId, isStarred}));
  };

  const onCompleteTask = (taskId: string) => {
    dispatch(
      tasksActions.setIsCompleted({listId: list.id, taskId, isCompleted: true}),
    );
  };

  const onUncompleteTask = (taskId: string) => {
    dispatch(
      tasksActions.setIsCompleted({
        listId: list.id,
        taskId,
        isCompleted: false,
      }),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} onScroll={onScroll}>
      <AddTaskItem onAddTask={onAddTask} />
      <TaskItemUngroupedList
        tasks={tasksWithoutDueDate}
        onTaskItemPress={onTaskItemPress}
        onStarTask={onStarTask}
        onDeleteTask={onDeleteTask}
        onCompleteTask={onCompleteTask}
        onUncompleteTask={onUncompleteTask}
      />
      <TaskItemGroupedList
        tasks={tasksWithDueDate}
        showAddTaskDrawer={showAddTaskDrawer}
        onTaskItemPress={onTaskItemPress}
        onStarTask={onStarTask}
        onDeleteTask={onDeleteTask}
        onCompleteTask={onCompleteTask}
        onUncompleteTask={onUncompleteTask}
      />
      <Divider />
      <CompletedTaskItemList
        tasks={completedTasks}
        onTaskItemPress={onTaskItemPress}
        onStarTask={onStarTask}
        onDeleteTask={onDeleteTask}
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
