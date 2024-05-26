import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useAuth0 } from "@auth0/auth0-react";

const Features = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation when component mounts
      className="bg-gradient-to-r from-purple-500 to-indigo-500 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="bg-blue-500 text-white p-6 rounded-lg mb-8 shadow-md">
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Welcome to our <span className="text-yellow-300">Awesome</span> Todo
            List!
          </h2>
          <p className="text-lg text-gray-200 mb-4">
            Log in now to start{" "}
            <span className="text-yellow-300">managing</span> your tasks more{" "}
            <span className="text-yellow-300">effectively</span>!
          </p>
          <Link
            to="/"
            onClick={() => {
              loginWithRedirect();
            }}
            className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-md mt-4 transition duration-300"
          >
            Log In
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: Login and Logout */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }} // Scale up and rotate on hover
            className="bg-pink-300 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Login and Logout</h2>
              <p className="text-gray-700">
                Users can log in using a username and password and log out when
                they're done.
              </p>
            </div>
          </motion.div>

          {/* Feature 2: Navigation and Routing */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }} // Scale up and rotate on hover
            className="bg-green-300 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Navigation and Routing
              </h2>
              <p className="text-gray-700">
                Implement navigation using React Router. The application has a
                login page and a dashboard page.
              </p>
            </div>
          </motion.div>

          {/* Feature 3: Todo List */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }} // Scale up and rotate on hover
            className="bg-yellow-300 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Todo List</h2>
              <p className="text-gray-700">
                Display a list of todo items fetched from a mock API endpoint.
                Each todo item has a title, description, and status.
              </p>
            </div>
          </motion.div>

          {/* Feature 4: CRUD Operations */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -3 }} // Scale up and rotate on hover
            className="bg-blue-300 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">CRUD Operations</h2>
              <p className="text-gray-700">
                Implement basic CRUD operations for todo items. Users can
                create, read, update, and delete todo items.
              </p>
            </div>
          </motion.div>

          {/* Feature 5: Search */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }} // Scale up and rotate on hover
            className="bg-purple-300 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Search</h2>
              <p className="text-gray-700">
                Implement a search feature that allows users to search for todo
                items by title or description.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Features;
