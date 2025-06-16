import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { selectListMap } from '@renderer/stores/tasks/tasks';
import { ReactNode } from 'react';
import {
  IoCreateOutline,
  IoEllipsisHorizontalOutline,
  IoListOutline,
  IoTrashOutline
} from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { ListHeader } from '../types';
import BaseHeaderItem from './BaseHeaderItem';

type Option = {
  title: string;
  icon: ReactNode;
  onClick: () => void;
};

type Props = {
  listHeader: ListHeader;
  hasOption: boolean;
  onListHeaderClick: (taskListId: string) => void;
};

export default function ListHeaderItem({
  listHeader: { id },
  hasOption,
  onListHeaderClick
}: Props) {
  const listMap = useSelector(selectListMap);
  const list = listMap[id];

  const menuOptions: Option[] = [];
  if (hasOption) {
    menuOptions.push({
      title: 'Rename List',
      icon: <IoCreateOutline />,
      onClick: () => {}
    });

    menuOptions.push({
      title: 'Delete List',
      icon: <IoTrashOutline className="text-red-500" />,
      onClick: () => {}
    });
  }

  return (
    <BaseHeaderItem
      icon={{ Icon: IoListOutline, size: 16 }}
      title={list.title}
      onClick={() => onListHeaderClick(id)}
      rightSection={
        <Popover>
          <PopoverButton>
            <IoEllipsisHorizontalOutline />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom start"
            className="z-10 border border-gray-300 rounded-md p-1 bg-white"
          >
            {menuOptions.map((option) => (
              <div key={option.title} className="flex items-center p-1 gap-2">
                {option.icon}
                <div>{option.title}</div>
              </div>
            ))}
          </PopoverPanel>
        </Popover>
      }
    />
  );
}
