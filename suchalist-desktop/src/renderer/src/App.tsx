import { Provider as ReduxStoreProvider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './components/Layout/Layout';
import TopBar from './components/TopBar';
import useInit from './hooks/useInit';
import HomePage from './pages/home/HomePage';
import SettingsPage from './pages/settings/SettingsPage';
import store, { persistor } from './stores';

function App(): React.JSX.Element {
  const { isLoading } = useInit();

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <BrowserRouter>
      <ReduxStoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
          <TopBar />
        </PersistGate>
      </ReduxStoreProvider>
    </BrowserRouter>
  );
}

export default App;
