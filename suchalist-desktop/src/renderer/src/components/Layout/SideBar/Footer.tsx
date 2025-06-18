import IconButton from '@renderer/components/base/IconButton';
import Menu, { MenuOption } from '@renderer/components/base/Menu';
import AddFolderModal from '@renderer/components/modal/AddFolderModal/AddFolderModal';
import AddListModal from '@renderer/components/modal/AddListModal/AddListModal';
import { tasksActions } from '@renderer/stores/tasks/tasks';
import { useState } from 'react';
import {
  IoAddOutline,
  IoFolderOpenOutline,
  IoListOutline,
  IoSettingsOutline
} from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

  const onShowAddListModal = () => {
    setIsAddListModalOpen(true);
  };

  const onCloseAddListModal = () => {
    setIsAddListModalOpen(false);
  };

  const onAddList = (title: string) => {
    dispatch(tasksActions.addList({ title }));
    onCloseAddListModal();
  };

  const onShowAddFolderModal = () => {
    setIsAddFolderModalOpen(true);
  };

  const onCloseAddFolderModal = () => {
    setIsAddFolderModalOpen(false);
  };

  const onAddFolder = (title: string) => {
    dispatch(tasksActions.addFolder(title));
    onCloseAddFolderModal();
  };

  const goToSettings = () => {
    navigate('/settings');
  };

  const addMenuOptions: MenuOption[] = [
    {
      title: 'Add List',
      Icon: () => <IoListOutline />,
      onClick: onShowAddListModal
    },
    {
      title: 'Add Folder',
      Icon: () => <IoFolderOpenOutline />,
      onClick: onShowAddFolderModal
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-[25%] h-15 bg-gray-100 flex flex-row justify-between items-center overflow-auto px-4 py-2">
      <Menu
        Button={() => <IconButton Icon={IoAddOutline} size={32} />}
        options={addMenuOptions}
        anchor="top start"
      />
      <IconButton Icon={IoSettingsOutline} size={32} onClick={goToSettings} />
      <AddListModal
        isOpen={isAddListModalOpen}
        onAddList={onAddList}
        onClose={onCloseAddListModal}
      />
      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onAddFolder={onAddFolder}
        onClose={onCloseAddFolderModal}
      />
    </div>
  );
}
