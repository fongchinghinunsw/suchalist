import { Outlet } from 'react-router';
import { SideBar } from './SideBar/SideBar';

export default function Layout(): React.JSX.Element {
  return (
    <main className="flex flex-row w-full min-h-full pt-11 bg-red-400">
      <SideBar>SideBar</SideBar>
      <Outlet />
    </main>
  );
}
