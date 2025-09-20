import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  roomCode: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true 
  },
  players: [{
    userId: { 
      type: String, 
      required: true 
    },
    score: { 
      type: Number, 
      default: 0 
    },
    joinedAt: { 
      type: Date, 
      default: Date.now 
    },
  }],
  questions: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Flashcard' 
  }],
  currentQuestionIndex: { 
    type: Number, 
    default: 0 
  },
  status: { 
    type: String, 
    enum: ['waiting', 'active', 'ended'], 
    default: 'waiting' 
  },
  startedAt: { 
    type: Date 
  },
  endedAt: { 
    type: Date 
  },
  questionsPlayed: [{
    questionId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Flashcard' 
    },
    correctPlayerId: { 
      type: String 
    },
  }],
}, {
  timestamps: true
});

export default mongoose.models.Match || mongoose.model('Match', matchSchema);