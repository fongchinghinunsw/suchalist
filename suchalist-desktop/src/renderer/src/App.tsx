import { RootLayout, SideBar } from './components/Layout';
import TopBar from './components/TopBar';

function App(): React.JSX.Element {
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
