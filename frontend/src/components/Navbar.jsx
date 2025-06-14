import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { CoffeeContext } from "./ApifetchExample";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLogin, setIsLogin, isAdmin, setIsAdmin } = useContext(CoffeeContext);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsLogin(false);
    setIsAdmin(false);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50" 
        : "bg-white/90 backdrop-blur-md shadow-lg"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        
        {/* Logo with enhanced animation */}
        <NavLink to="/" className="group">
          <div className="relative">
            <img
              src="./brand-logo.jpeg"
              alt="brand-logo"
              className="h-14 w-auto rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-semibold text-gray-800">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25 transform scale-105"
                    : "hover:text-amber-600 hover:bg-amber-50 hover:scale-105"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/25 transform scale-105"
                    : "hover:text-purple-600 hover:bg-purple-50 hover:scale-105"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {!isLogin ? (
            <NavLink
              to="/login"
              className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/25 hover:scale-105"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-red-500/25 hover:scale-105"
            >
              <span className="relative z-10">Logout</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="group relative p-2 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
          >
            <div className="w-7 h-7 relative">
              <FiMenu className={`absolute inset-0 w-7 h-7 transition-all duration-300 ${
                isOpen ? "opacity-0 rotate-45 scale-75" : "opacity-100 rotate-0 scale-100"
              }`} />
              <FiX className={`absolute inset-0 w-7 h-7 transition-all duration-300 ${
                isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-75"
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200/50"
          >
            <div className="px-4 py-6 space-y-3">
              {links.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg transform scale-105"
                          : "text-gray-700 hover:text-amber-600 hover:bg-amber-50 hover:transform hover:scale-105"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              {isAdmin && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: links.length * 0.1, duration: 0.3 }}
                >
                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg transform scale-105"
                          : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:transform hover:scale-105"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </motion.div>
              )}

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: (links.length + (isAdmin ? 1 : 0)) * 0.1, duration: 0.3 }}
                className="pt-4 border-t border-gray-200"
              >
                {!isLogin ? (
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                  >
                    Login
                  </NavLink>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                  >
                    Logout
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;