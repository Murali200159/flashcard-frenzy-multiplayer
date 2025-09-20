import dbConnect from '../../lib/mongo';
import Match from '../../models/Match';
import GameHistory from '../../models/GameHistory';
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { matchId } = req.body;

  try {
    const match = await Match.findById(matchId);
    if (!match || match.status !== 'active') return res.status(400).json({ error: 'Invalid match' });

    match.status = 'ended';
    match.endedAt = new Date();
    await match.save();

    const history = await GameHistory.create({
      matchId,
      questionsPlayed: match.questionsPlayed,
      finalScores: match.players.map(p => ({ userId: p.userId, score: p.score })),
    });

    await supabase.channel(`match:${matchId}`).send({
      type: 'broadcast',
      event: 'game-ended',
      payload: { matchId },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}