import { config } from 'dotenv';
config();

import '@/ai/flows/generate-platform-specific-posts.ts';
import '@/ai/flows/generate-blog-posts-from-text.ts';
import '@/ai/flows/generate-image-prompts.ts';
import '@/ai/flows/extract-content-from-url.ts';
import '@/ai/flows/generate-image-from-prompt.ts';
