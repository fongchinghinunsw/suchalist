import { Provider as ReduxStoreProvider } from 'react-redux';
import { RootLayout } from './components/Layout';
import TopBar from './components/TopBar';
import HomePage from './pages/home/HomePage';
import store from './stores';

function App(): React.JSX.Element {
  return (
    <ReduxStoreProvider store={store}>
      <TopBar />
      <RootLayout>
        <HomePage />
      </RootLayout>
    </ReduxStoreProvider>
  );
}

export default App;
