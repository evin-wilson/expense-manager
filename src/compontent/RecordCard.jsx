import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import TransactionsModal from './TransactionsModal';

const getTotalIncomeAndExpense = (records) => {
  let income = 0.0;
  let expense = 0.0;
  records.map((record) => {
    if (record.transaction === 'income') {
      income += record.amount;
    } else {
      expense += record.amount;
    }
  });
  return { income, expense };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  };
  return date.toLocaleDateString('en-US', options);
};

function RecordCard({ date, records }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { income, expense } = getTotalIncomeAndExpense(records);

  const handleRowClick = (record) => {
    setSelectedRecord(record);
    setModalShow(true);
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
                <td style={{ width: '25%' }}>{record.date}</td>
                <td style={{ width: '25%' }}>{`${record.amount} Rs`}</td>
                <td style={{ width: '25%' }}>{record.category}</td>
                <td style={{ width: '25%' }}>{record.note}</td>
              </tr>
            ))}
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
