
import React from 'react';
import { Hero } from '../game/types';

interface HeroCardProps {
  hero: Hero;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, isSelected, onSelect }) => {
  const selectionClasses = isSelected
    ? `ring-4 ${hero.borderColor.replace('border-', 'ring-')} scale-105 shadow-lg shadow-cyan-500/20`
    : 'opacity-70 hover:opacity-100';

  return (
    <div
      onClick={() => onSelect(hero.id)}
      className={`p-4 border-2 ${hero.borderColor} ${hero.bgColor} rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectionClasses}`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{hero.icon}</div>
        <div>
          <h3 className={`font-bold text-lg ${hero.color}`}>{hero.name}</h3>
          <p className="text-slate-300 text-xs">{hero.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
   