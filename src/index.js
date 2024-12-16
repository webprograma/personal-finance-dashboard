import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CurrencyProvider } from './context/CurrencyContext';
import { TransactionProvider } from './context/TransactionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </CurrencyProvider>
  </React.StrictMode>
);
