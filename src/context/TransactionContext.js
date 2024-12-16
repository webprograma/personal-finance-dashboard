import { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    if (transaction && typeof transaction.amount === 'number' && transaction.amount > 0) {
      setTransactions((prev) => [...prev, transaction]);
    } else {
      console.error("Invalid transaction", transaction);
    }
  };
  

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
