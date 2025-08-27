'use server';
/**
 * @fileOverview This file defines a Genkit flow for visualizing landscaping ideas on a property image.
 *
 * - visualizeLandscapingIdeas - An async function that takes an image of a property and generates a visualization of landscaping ideas.
 * - VisualizeLandscapingIdeasInput - The input type for the visualizeLandscapingIdeas function.
 * - VisualizeLandscapingIdeasOutput - The return type for the visualizeLandscapingIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const VisualizeLandscapingIdeasInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the property as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  includeLawnCare: z.boolean().describe('Whether to include lawn care in the visualization.'),
  includeGardenDesign: z.boolean().describe('Whether to include garden design in the visualization.'),
  includeTreeServices: z.boolean().describe('Whether to include tree services in the visualization.'),
});
export type VisualizeLandscapingIdeasInput = z.infer<typeof VisualizeLandscapingIdeasInputSchema>;

const VisualizeLandscapingIdeasOutputSchema = z.object({
  enhancedImage: z
    .string()
    .describe('The generated image with landscaping ideas as a data URI.'),
  description: z.string().describe('A description of the landscaping ideas visualized in the image.'),
});
export type VisualizeLandscapingIdeasOutput = z.infer<typeof VisualizeLandscapingIdeasOutputSchema>;

export async function visualizeLandscapingIdeas(
  input: VisualizeLandscapingIdeasInput
): Promise<VisualizeLandscapingIdeasOutput> {
  return visualizeLandscapingIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visualizeLandscapingIdeasPrompt',
  input: {schema: VisualizeLandscapingIdeasInputSchema},
  output: {schema: VisualizeLandscapingIdeasOutputSchema},
  prompt: `You are a landscaping design visualizer. You will generate an image based on the user's property photo and landscaping preferences.

  Consider the following options for the landscaping:
  {{#if includeLawnCare}} Lawn care: Include details such as mowing, edging, and fertilization. {{/if}}
  {{#if includeGardenDesign}} Garden design: Add flower beds, shrubs, and decorative elements. {{/if}}
  {{#if includeTreeServices}} Tree services: Incorporate tree trimming, planting, or removal as needed. {{/if}}

  Here is the user's property photo:
  {{media url=photoDataUri}}

  Generate a new image of the property incorporating these landscaping ideas, and a description of the changes.
  Please make the generated image as realistic as possible.
  The description will summarize the landscaping changes you made to the image.
  `,
});

const visualizeLandscapingIdeasFlow = ai.defineFlow(
  {
    name: 'visualizeLandscapingIdeasFlow',
    inputSchema: VisualizeLandscapingIdeasInputSchema,
    outputSchema: VisualizeLandscapingIdeasOutputSchema,
  },
  async input => {
    const {media, text} = await ai.generate({
      prompt: [
        {media: {url: input.photoDataUri}},
        {
          text: `You are a landscaping design visualizer. You will generate an image based on the user's property photo and landscaping preferences.

        Consider the following options for the landscaping:
        ${input.includeLawnCare ? 'Lawn care: Include details such as mowing, edging, and fertilization.' : ''}
        ${input.includeGardenDesign ? 'Garden design: Add flower beds, shrubs, and decorative elements.' : ''}
        ${input.includeTreeServices ? 'Tree services: Incorporate tree trimming, planting, or removal as needed.' : ''}

        Generate a new image of the property incorporating these landscaping ideas, and a description of the changes.
        Please make the generated image as realistic as possible.
        The description will summarize the landscaping changes you made to the image.`,
        },
      ],
      model: googleAI.model('gemini-2.0-flash-preview-image-generation'),
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      enhancedImage: media!.url,
      description: text!,
    };
  }
);
