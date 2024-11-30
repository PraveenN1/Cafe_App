import React, { useState, useEffect, createContext } from "react";
const BASE_URL = "https://api.sampleapis.com";
import { prices } from "../assets/prices";

// CoffeeContext
export const CoffeeContext = createContext();

// CoffeeContextProvider
const ApifetchProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(() => {
    const localData = localStorage.getItem("orders");
    return localData ? JSON.parse(localData) : [];
  });
  const [isLogin, setIsLogin] = useState(() => {
    const savedLogin = localStorage.getItem("isLogin");
    return savedLogin ? JSON.parse(savedLogin) : false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("isAdmin");
    return savedAdmin ? JSON.parse(savedAdmin) : false;
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/coffee/hot`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        // Add prices to the data
        const enrichedData = data.map((coffee, index) => ({
          ...coffee,
          price: prices[index % prices.length],
        }));

        setData(enrichedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);
  useEffect(() => {
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isAdmin]);

  const logout = () => {
    setIsLogin(false);
    setIsAdmin(false);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("isAdmin");
    // localStorage.removeItem("token");
  };

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const value = {
    data,
    error,
    loading,
    orders,
    isLogin,
    isAdmin,
    setOrders,
    addOrder,
    setIsLogin,
    setIsAdmin,
    logout,
  };
  return (
    <CoffeeContext.Provider value={value}>{children}</CoffeeContext.Provider>
  );
};

export default ApifetchProvider;
