import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex space-x-10 items-center p-2">
        <Link to='/'>
          <img src='./brand-logo.jpeg' alt="brand-logo" className='h-20 w-auto rounded-full' />
        </Link>
        <div className="hidden md:flex space-x-8 text-xl">
          <Link to="/" className="hover:text-amber-600 transition-colors duration-300">Home</Link>
          <Link to="/menu" className="hover:text-amber-600 transition-colors duration-300">Menu</Link>
          <Link to="/about" className="hover:text-amber-600 transition-colors duration-300">About</Link>
          <Link to="/contact" className="hover:text-amber-600 transition-colors duration-300">Contact</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-md p-4 space-y-4"
        >
          <Link to="/" className="block hover:text-amber-600 transition-colors duration-300">Home</Link>
          <Link to="/menu" className="block hover:text-amber-600 transition-colors duration-300">Menu</Link>
          <Link to="/about" className="block hover:text-amber-600 transition-colors duration-300">About</Link>
          <Link to="/contact" className="block hover:text-amber-600 transition-colors duration-300">Contact</Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
