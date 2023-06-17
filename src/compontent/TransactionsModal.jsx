import { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import AppContext from '../compontent/context/AppContext';
import Record from '../data/Record';
import { expenseOption, incomeOption } from '../data/data';

const TransactionsModal = (props) => {
  const record = props.record;
  const [transaction, settransaction] = useState(record.transaction);
  const formRef = useRef(null);
  const { addTransaction, updateTransaction, transactionrecords } = useContext(AppContext);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    let newRecord = new Record(
      transaction,
      formData.get('date'),
      parseInt(formData.get('amount')),
      formData.get('category'),
      formData.get('note'),
      formData.get('description')
    );
    let index = transactionrecords.findIndex((rs) => rs.id === record.id);

    if (index === -1) {
      addTransaction(newRecord);
    } else {
      updateTransaction(index, newRecord);
    }

    props.onHide();
  };

  return (
    <Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
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
              <Form.Control name='date' type='datetime-local' defaultValue={record.date} />
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
                defaultValue={record.amount.toFixed(2)}
                placeholder='23 Rs'
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='category'>
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={5}>
              <Form.Select
                name='category'
                aria-label='Default select example'
                defaultValue={record.category}
              >
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
              <Form.Control type='text' name='note' placeholder='Note' defaultValue={record.note} />
            </Col>
          </Form.Group>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Control
              as='textarea'
              name='description'
              placeholder='Description'
              defaultValue={record.description}
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

export default TransactionsModal;
