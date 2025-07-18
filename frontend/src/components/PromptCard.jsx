import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import auth from '../auth';

export default function PromptCard({ prompt }) {
  const user = auth.getUser();
  const [liked, setLiked] = useState(prompt.likes?.includes(user?.id) || false);
  const [likesCount, setLikesCount] = useState(prompt.likes?.length || 0);
  const [saved, setSaved] = useState(false); // You might want to pass this as a prop

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!auth.isAuthenticated()) {
      alert('Please login to like prompts');
      return;
    }

    try {
      const res = await axios.post(
        `/api/auth/prompts/${prompt._id}/like`,
        {},
        {
          headers: {
            'x-auth-token': auth.getToken(),
          },
        }
      );
      setLiked(res.data.liked);
      setLikesCount(res.data.likesCount);
    } catch (err) {
      console.error('Error liking prompt:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!auth.isAuthenticated()) {
      alert('Please login to save prompts');
      return;
    }

    try {
      const res = await axios.post(
        `/api/auth/prompts/${prompt._id}/save`,
        {},
        {
          headers: {
            'x-auth-token': auth.getToken(),
          },
        }
      );
      setSaved(res.data.saved);
    } catch (err) {
      console.error('Error saving prompt:', err);
    }
  };

  return (
    <Link to={`/prompts/${prompt._id}`} className="block">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition-shadow">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{prompt.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
          {prompt.description}
        </p>
        
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-wrap gap-1">
            {prompt.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {prompt.tags?.length > 3 && (
              <span className="text-xs text-gray-500">+{prompt.tags.length - 3}</span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            By {prompt.createdBy?.name || 'Anonymous'}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleLike}
              className={`px-3 py-1 rounded text-sm ${
                liked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              ❤️ {likesCount}
            </button>
            
            <button 
              onClick={handleSave}
              className={`px-3 py-1 rounded text-sm ${
                saved 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              📌
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
