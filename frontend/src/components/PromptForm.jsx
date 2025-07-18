import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PromptForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/prompts', {
        title,
        description,
        content,
        tags: tags.split(',').map(tag => tag.trim())
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });

      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Error creating prompt');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800"
        />
      </div>

      <div>
        <label className="block mb-2">Prompt Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800"
          rows="6"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800"
          placeholder="e.g., AI, DALL·E, Coding"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Prompt
      </button>
    </form>
  );
}