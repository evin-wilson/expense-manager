import { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import { getTotalIncomeAndExpense } from '../utilities/calculation';
import TransactionsModal from './TransactionsModal';
import AppContext from './context/AppContext';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  };
  return date.toLocaleDateString('en-US', options);
};

function RecordCard({ date, records, carryover }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { transactionrecords, deleteTransaction } = useContext(AppContext);

  const { income, expense } = getTotalIncomeAndExpense(records);

  const handleRowClick = (record) => {
    setSelectedRecord(record);
    setModalShow(true);
  };

  const handleDelete = (event, record) => {
    event.stopPropagation(); // this is to prevent the `handleRowClick`

    let index = transactionrecords.findIndex((rs) => rs.id === record.id);
    deleteTransaction(index);
  };

  return (
    <Card className='mb-3'>
      <Card.Header className='d-flex justify-content-between'>
        <div>{formatDate(date)}</div>
        <div className='ms-auto'>
          <span className='text-success '>{`+ ${income.toFixed(2)} Rs`}</span>
          <span className='text-danger ms-3'>{`- ${expense.toFixed(2)} Rs`}</span>
        </div>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                style={
                  record.transaction === 'income'
                    ? { border: '2px solid green' }
                    : { border: '2px solid red' }
                }
                onClick={() => handleRowClick(record)}
              >
                <td style={{ width: '25%' }}>{record.category}</td>
                <td style={{ width: '25%' }}>{record.note}</td>
                <td style={{ width: '25%' }}>{`${record.amount} Rs`}</td>
                <td style={{ width: '10%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
                    <button
                      style={{ maxWidth: '80px' }}
                      className='btn btn-primary'
                      onClick={(event) => handleDelete(event, record)}
                    >
                      Delete
                    </button>
                    <button style={{ maxWidth: '60px' }} className='btn btn-primary'>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {date.endsWith('01') ? (
              <tr>
                <td>
                  <div className='caryryover'>Carry-over: {carryover}</div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </Table>
        {modalShow && (
          <TransactionsModal
            show={modalShow}
            record={selectedRecord}
            onHide={() => setModalShow(false)}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default RecordCard;
