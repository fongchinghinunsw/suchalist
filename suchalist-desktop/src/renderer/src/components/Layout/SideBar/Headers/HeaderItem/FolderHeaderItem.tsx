import IconButton from '@renderer/components/base/IconButton';
import Menu, { MenuOption } from '@renderer/components/base/Menu';
import AddListModal from '@renderer/components/modal/AddListModal/AddListModal';
import DeleteFolderModal from '@renderer/components/modal/DeleteFolderModal/DeleteFolderModal';
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
import BaseHeaderItem from './BaseHeaderItem';
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
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);

  const onShowAddListModal = () => {
    setIsAddListModalOpen(true);
  };

  const onCloseAddListModal = () => {
    setIsAddListModalOpen(false);
  };

  const toggleRenameFolderModal = () => {
    setIsRenameFolderModalOpen(!isRenameFolderModalOpen);
  };

  const toggleDeleteFolderModal = () => {
    setIsDeleteFolderModalOpen(!isDeleteFolderModalOpen);
  };

  const onAddList = (title: string) => {
    dispatch(tasksActions.addList({ title, folderId: id }));
    onCloseAddListModal();
  };

  const onRenameFolder = (newTitle: string) => {
    dispatch(tasksActions.renameFolder({ folder, newTitle }));
    toggleRenameFolderModal();
  };

  const onDeleteFolder = () => {
    dispatch(tasksActions.deleteFolder(id));
  };

  const onToggleListItems = () => {
    setIsExpanded(!isExpanded);
  };

  const menuOptions: MenuOption[] = [
    {
      title: 'Add List',
      Icon: () => <IoListOutline />,
      onClick: onShowAddListModal
    },
    {
      title: 'Rename Folder',
      Icon: () => <IoCreateOutline />,
      onClick: toggleRenameFolderModal
    },
    {
      title: 'Delete Folder',
      Icon: () => <IoTrashOutline className="text-red-500" />,
      onClick: toggleDeleteFolderModal
    }
  ];

  return (
    <>
      <BaseHeaderItem
        icon={{ Icon: IoFolderOpenOutline, size: 16 }}
        title={folder.title}
        rightSection={
          <div className="flex gap-2">
            <Menu
              Button={() => <IconButton Icon={IoEllipsisHorizontalOutline} size={16} />}
              options={menuOptions}
              anchor="bottom start"
            />
            <motion.div
              animate={{ rotate: isExpanded ? -90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <IconButton Icon={IoChevronBackOutline} size={16} />
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
      <DeleteFolderModal
        folderName={folder.title}
        isOpen={isDeleteFolderModalOpen}
        onConfirm={onDeleteFolder}
        onCancel={toggleDeleteFolderModal}
      />
    </>
  );
}
