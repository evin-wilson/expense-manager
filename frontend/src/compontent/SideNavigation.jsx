import { useState } from 'react';
import { Button } from 'react-bootstrap';
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
    <Navbar className='flex-column align-items-start bg-dark vh-100 side-navbar'>
      <hr />
      <Nav
        variant='pills'
        defaultActiveKey='dashboard'
        className='flex-column p-3'
        style={{ width: '100%' }}
      >
        <Button onClick={() => setModalShow(true)}>Add Transaction</Button>
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
      </Nav>
    </Navbar>
  );
};

export default SideNavigation;
