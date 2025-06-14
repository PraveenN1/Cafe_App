import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import FeaturedCoffees from "../components/FeaturedCoffees";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-slate-100">
      <Hero />
      <FeaturedCoffees/>

      {/* Menu Section */}
      <section className="bg-[#f4f1eb] py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-[#4A3C31]">Our Menu</h2>
          <Link
            to="/menu"
            className="text-xl text-[#6F4F28] underline hover:text-amber-600 transition"
          >
            View Full Menu
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
