import type { Hono } from "hono";

// Common transliteration map for accented and special characters
const TRANSLITERATION: Record<string, string> = {
  "a": "a", "a": "a", "a": "a", "a": "a", "a": "a", "a": "a",
  "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a",
  "è": "e", "é": "e", "ê": "e", "ë": "e",
  "ì": "i", "í": "i", "î": "i", "ï": "i",
  "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o",
  "ù": "u", "ú": "u", "û": "u", "ü": "u",
  "ý": "y", "ÿ": "y",
  "ñ": "n", "ç": "c",
  "ß": "ss", "æ": "ae", "œ": "oe",
  "ð": "d", "þ": "th",
  "À": "A", "Á": "A", "Â": "A", "Ã": "A", "Ä": "A", "Å": "A",
  "È": "E", "É": "E", "Ê": "E", "Ë": "E",
  "Ì": "I", "Í": "I", "Î": "I", "Ï": "I",
  "Ò": "O", "Ó": "O", "Ô": "O", "Õ": "O", "Ö": "O",
  "Ù": "U", "Ú": "U", "Û": "U", "Ü": "U",
  "Ý": "Y", "Ñ": "N", "Ç": "C",
  "Æ": "AE", "Œ": "OE",
  "Ð": "D", "Þ": "TH",
};

function transliterate(str: string): string {
  return str.split("").map((ch) => TRANSLITERATION[ch] || ch).join("");
}

function slugify(text: string, separator: string = "-", lowercase: boolean = true): string {
  let slug = transliterate(text);

  if (lowercase) {
    slug = slug.toLowerCase();
  }

  // Replace non-alphanumeric characters with separator
  slug = slug.replace(/[^a-zA-Z0-9]+/g, separator);

  // Remove leading/trailing separators
  slug = slug.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "");

  // Collapse multiple consecutive separators
  slug = slug.replace(new RegExp(`\\${separator}{2,}`, "g"), separator);

  return slug;
}

export function registerRoutes(app: Hono) {
  app.post("/api/slugify", async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!body?.text) {
      return c.json({ error: "Missing required field: text" }, 400);
    }

    const text: string = body.text;
    const separator: string = body.separator || "-";
    const lowercase: boolean = body.lowercase !== false;

    if (separator.length > 1) {
      return c.json({ error: "Separator must be a single character" }, 400);
    }

    const slug = slugify(text, separator, lowercase);

    return c.json({
      slug,
      original: text,
      separator,
      lowercase,
      length: slug.length,
    });
  });
}
