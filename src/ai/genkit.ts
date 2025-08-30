import {genkit, NextJSPlugin} from 'genkit/next';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({apiKey: process.env.GEMINI_API_KEY}),
    NextJSPlugin(),
  ],
  model: 'googleai/gemini-2.5-flash',
});
