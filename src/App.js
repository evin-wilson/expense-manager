import { Row, Col } from 'react-bootstrap';
import Navigations from './compontent/Navigations';
import Home from './pages/Home';
import { AppContext } from './compontent/context/AppContext';
import { transactions } from './data/data';
import { useState } from 'react';

function App() {
  const [transactionrecords, setTransactionRecords] = useState(transactions);

  const addTransaction = (transaction) => {
    setTransactionRecords([...transactionrecords, transaction]);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = [...transactionrecords];
    updatedTransactions.splice(index, 1);
    setTransactionRecords(updatedTransactions);
  };

  const updateTransaction = (index, updatedTransaction) => {
    const updatedTransactions = [...transactionrecords];
    updatedTransactions[index] = updatedTransaction;
    setTransactionRecords(updatedTransactions);
  };
  return (
    <div className='App'>
      <Navigations />
      <div
        style={{
          paddingLeft: '300px',
          paddingRight: '80px',
          paddingTop: '80px',
          width: '100%',
        }}
      >
        <AppContext.Provider
          value={{
            transactionrecords,
            addTransaction,
            deleteTransaction,
            updateTransaction,
          }}
        >
          <Home />
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
