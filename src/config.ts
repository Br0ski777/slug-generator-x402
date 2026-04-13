import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "slug-generator",
  slug: "slug-generator",
  description: "Convert any text into clean URL-friendly slugs. Custom separators, transliteration of accented characters, lowercase toggle.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/slugify",
      price: "$0.001",
      description: "Generate a URL-friendly slug from text",
      toolName: "text_generate_slug",
      toolDescription: `Use this when you need to convert text into a URL-friendly slug for web pages, blog posts, or API endpoints. Returns the slug string with metadata.

1. slug -- the URL-safe slug string
2. original -- the original input text
3. length -- character count of the generated slug
4. separator -- the separator character used

Example output: {"slug":"my-awesome-blog-post","original":"My Awesome Blog Post!","length":20,"separator":"-"}

Use this FOR generating URL paths from page titles, creating SEO-friendly permalinks, or building API route segments from user input. Use this BEFORE publishing content that needs clean URLs. Handles accented characters like e, a, u via transliteration.

Do NOT use for URL shortening -- use utility_shorten_url instead. Do NOT use for hashing -- use crypto_generate_hash instead. Do NOT use for unique ID generation -- use utility_generate_uuid instead.`,
      inputSchema: {
        type: "object",
        properties: {
          text: { type: "string", description: "The text to convert into a slug" },
          separator: { type: "string", description: "Character to use as word separator (default: -)" },
          lowercase: { type: "boolean", description: "Convert to lowercase (default: true)" },
        },
        required: ["text"],
      },
    },
  ],
};
