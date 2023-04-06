import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ExpenseModal = (props) => {
  const formRef = useRef(null);

  const now = new Date();
  const isoDateTime =
    now.getFullYear() +
    '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + now.getDate()).slice(-2) +
    'T' +
    ('0' + now.getHours()).slice(-2) +
    ':' +
    ('0' + now.getMinutes()).slice(-2);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    console.log({
      date: formData.get('date'),
      amount: formData.get('amount'),
      category: formData.get('category'),
      description: formData.get('description'),
    });
  };

  const handleSave = (e) => {
    handleSubmit(e);
    props.onHide();
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
        <Form ref={formRef} id='myForm'>
          <Form.Group as={Row} className='mb-3' controlId='date'>
            <Form.Label column sm={2}>
              Date
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                name='date'
                type='datetime-local'
                defaultValue={isoDateTime}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='amount'>
            <Form.Label column sm={2}>
              Amount
            </Form.Label>
            <Col sm={5}>
              <Form.Control type='number' name='amount' placeholder='23 Rs' />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='category'>
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={5}>
              <Form.Select name='category' aria-label='Default select example'>
                <option>HouseHold</option>
                <option value='1'>Food</option>
                <option value='2'>Debt</option>
                <option value='3'>something</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Control
              as='textarea'
              name='description'
              placeholder='Description'
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' type='reset' onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant='primary' type='submit' onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseModal;
