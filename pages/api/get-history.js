import dbConnect from '../../lib/mongo';
import GameHistory from '../../models/GameHistory';
import Flashcard from '../../models/Flashcard';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { matchId } = req.query;

  try {
    const history = await GameHistory.findById(matchId).populate('questionsPlayed.questionId');
    if (!history) return res.status(404).json({ error: 'History not found' });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}