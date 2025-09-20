import { supabase } from '../lib/supabase';

export default function TestSupabase() {
  const testConnection = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'test123',
      });
      console.log('Supabase Response:', { data, error });
      alert(`Success: ${error ? error.message : 'Connected!'}`);
    } catch (err) {
      console.error('Supabase Error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Supabase Test</h1>
      <button onClick={testConnection} style={{ padding: '10px', margin: '10px' }}>
        Test Connection
      </button>
      <p>Check browser console (F12) for detailed logs.</p>
    </div>
  );
}