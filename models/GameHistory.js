import mongoose from 'mongoose';

const gameHistorySchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  questionsPlayed: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' },
    correctPlayerId: { type: String },
  }],
  finalScores: [{
    userId: { type: String, required: true },
    score: { type: Number, required: true },
  }],
  reviewedBy: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.GameHistory || mongoose.model('GameHistory', gameHistorySchema);