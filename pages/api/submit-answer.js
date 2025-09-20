import dbConnect from '../../lib/mongo';
import Flashcard from '../../models/Flashcard';
import Match from '../../models/Match';
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { matchId, userId, answer } = req.body;

  try {
    const match = await Match.findById(matchId);
    if (!match || match.status !== 'active') return res.status(400).json({ error: 'Match not active' });

    const question = await Flashcard.findById(match.questions[match.currentQuestionIndex]);
    const isCorrect = question.answers.find(a => a.isCorrect && a.text === answer);

    if (isCorrect) {
      const player = match.players.find(p => p.userId === userId);
      if (player && !match.questionsPlayed.find(q => q.questionId.toString() === question._id.toString())) {
        player.score += 1;
        match.questionsPlayed.push({ questionId: question._id, correctPlayerId: userId });
        await match.save();

        await supabase.channel(`match:${matchId}`).send({
          type: 'broadcast',
          event: 'score-update',
          payload: { userId, score: player.score },
        });

        if (match.currentQuestionIndex + 1 < match.questions.length) {
          match.currentQuestionIndex += 1;
          const nextQuestion = await Flashcard.findById(match.questions[match.currentQuestionIndex]);
          await supabase.channel(`match:${matchId}`).send({
            type: 'broadcast',
            event: 'new-question',
            payload: { question: nextQuestion.question, answers: nextQuestion.answers },
          });
        } else {
          await endMatch(matchId); // Call end-match logic
        }
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function endMatch(matchId) {
  const match = await Match.findById(matchId);
  match.status = 'ended';
  match.endedAt = new Date();
  const history = await GameHistory.create({
    matchId,
    questionsPlayed: match.questionsPlayed,
    finalScores: match.players.map(p => ({ userId: p.userId, score: p.score })),
  });
  await match.save();
  await supabase.channel(`match:${matchId}`).send({
    type: 'broadcast',
    event: 'game-ended',
    payload: { matchId },
  });
}