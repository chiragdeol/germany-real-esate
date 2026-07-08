import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { getContent, type CMSContent } from "@/lib/leads";

export function SiteFooter() {
  const [content, setContent] = useState<CMSContent | null>(null);

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-2xl tracking-wide">
              Stadtfinanzen<span className="text-accent">.de</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
              Wir verbinden Städte, Kommunen und staatliche Einrichtungen mit
              privaten Investoren, Banken, Family Offices und Fondsgesellschaften
              – national und international. Keine automatisierte Vermittlung,
              sondern persönliche Betreuung.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-accent">Unternehmen</div>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/about" className="hover:text-accent">Leistungen & Preise</Link></li>
              <li><Link to="/blog" className="hover:text-accent">Aktuelles</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-accent">Kontakt</div>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li>Stadtfinanzen.de</li>
              <li>{content?.contact.address || "Deutschland"}</li>
              <li>{content?.contact.email || "kontakt@stadtfinanzen.de"}</li>
              <li>{content?.contact.phone || "+49 (0) 30 555 01 20"}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Stadtfinanzen.de · DSGVO-konform.</div>
          <div className="flex gap-6">
            <Link to="/datenschutz" className="hover:text-accent">Datenschutz</Link>
            <Link to="/impressum" className="hover:text-accent">Impressum</Link>
            <Link to="/cookies" className="hover:text-accent">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

