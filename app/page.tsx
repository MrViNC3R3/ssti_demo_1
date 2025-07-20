'use client';

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const description = e.target.description.value;
    const res = await fetch("/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <main style={{ padding: 40 }}>
      <h2>SSTI Demo Form</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="description"
          placeholder='Try: ${process.env}'
          rows={3}
          style={{ width: 300, marginBottom: 8 }}
        />
        <br />
        <button type="submit">Preview</button>
      </form>
      {result && (
        <pre style={{ background: "#eee", padding: 20, marginTop: 32, maxWidth: 400, maxHeight: 200 }}>
          {result}
        </pre>
      )}
    </main>
  );
}
