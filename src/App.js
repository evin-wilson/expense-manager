import Navigations from './compontent/Navigations';
import Home from './pages/Home';
import { AppProvider } from './compontent/context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Record from './pages/Record';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className='App'>
          <Navigations />
          <div className='content-wrapper'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/record' element={<Record />} />
              <Route path='/analytics' element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
