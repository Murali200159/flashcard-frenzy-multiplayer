import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true 
  },
  answers: [{
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
  }],
  category: { type: String, default: 'general' },
  difficulty: { type: Number, default: 1 },
  points: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema);