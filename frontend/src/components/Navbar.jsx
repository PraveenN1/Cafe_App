import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
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
        <NavLink to='/'>
          <img src='./brand-logo.jpeg' alt="brand-logo" className='h-20 w-auto rounded-full' />
        </NavLink>
        <div className="hidden md:flex space-x-8 text-xl font-semibold">
          {/* Apply border-bottom style when the link is active */}
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? 'border-b-4 border-amber-600' : 'hover:text-amber-600 transition-colors duration-300'
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/menu" 
            className={({ isActive }) => 
              isActive ? 'border-b-4 border-amber-600' : 'hover:text-amber-600 transition-colors duration-300'
            }
          >
            Menu
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? 'border-b-4 border-amber-600' : 'hover:text-amber-600 transition-colors duration-300'
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              isActive ? 'border-b-4 border-amber-600' : 'hover:text-amber-600 transition-colors duration-300'
            }
          >
            Contact
          </NavLink>
        </div>
        <div className="md:hidden absolute right-5">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={32} /> : <FiMenu size={32} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-md p-4 space-y-4 text-center font-semibold"
        >
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? 'border-b-4 border-amber-600' : 'block hover:text-amber-600 transition-colors duration-300'
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/menu" 
            className={({ isActive }) => 
              isActive ? 'border-b-4 border-amber-600' : 'block hover:text-amber-600 transition-colors duration-300'
            }
          >
            Menu
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? 'border-b-4 border-amber-600' : 'block hover:text-amber-600 transition-colors duration-300'
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              isActive ? 'border-b-4 border-amber-600' : 'block hover:text-amber-600 transition-colors duration-300'
            }
          >
            Contact
          </NavLink>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
