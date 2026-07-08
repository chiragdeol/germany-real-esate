import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie-Richtlinie — Stadtfinanzen.de" },
      { name: "description", content: "Cookie-Richtlinie von Stadtfinanzen.de" }
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
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
            Cookie-Richtlinie
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground space-y-8 text-base leading-relaxed">
            
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Was sind Cookies?</h2>
              <p>
                Cookies sind kleine Textdateien, die von einer Website auf Ihrem Computer oder Mobilgerät gespeichert werden, wenn Sie die Website besuchen. Sie ermöglichen es der Website, sich über einen bestimmten Zeitraum hinweg an Ihre Aktionen und Präferenzen (wie Login, Sprache, Schriftgröße und andere Anzeigeeinstellungen) zu erinnern.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Wie verwenden wir Cookies?</h2>
              <p>
                Wir verwenden Cookies, um die Funktion unserer Website zu gewährleisten, die Benutzererfahrung zu verbessern und die Interaktionen auf unserer Website zu analysieren:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>
                  <strong className="text-foreground">Notwendige Cookies:</strong> Diese Cookies sind für das Funktionieren der Website unerlässlich (z. B. zur Speicherung von Sicherheits-Token oder Formulardaten).
                </li>
                <li>
                  <strong className="text-foreground">Funktionale Cookies:</strong> Diese Cookies ermöglichen es uns, Ihre bevorzugten Einstellungen zu speichern, z. B. die gewählte Sprache des Übersetzungs-Tools.
                </li>
                <li>
                  <strong className="text-foreground">Analyse-Cookies:</strong> Wir verwenden diese, um aggregierte statistische Informationen über die Nutzung unserer Seiten zu sammeln.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Verwaltung von Cookies</h2>
              <p>
                Sie können Cookies nach Belieben steuern und/oder löschen. Sie können alle bereits auf Ihrem Computer gespeicherten Cookies löschen und die meisten Browser so einstellen, dass sie das Platzieren von Cookies verhindern. Wenn Sie dies tun, müssen Sie jedoch möglicherweise einige Einstellungen bei jedem Besuch einer Seite manuell anpassen, und einige Dienste und Funktionen funktionieren möglicherweise nicht.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
