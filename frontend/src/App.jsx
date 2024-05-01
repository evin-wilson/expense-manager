import Stack from 'react-bootstrap/Stack';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Navigations from './compontent/Navigations';
import SideNavigation from './compontent/SideNavigation';
import { AppProvider } from './compontent/context/AppContext';
import Dashboard from './pages/Dashboard';
import Record from './pages/Record';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className='App'>
          <Navigations />
          <Stack direction='horizontal' gap={5}>
            <div>
              <SideNavigation />
            </div>
            <div>
              <Routes>
                <Route exact path='/' element={<Dashboard />} />
                <Route path='/record' element={<Record />} />
              </Routes>
            </div>
          </Stack>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
