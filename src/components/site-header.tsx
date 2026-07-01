import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Startseite" },
  { to: "/about", label: "Leistungen & Preise" },
  { to: "/blog", label: "Aktuelles" },
  { to: "/contact", label: "Kontakt" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-primary text-primary-foreground font-display text-lg">
            S
          </span>
          <span className="font-display text-xl tracking-wide text-foreground">
            Stadtfinanzen<span className="text-accent">.de</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild variant="default" size="sm">
            <Link to="/contact">Jetzt Kontakt aufnehmen</Link>
          </Button>
        </div>
        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-6 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-foreground/80"
              >
                {n.label}
              </Link>
            ))}
            <Button asChild className="mt-3">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Jetzt Kontakt aufnehmen
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
