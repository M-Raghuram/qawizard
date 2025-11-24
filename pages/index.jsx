import QAForm from "../components/QAForm";

export default function Home() {
  return (
    <div style={{
      background: "black",
      minHeight: "100vh",
      padding: "40px",
      textAlign: "center",
      color: "white"
    }}>
      <h1>QA Wizard</h1>
      <p>Your AI-powered QA Judge & Bug Fix Assistant</p>

      <QAForm />
    </div>
  );
}
