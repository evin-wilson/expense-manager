import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ExpenseModal = (props) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    time: new Date().toLocaleTimeString(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Button variant='success'>Income</Button>
        <Button variant='danger'>Expense</Button>
        <Button variant='secondary'>Transfer</Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className='mb-3' controlId='formBasicEmail'>
            <Form.Label column sm={2}>
              Date
            </Form.Label>
            <Col sm={7}>
              <InputGroup>
                <Form.Control
                  onChange={handleInputChange}
                  placeholder={formData.date}
                  type='datetime-local'
                />
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='amount'>
            <Form.Label column sm={2}>
              Amount
            </Form.Label>
            <Col sm={5}>
              <Form.Control type='number' placeholder='23 Rs' />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='category'>
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={5}>
              <Form.Select aria-label='Default select example'>
                <option>HouseHold</option>
                <option value='1'>Food</option>
                <option value='2'>Debt</option>
                <option value='3'>something</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Control as='textarea' placeholder='Description' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>
          Close
        </Button>
        <Button variant='primary' onClick={props.onHide}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseModal;
