import React, { useState } from "react";
import { motion } from "framer-motion";
import todoImage from "../assets/todo.png";
import Navbar from "./Navbar";
import { useTodo } from "../Context/TodoProvider";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom

const TodoForm = () => {
  const { todos, addTodo } = useTodo();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  console.log(todos);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      status,
      priority,
      date,
      description,
    };
    addTodo(newTodo);
    setTitle("");
    setStatus("");
    setPriority("");
    setDate("");
    setDescription("");
    navigate("/"); // Use history.push to navigate to "/"
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create a Todo</h1>
          <div
            className="mx-auto"
            style={{ mixBlendMode: "multiply", maxWidth: "80%" }}
          >
            <img
              src={todoImage}
              alt="Todo"
              className="h-32 rounded-full"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>

        <motion.form
          onSubmit={handleOnSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md mb-16"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full py-2 px-4 mb-4 border border-transparent rounded-md focus:outline-none focus:border-yellow-400 placeholder-gray-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
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
          <input
            type="date"
            placeholder="Date to complete"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full py-2 px-4 mb-4 border border-transparent rounded-md focus:outline-none focus:border-yellow-400 bg-white text-gray-800"
          />
          <textarea
            placeholder="Description of your todo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full py-2 px-4 mb-4 border border-transparent rounded-md focus:outline-none focus:border-yellow-400 placeholder-gray-400 resize-none"
            style={{ whiteSpace: "pre-wrap" }}
            rows={8} // Reduced the number of rows for better mobile experience
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 px-4 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500 transition duration-300"
          >
            Submit
          </motion.button>
        </motion.form>
      </section>
    </>
  );
};

export default TodoForm;
