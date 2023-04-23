import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './SideNavigation.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import TransactionsModal from './TransactionsModal';
import Record from '../data/Record';
import { Link } from 'react-router-dom';

const SideNavigation = () => {
  const [modalShow, setModalShow] = useState(false);
  const record = new Record();

  return (
    <Navbar
      fixed='top'
      className='flex-column align-items-start bg-dark vh-100 side-navbar'
    >
      <Container>
        <Navbar.Brand href='#home' className='text-light'>
          <img
            alt=''
            src='/logo.svg'
            width='30'
            height='30'
            className='d-inline-block align-top'
          />{' '}
          TrackCoin
        </Navbar.Brand>
      </Container>
      <hr />
      <Nav className='flex-column p-3' style={{ width: '100%' }}>
        <Button onClick={() => setModalShow(true)}>Add Expense</Button>
        <TransactionsModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          record={record}
        />
        <br />
        <Nav.Item>
          <Nav.Link as={Link} to='/'>
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/record'>
            Record
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/analytics'>
            Analytics
          </Nav.Link>
        </Nav.Item>
        <hr style={{ color: 'white' }} />
        <Nav.Item>
          <Nav.Link href='#'>Bucket 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='#'>Bucket 2</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default SideNavigation;
