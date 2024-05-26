import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

function NotFoundPage() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto mt-8"
      >
        {isAuthenticated ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">
              404 Not Found
            </h1>
            <p className="text-lg text-gray-800">
              Sorry, the page you are looking for does not exist.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-700 mb-4">
              Access Denied
            </h1>
            <p className="text-lg text-gray-800">
              Sorry, you do not have access to this page. Please login first.
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default NotFoundPage;
