import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigations = () => {
  return (
    <>
      <Navbar as='header' bg='light' fixed='top'>
        <Nav className='flex-fill mx-4'>
          <Container>
            <Navbar.Brand href='#home' className='text-dark'>
              <img
                alt=''
                src='/assets-64.png'
                width='30'
                height='30'
                className='d-inline-block align-top'
              />{' '}
              TrackCoin
            </Navbar.Brand>
          </Container>
          <Form className='d-flex justify-content-end'>
            <Form.Control type='search' placeholder='Search' className='me-4' aria-label='Search' />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Nav>
      </Navbar>
    </>
  );
};

export default Navigations;
