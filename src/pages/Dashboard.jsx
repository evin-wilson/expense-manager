import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { LineChart } from '../compontent/LineChart';
import AppContext from '../compontent/context/AppContext';
import { getTotalIncomeAndExpense, groupedTransactions } from '../utilities/calculation';
import './Dashboard.css';

const incomeAndExpense = (transactions, date) => {
  const monthSelected = date.toISOString().substring(0, 7);
  const recordsMap = groupedTransactions(transactions);
  if (recordsMap.has(monthSelected)) {
    const flattenedRecords = Array.from(recordsMap.get(monthSelected).values()).reduce(
      (acc, val) => acc.concat(val),
      []
    );
    return getTotalIncomeAndExpense(flattenedRecords);
  } else {
    return { income: 0, expense: 0 };
  }
};

function Dashboard() {
  const [money, setMoney] = useState({});
  const { transactionrecords } = useContext(AppContext);

  useEffect(() => {
    let updateMoney = incomeAndExpense(transactionrecords, new Date());
    setMoney(updateMoney);
  }, [transactionrecords]);

  return (
    <>
      <div className='d-flex'>
        <h1>This Month</h1>
        <div>month selected</div>
      </div>
      <section className='d-flex gap-4 pt-4 month-view'>
        <div>
          <p className='mb-1'>Income (annuualy):</p>
          <p className='fs-2'>{`${money.income} Rs`}</p>
        </div>
        <div>
          <p className='mb-1'>Income (monthly):</p>
          <p className='fs-2'>{`${money.income} Rs`}</p>
        </div>
        <div>
          <p className='mb-1'>Expense:</p>
          <p className='fs-2'>{`${money.expense} Rs`}</p>
        </div>
        <div>
          <p className='mb-1'>Savings:</p>
          <p className='fs-2'>{`${money.income - money.expense} Rs`}</p>
        </div>
      </section>
      <div className='d-flex justify-content-between mt-5' style={{ maxHeight: '350px' }}>
        <div className='col-8 pr-2' style={{ border: 'solid 1px black', maxWidth: '70%' }}>
          <LineChart />
        </div>
        <div className='col-4' style={{ backgroundColor: 'lightgreen' }}>
          Second Child Div (25%)
        </div>
      </div>
    </>
  );
}

export default Dashboard;
