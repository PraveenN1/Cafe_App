import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import CoffeeDetails from "./pages/CoffeeDetails";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header/>
      <Home/>
      <CoffeeDetails/>
    </>
  );
}

export default App;
