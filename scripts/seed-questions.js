const mongoose = require('mongoose');
const Flashcard = require('../models/Flashcard');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcard-frenzy';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: true },
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: false }
    ],
    difficulty: 1,
    points: 10
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Berlin", isCorrect: false },
      { text: "Madrid", isCorrect: false }
    ],
    difficulty: 2,
    points: 15
  },
  {
    question: "Which planet is closest to the Sun?",
    answers: [
      { text: "Venus", isCorrect: false },
      { text: "Mercury", isCorrect: true },
      { text: "Earth", isCorrect: false },
      { text: "Mars", isCorrect: false }
    ],
    difficulty: 1,
    points: 10
  },
  {
    question: "What is H2O?",
    answers: [
      { text: "Salt", isCorrect: false },
      { text: "Sugar", isCorrect