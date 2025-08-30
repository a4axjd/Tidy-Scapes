import {genkit} from 'genkit';
import {nextJS} from '@genkit-ai/next';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({apiKey: process.env.GEMINI_API_KEY}),
    nextJS(),
  ],
  model: 'googleai/gemini-2.5-flash',
});
