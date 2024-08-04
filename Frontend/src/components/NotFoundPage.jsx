import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-8xl font-bold text-gray-900"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl text-gray-600"
      >
        Oops! The page you're looking for is not found.
      </motion.p>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="px-4 py-2 text-lg font-medium text-white bg-[#f83002] rounded hover:bg-[#c43616]"
        >
          Let's go Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
