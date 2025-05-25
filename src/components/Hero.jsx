import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center px-6 md:px-20 bg-gray-50">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-gray-900">Empower Your</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Business
          </span>{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">
            with Modern Solutions
          </span>
        </h1>
        <p className="text-gray-600 max-w-md mx-auto md:mx-0">
          Build responsive, scalable, and beautiful web apps that delight your users and drive growth.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
            Get Started
          </Link>
          <Link to={'/signin'} className="px-6 py-3 rounded-md font-semibold border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition">
            Login
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 mt-10 md:mt-0">
        <img
          src="https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80"
          alt="Modern technology illustration"
          className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
