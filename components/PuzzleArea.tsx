
import React from 'react';
import { Level, Hero } from '../game/types';
import CodeBlock from './CodeBlock';

interface PuzzleAreaProps {
  level: Level;
  selectedHero: Hero | null;
  onAnswerSubmit: (answer: string) => void;
  feedback: 'correct' | 'incorrect' | '';
}

const PuzzleArea: React.FC<PuzzleAreaProps> = ({ level, selectedHero, onAnswerSubmit, feedback }) => {
  const { puzzle } = level;
  const isCorrectHeroSelected = selectedHero?.id === puzzle.requiredHeroId;

  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 p-6 rounded-lg w-full">
      <h2 className="text-xl md:text-2xl text-cyan-300 mb-2">Challenge: {level.title}</h2>
      <p className="text-slate-300 mb-4 text-sm md:text-base">{puzzle.instruction}</p>
      
      <CodeBlock code={puzzle.code} />

      {!isCorrectHeroSelected && selectedHero && (
        <div className="p-3 mb-4 text-center text-yellow-300 bg-yellow-900/50 border border-yellow-500 rounded-lg text-xs">
          This puzzle requires <span className="font-bold">{puzzle.requiredHeroId}</span> abilities.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {puzzle.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerSubmit(option)}
            disabled={!isCorrectHeroSelected}
            className={`w-full p-3 text-sm md:text-base text-center text-white rounded-md transition-all duration-200 
              ${!isCorrectHeroSelected 
                ? 'bg-slate-600 cursor-not-allowed opacity-50' 
                : 'bg-slate-700 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      {feedback === 'correct' && (
        <div className="mt-4 p-3 text-center text-green-300 bg-green-900/50 border border-green-500 rounded-lg">
          Correct! Well done, Hero!
        </div>
      )}
      {feedback === 'incorrect' && (
        <div className="mt-4 p-3 text-center text-red-300 bg-red-900/50 border border-red-500 rounded-lg">
          Not quite. Try that again!
        </div>
      )}
    </div>
  );
};

export default PuzzleArea;
   