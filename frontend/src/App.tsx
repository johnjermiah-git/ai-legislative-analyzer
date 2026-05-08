import { useState } from "react";
import SummaryCard from "./components/SummaryCard";
import { analyzeText } from "./utils/api";

interface Result {
  scope: string;
  core: string;
  obligations: string;
  exceptions: string;
  penalties: string;
}

export default function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const data = await analyzeText(text);
      const parsed = parseSummary(data.summary);
      setResult(parsed);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-2 text-white">
          AI Legislative Analyzer
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Simplifying laws for citizens using AI
        </p>


        {/* Input */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <textarea
            className="w-full h-40 p-4 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            placeholder="Paste legal text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            className="mt-4 w-full py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 transition"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* Result */}
        <div className="mt-6">
          {result && <SummaryCard data={result} />}
        </div>

        <footer className="mt-16 text-center border-t border-gray-800 pt-6">
          <p className="text-blue-400 font-semibold">
            DEVELOPED BY - K. John Jermiah
          </p>

          <a
            href="https://www.linkedin.com/in/john-jermiah-513a27326/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-300 transition"
          >
            MY LINKEDIN PROFILE
          </a>
        </footer>

      </div>
    </div>
  );
}

/* ---------- PARSER ---------- */

function parseSummary(summary: string) {
  const sections: any = {};

  const parts = summary.split(
    /(?=Scope:|Core:|Obligations:|Exceptions:|Penalties:)/
  );

  parts.forEach((part) => {
    const [key, ...rest] = part.split(":");

    if (!key || rest.length === 0) return;

    sections[key.trim().toLowerCase()] = rest.join(":").trim();
  });

  return {
    scope: sections.scope || "",
    core: sections.core || "",
    obligations: sections.obligations || "",
    exceptions: sections.exceptions || "",
    penalties: sections.penalties || "",
  };
}