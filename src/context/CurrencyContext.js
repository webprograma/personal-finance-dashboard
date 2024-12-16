import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        if (response.data && response.data.rates) {
          setRates(response.data.rates);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching currency rates", error);
        // Fallback values
        setRates({ USD: 1, EUR: 0.85, GBP: 0.75 });
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  return (
    <CurrencyContext.Provider value={{ rates, baseCurrency, setBaseCurrency, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};