import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import Record from '../data/Record';
import './SideNavigation.css';
import TransactionsModal from './TransactionsModal';

const SideNavigation = () => {
  const [modalShow, setModalShow] = useState(false);
  const record = new Record();

  return (
    <Navbar fixed='top' className='flex-column align-items-start bg-dark vh-100 side-navbar'>
      <Container>
        <Navbar.Brand href='#home' className='text-light'>
          <img alt='' src='/logo.svg' width='30' height='30' className='d-inline-block align-top' />{' '}
          TrackCoin
        </Navbar.Brand>
      </Container>
      <hr />
      <Nav
        variant='pills'
        defaultActiveKey='/'
        className='flex-column p-3'
        style={{ width: '100%' }}
      >
        <Button onClick={() => setModalShow(true)}>Add Expense</Button>
        <TransactionsModal show={modalShow} onHide={() => setModalShow(false)} record={record} />
        <br />
        <Nav.Item>
          <Nav.Link as={Link} to='/' eventKey='dashboard'>
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} eventKey='record' to='/record'>
            Record
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} eventKey='analytics' to='/analytics'>
            Analytics
          </Nav.Link>
        </Nav.Item>
        <hr style={{ color: 'white' }} />
        <Nav.Item>
          <Nav.Link eventKey='link-4' href='#'>
            Bucket 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-2' href='#'>
            Bucket 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default SideNavigation;
