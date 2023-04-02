import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ExpenseModal = (props) => {
  return (
    <Modal
      {...props}
      size='lg'
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
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Date</Form.Label>
            <Form.Control type='date' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Amount</Form.Label>
            <Form.Control type='number' placeholder='Amount' />
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
