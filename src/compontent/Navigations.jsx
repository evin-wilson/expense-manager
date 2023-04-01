import SideNavigation from './SideNavigation';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Navigations = () => {
  return (
    <>
      <Navbar
        as='header'
        bg='light'
        fixed='top'
        className=' justify-content-end'
      >
        <Nav className='flex-row  '>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Nav>
      </Navbar>
      <SideNavigation />
    </>
  );
};

export default Navigations;
