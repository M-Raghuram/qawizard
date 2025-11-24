import UploadArea from "../components/UploadArea";
import ResultCard from "../components/ResultCard";
import { useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);
  const [logs, setLogs] = useState("");
  const [steps, setSteps] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunJudge = async () => {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    formData.append("logs", logs);
    formData.append("steps", steps);

    const res = await fetch("/api/judge/judge", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "black",
        minHeight: "100vh",
        padding: "40px",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1>QA Wizard</h1>
      <p>Your AI-powered QA Judge & Bug Fix Assistant</p>

      <UploadArea setImages={setImages} />

      <textarea
        placeholder="Paste debug logs here..."
        value={logs}
        onChange={(e) => setLogs(e.target.value)}
        style={{
          width: "80%",
          height: "150px",
          marginTop: "20px",
          padding: "10px",
        }}
      />

      <textarea
        placeholder="Paste test steps here..."
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        style={{
          width: "80%",
          height: "150px",
          marginTop: "20px",
          padding: "10px",
        }}
      />

      <button
        onClick={handleRunJudge}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "cyan",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Run Judge"}
      </button>

      {result && <ResultCard result={result} />}
    </div>
  );
}

