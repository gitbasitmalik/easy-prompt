import React, { useEffect, useState, useContext } from 'react';
import PromptList from '../components/PromptList';
import api from '../api';
import { DarkModeContext } from '../context/DarkModeContext';
import Navbar from '../components/Navbar';

export default function Home() {
  const [prompts, setPrompts] = useState([]);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState('');
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchPrompts = async () => {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (tags) query.append('tags', tags);

      const res = await api.get(`/prompts?${query}`);
      setPrompts(res.data);
    };

    fetchPrompts();
  }, [search, tags]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Browse Prompts</h2>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
          <input
            type="text"
            placeholder="Filter by tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border p-2 rounded w-full bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        <PromptList prompts={prompts} />
      </div>
    </div>
  );
}
