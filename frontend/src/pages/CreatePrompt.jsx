import React, { useState, useContext } from 'react';
import axios from 'axios';
import auth from '../auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { DarkModeContext } from '../context/DarkModeContext';

export default function CreatePrompt() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await axios.post(
        '/api/auth/prompts',
        { 
          title, 
          description, 
          content, 
          tags: tags.split(',').map((t) => t.trim()).filter(t => t)
        },
        {
          headers: {
            'x-auth-token': auth.getToken(),
          },
        }
      );
      navigate(`/prompts/${res.data._id}`);
    } catch (err) {
      console.error('Error creating prompt:', err);
      setError(err.response?.data?.msg || 'Error creating prompt');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Prompt</h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded mb-4 border dark:border-red-700">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border dark:border-gray-600 rounded-lg h-20 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border dark:border-gray-600 rounded-lg h-40 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
          
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Create Prompt
          </button>
        </form>
      </div>
    </div>
  );
}
