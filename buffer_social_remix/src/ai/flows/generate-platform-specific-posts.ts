'use server';
/**
 * @fileOverview Generates platform-specific social media posts from input content.
 *
 * - generatePlatformPosts - A function that generates social media posts tailored for different platforms.
 * - GeneratePlatformPostsInput - The input type for the generatePlatformPosts function.
 * - GeneratePlatformPostsOutput - The output type for the generatePlatformPosts function.
 */

import {ai} from '@/ai/config';
import {z} from 'genkit';

const PlatformEnum = z.enum(['linkedin', 'x/twitter', 'instagram', 'facebook', 'reddit', 'general']);
const PostSizeEnum = z.enum(['small', 'medium', 'large']);

const wordCountMap = {
  small: '50-100 words',
  medium: '150-200 words',
  large: '250+ words',
};

const GeneratePlatformPostsInputSchema = z.object({
  content: z.string().describe('The content to be adapted into social media posts.'),
  platform: PlatformEnum.describe('The social media platform to generate a post for.'),
  brandTone: z.string().optional().describe('The desired brand tone for the posts.'),
  postSize: PostSizeEnum.describe('The desired length of the post.'),
  postVariations: z.number().min(1).max(3).describe('The number of post variations to generate.'),
});
export type GeneratePlatformPostsInput = z.infer<typeof GeneratePlatformPostsInputSchema>;

// We need a separate schema for the prompt itself to include the resolved word count
const PromptInputSchema = GeneratePlatformPostsInputSchema.extend({
  wordCount: z.string(),
});

const GeneratePlatformPostsOutputSchema = z.object({
  posts: z.array(z.string()).describe('The generated social media posts for the specified platform.'),
});
export type GeneratePlatformPostsOutput = z.infer<typeof GeneratePlatformPostsOutputSchema>;

export async function generatePlatformPosts(input: GeneratePlatformPostsInput): Promise<GeneratePlatformPostsOutput> {
  return generatePlatformPostsFlow(input);
}

const generatePlatformPostsPrompt = ai.definePrompt({
  name: 'generatePlatformPostsPrompt',
  input: {schema: PromptInputSchema},
  output: {schema: GeneratePlatformPostsOutputSchema},
  prompt: `You are an expert social media manager and content strategist. Your task is to generate {{postVariations}} **unique and distinct** social media posts tailored for the specified platform, using the provided content, brand tone, and post size.

**CRITICAL INSTRUCTIONS:**
- You MUST generate exactly {{postVariations}} post(s).
- Each post MUST be approximately {{wordCount}} in length.
- Do NOT simply rephrase the same core message. Create a unique angle, focus, or format for each variation.
- For a blog post about AI:
  - **LinkedIn:** Focus on the professional/business implications.
  - **X/Twitter:** Create a short, punchy, and provocative take.
  - **Instagram:** Write a more personal or visually-driven caption.
- The posts must be engaging, perfectly formatted for the platform, and include relevant, targeted hashtags.

**Platform:** {{platform}}
**Brand Tone:** {{brandTone}}
**Post Length:** {{wordCount}}
**Number of Variations:** {{postVariations}}
**Source Content:**
{{{content}}}

---

Generate the {{postVariations}} new, unique, and platform-specific social media posts below. For 'general', create versatile posts that can be used across multiple platforms. Structure your output as a JSON object with a "posts" array containing the generated content strings.`,
});


const generatePlatformPostsFlow = ai.defineFlow(
  {
    name: 'generatePlatformPostsFlow',
    inputSchema: GeneratePlatformPostsInputSchema,
    outputSchema: GeneratePlatformPostsOutputSchema,
  },
  async (input) => {
    // Resolve the word count before calling the prompt
    const wordCount = wordCountMap[input.postSize];
    
    const { output } = await generatePlatformPostsPrompt({
      ...input,
      wordCount, // Pass the resolved string to the prompt
    });
    return output!;
  }
);
