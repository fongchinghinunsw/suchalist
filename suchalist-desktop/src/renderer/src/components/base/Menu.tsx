import { Menu as HeadlessMenu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { IconType } from 'react-icons';
import IconButton from './IconButton';

export type MenuOption = {
  title: string;
  Icon: () => ReturnType<IconType>;
  onClick: () => void;
};

type Props = {
  Button: () => ReturnType<typeof IconButton>;
  options: MenuOption[];
  anchor?: 'top start' | 'bottom start';
};

export default function Menu({ Button, options, anchor }: Props) {
  const onMenuButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <HeadlessMenu>
      <MenuButton tabIndex={-1} onClick={onMenuButtonClick}>
        <Button />
      </MenuButton>
      <MenuItems
        transition
        anchor={anchor}
        className="z-10 border border-gray-300 rounded-md p-1 bg-white"
      >
        {options.map(({ title, Icon, onClick }) => (
          <MenuItem key={title}>
            <div className="flex items-center p-1 gap-2" onClick={onClick}>
              <Icon />
              <div>{title}</div>
            </div>
          </MenuItem>
        ))}
      </MenuItems>
    </HeadlessMenu>
  );
}
