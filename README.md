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


```html
<html>
<main>
            <div class="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-8">
                <button class="tab-button flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 active" data-tab="resources" onclick="switchTab('resources')">
                    📊 API Resources
                </button>
                <button class="tab-button flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200" data-tab="diagram" onclick="switchTab('diagram')">
                    ⚡ Try API Endpoints
                </button>
                <button class="tab-button flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200" data-tab="openapi" onclick="switchTab('openapi')">
                    📋 OpenAPI Spec
                </button>
            </div>

            <div id="tab-content">
                <div id="resources-content" class="tab-panel">
                    <div class="card overflow-hidden">
                        <div class="table-container">
                            <table class="streamlined-table">
                                <thead>
                                    <tr>
                                        <th style="width: 150px;">Method</th>
                                        <th>Actions &amp; DTO</th>
                                    </tr>
                                </thead>
                                <tbody id="apiTableBody" class="divide-y divide-gray-200 dark:divide-gray-700"><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button get" data-method="GET">
                            GET
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-get">GET</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders" data-method="GET" data-req="" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders" data-method="GET" data-req="" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-0-p4gi6n')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-0-p4gi6n" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-0-p4gi6n">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "dispatched"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button post" data-method="POST">
                            POST
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-post">POST</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders" data-method="POST" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders" data-method="POST" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            <span class="auto-badge">AUTO</span>
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-1-34c78f')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-1-34c78f" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-1-34c78f">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "dispatched"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button put" data-method="PUT">
                            PUT
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-put">PUT</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders" data-method="PUT" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders" data-method="PUT" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            <span class="auto-badge">AUTO</span>
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-2-rr14l7')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-2-rr14l7" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-2-rr14l7">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "dispatched"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button patch" data-method="PATCH">
                            PATCH
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-patch">PATCH</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders" data-method="PATCH" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders" data-method="PATCH" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            <span class="auto-badge">AUTO</span>
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-3-31npuh')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-3-31npuh" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-3-31npuh">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "dispatched"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button delete" data-method="DELETE">
                            DELETE
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-delete">DELETE</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders" data-method="DELETE" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders" data-method="DELETE" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;dispatched&quot;
}" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            <span class="auto-badge">AUTO</span>
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-4-17kpnx')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-4-17kpnx" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-4-17kpnx">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "dispatched"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button get" data-method="GET">
                            GET
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders/{workOrderId}</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-get">GET</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders/{workOrderId}" data-method="GET" data-req="" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders/{workOrderId}" data-method="GET" data-req="" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-5-pfhm4n')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-5-pfhm4n" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-5-pfhm4n">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "completed"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button post" data-method="POST">
                            POST
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders/{workOrderId}</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-post">POST</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders/{workOrderId}" data-method="POST" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders/{workOrderId}" data-method="POST" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            <span class="auto-badge">AUTO</span>
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-6-luu9dl')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-6-luu9dl" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-6-luu9dl">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "completed"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button put" data-method="PUT">
                            PUT
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders/{workOrderId}</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-put">PUT</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders/{workOrderId}" data-method="PUT" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders/{workOrderId}" data-method="PUT" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            <span class="auto-badge">AUTO</span>
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-7-6yjsuy')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-7-6yjsuy" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-7-6yjsuy">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "completed"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button patch" data-method="PATCH">
                            PATCH
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders/{workOrderId}</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-patch">PATCH</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders/{workOrderId}" data-method="PATCH" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders/{workOrderId}" data-method="PATCH" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            <span class="auto-badge">AUTO</span>
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-8-etb5i8')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-8-etb5i8" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-8-etb5i8">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "completed"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr><tr class="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-4 py-4">
                        <button class="method-button delete" data-method="DELETE">
                            DELETE
                        </button>
                        <div class="text-xs text-gray-600 mt-2 font-mono">/work-orders/{workOrderId}</div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="action-buttons mb-3">
                            <span class="tiny-method-badge tiny-method-delete">DELETE</span>
                            <button class="tiny-btn view" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="View DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"></path>
                                    <circle cx="12" cy="12" r="2.5"></circle>
                                </svg>
                                View
                            </button>
                            
                            <button class="tiny-btn copy" data-json="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Copy DTO">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zM20 5H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h12v14z"></path>
                                </svg>
                                Copy DTO
                            </button>
                            
                            <button class="tiny-btn curl" data-path="/work-orders/{workOrderId}" data-method="DELETE" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Copy cURL">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2 12h2v8h16v2H4a2 2 0 0 1-2-2v-8z"></path>
                                    <path d="M22 6v2h-4V6h4zM16 6v2h-4V6h4zM10 6v2H6V6h4z"></path>
                                </svg>
                                cURL
                            </button>
                            
                            <button class="tiny-btn try" data-path="/work-orders/{workOrderId}" data-method="DELETE" data-req="{
  &quot;id&quot;: &quot;wo-123&quot;,
  &quot;title&quot;: &quot;Inspect AC&quot;,
  &quot;status&quot;: &quot;completed&quot;
}" title="Try API">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                                </svg>
                                Try
                            </button>
                            
                            <span class="auto-badge">AUTO</span>
                        </div>
                        
                        <div class="dto-container">
                            <div class="dto-header" onclick="toggleDTO('dto-9-d8aclv')">
                                <span class="dto-title">Response DTO</span>
                                <svg class="dto-toggle" id="toggle-dto-9-d8aclv" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </div>
                            <div class="dto-content" id="dto-9-d8aclv">
                                <pre class="language-json" tabindex="0"><code class="language-json">{
  "id": "wo-123",
  "title": "Inspect AC",
  "status": "completed"
}</code></pre>
                            </div>
                        </div>
                    </td>
                </tr></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="diagram-content" class="tab-panel hidden">
                    <div class="try-it-section">
                        <h3 class="section-title">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"></path>
                            </svg>
                            Try API Endpoints
                        </h3>

                        <form class="try-it-form" id="tryItForm">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div class="form-group">
                                    <label class="form-label">Base URL</label>
                                    <input type="text" class="form-input" value="http://127.0.0.1:8089" readonly="">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">API Key</label>
                                    <input type="text" class="form-input" placeholder="Enter your API key" id="apiKey">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Limit</label>
                                    <input type="number" class="form-input" placeholder="50" id="limitParam">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Offset</label>
                                    <input type="number" class="form-input" placeholder="0" id="offsetParam">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Status</label>
                                    <select class="form-input" id="statusParam">
                                        <option value="">All statuses</option>
                                        <option value="draft">Draft</option>
                                        <option value="dispatched">Dispatched</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Endpoint</label>
                                    <select class="form-input" id="endpointSelect">
                                        <option value="/api/rest/v2/workorders">Work Orders</option>
                                        <option value="/api/rest/v2/users">Users</option>
                                        <option value="/api/rest/v2/projects">Projects</option>
                                        <option value="/api/rest/v2/clients">Clients</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" class="try-it-button">Send Request</button>
                        </form>

                        <div class="response-section">
                            <div class="response-tabs">
                                <button class="response-tab active" data-tab="response">Response</button>
                                <button class="response-tab" data-tab="headers">Headers</button>
                                <button class="response-tab" data-tab="curl">cURL</button>
                            </div>

                            <div class="response-content" id="responseContent">
                                <pre class="response-code language-json" id="responseCode">{
  "message": "Click 'Send Request' to see the response here!",
  "status": "waiting"
}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="openapi-content" class="tab-panel hidden">
                    <div class="card p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">OpenAPI YAML</h3>
                            <button id="copy-yaml-btn" class="btn btn-secondary">Copy YAML</button>
                        </div>
                        <div class="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
                            <pre class="language-yaml" tabindex="0"><code id="openapi-spec-code" class="text-green-400 text-sm font-mono language-yaml"></code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </main>
</html>
```

Checkout: 

<img width="400" height="800" alt="image" src="https://github.com/user-attachments/assets/eb7093f9-3c72-47d2-a10d-3fb0503143bd" />

