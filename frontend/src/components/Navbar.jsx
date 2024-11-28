import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { CoffeeContext } from './ApifetchExample';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {isLogin,setIsLogin} = useContext(CoffeeContext);

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
          {
            !isLogin?(
              <NavLink 
            to="/login" 
            className='hover:text-amber-500 transition-colors duration-300 absolute top-7 right-32 bg-black px-5 py-2 rounded-lg text-white'
          >
            Login
          </NavLink>
            ):(
              <button 
            onClick={()=>setIsLogin(!isLogin)}
            className='hover:text-amber-500 transition-colors duration-300 absolute top-7 right-32 bg-black px-5 py-2 rounded-lg text-white'
          >
            Log out
          </button>
            )
          }
          
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
          <NavLink 
            to="/login" 
            className='hover:text-amber-500 transition-colors duration-300 absolute top-3 right-16 bg-black px-5 py-2 rounded-lg text-white'
          >
            Login
          </NavLink>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
