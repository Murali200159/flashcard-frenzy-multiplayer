import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard');
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="text-center text-white max-w-md mx-auto p-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-2xl mb-8 shadow-2xl">
          <span className="text-4xl">⚡</span>
        </div>
        <h1 className="text-5xl font-black mb-4 bg-white bg-clip-text text-transparent">
          Flashcard Frenzy
        </h1>
        <p className="text-xl mb-8 text-blue-100">Multiplayer Learning Battles</p>
        
        <div className="space-y-4">
          <Link href="/register" className="block w-full bg-white text-purple-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            🎮 Create Account
          </Link>
          <Link href="/login" className="block w-full border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-200">
            🚀 Sign In
          </Link>
        </div>
        
        <p className="text-sm text-blue-200 mt-6">
          Join 1M+ players in real-time flashcard battles!
        </p>
      </div>
    </div>
  );
}