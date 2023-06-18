import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';

import { DateTime } from 'luxon';

import { LineChart } from '../compontent/LineChart';
import MonthSelector from '../compontent/MonthSelector';
import AppContext from '../compontent/context/AppContext';
import {
  calculateAnnualIncome,
  getTotalIncomeAndExpense,
  groupByMonth,
  groupedTransactions,
} from '../utilities/calculation';
import { categoryDataForChart } from '../utilities/chartData';
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
  const [monthSelected, setMonthSelected] = useState(new Date());
  const [selectedMonthTransactions, setSelectedMonthTransactions] = useState([]);

  const { transactionrecords } = useContext(AppContext);

  useEffect(() => {
    let updateMoney = incomeAndExpense(transactionrecords, new Date());
    setMoney(updateMoney);

    let monthDataMap = groupByMonth(transactionrecords);
    let monthSelectedString = DateTime.fromJSDate(monthSelected).toFormat('yyyy-MM');
    setSelectedMonthTransactions(monthDataMap.get(monthSelectedString) || new Array());
  }, [transactionrecords, monthSelected]);

  let incomeCategoryData = categoryDataForChart(selectedMonthTransactions, 'income');
  let expenceCategoryData = categoryDataForChart(selectedMonthTransactions, 'expense');
  let { income: currentIncome, expense: currentExpense } =
    getTotalIncomeAndExpense(selectedMonthTransactions);
  const annualIncome = calculateAnnualIncome(transactionrecords, monthSelected);

  return (
    <>
      <MonthSelector month={monthSelected} setMonth={setMonthSelected} />
      <section className='d-flex gap-4 pt-4 month-view'>
        <div>
          <p className='mb-1'>Income (annuualy):</p>
          <p className='fs-2'>{`${annualIncome} Rs`}</p>
        </div>
        <div>
          <p className='mb-1'>Income (monthly):</p>
          <p className='fs-2'>{`${currentIncome} Rs`}</p>
        </div>
        <div>
          <p className='mb-1'>Expense:</p>
          <p className='fs-2'>{`${currentExpense} Rs`}</p>
        </div>
        <div>
          <p className='mb-1'>Savings:</p>
          <p className='fs-2'>{`${currentIncome - currentExpense} Rs`}</p>
        </div>
      </section>
      <section className='d-flex justify-content-between mt-5' style={{ maxHeight: '350px' }}>
        <div className='col-8 pr-2' style={{ border: 'solid 1px black', maxWidth: '70%' }}>
          <LineChart />
        </div>
        <div className='col-4 d-flex justify-content-center align-items-center'>
          {incomeCategoryData.labels.length !== 0 ? (
            <Pie data={incomeCategoryData} />
          ) : (
            <div>No income data available</div>
          )}
        </div>
      </section>
      <section className='d-flex justify-content-between mt-5' style={{ maxHeight: '350px' }}>
        <div className='col-4 d-flex justify-content-center align-items-center'>
          {expenceCategoryData.labels.length !== 0 ? (
            <Pie data={expenceCategoryData} />
          ) : (
            <div>No expense data available</div>
          )}
        </div>
        <div className='col-8 pr-2' style={{ border: 'solid 1px black', maxWidth: '70%' }}>
          <LineChart />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
