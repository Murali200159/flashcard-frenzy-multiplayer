import dbConnect from '../../lib/mongo';
import Match from '../../models/Match';
import Flashcard from '../../models/Flashcard';
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { roomCode } = req.body;

  try {
    const match = await Match.findOne({ roomCode, status: 'waiting' });
    if (!match || match.players.length < 1) return res.status(400).json({ error: 'Invalid match' });

    const questions = await Flashcard.aggregate([{ $sample: { size: 5 } }]); // 5 random questions
    match.questions = questions.map(q => q._id);
    match.status = 'active';
    match.startedAt = new Date();
    await match.save();

    const firstQuestion = questions[0];
    await supabase.channel(`match:${roomCode}`).send({
      type: 'broadcast',
      event: 'new-question',
      payload: { question: firstQuestion.question, answers: firstQuestion.answers },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}