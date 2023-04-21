import Navigations from './compontent/Navigations';
import Home from './pages/Home';
import { AppProvider } from './compontent/context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className='App'>
        <Navigations />
        <div
          style={{
            paddingLeft: '300px',
            paddingRight: '80px',
            paddingTop: '80px',
            width: '100%',
          }}
        >
          <Home />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
