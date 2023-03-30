import { Row, Col } from 'react-bootstrap';
import Navigations from './compontent/Navigations';
import Home from './pages/Home';

function App() {
  return (
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
  );
}

export default App;
