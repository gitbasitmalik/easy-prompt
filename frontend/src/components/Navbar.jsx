import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow dark:shadow-gray-700 p-4 text-gray-900 dark:text-gray-100 flex justify-between items-center">
     <Link to="/" className="text-xl font-bold">
        EasyPrompt
      </Link>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  );
}
