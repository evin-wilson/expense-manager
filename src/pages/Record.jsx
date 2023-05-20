import { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import Charts from '../compontent/Charts';
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

const firstDayOfMonth = (date) => {
  let temp = new Date(date.getFullYear(), date.getMonth(), 1);
  const year = temp.getFullYear();
  const month = (temp.getMonth() + 1).toString().padStart(2, '0');
  const day = temp.getDate().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  return dateString;
};

const Record = () => {
  const { transactionrecords } = useContext(AppContext);
  const [monthSelected, setMonthSelected] = useState(new Date());
  const [recordMap, setrecordMap] = useState(new Map());
  const [flattenedTransactionRecords, setFlattenedTransactionRecords] = useState([]);
  const [carryOverAmount, setCarryOverAmount] = useState(0);
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

  const monthRecordMap = recordMap.get(monthSelected.toISOString().substring(0, 7)) || new Map();

  return (
    <>
      <div className='d-flex justify-content-around'>
        {flattenedTransactionRecords.length !== 0 ? (
          <>
            <Charts chartData={getcategoryDataForChart(flattenedTransactionRecords)} />
            <Charts chartData={getTransactionDataForChart(flattenedTransactionRecords)} />
            <Charts chartData={getcategoryDataForChart(flattenedTransactionRecords)} />
          </>
        ) : (
          <div>No data...</div>
        )}
      </div>
      <br />
      <MonthSelector month={monthSelected} setMonth={setMonthSelected} />
      {[...monthRecordMap.entries()].map(([date, records]) => (
        <RecordCard key={date} date={date} records={records} carryover={carryOverAmount} />
      ))}
      {monthRecordMap.size === 0 ? (
        <RecordCard
          key={firstDayOfMonth(monthSelected)}
          date={firstDayOfMonth(monthSelected)}
          records={new Array()}
          carryover={carryOverAmount}
        />
      ) : null}
    </>
  );
};

export default Record;
