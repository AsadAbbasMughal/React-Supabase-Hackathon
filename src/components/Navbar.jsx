import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content px-5 shadow-md">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost text-gray-300 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 rounded-box w-52"
          >
            <li><a className="hover:text-white">Home</a></li>
            <li><a className="hover:text-white">About</a></li>
            <li><a className="hover:text-white">Services</a></li>
            <li><a className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl text-white">Mini hackaton</a>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a className="hover:text-white">Home</a></li>
          <li><a className="hover:text-white">About</a></li>
          <li><a className="hover:text-white">Services</a></li>
          <li><a className="hover:text-white">Contact</a></li>
        </ul>
      </div>

      
    </div>
  );
};

export default Navbar;
