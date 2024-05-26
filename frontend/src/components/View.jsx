import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useTodo } from "../Context/TodoProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const View = () => {
  const { todos, deleteTodo } = useTodo();
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedTodo = todos.find((todo) => todo.id == id);
    setTodo(selectedTodo);
  }, [id, todos]);

  const handleDelete = () => {
    if (todo) {
      deleteTodo(id);
      console.log("Deleted Todo:", todo);
      navigate("/");
    }
  }; // <-- Added closing curly brace here

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
            <h1 className="text-4xl font-bold mb-6 text-purple-600">
              {todo.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-lg text-gray-600 font-semibold mb-1">
                  Status:
                </p>
                <p className="text-lg text-gray-700">{todo.status}</p>
              </div>
              <div>
                <p className="text-lg text-gray-600 font-semibold mb-1">
                  Priority:
                </p>
                <p className="text-lg text-gray-700">{todo.priority}</p>
              </div>
              <div>
                <p className="text-lg text-gray-600 font-semibold mb-1">
                  Date:
                </p>
                <p className="text-lg text-gray-700">{todo.date}</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-lg text-gray-600 font-semibold mb-2">
                Description:
              </p>
              <p className="text-lg text-gray-700">{todo.description}</p>
            </div>
            <div className="flex justify-end">
              <Link
                to="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" bg-blue-100 px-5 py-5 rounded-full mr-1 hover:bg-purple-200 "
              >
                <FaArrowLeft className="text-purple-600 text-xl" />
              </Link>
              <Link
                to={`/update/${todo.id}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-100 px-5 py-5 rounded-full mr-1 hover:bg-blue-200"
              >
                <CiEdit className="text-2xl" />
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-100 px-5 py-5 rounded-full mr-1 hover:bg-red-200"
                onClick={handleDelete}
              >
                <MdDeleteOutline className="text-red-600 text-2xl" />
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default View;
