import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { SiEventstore } from 'react-icons/si'; // Logo icon

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo and Brand */}
        <a
          href="/"
          className="flex items-center space-x-3 text-2xl font-semibold tracking-wide hover:text-blue-400 transition duration-300"
        >
          <SiEventstore className="text-blue-400 text-3xl" />
          <span>Event Management</span>
        </a>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl hover:text-blue-400 transition duration-300"
          >
            {dropdownOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (optional text) */}
      {dropdownOpen && (
        <div className="lg:hidden bg-gray-900 text-gray-300 transition-all duration-300">
          <ul className="flex flex-col space-y-3 px-6 py-4 text-sm italic">
            <li>No menu items yet...</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
