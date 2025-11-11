'use server';
/**
 * @fileOverview Extracts relevant content from a given URL.
 *
 * - extractContentFromURL - A function that extracts content from a URL.
 * - ExtractContentFromURLInput - The input type for the extractContentFromURL function.
 * - ExtractContentFromURLOutput - The return type for the extractContentFromURL function.
 */

import {ai} from '@/ai/config';
import {z} from 'genkit';
import * as cheerio from 'cheerio';

const fetchAndScrapeUrl = ai.defineTool(
  {
    name: 'fetchAndScrapeUrl',
    description: 'Fetches content from a URL and scrapes it for the main text content.',
    inputSchema: z.object({
      url: z.string().describe('The URL to scrape.'),
    }),
    outputSchema: z.string(),
  },
  async ({url}) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Remove script, style, nav, footer, header, and aside elements
      $('script, style, nav, footer, header, aside').remove();

      // Get text from the body, attempting to find main content areas
      let text = '';
      const mainContentSelectors = ['article', 'main', '.main', '#main', '.post', '#content'];
      for (const selector of mainContentSelectors) {
          if ($(selector).length) {
              text = $(selector).text();
              break;
          }
      }

      // If no main content area is found, get all body text as a fallback
      if (!text) {
          text = $('body').text();
      }

      // Simple text cleanup to remove excessive whitespace
      const cleanedText = text.replace(/\s\s+/g, ' ').trim();
      
      if (!cleanedText) {
        return `Failed to retrieve content from the URL. The page might be empty or require JavaScript.`;
      }

      return cleanedText;

    } catch (e: any) {
      console.error(`Failed to scrape ${url}`, e);
      // Return a message to the LLM so it knows the scrape failed.
      return `Failed to retrieve content from the URL. The error was: ${e.message}`;
    }
  }
);


const ExtractContentFromURLInputSchema = z.object({
  url: z.string().describe('The URL to extract content from.'),
});
export type ExtractContentFromURLInput = z.infer<typeof ExtractContentFromURLInputSchema>;

const ExtractContentFromURLOutputSchema = z.object({
  title: z.string().describe('The title of the content.'),
  content: z.string().describe('The extracted content from the URL.'),
});
export type ExtractContentFromURLOutput = z.infer<typeof ExtractContentFromURLOutputSchema>;

export async function extractContentFromURL(input: ExtractContentFromURLInput): Promise<ExtractContentFromURLOutput> {
  return extractContentFromURLFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractContentFromURLPrompt',
  input: {schema: z.object({ scrapedContent: z.string() }) },
  output: {schema: ExtractContentFromURLOutputSchema},
  prompt: `You are an expert content summarizer. Your job is to extract the main title and a concise summary from the provided text content.
  
  Please provide the extracted title and content in the specified structured format.
  
  Content:
  {{{scrapedContent}}}
  `,
});


const extractContentFromURLFlow = ai.defineFlow(
  {
    name: 'extractContentFromURLFlow',
    inputSchema: ExtractContentFromURLInputSchema,
    outputSchema: ExtractContentFromURLOutputSchema,
  },
  async ({ url }) => {
    // Step 1: Explicitly call the tool to scrape the content.
    const scrapedContent = await fetchAndScrapeUrl({ url });
    
    if (scrapedContent.startsWith('Failed to retrieve content') || !scrapedContent) {
      // If scraping fails, return a specific error object that the UI can handle.
      return { title: 'Scraping Failed', content: 'Could not retrieve meaningful content from the URL. This often happens with sites that require a login, use heavy JavaScript, or have strong bot protection. Please try pasting the text directly.' };
    }

    // Step 2: Pass the scraped content to the prompt for summarization.
    const {output} = await prompt({ scrapedContent });
    return output!;
  }
);
