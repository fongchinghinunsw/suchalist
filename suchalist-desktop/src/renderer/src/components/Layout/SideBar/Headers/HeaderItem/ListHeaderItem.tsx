import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { selectListMap, tasksActions } from '@renderer/stores/tasks/tasks';
import { ReactNode } from 'react';
import {
  IoCreateOutline,
  IoEllipsisHorizontalOutline,
  IoListOutline,
  IoTrashOutline
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
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
      onClick: () => dispatch(tasksActions.deleteList(id))
    });
  }

  return (
    <BaseHeaderItem
      icon={{ Icon: IoListOutline, size: 16 }}
      title={list.title}
      onClick={() => onListHeaderClick(id)}
      rightSection={
        <Menu>
          <MenuButton>
            <IoEllipsisHorizontalOutline />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom start"
            className="z-10 border border-gray-300 rounded-md p-1 bg-white"
          >
            {menuOptions.map((option) => (
              <MenuItem key={option.title}>
                <div className="flex items-center p-1 gap-2" onClick={option.onClick}>
                  {option.icon}
                  <div>{option.title}</div>
                </div>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      }
    />
  );
}
