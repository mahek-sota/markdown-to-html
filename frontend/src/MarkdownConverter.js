import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [isCached, setIsCached] = useState(false);
  const [showRaw, setShowRaw] = useState(true);

  const convertMarkdown = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/convert", {
        text: markdown,
      });
      setHtml(response.data.html);
      setIsCached(response.data.cached);
    } catch (error) {
      console.error("Error converting markdown:", error);
    }
  };

  return (
    <div className="converter">
      <textarea
        rows="10"
        placeholder="Enter Markdown..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <button onClick={convertMarkdown}>Convert</button>
      <button onClick={() => setShowRaw(!showRaw)}>
        {showRaw ? "Show Rendered HTML" : "Show Raw HTML"}
      </button>

      <div className="output">
        <h2>Converted HTML:</h2>

        {showRaw ? (
          <pre className="html-preview">
            <code>{html}</code>
          </pre>
        ) : (
          <div className="html-preview" dangerouslySetInnerHTML={{ __html: html }} />
        )}

        {isCached && <p style={{ color: "green" }}>Loaded from cache</p>}
      </div>
    </div>
  );
}

export default MarkdownConverter;
