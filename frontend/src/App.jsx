import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route from react-router-dom
import Login from "./Pages/Login";
import HomePage from "./Pages/Hwo";
import NotFoundPage from "./Pages/Notfound";
import TodoForm from "./components/TodoForm";
import View from "./components/View";
import Update from "./components/Update";
import { useAuth0 } from "@auth0/auth0-react";
import { TodoProvider } from "./Context/TodoProvider";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {" "}
      <TodoProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <HomePage /> : <Login />}
            />
            <Route
              path="/view/:id"
              element={isAuthenticated ? <View /> : <NotFoundPage />}
            />
            <Route
              path="/update/:id"
              element={isAuthenticated ? <Update /> : <NotFoundPage />}
            />
            <Route
              path="/form"
              element={isAuthenticated ? <TodoForm /> : <NotFoundPage />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </TodoProvider>
    </>
  );
};

export default App;
