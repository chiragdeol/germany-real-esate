import React from "react";

// SHARED MARKDOWN RENDERER
export function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  return text.split("\n\n").map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    
    if (trimmed.startsWith("###")) {
      return (
        <h4 key={idx} className="font-display text-xl font-bold text-foreground mt-6 mb-3">
          {trimmed.replace(/^###\s+/, "")}
        </h4>
      );
    }
    if (trimmed.startsWith("##")) {
      return (
        <h3 key={idx} className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
          {trimmed.replace(/^##\s+/, "")}
        </h3>
      );
    }
    if (trimmed.startsWith("#")) {
      return (
        <h2 key={idx} className="font-display text-3xl font-bold text-foreground mt-10 mb-5">
          {trimmed.replace(/^#\s+/, "")}
        </h2>
      );
    }
    
    // Check for bullet lists
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.includes("\n* ") || trimmed.includes("\n- ")) {
      const lines = trimmed.split("\n");
      return (
        <ul key={idx} className="list-disc pl-5 my-4 space-y-2 text-muted-foreground leading-relaxed">
          {lines.map((line, lIdx) => {
            const itemText = line.replace(/^[\*\-\s]+/, "").trim();
            const parts = itemText.split(/(\*\*.*?\*\*)/g);
            const elements = parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={pIdx} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
              }
              return part;
            });
            return <li key={lIdx}>{elements}</li>;
          })}
        </ul>
      );
    }

    // Parse bold marks inside regular paragraphs
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    const elements = parts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pIdx} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    return (
      <p key={idx} className="text-muted-foreground leading-relaxed mb-5 text-base">
        {elements}
      </p>
    );
  });
}
