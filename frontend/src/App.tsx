import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState<string>("checking...");

  useEffect(() => {
    fetch("http://localhost:5011/health")
      .then((res) => res.text())
      .then(setHealth)
      .catch((err) => {
        console.error(err);
        setHealth("error");
      });
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Health Check</h1>
      <p>Backend status: {health}</p>
    </main>
  );
}

export default App;