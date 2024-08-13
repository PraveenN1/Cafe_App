import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';


const Navbar=()=>{
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 ">
      <div className="container mx-auto flex space-x-10 items-center p-2">
        <Link to='/'><img src='./brand-logo.jpeg' alt="brand-logo" className='h-20 w-full rounded-full'/></Link>
        <div className="hidden md:flex space-x-8 text-xl ">
          <Link to="/" className="hover:text-amber-600 ">Home</Link>
          <Link to="/menu" className="hover:text-amber-600">Menu</Link>
          <Link to="/about" className="hover:text-amber-600">About</Link>
          <Link to="/contact" className="hover:text-amber-600">Contact</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <Link to="/" className="block hover:text-amber-600 ">Home</Link>
          <Link to="/menu" className="block hover:text-amber-600">Menu</Link>
          <Link to="/about" className="block hover:text-amber-600">About</Link>
          <Link to="/contact" className="block hover:text-amber-600">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;