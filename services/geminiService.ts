
import { GoogleGenAI } from "@google/genai";
import { Puzzle } from '../game/types';

export const getHint = async (puzzle: Puzzle): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key not configured. Cannot fetch hint.";
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `You are a friendly programming tutor for a beginner's game. A player is stuck on the following puzzle. Provide a simple, one-sentence hint without giving away the direct answer.
---
Puzzle Instruction: ${puzzle.instruction}
Code:
${puzzle.code}
---
Hint:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching hint from Gemini:", error);
    return "Couldn't get a hint right now. Please try again later.";
  }
};
   