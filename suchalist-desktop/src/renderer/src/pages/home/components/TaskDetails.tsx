import { Task } from '@common/types/task';
import Button from '@renderer/components/base/Button';
import Text from '@renderer/components/base/Text';
import TextInput from '@renderer/components/base/TextInput';
import DateTimePicker from '@renderer/components/task/DateTimePicker/DateTimePicker';
import { selectTheme } from '@renderer/stores/theme';
import { getBorderColorClassName } from '@renderer/utils/styles/borderColor';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

type Props = {
  task: Task;
};

export default function TaskDetails({ task }: Props) {
  const theme = useSelector(selectTheme);

  return (
    <div
      className={clsx(
        'w-[40%] h-full border rounded-xl p-4 bg-white flex flex-col gap-4',
        getBorderColorClassName(theme, 400)
      )}
    >
      <Text size="large">{task.title}</Text>
      <div className="flex flex-col gap-3">
        <TextInput name="title" label="Title" />
        <TextInput name="note" label="Note" />
        <DateTimePicker />
      </div>
      <div className="flex gap-3">
        <Button mode="contained" onClick={() => {}}>
          Save task
        </Button>
        <Button mode="contained" tone="danger" onClick={() => {}}>
          Delete task
        </Button>
      </div>
    </div>
  );
}
