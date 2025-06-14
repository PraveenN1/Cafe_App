import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import FeaturedCoffees from "../components/FeaturedCoffees";
import MenuSection from "../components/MenuSection";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-slate-100">
      <Hero />
      <FeaturedCoffees/>
      <MenuSection/>
    </div>
  );
};

export default HomePage;
