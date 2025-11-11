'use server';
/**
 * @fileOverview A flow for generating blog posts from pasted text.
 *
 * - generateBlogPostsFromText - A function that handles the blog post generation process.
 * - GenerateBlogPostsFromTextInput - The input type for the generateBlogPostsFromText function.
 * - GenerateBlogPostsFromTextOutput - The return type for the generateBlogPostsFromText function.
 */

import {ai} from '@/ai/config';
import {z} from 'genkit';

const GenerateBlogPostsFromTextInputSchema = z.object({
  text: z.string().describe('The text to generate a blog post from.'),
});
export type GenerateBlogPostsFromTextInput = z.infer<typeof GenerateBlogPostsFromTextInputSchema>;

const GenerateBlogPostsFromTextOutputSchema = z.object({
  title: z.string().describe('The generated title for the blog post.'),
  blogPost: z.string().describe('The generated blog post content.'),
});
export type GenerateBlogPostsFromTextOutput = z.infer<typeof GenerateBlogPostsFromTextOutputSchema>;

export async function generateBlogPostsFromText(input: GenerateBlogPostsFromTextInput): Promise<GenerateBlogPostsFromTextOutput> {
  return generateBlogPostsFromTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostsFromTextPrompt',
  input: {schema: GenerateBlogPostsFromTextInputSchema},
  output: {schema: GenerateBlogPostsFromTextOutputSchema},
  prompt: `You are an expert blog post writer.

  Your task is to analyze the following text and generate a concise, engaging title and a well-structured blog post from it.

  Text: {{{text}}}
  
  Please provide the output in the specified structured format.`,
});

const generateBlogPostsFromTextFlow = ai.defineFlow(
  {
    name: 'generateBlogPostsFromTextFlow',
    inputSchema: GenerateBlogPostsFromTextInputSchema,
    outputSchema: GenerateBlogPostsFromTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
