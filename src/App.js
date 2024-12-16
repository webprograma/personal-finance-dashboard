import React, { useContext, useState } from 'react';
import { CurrencyContext } from './context/CurrencyContext';
import { TransactionContext } from './context/TransactionContext';
import { Container, Row, Col, Form, Button, Table, Spinner } from 'react-bootstrap';
import Chart from 'react-apexcharts';

const App = () => {
  const { rates, baseCurrency, setBaseCurrency, loading } = useContext(CurrencyContext);
  const { transactions = [], addTransaction } = useContext(TransactionContext);

  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  const handleConversion = (e) => {
    e.preventDefault();
    if (!rates || !rates[baseCurrency]) {
      setConvertedAmount('Conversion rate not available');
      return;
    }
    const conversionRate = rates[baseCurrency];
    setConvertedAmount((parseFloat(amount) * conversionRate).toFixed(2));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid transaction amount greater than 0');
      return;
    }   
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      category: 'General',
      date: new Date().toLocaleDateString(),
      description: 'Sample transaction',
    };
    addTransaction(newTransaction);
    setAmount('');
  };

  const safeTransactions = Array.isArray(transactions) ? transactions.filter(t => t && typeof t.amount === 'number') : [];

console.log("Transactions:", transactions);
console.log("Safe Transactions for Chart:", safeTransactions);


const chartOptions = {
  series: [
    {
      data: safeTransactions.length > 0 ? safeTransactions.map((t) => t.amount || 0) : [0],
    },
  ],
  chart: {
    type: 'line',
  },
};


  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Personal Finance Dashboard</h1>
        </Col>
      </Row>

      {loading ? (
        <Row className="mt-5 text-center">
          <Col>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6}>
              <Form onSubmit={handleConversion}>
                <Form.Group>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Base Currency</Form.Label>
                  <Form.Select
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                  >
                    {Object.keys(rates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button type="submit" className="mt-3">
                  Convert
                </Button>
              </Form>

              {convertedAmount && (
                <h5 className="mt-3">Converted Amount: {convertedAmount}</h5>
              )}
            </Col>

            <Col md={6}>
              <Form onSubmit={handleAddTransaction}>
                <Form.Group>
                  <Form.Label>Transaction Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" className="mt-3">
                  Add Transaction
                </Button>
              </Form>

              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {safeTransactions.length > 0 ? (
                    safeTransactions.map((t) => (
                      <tr key={t.id}>
                        <td>{t.date || "N/A"}</td>
                        <td>{t.category || "N/A"}</td>
                        <td>{t.amount || 0}</td>
                        <td>{t.description || "No description"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No transactions available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <Chart options={chartOptions} series={chartOptions.series} type="line" height={350} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default App;
