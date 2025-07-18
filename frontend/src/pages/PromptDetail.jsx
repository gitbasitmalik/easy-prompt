import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function PromptDetail() {
  const { id } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await axios.get(`/api/auth/prompts/${id}`);
        setPrompt(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching prompt:', err);
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!prompt) return <div className="p-6">Prompt not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">{prompt.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{prompt.description}</p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow mb-4 whitespace-pre-wrap">
          {prompt.content}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {prompt.tags?.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
