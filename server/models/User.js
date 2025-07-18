import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedPrompts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
  }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
