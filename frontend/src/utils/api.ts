export async function analyzeText(text: string) {
  const res = await fetch("http://localhost:5000/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return res.json();
}