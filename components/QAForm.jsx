import { useState } from "react";

export default function QAForm() {
  const [logs, setLogs] = useState("");
  const [steps, setSteps] = useState("");
  const [images, setImages] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    setImages(files);
  }

  async function sendToAPI(endpoint) {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    formData.append("logs", logs);
    formData.append("steps", steps);

    const res = await fetch(`/api/judge/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", color: "white" }}>
      <h2>QA Judge / Fix</h2>

      <label>Upload Screenshots:</label>
      <input type="file" multiple onChange={handleImageUpload} />

      <br /><br />

      <label>Paste Logs:</label>
      <textarea
        rows="5"
        value={logs}
        onChange={(e) => setLogs(e.target.value)}
        style={{ width: "100%" }}
      />

      <br /><br />

      <label>Paste Steps:</label>
      <textarea
        rows="3"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        style={{ width: "100%" }}
      />

      <br /><br />

      <button
        style={{ padding: "10px 20px", marginRight: "10px" }}
        onClick={() => sendToAPI("judge")}
      >
        Run Judge
      </button>

      <button
        style={{ padding: "10px 20px" }}
        onClick={() => sendToAPI("fixer")}
      >
        Run Fix
      </button>

      <br /><br />

      {loading && <p>Processing...</p>}

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#222",
            borderRadius: "8px",
          }}
        >
          <h3>Result</h3>
          <pre style={{ whiteSpace: "pre-wrap", color: "#ddd" }}>
            {JSON.stringify(result, nul
