import React from "react";

export default function UploadArea({ setImages }) {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="file"
        multiple
        onChange={handleFiles}
        style={{
          padding: "10px",
          background: "#222",
          color: "white",
          borderRadius: "5px"
        }}
      />
    </div>
  );
}
