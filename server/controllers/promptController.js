import Prompt from '../models/Prompts.js';
import User from '../models/User.js';

// @route   POST /api/auth/prompts
// @desc    Create a new prompt
// @access  Private
export const createPrompt = async (req, res) => {
  const { title, description, content, tags } = req.body;

  try {
    const newPrompt = new Prompt({
      title,
      description,
      content,
      tags,
      createdBy: req.user.id,
    });

    const prompt = await newPrompt.save();
    res.status(201).json(prompt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/auth/prompts
// @desc    Get all prompts
// @access  Public
export const getPrompts = async (req, res) => {
  try {
    // Search query
    const { search, tags } = req.query;

    const query = {};

    // Text search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },     // Case-insensitive
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Tag filter
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    const prompts = await Prompt.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json(prompts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/auth/prompts/:id
// @desc    Get prompt by ID
// @access  Public
export const getPrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id).populate('createdBy', 'name');
    if (!prompt) return res.status(404).json({ msg: 'Prompt not found' });
    res.json(prompt);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Prompt not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/auth/prompts/:id
// @desc    Update a prompt
// @access  Private
export const updatePrompt = async (req, res) => {
  const { title, description, content, tags } = req.body;

  try {
    let prompt = await Prompt.findById(req.params.id);
    if (!prompt) return res.status(404).json({ msg: 'Prompt not found' });

    // Check user
    if (prompt.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, content, tags } },
      { new: true }
    );

    res.json(prompt);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Prompt not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/auth/prompts/:id
// @desc    Delete a prompt
// @access  Private
export const deletePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) return res.status(404).json({ msg: 'Prompt not found' });

    // Check user
    if (prompt.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Prompt.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Prompt removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Prompt not found' });
    }
    res.status(500).send('Server error');
  }
};
// @route   POST /api/auth/prompts/:id/like
// @desc    Like or unlike a prompt
// @access  Private
export const likePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) return res.status(404).json({ msg: 'Prompt not found' });

    const userId = req.user.id;
    const isLiked = prompt.likes.includes(userId);

    if (isLiked) {
      prompt.likes = prompt.likes.filter(id => id.toString() !== userId);
    } else {
      prompt.likes.push(userId);
    }

    await prompt.save();
    res.json({ liked: !isLiked, likesCount: prompt.likes.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/auth/prompts/favorites
// @desc    Get user's favorite prompts
// @access  Private
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedPrompts',
      populate: {
        path: 'createdBy',
        select: 'name'
      }
    });
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user.savedPrompts || []);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/auth/prompts/:id/save
// @desc    Save or unsave a prompt
// @access  Private
export const savePrompt = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const promptId = req.params.id;

    if (user.savedPrompts.includes(promptId)) {
      user.savedPrompts = user.savedPrompts.filter(id => id.toString() !== promptId);
    } else {
      user.savedPrompts.push(promptId);
    }

    await user.save();
    res.json({ saved: user.savedPrompts.includes(promptId) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
