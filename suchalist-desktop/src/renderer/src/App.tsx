import { useEffect } from 'react';
import { RootLayout, SideBar } from './components/Layout';
import TopBar from './components/TopBar';

function App(): React.JSX.Element {
  useEffect(() => {
    console.log(window.database.getResources());
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
