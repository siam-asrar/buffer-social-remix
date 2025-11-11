'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating image prompts based on post text, platform, and brand tone.
 *
 * - generateImagePrompts - A function that generates image prompts.
 * - GenerateImagePromptsInput - The input type for the generateImagePrompts function.
 * - GenerateImagePromptsOutput - The return type for the generateImagePrompts function.
 */

import {ai} from '@/ai/config';
import {z} from 'genkit';

const GenerateImagePromptsInputSchema = z.object({
  postText: z.string().describe('The text of the social media post.'),
  platform: z.string().describe('The social media platform (e.g., LinkedIn, X/Twitter, Instagram).'),
  brandTone: z.string().describe('The desired brand tone (e.g., professional, humorous, inspirational).'),
});
export type GenerateImagePromptsInput = z.infer<typeof GenerateImagePromptsInputSchema>;

const GenerateImagePromptsOutputSchema = z.object({
  imagePrompt: z.string().describe('A text prompt suitable for generating an image to accompany the social media post.'),
});
export type GenerateImagePromptsOutput = z.infer<typeof GenerateImagePromptsOutputSchema>;

export async function generateImagePrompts(input: GenerateImagePromptsInput): Promise<GenerateImagePromptsOutput> {
  return generateImagePromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImagePromptsPrompt',
  input: {schema: GenerateImagePromptsInputSchema},
  output: {schema: GenerateImagePromptsOutputSchema},
  prompt: `You are an AI assistant specializing in creating image prompts for social media posts.

  Based on the following social media post text, platform, and brand tone, generate a single, detailed image prompt that can be used to create a visually appealing image to accompany the post.

  Post Text: {{{postText}}}
  Platform: {{{platform}}}
  Brand Tone: {{{brandTone}}}

  Image Prompt:`,
});

const generateImagePromptsFlow = ai.defineFlow(
  {
    name: 'generateImagePromptsFlow',
    inputSchema: GenerateImagePromptsInputSchema,
    outputSchema: GenerateImagePromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
