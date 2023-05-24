import { useContext, useEffect, useState } from 'react';

import Charts from '../compontent/Charts';
import MonthSelector from '../compontent/MonthSelector';
import RecordCard from '../compontent/RecordCard';
import AppContext from '../compontent/context/AppContext';
import { getCarryoverAmount, groupedTransactions } from '../utilities/calculation';
import { getTransactionDataForChart, getcategoryDataForChart } from '../utilities/chartData';

const firstDayOfMonth = (date) => {
  let temp = new Date(date.getFullYear(), date.getMonth(), 1);
  const year = temp.getFullYear();
  const month = (temp.getMonth() + 1).toString().padStart(2, '0');
  const day = temp.getDate().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  return dateString;
};

// To chek if the first day of month is there. if not add a empty records for that day to add the carryover
const checkFirstDayIsThere = (monthRecordMap, date) => {
  const firstday = firstDayOfMonth(date);
  if (!monthRecordMap.has(firstday)) {
    monthRecordMap.set(firstday, []);
  }
  return monthRecordMap;
};

const Record = () => {
  const { transactionrecords } = useContext(AppContext);
  const [monthSelected, setMonthSelected] = useState(new Date());
  const [recordMap, setrecordMap] = useState(new Map());
  const [flattenedTransactionRecords, setFlattenedTransactionRecords] = useState([]);
  const [carryOverAmount, setCarryOverAmount] = useState(0);
  useEffect(() => {
    setCarryOverAmount(getCarryoverAmount(monthSelected, transactionrecords));

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

  let monthRecordMap = recordMap.get(monthSelected.toISOString().substring(0, 7)) || new Map();
  monthRecordMap = checkFirstDayIsThere(monthRecordMap, monthSelected);

  return (
    <>
      <div className='d-flex justify-content-around'>
        {flattenedTransactionRecords.length !== 0 ? (
          <>
            <Charts chartData={getcategoryDataForChart(flattenedTransactionRecords, 'expense')} />
            <Charts chartData={getTransactionDataForChart(flattenedTransactionRecords)} />
            <Charts chartData={getcategoryDataForChart(flattenedTransactionRecords, 'expense')} />
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
    </>
  );
};

export default Record;
