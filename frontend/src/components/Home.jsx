import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaRegClock,
  FaRegCalendarAlt,
  FaRegTrashAlt,
  FaTasks,
  FaPlus,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { BiLayer } from "react-icons/bi";
import { GoNote } from "react-icons/go";
import { useTodo } from "../Context/TodoProvider";

const Home = () => {
  const { todos, deleteTodo } = useTodo();
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    deleteTodo(id);
    console.log("Deleted Todo:", id);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered todo data based on search query
  const filteredTodoData = todos
    ? todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation when component mounts
        className="bg-gradient-to-r from-purple-500 to-indigo-500 py-12"
      >
        <div className="container mx-auto px-4">
          <div className="bg-blue-500 text-white p-6 rounded-lg mb-8 shadow-md">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              <FaTasks className="inline-block mr-2 text-yellow-300" />
              Welcome to our Awesome Todo List!
            </h2>

            <p className="mb-4 text-lg">
              Start organizing your tasks and boost your productivity with our
              intuitive todo list application.
            </p>

            <Link
              className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-4 rounded-full mt-4 transition duration-300"
              to="/form"
            >
              <FaPlus className="inline-block mr-2" />
              Create
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Your Todo List
          </h1>

          {/* Search input */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -20 }} // Initial animation state
            animate={{ scale: 1, opacity: 1, y: 0 }} // Animation when component mounts
            transition={{ duration: 0.5, delay: 0.2 }} // Animation duration with delay
            className="mx-auto max-w-lg rounded-lg p-4 bg-gradient-to-r from-purple-500 to-indigo-500 overflow-hidden hover:shadow-xl relative"
          >
            <input
              type="text"
              placeholder="Search by Title or Description"
              className="rounded-xl border-2 border-blue-300 w-full px-4 py-3 text-gray-800 focus:outline-none transition-all duration-300 hover:border-blue-500 focus:border-blue-500 bg-white hover:bg-gray-100"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <motion.svg
              whileHover={{ scale: 1.2 }} // Scale up on hover
              whileTap={{ scale: 0.8 }} // Scale down on tap
              className="absolute right-6 top-7 h-6 w-6 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ opacity: 0, x: 20 }} // Initial animation state
              animate={{ opacity: 1, x: 0 }} // Animation when component mounts
              transition={{ duration: 0.5, delay: 0.3 }} // Animation duration with delay
            >
              <motion.path
                d="M15 19l-7-7 7-7"
                initial={{ pathLength: 0, pathOffset: 1 }} // Initial animation state
                animate={{ pathLength: 1, pathOffset: 0 }} // Animation when component mounts
                transition={{ duration: 0.5, delay: 0.4 }} // Animation duration with delay
              />
            </motion.svg>
          </motion.div>

          {/* Render filtered Todo Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredTodoData.map((todo) => (
              <motion.div
                key={todo.id}
                whileHover={{
                  scale: 1.05,
                  rotate: Math.random() < 0.5 ? -3 : 3,
                }}
                className={`shadow-lg rounded-lg overflow-hidden ${
                  todo.priority === "High"
                    ? "bg-red-300"
                    : todo.priority === "Medium"
                    ? "bg-yellow-300"
                    : todo.priority === "Low"
                    ? "bg-green-300"
                    : ""
                }`}
              >
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Title: {todo.title}
                    </h2>
                    <div className="flex items-center mb-2">
                      <FaRegClock className="mr-2" />
                      <span className="text-gray-700">
                        Status: {todo.status}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <FaRegCalendarAlt className="mr-2" />
                      <span className="text-gray-700">Date: {todo.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <BiLayer className="mr-2" />
                      <span className="text-gray-700 mr-2">
                        Priority: {todo.priority}
                      </span>
                    </div>

                    <div className="relative flex items-center mb-2">
                      <GoNote className="mr-2" /> Description:
                      <p
                        className="absolute text-gray-700 mt-2 overflow-hidden top-4 left-2 font-light text-sm"
                        style={{
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {todo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-10">
                    <Link
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full mr-2"
                      to={`/view/${todo.id}`}
                    >
                      <FaExternalLinkAlt className="" />
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-4 rounded-full"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <FaRegTrashAlt className="" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
