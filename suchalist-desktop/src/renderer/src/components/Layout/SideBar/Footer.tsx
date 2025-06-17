import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import IconButton from '@renderer/components/base/IconButton';
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

  return (
    <div className="fixed bottom-0 left-0 w-[25%] h-15 bg-gray-100 flex flex-row justify-between items-center overflow-auto px-4 py-2">
      <Menu>
        <MenuButton>
          <IconButton Icon={IoAddOutline} size={32} />
        </MenuButton>
        <MenuItems anchor="top start" className="border border-gray-400 rounded-lg p-2 bg-white">
          <MenuItem>
            <div className="flex items-center gap-2" onClick={onShowAddListModal}>
              <IoListOutline />
              <div>Add List</div>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center gap-2" onClick={onShowAddFolderModal}>
              <IoFolderOpenOutline />
              <div>Add Folder</div>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
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
