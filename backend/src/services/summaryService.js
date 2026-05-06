import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const API_URL = "https://api.scaledown.xyz/summarization/abstractive";
const API_KEY = process.env.SCALEDOWN_API_KEY;

export async function summarizeText(text, options = {}, mode = "chunk") {
  const { maxTokens = 100, wordLimit = 25 } = options;

  let instructions = "";

  if (mode === "chunk") {
    instructions = `
Extract the MOST important legal signals from this section.

PRIORITY (in order):
1. Scope (where it applies: India / outside India)
2. Core action (what the law does)
3. Exceptions (what does NOT apply)
4. Penalties or obligations (if present)

RULES:
- Include name of commision or body only if neccessary
- ALWAYS include scope if present
- Ignore definitions and terminology lists
- Do NOT introduce facts not in text
- Do NOT guess numbers or durations
- Preserve numbers exactly as given

STYLE:
- Be concise and structured
- Use '&' only as a standalone replacement for 'and'
- Prefer short phrases over full sentences

OUTPUT:
Format: actor | action | key impact
Max ${wordLimit} words
`;
  } else {
    instructions = `
Combine and refine the key legal insights into a clear summary.
Prioritize high-impact legal meaning over procedural or technical details.
Drop low-impact mechanics if space is limited.

STRUCTURE (prefer this format if possible):
Scope: ...
Core: ...
Obligations: ...
Exceptions: ...
Penalties: ...

MUST INCLUDE:
- Scope of the law
- Core actions
- Key obligations or rights
- Exceptions
- Penalties

RULES:
- If structure is used, prefix each section with the labels above
- If not, ensure these concepts are still clearly expressed
- Do NOT introduce facts not in input
- Do NOT guess or alter numbers
- Preserve monetary values only if essential
- Prefer categories over exact numeric penalties
- Prioritize meaning over formatting if conflict occurs

STYLE:
- Clear, citizen-friendly, high-density
- Use '&' only as standalone replacement for 'and'

OUTPUT:
- Max ${wordLimit} words
`;
  }

  const res = await axios.post(
    API_URL,
    {
      text,
      instructions,
      max_tokens: maxTokens
    },
    {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data.summary || "";
}
