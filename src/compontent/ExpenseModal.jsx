import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { incomeOption, expenseOption } from '../data/data';

const getIsoDateTime = () => {
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
  return isoDateTime;
};

const ExpenseModal = (props) => {
  const [transaction, settransaction] = useState('expense');
  const formRef = useRef(null);

  const isoDateTime = getIsoDateTime();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    console.log({
      date: formData.get('date'),
      amount: formData.get('amount'),
      category: formData.get('category'),
      description: formData.get('description'),
      note: formData.get('note'),
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
        <Button
          variant={transaction === 'income' ? 'success' : 'outline-success'}
          className={`me-3 ${transaction === 'income' ? 'active shadow' : ''}`}
          onClick={() => settransaction('income')}
        >
          Income
        </Button>
        <Button
          variant={transaction === 'expense' ? 'danger' : 'outline-danger'}
          className={`me-3 ${transaction === 'expense' ? 'active shadow' : ''}`}
          onClick={() => settransaction('expense')}
        >
          Expense
        </Button>
        <Button variant='light' disabled={true}>
          Transfer
        </Button>
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
              <Form.Control
                type='number'
                name='amount'
                defaultValue={0.0}
                placeholder='23 Rs'
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='category'>
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={5}>
              <Form.Select name='category' aria-label='Default select example'>
                {transaction === 'income'
                  ? incomeOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  : expenseOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='note'>
            <Form.Label column sm={2}>
              Note
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type='text'
                name='note'
                placeholder='Note'
                defaultValue=''
              />
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
        <Button variant='danger' type='reset' onClick={props.onHide}>
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
