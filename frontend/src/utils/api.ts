export async function analyzeText(text: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );

  return res.json();
}