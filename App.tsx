
import React, { useState, useCallback } from 'react';
import { Hero, Level } from './game/types';
import { HEROES } from './game/heroes';
import { LEVELS } from './game/levels';
import HeroCard from './components/HeroCard';
import PuzzleArea from './components/PuzzleArea';
import { getHint } from './services/geminiService';

type GameState = 'start' | 'playing' | 'level_complete' | 'game_complete';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');
  const [hint, setHint] = useState<string>('');
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const currentLevel: Level = LEVELS[currentLevelIndex];
  const selectedHero: Hero | null = HEROES.find(h => h.id === selectedHeroId) || null;

  const handleSelectHero = (id: string) => {
    if (feedback !== 'correct') {
      setSelectedHeroId(id);
      setFeedback('');
    }
  };

  const handleAnswerSubmit = (answer: string) => {
    if (answer === currentLevel.puzzle.correctAnswer) {
      setFeedback('correct');
      setTimeout(() => {
        if (currentLevelIndex < LEVELS.length - 1) {
          setGameState('level_complete');
        } else {
          setGameState('game_complete');
        }
      }, 1500);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const handleNextLevel = () => {
    setCurrentLevelIndex(prev => prev + 1);
    setGameState('playing');
    setFeedback('');
    setSelectedHeroId(null);
    setHint('');
  };

  const handleRestart = () => {
    setCurrentLevelIndex(0);
    setGameState('start');
    setFeedback('');
    setSelectedHeroId(null);
    setHint('');
  };

  const handleGetHint = useCallback(async () => {
    if (!currentLevel) return;
    setIsLoadingHint(true);
    setHint('');
    const fetchedHint = await getHint(currentLevel.puzzle);
    setHint(fetchedHint);
    setIsLoadingHint(false);
  }, [currentLevel]);
  

  const renderGameContent = () => {
    switch (gameState) {
      case 'start':
        return (
          <div className="text-center bg-slate-800/50 border-2 border-slate-700 p-8 rounded-lg">
            <h1 className="text-3xl md:text-5xl text-cyan-300 mb-4">Pixel Heroes</h1>
            <p className="text-slate-300 mb-8">Unite the heroes of code to solve the puzzles and save the digital realm!</p>
            <button onClick={() => setGameState('playing')} className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors text-xl">
              Start Adventure
            </button>
          </div>
        );
      case 'game_complete':
        return (
          <div className="text-center bg-slate-800/50 border-2 border-slate-700 p-8 rounded-lg">
            <h1 className="text-3xl md:text-5xl text-yellow-300 mb-4">Victory!</h1>
            <p className="text-slate-300 mb-8">You have mastered the code and saved the realm. Well done, Pixel Hero!</p>
            <button onClick={handleRestart} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors text-xl">
              Play Again
            </button>
          </div>
        );
      case 'level_complete':
         return (
          <div className="text-center bg-slate-800/50 border-2 border-slate-700 p-8 rounded-lg">
            <h1 className="text-3xl md:text-5xl text-green-300 mb-4">Level Complete!</h1>
            <p className="text-slate-300 mb-8">You've cleared the challenge. Prepare for the next one!</p>
            <button onClick={handleNextLevel} className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors text-xl">
              Next Level
            </button>
          </div>
        );
      case 'playing':
        return (
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Left Column: Heroes */}
            <div className="w-full lg:w-1/3 space-y-4">
                <h2 className="text-xl text-white text-center lg:text-left">Select a Hero</h2>
                {HEROES.map(hero => (
                    <HeroCard 
                        key={hero.id} 
                        hero={hero} 
                        isSelected={selectedHeroId === hero.id} 
                        onSelect={handleSelectHero}
                    />
                ))}
            </div>
            {/* Right Column: Puzzle */}
            <div className="w-full lg:w-2/3">
                 <div className="flex justify-between items-center mb-4">
                    <div className="text-white text-lg">Level {currentLevel.id} / {LEVELS.length}</div>
                    <button 
                      onClick={handleGetHint} 
                      disabled={isLoadingHint}
                      className="px-4 py-2 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 disabled:bg-slate-500 disabled:cursor-wait transition-colors">
                      {isLoadingHint ? 'Thinking...' : 'Get a Hint'}
                    </button>
                 </div>
                 {hint && !isLoadingHint && (
                    <div className="mb-4 p-3 text-sm text-yellow-200 bg-yellow-900/60 border border-yellow-600 rounded-lg">
                      <strong>Hint:</strong> {hint}
                    </div>
                 )}
                 <PuzzleArea 
                    level={currentLevel}
                    selectedHero={selectedHero}
                    onAnswerSubmit={handleAnswerSubmit}
                    feedback={feedback}
                />
            </div>
          </div>
        );
    }
  };

  return (
    <main className="bg-slate-900 min-h-screen text-white p-4 md:p-8 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/pixels.png')]">
      {renderGameContent()}
    </main>
  );
}
   