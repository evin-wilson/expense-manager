import { useContext, useState } from 'react';
import Dashboard from '../compontent/Dashboard';
import RecordCard from '../compontent/RecordCard';
import AppContext from '../compontent/context/AppContext';
import { Button, ButtonGroup } from 'react-bootstrap';
import {
  getTransactionDataForChart,
  getcategoryDataForChart,
} from '../utilities/chartData';

/**
 * this function is to get transactions record group by month and date
 * return value is a map with month (yyyy-mm) as key and
 * value is a map of date as key and Array of records as value
 * Map<month, Map<date, List(records)>>
 */
function groupedTransactions(transactions) {
  const transactionMap = new Map();

  transactions.forEach((transaction, index) => {
    const month = transaction.date.slice(0, 7); // extract month from the date
    const date = transaction.date.slice(0, 10); // extract date from the date

    if (!transactionMap.has(month)) {
      transactionMap.set(month, new Map());
    }

    if (!transactionMap.get(month).has(date)) {
      transactionMap.get(month).set(date, []);
    }

    transactionMap
      .get(month)
      .get(date)
      .push({ ...transaction, index });
  });
  // console.log(transactionMap);
  return transactionMap;
}

const MonthSelector = ({ month, setMonth }) => {
  return (
    <ButtonGroup>
      <Button
        onClick={() => setMonth(new Date(month.setMonth(month.getMonth() - 1)))}
      >
        &lt;
      </Button>
      <Button>
        {month.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </Button>
      <Button
        onClick={() => setMonth(new Date(month.setMonth(month.getMonth() + 1)))}
      >
        &gt;
      </Button>
    </ButtonGroup>
  );
};

const Home = () => {
  const { transactionrecords } = useContext(AppContext);
  const [monthSelected, setMonthSelected] = useState(new Date());
  const recordMap = groupedTransactions(transactionrecords);
  const monthRecordMap = recordMap.get(
    monthSelected.toISOString().substring(0, 7)
  );

  return (
    <>
      <div className='d-flex justify-content-around'>
        <Dashboard chartData={getcategoryDataForChart(transactionrecords)} />
        <Dashboard chartData={getTransactionDataForChart(transactionrecords)} />
        <Dashboard chartData={getcategoryDataForChart(transactionrecords)} />
      </div>
      <br />
      <MonthSelector month={monthSelected} setMonth={setMonthSelected} />
      {monthRecordMap !== undefined ? (
        [...monthRecordMap.entries()].map(([date, records]) => (
          <RecordCard key={date} date={date} records={records} />
        ))
      ) : (
        <h2 className='text-center'>No records found.</h2>
      )}
    </>
  );
};

export default Home;
