import { useEffect, useState } from 'react';

export default function Scoreboard({ matchId }) {
  const [scores, setScores] = useState({});
  const { supabase } = useContext(SupabaseContext); // Assume a context is set up

  useEffect(() => {
    const channel = supabase.channel(`match:${matchId}`)
      .on('broadcast', { event: 'score-update' }, ({ payload }) => {
        setScores(prev => ({ ...prev, [payload.userId]: payload.score }));
      })
      .subscribe();

    return () => channel.unsubscribe();
  }, [matchId, supabase]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Scoreboard</h3>
      <ul>
        {Object.entries(scores).map(([userId, score]) => (
          <li key={userId} className="py-1">{userId}: {score}</li>
        ))}
      </ul>
    </div>
  );
}