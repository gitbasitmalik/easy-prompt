import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downloads: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model('Prompt', promptSchema);