import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import AddListModal from '@renderer/components/modal/AddListModal/AddListModal';
import RenameFolderModal from '@renderer/components/modal/RenameFolderModal/RenameFolderModal';
import { selectFolderMap, tasksActions } from '@renderer/stores/tasks/tasks';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  IoChevronBackOutline,
  IoCreateOutline,
  IoEllipsisHorizontalOutline,
  IoFolderOpenOutline,
  IoListOutline,
  IoTrashOutline
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { FolderHeader } from '../types';
import BaseHeaderItem, { MenuOption } from './BaseHeaderItem';
import ListHeaderItem from './ListHeaderItem';

type Props = {
  folderHeader: FolderHeader;
  onListHeaderClick: (taskListId: string) => void;
};

export default function FolderHeaderItem({
  folderHeader: { id, lists },
  onListHeaderClick
}: Props) {
  const dispatch = useDispatch();
  const folderMap = useSelector(selectFolderMap);
  const folder = folderMap[id];

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isRenameFolderModalOpen, setIsRenameFolderModalOpen] = useState(false);

  const onShowAddListModal = () => {
    setIsAddListModalOpen(true);
  };

  const onCloseAddListModal = () => {
    setIsAddListModalOpen(false);
  };

  const toggleRenameFolderModal = () => {
    setIsRenameFolderModalOpen(!isRenameFolderModalOpen);
  };

  const onAddList = (title: string) => {
    dispatch(tasksActions.addList({ title, folderId: id }));
    onCloseAddListModal();
  };

  const onRenameFolder = (newTitle: string) => {
    dispatch(tasksActions.renameFolder({ folder, newTitle }));
    toggleRenameFolderModal();
  };

  const onToggleListItems = () => {
    setIsExpanded(!isExpanded);
  };

  const menuOptions: MenuOption[] = [
    {
      title: 'Add List',
      icon: <IoListOutline />,
      onClick: onShowAddListModal
    },
    {
      title: 'Rename Folder',
      icon: <IoCreateOutline />,
      onClick: toggleRenameFolderModal
    },
    {
      title: 'Delete Folder',
      icon: <IoTrashOutline className="text-red-500" />,
      onClick: () => {}
    }
  ];

  return (
    <>
      <BaseHeaderItem
        icon={{ Icon: IoFolderOpenOutline, size: 16 }}
        title={folder.title}
        rightSection={
          <div className="flex gap-2">
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

            <motion.div
              animate={{ rotate: isExpanded ? -90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <IoChevronBackOutline />
            </motion.div>
          </div>
        }
        onClick={onToggleListItems}
      />
      {isExpanded && (
        <div className="pl-3">
          {lists.map((list) => (
            <ListHeaderItem
              key={list.id}
              listHeader={list}
              hasOption={true}
              onListHeaderClick={onListHeaderClick}
            />
          ))}
        </div>
      )}
      <AddListModal
        isOpen={isAddListModalOpen}
        onAddList={onAddList}
        onClose={onCloseAddListModal}
      />
      <RenameFolderModal
        defaultTitle={folder.title}
        isOpen={isRenameFolderModalOpen}
        onRenameFolder={onRenameFolder}
        onClose={toggleRenameFolderModal}
      />
    </>
  );
}
