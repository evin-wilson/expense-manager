import Dashboard from '../compontent/Dashboard';
import RecordCard from '../compontent/RecordCard';
import { transactions } from '../data/data';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day.toString().padStart(2, '0')}-${month
    .toString()
    .padStart(2, '0')}-${year}`;
}

const groupedTransactions = transactions.reduce((acc, transaction) => {
  const date = formatDate(transaction.date);
  if (!acc[date]) {
    acc[date] = [transaction];
  } else {
    acc[date].push(transaction);
  }
  return acc;
}, {});

const Home = () => {
  return (
    <>
      <div className='d-flex justify-content-around'>
        <Dashboard />
        <Dashboard />
        <Dashboard />
      </div>
      <br />
      {Object.entries(groupedTransactions).map(([date, records]) => (
        <RecordCard key={date} date={date} records={records} />
      ))}
    </>
  );
};

export default Home;
