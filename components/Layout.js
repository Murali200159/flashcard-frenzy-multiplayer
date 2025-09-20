import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') {
          router.push('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      backgroundAttachment: 'fixed',
      color: 'white',
      overflowX: 'hidden'
    }}>
      {/* Game Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ 
            fontFamily: "'Orbitron', monospace",
            fontSize: '2rem',
            fontWeight: '900',
            color: 'white',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            letterSpacing: '2px'
          }}>
            Flashcard Frenzy
          </div>
          
          {user && (
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <span style={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.9rem',
                maxWidth: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {user.email}
              </span>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        minHeight: 'calc(100vh - 120px)',
        padding: '2rem 1rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        {children}
      </main>

      {/* Game Footer */}
      <footer style={{ 
        background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)',
        color: 'rgba(255, 255, 255, 0.8)',
        padding: '2rem 1rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: 'auto'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            © 2025 Flashcard Frenzy Multiplayer. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Ready. Set. Learn!
          </p>
        </div>
      </footer>
    </div>
  );
}