import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  async function send() {
    try {
      const response = await fetch("http://localhost:5011/reverse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
        }),
      });

      const data = await response.text();

      setResult(data);
    }
    catch (err) {
      console.error(err);
      setResult("error");
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Reverse String</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={send}>
        Send
      </button>

      <p>Result: {result}</p>
    </main>
  );
}

export default App;