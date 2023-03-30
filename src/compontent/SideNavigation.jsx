import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const SideNavigation = () => {
  return (
    <>
      <Navbar.Brand href='#home' className='text-primary'>
        <img
          alt=''
          src='/logo.svg'
          width='30'
          height='30'
          className='d-inline-block align-top'
        />{' '}
        Expense Manager
      </Navbar.Brand>
      <hr style={{ color: 'white' }}></hr>
      <Nav className='flex-column'>
        <Nav.Item>
          <Nav.Link href='#'>Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='#'>Income</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='#'>Expense</Nav.Link>
        </Nav.Item>
        <hr style={{ color: 'white' }}></hr>
        <Nav.Item>
          <Nav.Link href='#'>Link 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='#'>Link 2</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default SideNavigation;
