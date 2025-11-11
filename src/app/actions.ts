"use server";

import { boolean, z } from "zod";
import { extractContentFromURL } from "@/ai/flows/extract-content-from-url";
import { generateBlogPostsFromText } from "@/ai/flows/generate-blog-posts-from-text";
import { generatePlatformPosts } from "@/ai/flows/generate-platform-specific-posts";
import { generateImagePrompts } from "@/ai/flows/generate-image-prompts";
import { generateImageFromPrompt } from "@/ai/flows/generate-image-from-prompt";
import {
  generatePostsSchema,
  type GeneratedPost,
  type Platform,
} from "@/lib/types";

export async function generatePostsAction(prevState: any, formData: FormData) {
  const validatedFields = generatePostsSchema.safeParse({
    inputType: formData.get("inputType"),
    source: formData.get("source"),
    brandTone: formData.get("brandTone"),
    platforms: formData.getAll("platforms"),
    generateImages: formData.get("generateImages") === "on",
    postSize: formData.get("postSize"),
    postVariations: formData.get("postVariations"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    inputType,
    source,
    brandTone,
    platforms: selectedPlatforms,
    generateImages,
    postSize,
    postVariations,
  } = validatedFields.data;

  try {
    let initialContent: { title: string | null; content: string };

    if (inputType === "url") {
      const result = await extractContentFromURL({ url: source });
      if (result.title === "Scraping Failed") {
        return { error: result.content };
      }
      initialContent = { title: result.title, content: result.content };
    } else {
      const result = await generateBlogPostsFromText({ text: source });
      initialContent = { title: result.title, content: result.blogPost };
    }

    if (!initialContent.content) {
      return {
        error:
          "Could not extract any content. Please try a different URL or text.",
      };
    }

    const postPromises = selectedPlatforms.map(async (platform: Platform) => {
      const postResult = await generatePlatformPosts({
        content: initialContent.content,
        platform: platform,
        brandTone: brandTone,
        postSize: postSize,
        postVariations: postVariations,
      });

      // Map over each generated post string to create a GeneratedPost object
      return Promise.all(
        postResult.posts.map(
          async (postContent, index): Promise<GeneratedPost> => {
            let imagePrompt: string | null = null;
            let imageUrl: string | null = null;

            if (generateImages) {
              try {
                const imagePromptResult = await generateImagePrompts({
                  postText: postContent,
                  platform: platform,
                  brandTone,
                });
                imagePrompt = imagePromptResult.imagePrompt;
              } catch (e: any) {
                // Don't let image generation failure block post creation
                console.error(`Failed to generate image for ${platform}:`, e);
              }
            } else {
              if (imagePrompt) {
                const imageResult = await generateImageFromPrompt({
                  prompt: imagePrompt,
                });
                imageUrl = imageResult.imageUrl;
              }
            }

            return {
              id: `${platform}-${Date.now()}-${index}`,
              platform,
              content: postContent,
              imagePrompt: imagePrompt,
              imageUrl: imageUrl,
              isGeneratingImage: false,
            };
          }
        )
      );
    });

    const generatedPostsArrays = await Promise.all(postPromises);
    const generatedPosts = generatedPostsArrays.flat();

    return {
      posts: generatedPosts,
      initialContent,
      brandTone: brandTone,
      inputData: validatedFields.data,
    };
  } catch (e: any) {
    console.error(e);
    return {
      error:
        e.message ||
        "An unexpected error occurred during content generation. Please try again.",
    };
  }
}

export async function generateImageAction(
  post: GeneratedPost,
  brandTone: string
) {
  try {
    const imagePromptResult = await generateImagePrompts({
      postText: post.content,
      platform: post.platform,
      brandTone,
    });
    const imagePrompt = imagePromptResult.imagePrompt;

    if (!imagePrompt) {
      return { error: "Failed to generate a prompt for the image." };
    }

    const imageResult = await generateImageFromPrompt({ prompt: imagePrompt });
    return { imageUrl: imageResult.imageUrl, imagePrompt };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "Failed to generate image." };
  }
}

export async function postToPlatformAction(post: GeneratedPost) {
  try {
    // This is a mock posting function.
    // In a real application, you would use the respective platform's API.
    console.log(`--- Posting to ${post.platform} (Simulation) ---`);
    console.log("Content:", post.content);
    if (post.imageUrl) {
      console.log("Image URL:", post.imageUrl.substring(0, 100) + "...");
    }
    console.log("---------------------------------");

    return {
      success: `Post successfully shared to ${post.platform} (simulated).`,
    };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || `Failed to post to ${post.platform}.` };
  }
}

export async function sendEmailAction(email: string, posts: GeneratedPost[]) {
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    const csvHeader = "Platform,Post Content,Image Prompt,Image URL\n";
    const csvRows = posts.map((p) => {
      const content = `"${p.content.replace(/"/g, '""')}"`;
      const prompt = p.imagePrompt
        ? `"${p.imagePrompt.replace(/"/g, '""')}"`
        : '""';
      const imageUrl = p.imageUrl ? `"${p.imageUrl}"` : '""';
      return [p.platform, content, prompt, imageUrl].join(",");
    });
    const csvContent = csvHeader + csvRows.join("\n");

    // This is a mock email sending function.
    // In a real application, you would use a service like SendGrid, Resend, or Nodemailer.
    console.log("--- Email Sending Simulation ---");
    console.log("To:", email);
    console.log("Subject: Your Generated Social Media Posts from Social Remix");
    console.log(
      "Body: Attached are your generated social media posts in CSV format."
    );
    console.log("--- CSV Attachment ---");
    console.log(csvContent);
    console.log("--------------------------");

    return { success: "Email sent successfully (simulated)." };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "Failed to prepare and send the email." };
  }
}
