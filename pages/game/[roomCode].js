import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

export default function GameRoom() {
  const router = useRouter();
  const { roomCode } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions = [
    { q: "What is 2 + 2?", a: ["3", "4", "5", "6"], c: 1 },
    { q: "Capital of France?", a: ["London", "Paris", "Berlin", "Madrid"], c: 1 },
    { q: "Closest planet to Sun?", a: ["Venus", "Mercury", "Earth", "Mars"], c: 1 },
    { q: "What is H2O?", a: ["Salt", "Sugar", "Water", "Oxygen"], c: 2 },
    { q: "How many continents?", a: ["5", "6", "7", "8"], c: 2 }
  ];

  const handleAnswer = (index) => {
    setAnswered(true);
    if (index === questions[currentQuestion].c) {
      setScore(score + 10);
      setTimeout(() => {
        if (currentQuestion < 4) {
          setCurrentQuestion(currentQuestion + 1);
          setAnswered(false);
        } else {
          alert("Game Over! Score: " + score + 10);
          router.push('/dashboard');
        }
      }, 1500);
    } else {
      setTimeout(() => {
        if (currentQuestion < 4) {
          setCurrentQuestion(currentQuestion + 1);
          setAnswered(false);
        } else {
          alert("Game Over! Score: " + score);
          router.push('/dashboard');
        }
      }, 1500);
    }
  };

  const leaveGame = () => router.push('/dashboard');

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>
        Game Room: {roomCode}
      </h1>
      
      <div style={{ 
        background: '#3b82f6', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h2>Q{currentQuestion + 1}/5</h2>
          <div>Score: {score}</div>
        </div>
        <h3>{questions[currentQuestion].q}</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {questions[currentQuestion].a.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={answered}
            style={{
              padding: '15px',
              background: answered ? (index === questions[currentQuestion].c ? '#10b981' : '#ef4444') : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: answered ? 'not-allowed' : 'pointer'
            }}
          >
            {answer}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={leaveGame} style={{ 
          background: '#ef4444', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer' 
        }}>
          Leave Game
        </button>
      </div>
    </div>
  );
}