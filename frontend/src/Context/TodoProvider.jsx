import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const TodoContext = createContext();
const BASE_URL = "http://localhost:3000";

export const TodoProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [todos, setTodos] = useState([]);

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/user/${user.sub}/todos/${id}`,
        updatedTodo
      );

      if (response.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
          )
        );
        console.log("Todo updated successfully");
      } else {
        console.error("Failed to update todo:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/${user.sub}/todo`,
        newTodo
      );

      if (response.status === 201) {
        setTodos((prevTodos) => [...prevTodos, response.data]);
        console.log("Todo created successfully");
      } else {
        console.error("Failed to create todo:", response.data.error);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/user/${user.sub}/todos/${id}`
      );
      if (response.status === 204) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        console.log("Todo deleted successfully");
      } else {
        console.error("Failed to delete todo:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchTodoData = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/user/${user.sub}/todos`
          );
          setTodos(response.data);
        } catch (error) {
          console.error("Error fetching todo data:", error);
        }
      };

      fetchTodoData();
    }
  }, [isAuthenticated, user]);

  return (
    <TodoContext.Provider value={{ todos, updateTodo, deleteTodo, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
