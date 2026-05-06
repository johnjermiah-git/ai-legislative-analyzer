/**
 * Advanced semantic deduplication using similarity scoring
 */

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

// Jaccard similarity
function similarity(a, b) {
  const setA = new Set(tokenize(a));
  const setB = new Set(tokenize(b));

  const intersection = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;

  return union === 0 ? 0 : intersection / union;
}

export function deduplicateSummaries(summaries) {
  const result = [];
  const threshold = 0.6; // tune this

  for (let current of summaries) {
    let isDuplicate = false;

    for (let existing of result) {
      const sim = similarity(current, existing);

      if (sim > threshold) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      result.push(current);
    }
  }

  return result;
}