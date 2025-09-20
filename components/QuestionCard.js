import { useState } from 'react';

export default function QuestionCard({ question, answers, onAnswer, disabled }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-bold mb-4">{question}</h3>
      <div className="grid grid-cols-2 gap-4">
        {answers.map((ans, index) => (
          <button
            key={index}
            onClick={() => !disabled && onAnswer(ans.text)}
            disabled={disabled}
            className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            {ans.text}
          </button>
        ))}
      </div>
    </div>
  );
}