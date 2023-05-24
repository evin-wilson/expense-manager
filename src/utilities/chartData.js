import { getTotalIncomeAndExpense, groupByMonth } from './calculation';

const getcategoryDataForChart = (transactions, transactionType) => {
  const categoryTotals = transactions.reduce((totals, transaction) => {
    if (transaction.transaction === transactionType) {
      totals[transaction.category] = totals[transaction.category] || 0;
      totals[transaction.category] += transaction.amount;
    }
    return totals;
  }, {});

  const categoryData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#00FF7F', '#8B008B', '#FF4500'],
      },
    ],
  };

  return categoryData;
};

const getTransactionDataForChart = (transactions) => {
  // Calculate the total income and expenses
  const income = transactions.reduce((total, transaction) => {
    return transaction.transaction === 'income' ? total + transaction.amount : total;
  }, 0);
  const expenses = transactions.reduce((total, transaction) => {
    return transaction.transaction === 'expense' ? total + transaction.amount : total;
  }, 0);

  const incomeVsExpensesData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return incomeVsExpensesData;
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const barChartDataForTransactions = (transactions) => {
  const result = new Map();

  // create empty map with income and expense as 0 for each month
  for (const month of labels) {
    result.set(month, { income: 0, expense: 0 });
  }

  // Calculate income and expense for each month
  const monthRecord = groupByMonth(transactions);

  for (const [month, records] of monthRecord.entries()) {
    // change the 'YYYY=MM' date format to alphabetic
    let monthKey = new Date(month).toLocaleDateString('en-US', { month: 'long' });
    let { income, expense } = getTotalIncomeAndExpense(records);
    result.get(monthKey).income = income;
    result.get(monthKey).expense = expense;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: [...result.values()].map(({ income }) => income),
        borderColor: 'rgb(36, 115, 16)',
        minBarLength: 3,
      },
      {
        label: 'Expense',
        data: [...result.values()].map(({ expense }) => expense),
        borderColor: 'rgb(245, 39, 39)',
        minBarLength: 3,
      },
    ],
  };

  return data;
};
export { getcategoryDataForChart, getTransactionDataForChart };
