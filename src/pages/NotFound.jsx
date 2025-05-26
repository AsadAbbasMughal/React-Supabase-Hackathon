import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <h1 className="text-8xl font-extrabold text-gray-800 mb-4 select-none">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-2">
        Sorry, page not found.
      </h2>
      <p className="text-gray-500 max-w-md text-center mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        aria-label="Go back to home page"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
