import express from 'express';
import { registerUser, loginUser, getCurrentUser } from './controllers/userController.js';
import { createPrompt, getPrompts, getPrompt, updatePrompt, deletePrompt, likePrompt, getFavorites, savePrompt } from './controllers/promptController.js';
import { auth } from './middleware/authMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getCurrentUser);

// Prompt routes - IMPORTANT: specific routes before parameterized ones
router.get('/prompts/favorites', auth, getFavorites);
router.post('/prompts', auth, createPrompt);
router.get('/prompts', getPrompts);
router.get('/prompts/:id', getPrompt);
router.put('/prompts/:id', auth, updatePrompt);
router.delete('/prompts/:id', auth, deletePrompt);
router.post('/prompts/:id/like', auth, likePrompt);
router.post('/prompts/:id/save', auth, savePrompt);

export default router;
