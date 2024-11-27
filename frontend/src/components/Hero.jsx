import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden mt-10 h-[28rem] md:h-[36rem]">
      {/* Hero Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full h-full"
      >
        <img
          src="./hero2-img.jpg"
          alt="hero"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80" />
      </motion.div>

      {/* Text Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/4 sm:top-1/3 md:top-1/4 text-center left-0"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
          Bean & Brew
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="mt-4 text-lg md:text-xl font-serif lg:text-2xl text-white text-balance"
        >
          Discover the perfect blend of rich flavors and cozy ambiance. At Bean &
          Brew, we craft every cup with care and passion, inviting you to savor
          every moment.
        </motion.p>
        <Link to="/about">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            whileHover={{ scale: 1.1, backgroundColor: "#f59e0b" }} // Tailwind's amber-500 color
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-6 py-3 text-lg font-medium text-black bg-amber-400 rounded-full shadow-lg hover:bg-amber-500"
          >
            Learn More
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
