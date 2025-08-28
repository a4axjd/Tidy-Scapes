'use server';
/**
 * @fileOverview Defines a Genkit flow for a simple chatbot.
 *
 * - chat - An async function that takes a user's message and returns a response.
 * - ChatInput - The input type for the chat function (string).
 * - ChatOutput - The return type for the chat function (string).
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatInputSchema = z.string();
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string();
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(message: ChatInput): Promise<ChatOutput> {
  return chatFlow(message);
}

const prompt = ai.definePrompt({
    name: 'chatbotPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are a friendly and helpful chatbot for TidyScapes, a landscaping company.
    Your goal is to answer user questions about our services (Lawn Care, Garden Design, Tree Services), our portfolio, and our company.
    Keep your answers concise and encouraging.
    If you don't know the answer to a question, politely say so and suggest they contact the company directly through the contact form.

    User message: {{{prompt}}}
    `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (message) => {
    const { output } = await prompt(message);
    return output!;
  }
);
