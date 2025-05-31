import { Task } from '@common/types/task';

type Props = {
  task: Task;
  onPress: (task: Task) => void;
  onStarTask: (task: Task, isStarred: boolean) => void;
  onDeleteTask: (task: Task) => void;
  onCompleteTask: (task: Task) => void;
  onUncompleteTask: (task: Task) => void;
};

export default function TaskItem({ task }: Props) {
  return <div>{task.title}</div>;
}
