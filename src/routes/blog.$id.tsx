import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getContent, type CMSContent } from "@/lib/leads";
import { renderMarkdown } from "@/lib/markdown";

export const Route = createFileRoute("/blog/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Blog Beitrag — Stadtfinanzen.de` },
      { name: "robots", content: "index, follow" }
    ],
  }),
  component: BlogPostDetailPage,
});

function BlogPostDetailPage() {
  const { id } = Route.useParams();
  const [content, setContent] = useState<CMSContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContent()
      .then(setContent)
      .finally(() => setLoading(false));
  }, []);

  const post = content?.posts.find((p) => p.id === id);

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="text-sm text-muted-foreground animate-pulse">Lade Artikel...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h2 className="font-display text-3xl text-foreground">Artikel nicht gefunden</h2>
        <p className="mt-2 text-muted-foreground">Der gesuchte Beitrag existiert nicht oder wurde gelöscht.</p>
        <Button asChild className="mt-6 gap-2">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4" /> Zurück zum Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Blog Article Hero Header */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent hover:underline mb-8 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück zum Blog
          </Link>
          
          <div className="flex flex-wrap gap-4 items-center text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1 bg-accent/15 text-accent px-2 py-1 rounded">
              <Tag className="h-3 w-3" /> {post.tag}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.read}
            </span>
          </div>

          <h1 className="font-display text-4xl text-foreground sm:text-5xl leading-tight">
            {post.title}
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground font-medium leading-relaxed italic border-l-2 border-accent pl-4">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-6">
          <article className="prose prose-zinc dark:prose-invert max-w-none">
            {post.content ? (
              renderMarkdown(post.content)
            ) : (
              <p className="text-muted-foreground leading-relaxed italic">
                Für diesen Beitrag ist kein ausführlicher Inhalt hinterlegt.
              </p>
            )}
          </article>
        </div>
      </section>
    </>
  );
}

// Simple local Button wrapper to avoid dependency issues
function Button({ children, asChild, className }: any) {
  return (
    <div className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 ${className}`}>
      {children}
    </div>
  );
}
