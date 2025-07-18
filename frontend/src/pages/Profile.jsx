import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PromptList from '../components/PromptList';
import Navbar from '../components/Navbar';
import auth from '../auth';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const handleLogout = () => {
    auth.removeToken();
    navigate('/');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/auth/me', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      }
    };

    const fetchFavorites = async () => {
      try {
        const res = await axios.get('/api/auth/prompts/favorites', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        console.log('Favorites response:', res.data); // Debug log
        setFavorites(res.data || []);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <div className="p-6 max-w-3xl mx-auto">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-2 rounded mb-4">{error}</div>
        )}
        
        {user && (
          <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        <h3 className="text-xl font-semibold mb-4">My Favorite Prompts</h3>
        {favorites.length > 0 ? (
          <PromptList prompts={favorites} />
        ) : (
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <p className="text-gray-600 dark:text-gray-400">You have no favorites yet.</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Browse prompts and click the save button to add them to your favorites!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
