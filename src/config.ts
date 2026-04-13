import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "slug-generator",
  slug: "slug-generator",
  description: "Generate URL-friendly slugs from text with custom separators and transliteration.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/slugify",
      price: "$0.001",
      description: "Generate a URL-friendly slug from text",
      toolName: "text_generate_slug",
      toolDescription: "Use this when you need to convert text into a URL-friendly slug for web pages, blog posts, or API endpoints. Supports custom separators, lowercase toggle, and transliteration of accented characters. Returns the slug string, original text, and character length. Do NOT use for URL shortening — use utility_shorten_url. Do NOT use for hashing — use crypto_generate_hash.",
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
