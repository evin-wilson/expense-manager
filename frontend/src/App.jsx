import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Navigations from './compontent/Navigations';
import { AppProvider } from './compontent/context/AppContext';
import Dashboard from './pages/Dashboard';
import Record from './pages/Record';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className='App'>
          <Navigations />
          <div className='content-wrapper'>
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route path='/record' element={<Record />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
