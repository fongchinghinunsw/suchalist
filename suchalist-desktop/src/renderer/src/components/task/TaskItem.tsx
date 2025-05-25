import { Task } from '@/services/task_service/types';

type Props = {
  task: Task;
  onPress: (task: Task) => void;
  onStarTask: (task: Task, isStarred: boolean) => void;
  onDeleteTask: (task: Task) => void;
  onCompleteTask: (task: Task) => void;
  onUncompleteTask: (task: Task) => void;
};

export default function TaskItem({
  task,
  onPress,
  onStarTask,
  onDeleteTask,
  onCompleteTask,
  onUncompleteTask
}: Props) {
  return <div>{task.title}</div>;
}
