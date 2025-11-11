import { z } from "zod";

export const platforms = ['linkedin', 'x/twitter', 'instagram', 'facebook', 'reddit', 'general'] as const;
export type Platform = (typeof platforms)[number];

export const postSizes = ['small', 'medium', 'large'] as const;
export type PostSize = (typeof postSizes)[number];

export const generatePostsSchema = z.object({
  inputType: z.enum(['url', 'text']),
  source: z.string().min(1, 'Please enter a URL or some text.'),
  brandTone: z.string().min(1, 'Please define a brand tone.'),
  platforms: z.array(z.enum(platforms)).min(1, 'Please select at least one platform.'),
  generateImages: z.boolean(),
  postSize: z.enum(postSizes),
  postVariations: z.coerce.number().min(1, "Please generate at least one post.").max(3, "You can generate a maximum of 3 posts."),
});

export type InitialContent = {
  title: string | null;
  content: string;
};

export type GeneratedPost = {
  id: string;
  platform: Platform;
  content: string;
  imagePrompt: string | null;
  imageUrl: string | null;
  isGeneratingImage: boolean;
};

export type HistoryItem = {
    id: string;
    timestamp: string;
    request: z.infer<typeof generatePostsSchema>;
}
