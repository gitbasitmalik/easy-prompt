import React, { useState, useContext } from 'react';
import axios from 'axios';
import auth from '../auth';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';
import Navbar from '../components/Navbar';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      auth.setToken(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
