import { useState } from "react";

type TranslateResponse = {
  originalText: string;
  translatedText: string;
  targetLanguage: string;
};

function App() {
  const [input, setInput] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("EN");
  const [result, setResult] = useState<TranslateResponse | null>(null);

  async function translate() {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: TranslateResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(null);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Fake Translator</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        cols={40}
        placeholder="번역할 문장을 입력하세요"
      />

      <br />

      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="EN">English</option>
        <option value="JA">Japanese</option>
        <option value="KO">Korean</option>
      </select>

      <button onClick={translate}>Translate</button>

      {result && (
        <section>
          <h2>Result</h2>
          <p>Original: {result.originalText}</p>
          <p>Target: {result.targetLanguage}</p>
          <p>Translated: {result.translatedText}</p>
        </section>
      )}
    </main>
  );
}

export default App;