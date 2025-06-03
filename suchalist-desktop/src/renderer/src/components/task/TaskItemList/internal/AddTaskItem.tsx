import { selectTheme } from '@/stores/theme';
import { getBackgroundColorClassName } from '@/utils/styles/backgroundColor';
import clsx from 'clsx';
import { useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

type Props = {
  onAddTask: (task: { title: string }) => void;
};

export default function AddTaskItem({ onAddTask }: Props) {
  const theme = useSelector(selectTheme);

  const [title, setTitle] = useState('');

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    console.log({ text });
    setTitle(text);
  };

  const onPress = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length > 0) {
      //   SoundPlayer.play('pop');
      onAddTask({ title: trimmedTitle });
      setTitle('');
    }
  };

  return (
    <div
      className={clsx(
        'flex gap-3 items-center pr-3 rounded-md',
        getBackgroundColorClassName(theme, 400)
      )}
    >
      <div
        tabIndex={0}
        className={clsx(
          'p-3 hover:opacity-70 focus-within:opacity-70 cursor-pointer rounded-l-md',
          getBackgroundColorClassName(theme, 500)
        )}
        onClick={onPress}
      >
        <IoAddOutline size={20} />
      </div>
      <input
        value={title}
        onChange={onTitleChange}
        placeholder="Type here to add a task..."
        className="focus-visible:outline-none w-full"
      />
    </div>
  );
}
