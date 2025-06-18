import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import DeleteListModal from '@renderer/components/modal/DeleteListModal/DeleteListModal';
import RenameListModal from '@renderer/components/modal/RenameListModal/RenameListModal';
import { selectListMap, tasksActions } from '@renderer/stores/tasks/tasks';
import { useState } from 'react';
import {
  IoCreateOutline,
  IoEllipsisHorizontalOutline,
  IoListOutline,
  IoTrashOutline
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ListHeader } from '../types';
import BaseHeaderItem, { MenuOption } from './BaseHeaderItem';

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

  const [isRenameListModalVisible, setIsRenameListModalVisible] = useState(false);
  const [isDeleteListModalVisible, setIsDeleteListModalVisible] = useState(false);

  const toggleRenameListModal = () => {
    setIsRenameListModalVisible(!isRenameListModalVisible);
  };

  const toggleDeleteListModal = () => {
    setIsDeleteListModalVisible(!isDeleteListModalVisible);
  };

  const onRenameList = (newTitle: string) => {
    dispatch(tasksActions.renameList({ list, newTitle }));
    toggleRenameListModal();
  };

  const onDeleteList = () => {
    dispatch(tasksActions.deleteList(id));
  };

  const menuOptions: MenuOption[] = [];
  if (hasOption) {
    menuOptions.push({
      title: 'Rename List',
      icon: <IoCreateOutline />,
      onClick: toggleRenameListModal
    });

    menuOptions.push({
      title: 'Delete List',
      icon: <IoTrashOutline className="text-red-500" />,
      onClick: toggleDeleteListModal
    });
  }

  return (
    <>
      <BaseHeaderItem
        icon={{ Icon: IoListOutline, size: 16 }}
        title={list.title}
        onClick={() => onListHeaderClick(id)}
        rightSection={
          menuOptions.length > 0 && (
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
          )
        }
      />
      <RenameListModal
        defaultTitle={list.title}
        isOpen={isRenameListModalVisible}
        onRenameList={onRenameList}
        onClose={toggleRenameListModal}
      />
      <DeleteListModal
        listName={list.title}
        isOpen={isDeleteListModalVisible}
        onConfirm={onDeleteList}
        onCancel={toggleDeleteListModal}
      />
    </>
  );
}
