import Card from 'react-bootstrap/Card';
import { Table } from 'react-bootstrap';

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
  // console.log({ income: income, expense: expense });
  return { income, expense };
};

function RecordCard({ date, records }) {
  const { income, expense } = getTotalIncomeAndExpense(records);
  return (
    <Card className='mb-3'>
      <Card.Header className='d-flex justify-content-between'>
        <div>{date}</div>
        <div className='ms-auto'>
          <span className='text-success '>{`+ ${income.toFixed(2)} Rs`}</span>
          <span className='text-danger ms-3'>{`- ${expense.toFixed(
            2
          )} Rs`}</span>
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
              >
                <td style={{ width: '25%' }}>{record.date}</td>
                <td style={{ width: '25%' }}>{record.amount}</td>
                <td style={{ width: '25%' }}>{record.category}</td>
                <td style={{ width: '25%' }}>{record.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default RecordCard;
