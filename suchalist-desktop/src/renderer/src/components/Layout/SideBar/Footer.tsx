import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import IconButton from '@renderer/components/base/IconButton';
import {
  IoAddOutline,
  IoFolderOpenOutline,
  IoListOutline,
  IoSettingsOutline
} from 'react-icons/io5';
import { useNavigate } from 'react-router';

export default function Footer() {
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="fixed bottom-0 left-0 w-[25%] h-15 bg-gray-100 flex flex-row justify-between items-center overflow-auto px-4 py-2">
      <Menu>
        <MenuButton>
          <IconButton Icon={IoAddOutline} size={32} onClick={goToSettings} />
        </MenuButton>
        <MenuItems anchor="top start" className="border border-gray-400 rounded-lg p-2 bg-white">
          <MenuItem>
            <div className="flex items-center gap-2">
              <IoListOutline />
              <div>Add List</div>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center gap-2">
              <IoFolderOpenOutline />
              <div>Add Folder</div>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
      <IconButton Icon={IoSettingsOutline} size={32} onClick={goToSettings} />
    </div>
  );
}
