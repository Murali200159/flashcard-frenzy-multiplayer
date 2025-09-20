import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { generateRoomCode } from '../lib/utils';

export default function Dashboard() {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateGame = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const code = generateRoomCode();
      const response = await fetch('/api/create-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode: code }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTimeout(() => router.push(`/game/${code}`), 1000);
        setError('Game created! Redirecting...');
      } else {
        setError(data.error || 'Failed to create game');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async () => {
    if (!roomCode.trim()) {
      setError('Enter room code');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const response = await fetch('/api/join-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode: roomCode.toUpperCase(), userId: user.id }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTimeout(() => router.push(`/game/${roomCode.toUpperCase()}`), 1000);
        setError('Joining game...');
      } else {
        setError(data.error || 'Room not found');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="hero-section">
        <h1>Welcome to Flashcard Frenzy!</h1>
        <p>Create or join a game</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="game-cards">
        <div className="game-card">
          <h3>Create New Game</h3>
          <button onClick={handleCreateGame} disabled={loading} className="game-button">
            {loading ? 'Creating...' : 'Create Game'}
          </button>
        </div>

        <div className="game-card">
          <h3>Join Game</h3>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            className="form-input"
            maxLength="6"
          />
          <button onClick={handleJoinGame} disabled={loading || !roomCode} className="game-button">
            {loading ? 'Joining...' : 'Join Game'}
          </button>
        </div>
      </div>
    </div>
  );
}