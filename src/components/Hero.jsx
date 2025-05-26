import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import asadImg from '../assets/images/pic.jpg'

const ProjectMaker = () => {
  return (
    <motion.div
      className="flex flex-col items-center mt-24 mb-10"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="relative group w-28 h-28 rounded-full overflow-hidden shadow-2xl border-4 border-blue-500">
        <img
          src={asadImg} // Replace with your project maker pic URL or local path
          alt="Project Maker - Asad Abbas"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-600 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-full">
          <p className="text-white text-sm font-semibold">Asad Abbas</p>
        </div>
      </div>

      <p className="mt-4 text-gray-300 font-medium text-lg">Project Maker</p>

      {/* Social Icons */}
      <div className="flex space-x-6 mt-3 text-blue-400 text-2xl">
        <a
          href="https://lked.in/xny2"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="hover:text-blue-600 transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/AsadAbbasMughal"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-700 transition"
        >
          <FaGithub />
        </a>
     
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Container */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 space-y-10 md:space-y-0">

        {/* Left Text Content */}
        <motion.div
          className="flex-1 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="text-white">Empower Your</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Business
            </span>{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">
              with Modern Solutions
            </span>
          </h1>
          <p className="text-gray-300 max-w-md mx-auto md:mx-0">
            Build responsive, scalable, and beautiful web apps that delight your users and drive growth.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
              Get Started
            </Link>
            <Link to="/signin" className="px-6 py-3 rounded-md font-semibold border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 bg-white">
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://img.freepik.com/free-vector/security-system-background_23-2147626787.jpg"
            alt="Modern tech"
            className="w-full max-w-lg mx-auto rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Scroll Animation Section */}
      <motion.div
        className="bg-gray-800 py-20 px-6 text-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          We use the latest technologies to ensure your web applications are fast, secure, and scalable.
          Let your product shine with sleek design and smooth user experience.
        </p>
      </motion.div>

      {/* Project Maker Section */}
      <ProjectMaker />

      {/* Footer */}
      <motion.footer
        className="bg-black py-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-gray-400">
          Created with 💻 by{" "}
          <span className="text-blue-500 font-semibold">Asad Abbas</span>
        </p>
      </motion.footer>
    </section>
  );
};

export default Hero;
