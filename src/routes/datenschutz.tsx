import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getContent, type CMSContent } from "@/lib/leads";
import { renderMarkdown } from "@/lib/markdown";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — Stadtfinanzen.de" },
      { name: "description", content: "Datenschutzerklärung von Stadtfinanzen.de" }
    ],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  const [content, setContent] = useState<CMSContent | null>(null);

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  const markdownText = content?.datenschutz?.text;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent hover:underline mb-6 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
          </Link>
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
            Rechtliches
          </div>
          <h1 className="font-display text-4xl text-foreground sm:text-5xl leading-tight font-bold">
            Datenschutzerklärung
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground space-y-6 text-base leading-relaxed">
            {markdownText ? (
              renderMarkdown(markdownText)
            ) : (
              <div className="animate-pulse h-40 bg-muted/20 rounded-xl" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
