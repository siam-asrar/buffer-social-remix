# The Problem:

```Markdown
Marketing teams frequently spend hours repurposing long-form articles into platform-specific social posts (LinkedIn, X/Twitter, Instagram captions, short-form variants). 
This process is repetitive and error-prone; teams want consistent tone, platform optimization.
Hard to verify effectiveness without data.
Spans multiple systems, with  a need for follow up, scheduling metadata, and/or optional image prompts. 
```

# Solution [Email Send & Image Gen Pending]

https://6913570baa6cb71a3d68ee63--buffer-social-remix.netlify.app/

# Core Features:

```Markdown
- Content Extraction: Extract content from URLs or pasted text using a content extractor tool.
- Platform-Optimized Post Generation: Generate platform-specific posts (LinkedIn, X/Twitter, Instagram) with a tone and platform adapter tool. For pasted text, generate blog post transformations.
- Image Prompt Creation: Generate image prompts based on post text, platform, and brand tone, leveraging a generative AI image prompt tool.
- CSV Export: Export generated posts to a CSV file for easy sharing and scheduling. Output file to inspect
- Visual Canvas Summary: Create a visual canvas summary of generated posts, including at least one post from each platform. Allows for user interaction and review of social copy.
- Email Integration: Send generated posts to a specified email address with CSV attachment using production grade integration
- LLM Content Generation: Leverage LLMs, via Genkit, to generate world-usable content, using Gemini as fallback.
```

# Overview:

```Markdown
When a user types social_snippets, the system enters Social Meadia Content Creation mode.
In this mode, your goal is to transform links, pasted text, or image content into fully engaging, platform-specific social media posts ready for review and publication.

Ensure that each workflow step is executed properly and deliverabes confirmed aftert teh end of each step.

Execution Steps
Step 1: Initial Engagement
Action:
Greet the user and explain that you can convert provided content into optimized social posts.
Ask for:

Source content (link, text, or image)
Target platform
Brand tone
Post size
Number of variations
Prompt:

"I can help transform your content (via link or pasted text) into a set of unique, platform-targeted social media posts.
Please provide your source content and specify the target platform, brand tone, post size, and number of variations."

Step 2: Prompt Reframing & Canvas Visualization Setup
Action:
Prepare content for the generative engine and initialize the visualization layer.

Invoke Tools:

browse_web
content_extractor
analyze_image_content
Logic:

If a URL is provided, fetch content using browse_web or content_extractor.
If an image is uploaded, use analyze_image_content to extract insights and convert them into structured text.
Step 3: Content Ingestion & Analysis
Action:

Analyze and structure the content using relevant tools.

Invoke Tools:

reframes_prompt
create_canvas
Logic:

Use reframes_prompt to structure the raw content with brand tone and post size.
Generate the UI visualization using create_canvas.
Deliverable:

Display the Canvas Visualization Interface with:

Input parameters
Placeholder for generated posts
Step 4: Content Generation
Delegation:
Pass the structured prompt array and all parameters to the Content Creator Agent (@content_creator).

Output Format:

Subject line: Delegation to Content Creator Complete.
Logic:

Provide a brief (1–2 sentence) summary of the analyzed source content.
Generate posts (copy, suggested visuals, and hashtags) optimized for the selected platform and number of variations.
Deliverable:
Render the generated posts in the Canvas Review Screen (UI Step 2).

Step 5: Offer to Post
Action:
Prompt the user to review and decide next steps.

Prompt:

"The posts are generated and ready for review on the canvas.
Would you like to post them, email for approval, or download the assets?"

Step 6: Interaction & Final Actions
Action:
Execute the user’s selected action from the Canvas Interface (UI Step 3).

Invoke Tools:

send_email – Send posts for approval or notify the team
write_content_to_file – Export posts (e.g., CSV or Markdown)
post_to_social_media (simulation) – Publish or queue posts
Final Output
Return a confirmation message summarizing the completed final action (e.g., posted, emailed, or exported successfully).
```


Fore More: [!https://github.com/siam-asrar/buffer-social-remix/wiki](https://github.com/siam-asrar/buffer-social-remix.wiki.git)

Checkout: 

<img width="400" height="800" alt="image" src="https://github.com/user-attachments/assets/eb7093f9-3c72-47d2-a10d-3fb0503143bd" />

