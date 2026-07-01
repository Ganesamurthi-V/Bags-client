import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * robots.txt — explicitly welcomes the AI answer-engine crawlers.
 *
 * A blocked bot zeroes out that platform: if GPTBot is disallowed, ChatGPT
 * cannot cite this site; same for Perplexity, Claude, Gemini, and Apple.
 * Listing them with an empty `disallow` allow-lists them unambiguously.
 */

// Crawlers that fetch pages to answer / cite in LLM products.
const AI_BOTS = [
  "GPTBot", // OpenAI training + browsing
  "OAI-SearchBot", // OpenAI SearchGPT
  "ChatGPT-User", // ChatGPT live browsing
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity live fetch
  "ClaudeBot", // Anthropic crawler
  "Claude-Web", // Anthropic browsing
  "anthropic-ai", // Anthropic (legacy)
  "Google-Extended", // Gemini / Vertex training
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot", // Amazon / Alexa
  "Bytespider", // TikTok / Doubao
  "CCBot", // Common Crawl (feeds many LLMs)
  "cohere-ai", // Cohere
  "Meta-ExternalAgent", // Meta AI
  "DuckAssistBot", // DuckDuckGo AI
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Traditional + AI crawlers: full access, keep the design tool's transient
      // routes and Next internals out of the index.
      {
        userAgent: ["*", ...AI_BOTS],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
