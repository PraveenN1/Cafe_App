import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { CoffeeContext } from "./ApifetchExample";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, setIsLogin, isAdmin ,setIsAdmin} = useContext(CoffeeContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsLogin(false); 
    setIsAdmin(false); 
    localStorage.removeItem("isLogin");
    localStorage.removeItem("isAdmin"); 
    navigate("/"); 
  };
  

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-2">
        <NavLink to="/">
          <img
            src="./brand-logo.jpeg"
            alt="brand-logo"
            className="h-20 w-auto rounded-full"
          />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-xl font-semibold">
          {[
            { to: "/", label: "Home" },
            { to: "/menu", label: "Menu" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-amber-600"
                  : "hover:text-amber-600 transition-colors duration-300"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Dashboard visible only to Admin */}
          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-amber-600"
                  : "hover:text-amber-600 transition-colors duration-300"
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* Login / Logout Button */}
          {!isLogin ? (
            <NavLink
              to="/login"
              className="bg-black px-5 py-2 rounded-lg text-white hover:text-amber-500 transition-colors duration-300"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-black px-5 py-2 rounded-lg text-white hover:text-amber-500 transition-colors duration-300"
            >
              Log out
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={32} /> : <FiMenu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-md p-4 space-y-4 text-center font-semibold"
        >
          {[
            { to: "/", label: "Home" },
            { to: "/menu", label: "Menu" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)} // Close menu on link click
              className={({ isActive }) =>
                isActive
                  ? "inline-block border-b-4 border-amber-600"
                  : "block hover:text-amber-600 transition-colors duration-300"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Dashboard visible only to Admin */}
          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              onClick={() => setIsOpen(false)} // Close menu on link click
              className={({ isActive }) =>
                isActive
                  ? "block border-b-4 border-amber-600"
                  : "block hover:text-amber-600 transition-colors duration-300"
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* Login / Logout Button */}
          {!isLogin ? (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)} // Close menu on login
              className="block bg-black px-5 py-2 rounded-lg text-white hover:text-amber-500 transition-colors duration-300"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="block bg-black px-5 py-2 rounded-lg text-white hover:text-amber-500 transition-colors duration-300"
            >
              Log out
            </button>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
