import Dashboard from '../compontent/Dashboard';
import RecordCard from '../compontent/RecordCard';
import { transactions } from '../data/data';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const groupedTransactions = transactions.reduce((acc, transaction) => {
  const date = formatDate(transaction.date);
  if (!acc[date]) {
    acc[date] = [transaction];
  } else {
    acc[date].push(transaction);
  }
  return acc;
}, {});

const getcategoryDataForChart = () => {
  const categoryTotals = transactions.reduce((totals, transaction) => {
    if (transaction.transaction === 'expense') {
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
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#00FF7F',
          '#8B008B',
          '#FF4500',
        ],
      },
    ],
  };

  return categoryData;
};

const getTransactionDataForChart = () => {
  // Calculate the total income and expenses
  const income = transactions.reduce((total, transaction) => {
    return transaction.transaction === 'income'
      ? total + transaction.amount
      : total;
  }, 0);
  const expenses = transactions.reduce((total, transaction) => {
    return transaction.transaction === 'expense'
      ? total + transaction.amount
      : total;
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
const Home = () => {
  return (
    <>
      <div className='d-flex justify-content-around'>
        <Dashboard chartData={getcategoryDataForChart()} />
        <Dashboard chartData={getTransactionDataForChart()} />
        <Dashboard chartData={getcategoryDataForChart()} />
      </div>
      <br />
      {Object.entries(groupedTransactions).map(([date, records]) => (
        <RecordCard key={date} date={date} records={records} />
      ))}
    </>
  );
};

export default Home;
