import React, { useState, useEffect, createContext } from 'react';
const BASE_URL = "https://api.sampleapis.com";
import { prices } from '../assets/prices';

// CoffeeContext
export const CoffeeContext = createContext();

// CoffeeContextProvider
const ApifetchProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/coffee/hot`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const newData = data.map((item, index) => ({
          ...item,
          price: prices[index]
        }));
        setData(newData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  return (
    <CoffeeContext.Provider value={{ data, error, loading, orders, addOrder ,setOrders }}>
      {children}
    </CoffeeContext.Provider>
  );
};

export default ApifetchProvider;
