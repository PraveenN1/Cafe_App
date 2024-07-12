import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import CoffeeDetails from "./pages/CoffeeDetails";
import Home from "./pages/Home";
import Hero from "./components/Hero";

function App() {
  return (
    < div >
      <Hero/>
      <Home/>
      <CoffeeDetails/>
    </div>
  );
}

export default App;
