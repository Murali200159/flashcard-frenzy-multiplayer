import { useEffect, useState } from 'react';

export default function PlayerList({ matchId }) {
  const [players, setPlayers] = useState([]);
  const { supabase } = useContext(SupabaseContext); // Assume a context

  useEffect(() => {
    const channel = supabase.channel(`match:${matchId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = supabase.channel(`match:${matchId}`).presenceState();
        setPlayers(Object.values(state).flat());
      })
      .subscribe(async () => {
        await supabase.channel(`match:${matchId}`).track({ online_at: new Date().toISOString() });
      });

    return () => channel.unsubscribe();
  }, [matchId, supabase]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Players</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index} className="py-1">{player.userId} (Online)</li>
        ))}
      </ul>
    </div>
  );
}