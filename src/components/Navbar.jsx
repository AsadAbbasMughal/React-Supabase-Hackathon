import React, { useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Brand */}
        <a href="/" className="text-2xl font-semibold tracking-wide text-White hover:text-emerald-600 transition">
          Event Management System
        </a>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {dropdownOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu (Empty as per your request) */}
        <div className="hidden lg:flex space-x-6">
          {/* No links here per your request */}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {dropdownOpen && (
        <div className="lg:hidden bg-gray-800 text-gray-200">
          <ul className="flex flex-col space-y-2 px-5 py-4 border-t border-gray-700">
            {/* Empty since you want to remove all links */}
            {/* If you want to add anything here later, just add <li> items */}
            <li className="italic text-gray-400 text-sm">No menu items</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
