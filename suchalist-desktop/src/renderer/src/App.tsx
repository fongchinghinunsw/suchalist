import { useEffect } from 'react';
import { RootLayout, SideBar } from './components/Layout';
import TopBar from './components/TopBar';

function App(): React.JSX.Element {
  useEffect(() => {
    window.database.getResources().then((data) => console.log(data));
  }, []);
  return (
    <>
      <TopBar />
      <RootLayout>
        <SideBar>SideBar</SideBar>
        <div>Electron</div>
      </RootLayout>
    </>
  );
}

export default App;
