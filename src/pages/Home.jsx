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
