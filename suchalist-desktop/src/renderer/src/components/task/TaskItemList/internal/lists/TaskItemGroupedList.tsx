import Text from '@/components/base/Text';
import { Task, TaskWithDueDate } from '@common/types/task';
import { useMemo } from 'react';
import TaskItem from '../TaskItem';

type Props = {
  tasks: TaskWithDueDate[];
  onSelectTask: (task: Task) => void;
};

export default function TaskItemGroupedList({ tasks, onSelectTask }: Props) {
  const sections = useMemo(() => {
    const grouped: Record<string, TaskWithDueDate[]> = {};

    tasks.forEach((task) => {
      const date = new Date(task.dueDate).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(task);
    });

    return Object.entries(grouped).map(([date, groupedTasks]) => ({
      title: date,
      data: groupedTasks
    }));
  }, [tasks]);

  const renderItem = (task: TaskWithDueDate) => (
    <TaskItem key={task.id} task={task} onSelectTask={onSelectTask} />
  );

  return (
    <div>
      {sections.map((section) => {
        const { title, data } = section;
        return (
          <div key={title}>
            <div className="py-2">
              <Text size="small" shade={600}>
                {title}
              </Text>
            </div>
            <div className="flex flex-col gap-2">{data.map((task) => renderItem(task))}</div>
          </div>
        );
      })}
    </div>
  );
}
