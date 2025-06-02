import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return <main className="flex flex-row w-full pt-11 bg-red-400">{children}</main>;
}

export function SideBar({ children }: Props) {
  return (
    <aside className="w-[20%] overflow-auto bg-purple-300">
      {children}
      <NavLink to="/settings">
        <IoSettingsOutline size={32} />
      </NavLink>
    </aside>
  );
}
