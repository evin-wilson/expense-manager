import { createContext } from 'react';
import { useState } from 'react';

import { transactions } from '../../data/data';

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
    const existingTransaction = updatedTransactions[index];
    updatedTransactions[index] = {
      ...existingTransaction,
      transaction: updatedTransaction.transaction,
      date: updatedTransaction.date,
      amount: updatedTransaction.amount,
      category: updatedTransaction.category,
      note: updatedTransaction.note,
      description: updatedTransaction.description,
    };
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
