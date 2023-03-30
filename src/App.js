import { Row, Col } from 'react-bootstrap';
import SideNavigation from './compontent/SideNavigation';
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>
      <Row>
        <Col md={2} className='bg-dark vh-100 pt-3'>
          <SideNavigation />
        </Col>
        <Col md={10}>
          <Row style={{ height: '70px' }}>
            <div className='p-3 fs-3 text-end'>search bar have to come</div>
          </Row>
          <hr />
          <Row className='flex-grow-1'>
            <Home />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
