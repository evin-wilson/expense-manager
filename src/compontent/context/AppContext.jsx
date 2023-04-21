import { createContext } from 'react';
import { transactions } from '../../data/data';
import { useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = (props) => {
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
    <AppContext.Provider
      value={{
        transactionrecords,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
