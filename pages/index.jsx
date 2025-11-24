export default function Home() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      background: "black",
      color: "white",
      fontFamily: "Arial"
    }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>QA Wizard</h1>
      <p style={{ fontSize: "20px", opacity: 0.7 }}>
        Your AI-powered QA Judge & Bug Fix Assistant
      </p>
    </div>
  );
}
