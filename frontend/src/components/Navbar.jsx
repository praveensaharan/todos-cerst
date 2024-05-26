import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4"
    >
      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/" className="text-white text-2xl font-bold">
          Todo App
        </Link>

        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 text-white focus:outline-none"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center">
            <Link
              to="/"
              className="text-blue-100 font-semibold border-2 border-blue-300 rounded-md px-4 py-2 hover:bg-blue-300 hover:text-blue-600 mr-4"
            >
              Home
            </Link>
            {isAuthenticated ? (
              <Link
                to="/"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
                className="text-blue-100 font-semibold border-2 border-red-200 rounded-md px-4 py-2 hover:bg-red-200 hover:text-red-600"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/"
                onClick={() => {
                  loginWithRedirect();
                }}
                className="text-blue-100 font-semibold border-2 border-blue-200 rounded-md px-4 py-2 hover:bg-blue-200 hover:text-blue-600"
              >
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isDropdownOpen && (
          <div className="md:hidden absolute top-10 right-4 mt-2 w-48 bg-white border rounded-md shadow-lg py-1">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={() => {
                toggleDropdown();
              }}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <Link
                to="/"
                onClick={() => {
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  });
                  toggleDropdown();
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/"
                onClick={() => {
                  loginWithRedirect();
                  toggleDropdown();
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Log In
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
