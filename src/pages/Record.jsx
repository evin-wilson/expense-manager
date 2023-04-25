import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import Dashboard from '../compontent/Dashboard';
import RecordCard from '../compontent/RecordCard';
import AppContext from '../compontent/context/AppContext';
import { groupedTransactions } from '../utilities/calculation';
import { getTransactionDataForChart, getcategoryDataForChart } from '../utilities/chartData';

const MonthSelector = ({ month, setMonth }) => {
  return (
    <ButtonGroup className='mb-3'>
      <Button onClick={() => setMonth(new Date(month.setMonth(month.getMonth() - 1)))}>&lt;</Button>
      <Button>
        {month.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </Button>
      <Button onClick={() => setMonth(new Date(month.setMonth(month.getMonth() + 1)))}>&gt;</Button>
    </ButtonGroup>
  );
};

const Record = () => {
  const { transactionrecords } = useContext(AppContext);
  const [monthSelected, setMonthSelected] = useState(new Date());
  const [recordMap, setrecordMap] = useState(new Map());
  const [flattenedTransactionRecords, setFlattenedTransactionRecords] = useState([]);

  useEffect(() => {
    let updatedRecordMap = groupedTransactions(transactionrecords);
    setrecordMap(updatedRecordMap);

    let monthRecordMap = updatedRecordMap.get(monthSelected.toISOString().substring(0, 7));
    if (monthRecordMap !== undefined) {
      let flattenedRecords = Array.from(monthRecordMap.values()).reduce(
        (acc, val) => acc.concat(val),
        []
      );
      setFlattenedTransactionRecords(flattenedRecords);
    } else {
      setFlattenedTransactionRecords([]);
    }
  }, [monthSelected, transactionrecords]);

  const monthRecordMap = recordMap.get(monthSelected.toISOString().substring(0, 7));
  return (
    <>
      <div className='d-flex justify-content-around'>
        {flattenedTransactionRecords.length !== 0 ? (
          <>
            <Dashboard chartData={getcategoryDataForChart(flattenedTransactionRecords)} />
            <Dashboard chartData={getTransactionDataForChart(flattenedTransactionRecords)} />
            <Dashboard chartData={getcategoryDataForChart(flattenedTransactionRecords)} />
          </>
        ) : (
          <div>No data...</div>
        )}
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

export default Record;
