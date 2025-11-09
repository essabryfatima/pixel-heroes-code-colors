
export interface Hero {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  bgColor: string;
}

export interface Puzzle {
  type: string;
  instruction: string;
  code: string;
  options: string[];
  correctAnswer: string;
  requiredHeroId: string;
}

export interface Level {
  id: number;
  title: string;
  puzzle: Puzzle;
}
   