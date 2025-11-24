import React from "react";

export default function ResultCard({ result }) {
  return (
    <div
      style={{
        marginTop: "30px",
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <h2>📌 Verdict: {result.verdict}</h2>
      <p><b>Confidence:</b> {result.confidence}</p>

      <h3>Summary</h3>
      <p>{result.summary}</p>

      <h3>Fixed Test Case</h3>
      <ul>
        {result.fixed_test_case?.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>

      <h3>Corrected Code Snippet</h3>
      <pre>{result.corrected_code_snippet}</pre>

      <h3>Reasoning</h3>
      <p>{result.judge_reasoning}</p>
    </div>
  );
}
