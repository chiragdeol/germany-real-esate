import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getContent, type CMSContent } from "@/lib/leads";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Aktuelles — Stadtfinanzen.de" },
      { name: "description", content: "Perspektiven zu kommunaler Finanzierung, ÖPP, Energie- und Infrastrukturprojekten in Deutschland und Europa." },
      { property: "og:title", content: "Aktuelles — Stadtfinanzen.de" },
      { property: "og:description", content: "Beiträge unserer Partner zum kommunalen Investmentumfeld." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [content, setContent] = useState<CMSContent | null>(null);

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  const posts = content?.posts || [];

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-accent">Aktuelles</div>
          <h1 className="mt-4 font-display text-5xl text-foreground md:text-6xl">
            {content?.blog.title || "Beiträge unserer Partner zum kommunalen Investmentumfeld."}
          </h1>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-6">
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">Keine Beiträge vorhanden.</p>
          ) : (
            posts.map((p, i) => (
              <article
                key={p.id || p.title}
                className="grid gap-6 border-b border-border pb-12 md:grid-cols-[160px_1fr]"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <div>{String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-2 text-accent">{p.tag}</div>
                  <div className="mt-2">{p.date}</div>
                  <div className="mt-1">{p.read}</div>
                </div>
                <div>
                  <h2 className="font-display text-3xl text-foreground md:text-4xl">{p.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{p.excerpt}</p>
                  <Link
                    to="/blog/$id"
                    params={{ id: p.id }}
                    className="mt-4 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline cursor-pointer"
                  >
                    Artikel lesen →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}
