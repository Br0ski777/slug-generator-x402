# Slug Generator API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://slug-generator.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Generate URL-friendly slugs from text with custom separators and transliteration. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "slug-generator": {
      "url": "https://slug-generator.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://slug-generator.api.klymax402.com/api/slugify" \
  -H "Content-Type: application/json" \
  -d '{"text":"..."}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `text_generate_slug` | POST | `/api/slugify` | $0.003 | Generate a URL-friendly slug from text |

### `text_generate_slug`

Use this when you need to convert text into a URL-friendly slug for web pages, blog posts, or API endpoints. Supports custom separators, lowercase toggle, and transliteration of accented characters. Returns the slug string, original text, and character length. Do NOT use for URL shortening — use utility_shorten_url. Do NOT use for hashing — use crypto_generate_hash.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `text` | string | yes | The text to convert into a slug |
| `separator` | string | no | Character to use as word separator (default: -) |
| `lowercase` | boolean | no | Convert to lowercase (default: true) |

## Example agent prompts

- "Convert text into a URL-friendly slug for web pages, blog posts, or API endpoints"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
