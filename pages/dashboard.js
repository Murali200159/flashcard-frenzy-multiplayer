import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { generateRoomCode } from '../lib/utils';

export default function Dashboard() {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleCreateGame = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const code = generateRoomCode();
      console.log('🎲 Creating game:', code);
      
      const response = await fetch('/api/create-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode: code }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(`Game created! Room: ${code}`);
        setTimeout(() => router.push(`/game/${code}`), 2000);
      } else {
        setError(data.error || 'Failed to create game');
      }
    } catch (err) {
      setError('Network error - please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async () => {
    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in first');
        setLoading(false);
        return;
      }
      
      const response = await fetch('/api/join-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode: roomCode.toUpperCase(), userId: user.id }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(`Joined room: ${roomCode.toUpperCase()}`);
        setTimeout(() => router.push(`/game/${roomCode.toUpperCase()}`), 2000);
      } else {
        setError(data.error || 'Room not found');
      }
    } catch (err) {
      setError('Network error - please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      backgroundAttachment: 'fixed',
      color: 'white',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '15px 20px',
        marginBottom: '30px',
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          margin: 0, 
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(255,255,255,0.5)'
        }}>
          Flashcard Frenzy Dashboard
        </h1>
      </header>

      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px' 
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #ffffff, #e5e7eb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to the Game!
        </h2>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
          Create a new game or join an existing one
        </p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.2)', 
          border: '1px solid #ef4444',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px',
          color: 'white',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.2)', 
          border: '1px solid #10b981',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px',
          color: 'white',
          textAlign: 'center'
        }}>
          {success}
        </div>
      )}

      {/* Game Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px', 
        marginBottom: '40px' 
      }}>
        {/* Create Game Card */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '20px', 
          padding: '30px', 
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'linear-gradient(135deg, #10b981, #059669)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px',
            fontSize: '24px',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          }}>
            🎲
          </div>
          <h3 style={{ 
            fontSize: '24px', 
            marginBottom: '15px', 
            color: 'white',
            fontWeight: 'bold'
          }}>
            Create New Game
          </h3>
          <p style={{ 
            fontSize: '16px', 
            marginBottom: '25px', 
            color: 'rgba(255,255,255,0.8)'
          }}>
            Be the host and challenge your friends!
          </p>
          <button
            onClick={handleCreateGame}
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '15px',
              background: loading ? '#6b7280' : 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
            }}
          >
            {loading ? 'Creating...' : '🎲 Create Game'}
          </button>
        </div>

        {/* Join Game Card */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '20px', 
          padding: '30px', 
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px',
            fontSize: '24px',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
          }}>
            🚪
          </div>
          <h3 style={{ 
            fontSize: '24px', 
            marginBottom: '15px', 
            color: 'white',
            fontWeight: 'bold'
          }}>
            Join Existing Game
          </h3>
          <p style={{ 
            fontSize: '16px', 
            marginBottom: '25px', 
            color: 'rgba(255,255,255,0.8)'
          }}>
            Enter the room code to battle!
          </p>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength="6"
              style={{ 
                width: '100%',
                padding: '12px 15px',
                borderRadius: '8px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                textAlign: 'center',
                fontSize: '18px',
                marginBottom: '10px'
              }}
              disabled={loading}
            />
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
              Enter 6-letter room code
            </p>
          </div>
          <button
            onClick={handleJoinGame}
            disabled={loading || !roomCode.trim()}
            style={{ 
              width: '100%',
              padding: '15px',
              background: (loading || !roomCode.trim()) ? '#6b7280' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: (loading || !roomCode.trim()) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!loading && roomCode.trim()) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            }}
          >
            {loading ? 'Joining...' : '🚪 Join Game'}
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '20px', 
        marginTop: '40px' 
      }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '15px', 
          padding: '20px', 
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>∞</div>
          <h4 style={{ fontSize: '18px', marginBottom: '5px' }}>Unlimited Games</h4>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Play anytime</p>
        </div>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '15px', 
          padding: '20px', 
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
          <h4 style={{ fontSize: '18px', marginBottom: '5px' }}>Real-time</h4>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Live multiplayer</p>
        </div>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '15px', 
          padding: '20px', 
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📱</div>
          <h4 style={{ fontSize: '18px', marginBottom: '5px' }}>Mobile Ready</h4>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Works on phones</p>
        </div>
      </div>
    </div>
  );
}