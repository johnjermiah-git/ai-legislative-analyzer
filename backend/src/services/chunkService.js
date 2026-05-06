export function chunkDocument(text) {
  if (!text) return [];

  function removeDefinitions(text) {
    // Remove lines with "means" definitions (basic but effective)
    return text.replace(/.*means.*$/gim, "");
  }

  // Step 1: clean formatting
  let cleanText = text
    .replace(/\r/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

  // Step 2: remove definitions
  cleanText = removeDefinitions(cleanText);

  // Step 3: chunk
  const rawChunks = cleanText.split(
    /(Section\s+\d+|SECTION\s+\d+|Clause\s+\d+|\(\d+\))/
  );

  const chunks = [];
  let currentChunk = "";

  for (let part of rawChunks) {
    part = part.trim();
    if (!part) continue;

    if ((currentChunk + " " + part).length > 1500) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = part;
    } else {
      currentChunk += " " + part;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());

  return chunks;
}