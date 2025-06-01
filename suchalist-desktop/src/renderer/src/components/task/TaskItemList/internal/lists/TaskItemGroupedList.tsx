import { TaskWithDueDate } from '@common/types/task';
import { selectTheme } from '@renderer/stores/theme';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from '../TaskItem';

type Props = {
  tasks: TaskWithDueDate[];
};

export default function TaskItemGroupedList({ tasks }: Props) {
  const theme = useSelector(selectTheme);

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

  const renderItem = (task: TaskWithDueDate) => <TaskItem task={task} />;

  return (
    <div>
      {sections.map((section) => {
        const { title, data } = section;
        return (
          <div key={title}>
            <div>{title}</div>
            <div>{data.map((task) => renderItem(task))}</div>
          </div>
        );
      })}
    </div>
  );
}
