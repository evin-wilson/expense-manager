import Card from 'react-bootstrap/Card';
import { Table } from 'react-bootstrap';

function RecordCard({ date, records }) {
  return (
    <Card>
      <Card.Header>{date}</Card.Header>
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
                <td>{record.date}</td>
                <td>{record.amount}</td>
                <td>{record.category}</td>
                <td>{record.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default RecordCard;
