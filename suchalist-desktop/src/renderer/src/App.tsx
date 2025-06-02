import { Provider as ReduxStoreProvider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { Layout, SideBar } from './components/Layout';
import TopBar from './components/TopBar';
import useInit from './hooks/useInit';
import HomePage from './pages/home/HomePage';
import SettingsPage from './pages/settings/SettingsPage';
import store from './stores';

function RootLayout(): React.JSX.Element {
  return (
    <Layout>
      <SideBar>SideBar</SideBar>
      <Outlet />
    </Layout>
  );
}

function App(): React.JSX.Element {
  const { isLoading } = useInit();

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <BrowserRouter>
      <ReduxStoreProvider store={store}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        <TopBar />
      </ReduxStoreProvider>
    </BrowserRouter>
  );
}

export default App;
