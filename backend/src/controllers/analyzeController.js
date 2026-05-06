import { chunkDocument } from "../services/chunkService.js";
import { summarizeText } from "../services/summaryService.js";
import { deduplicateSummaries } from "../services/dedupService.js";

function getSummaryConfig(chunksCount) {
  const MIN_WORDS = 15;
  const MAX_WORDS = 80;

  const MIN_TOKENS = 40;
  const MAX_TOKENS = 300;

  // Normalize chunks (log scale works better for large inputs)
  const normalized = Math.log(chunksCount + 1) / Math.log(50); // 50 = tuning factor

  // Clamp between 0–1
  const factor = Math.min(Math.max(normalized, 0), 1);

  const wordLimit = Math.round(
    MIN_WORDS + factor * (MAX_WORDS - MIN_WORDS)
  );

  const maxTokens = Math.round(
    MIN_TOKENS + factor * (MAX_TOKENS - MIN_TOKENS)
  );

  return { maxTokens, wordLimit };
}

function compressOutput(text) {
  return text
    .replace(/Central Government/g, "Govt")
    .replace(/Government/g, "Govt")
    .replace(/under the .*?Act \d{4}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const analyzeBill = async (req, res) => {
  try {
    const text = typeof req.body === "string" ? req.body : req.body.text;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // 1. chunk
    const chunks = chunkDocument(text);

    // 🔥 adaptive config
    const config = getSummaryConfig(chunks.length);

    // 2. summarize each chunk
    const summaries = (await Promise.all(
      chunks.map((chunk) => summarizeText(chunk, config, "chunk"))
    )).filter(s => s && s.trim() !== "");

    // 3. deduplicate
    const cleanSummaries = deduplicateSummaries(summaries);

    // 4. final summarize
    const merged = cleanSummaries.join(" ");
    const finalSummary = compressOutput(await summarizeText(merged, config, "final"));

    res.json({
      chunks: chunks.length,
      summary: finalSummary
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};