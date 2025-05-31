import { isList } from '@common/types/list';
import { Resource } from '@common/types/resource';
import { useEffect, useState } from 'react';
import { RootLayout, SideBar } from './components/Layout';
import TopBar from './components/TopBar';
import TaskItemList from './components/task/TaskItemList/TaskItemList';

function App(): React.JSX.Element {
  const [resources, setResources] = useState<Resource[]>([]);
  const lists = resources.filter(isList);
  useEffect(() => {
    window.database.getResources().then((data) => {
      setResources(data);
    });
  }, []);
  return (
    <>
      <TopBar />
      <RootLayout>
        <SideBar>SideBar</SideBar>
        {lists.length > 0 && <TaskItemList list={lists[0]} />}
      </RootLayout>
    </>
  );
}

export default App;
