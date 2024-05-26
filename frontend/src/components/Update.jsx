import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useTodo } from "../Context/TodoProvider";
import { RxUpdate } from "react-icons/rx";

const Update = () => {
  const { todos, updateTodo } = useTodo();
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedTodo = todos.find((todo) => todo.id == id);
    setTodo(selectedTodo);
  }, [id, todos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    if (todo) {
      updateTodo(todo.id, todo);
      console.log("Updated Todo:", todo);
      // Navigate to the view page after saving changes
      navigate(`/view/${todo.id}`);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, width: "50%" }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500"
      >
        {todo && (
          <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg mb-10">
            <div className="mb-6">
              <p className="text-lg text-gray-600 font-semibold mb-2">Title:</p>
              <input
                type="text"
                name="title"
                value={todo.title}
                onChange={handleInputChange}
                className="text-3xl font-bold mb-4 text-purple-600 border-b-2 border-gray-300 focus:outline-none focus:border-purple-600 w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-lg text-gray-600 font-semibold mb-1">
                  Status:
                </p>
                <select
                  name="status"
                  value={todo.status}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 px-4 mb-4 border border-transparent rounded-md focus:outline-none focus:border-yellow-400 bg-white text-gray-800"
                >
                  <option value="" disabled hidden>
                    Select Status
                  </option>
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div>
                <p className="text-lg text-gray-600 font-semibold mb-1">
                  Priority:
                </p>
                <select
                  name="priority"
                  value={todo.priority}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 px-4 mb-4 border border-transparent rounded-md focus:outline-none focus:border-yellow-400 bg-white text-gray-800"
                >
                  <option value="" disabled hidden>
                    Select Priority
                  </option>
                  <option value="Low">Low</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
              <div>
                <p className="text-lg text-gray-600 font-semibold mb-1">
                  Date:
                </p>
                <input
                  type="date"
                  name="date"
                  value={todo.date}
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 mb-4 border border-transparent rounded-md focus:outline-none focus:border-yellow-400 bg-white text-gray-800"
                />
              </div>
            </div>
            <div className="mb-6">
              <p className="text-lg text-gray-600 font-semibold mb-2">
                Description:
              </p>
              <textarea
                name="description"
                value={todo.description}
                onChange={handleInputChange}
                style={{ whiteSpace: "pre-wrap" }}
                rows="8"
                className="text-lg text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-purple-600 w-full"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <Link
                to={`/view/${todo.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" bg-blue-100 px-5 py-5 rounded-full mr-1 hover:bg-purple-200 "
              >
                <FaArrowLeft className="text-purple-600 text-xl" />
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-100 px-5 py-5 rounded-full mr-1 hover:bg-orange-200"
                onClick={handleSaveChanges}
              >
                <RxUpdate className="text-blue-600 text-2xl" />
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Update;
