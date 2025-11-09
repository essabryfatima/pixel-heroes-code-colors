
import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'The First Assignment',
    puzzle: {
      type: 'variable',
      instruction: 'Vara needs to store the number of health potions. What is the correct data type for the number 10?',
      code: 'let healthPotions: ??? = 10;',
      options: ['string', 'number', 'boolean', 'array'],
      correctAnswer: 'number',
      requiredHeroId: 'variable',
    },
  },
  {
    id: 2,
    title: 'The Conditional Path',
    puzzle: {
      type: 'conditional',
      instruction: 'Sir If-Else must decide which path to take. If score is greater than 100, what message is logged?',
      code: `const score = 150;
if (score > 100) {
  console.log("Victory!");
} else {
  console.log("Try Again!");
}`,
      options: ['Victory!', 'Try Again!', 'null', 'undefined'],
      correctAnswer: 'Victory!',
      requiredHeroId: 'conditional',
    },
  },
  {
    id: 3,
    title: 'The Repetitive Bridge',
    puzzle: {
      type: 'loop',
      instruction: 'Loopy must cross the bridge by counting steps. What is the final value of "steps"?',
      code: `let steps = 0;
for (let i = 0; i < 5; i++) {
  steps = steps + 1;
}
// final value of steps?`,
      options: ['4', '5', '6', '0'],
      correctAnswer: '5',
      requiredHeroId: 'loop',
    },
  },
  {
      id: 4,
      title: 'The Pesky Bug',
      puzzle: {
          type: 'debug',
          instruction: 'Bug Hunter spots an error! The hero name should be "Pixel". Find the line with the bug.',
          code: `1: const hero = {
2:   name: "Pixel"
3:   level: 5,
4: };`,
          options: ['1: Missing `}`', '2: Wrong name', '3: Missing comma', '4: Extra `;`'],
          correctAnswer: '3: Missing comma',
          requiredHeroId: 'debug',
      },
  },
  {
    id: 5,
    title: 'The Mystic Echo',
    puzzle: {
        type: 'recursion',
        instruction: 'Recursia calls upon her echo. What is the result of `countdown(3)`?',
        code: `function countdown(n) {
  if (n <= 0) return "Blastoff!";
  return countdown(n - 1);
}`,
        options: ['Blastoff!', '3', '0', 'Error'],
        correctAnswer: 'Blastoff!',
        requiredHeroId: 'recursion',
    },
},
];
   