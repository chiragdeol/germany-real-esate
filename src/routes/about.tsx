import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Leistungen & Preise — Stadtfinanzen.de" },
      { name: "description", content: "Wie genau es funktioniert, unsere Leistungen für Städte und Investoren sowie unsere transparenten Preise." },
      { property: "og:title", content: "Leistungen & Preise — Stadtfinanzen.de" },
      { property: "og:description", content: "Projektberatung, strukturierte Finanzierung und Investoren-Matching — persönlich, diskret, DSGVO-konform." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-xs uppercase tracking-[0.2em] text-accent">Leistungen & Preise</div>
          <h1 className="mt-4 font-display text-5xl text-foreground md:text-6xl">
            Wie funktioniert es genau?
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Ganz einfach: Sie melden sich mit Ihren Kontaktdaten über das
            Kontaktformular an. Wenn Sie möchten, können Sie bereits erste
            Informationen zu Ihrem Projekt hinzufügen. Wir kontaktieren Sie,
            besprechen das weitere Vorgehen und senden Ihnen einen kurzen
            Projektfragebogen zu.
          </p>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-foreground">Sie bleiben in Kontrolle</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Sie entscheiden, ob Ihr Projekt mit allen Daten oder anonymisiert
              gelistet wird und welche Informationen Sie bekannt geben möchten.
              Wir pflegen alle Angaben ein und warten auf Ihre Freigabe – erst
              dann wird das Projekt platziert.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Anfragen von Investoren leiten wir direkt an Sie weiter. Sie
              entscheiden, mit welchem Investor Sie zusammenarbeiten möchten,
              und informieren uns, sobald Sie einen Finanzierungspartner
              gefunden haben oder die Platzierung beenden möchten.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Wir nehmen kein Kapital entgegen, sondern stellen Ihnen geeignete
              Investorenkontakte zur Verfügung und begleiten Sie bei der
              Finanzierung. Selbstverständlich stehen wir Ihnen auch dann zur
              Verfügung, wenn Sie uns einfach kennenlernen möchten.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl text-foreground">Projekttypen</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground">
              {[
                "Infrastruktur: Straßen, Brücken, Datacenter, Häfen, Glasfaser",
                "Stadtentwicklung: neue Wohngebiete & sozialer Wohnungsbau",
                "Energie: Wind, Solar, Batteriespeicher",
                "Städtische Einrichtungen: Schulen, Kindergärten",
                "Öffentlich-private Partnerschaften (ÖPP)",
                "Tourismus, Kultur & öffentliche Mobilität",
              ].map((s) => (
                <li key={s} className="flex items-center gap-3 border-b border-border pb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl text-foreground">Unsere Leistungen</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              ["Projektberatung", "Unsere Experten besprechen Ihr Projekt mit Ihnen und entwickeln die passende Strategie, um Investoren zu gewinnen."],
              ["Strukturierte Finanzierung", "Für jedes Projekt gibt es meist mehrere Finanzierungswege. Wir beraten Sie bei der optimalen Strukturierung."],
              ["Investoren-Matching", "Zugang zu weit über 3.000 Investoren und Banken – auch ohne öffentliche Platzierung „matchen“ wir Sie manuell mit passenden Investoren."],
            ].map(([t, c]) => (
              <div key={t}>
                <div className="text-xs uppercase tracking-[0.2em] text-accent">{t}</div>
                <p className="mt-3 text-muted-foreground leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent">Unsere Preise</div>
          <h2 className="mt-3 font-display text-4xl text-foreground">Transparent und erfolgsorientiert.</h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Für Kapitalsuchende erheben wir lediglich eine kleine Provision
            in Höhe von 0,5 % des eingeworbenen Kapitals pro Jahr.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              ["Für Kapitalgeber", "Für institutionelle, angemeldete Investoren ist unsere Dienstleistung kostenfrei."],
              ["Für Städte & Gemeinden", "Das reine Listing Ihrer Projekte ist kostenfrei. Im Erfolgsfall fällt eine geringe Provision an."],
              ["Beratungsgespräche", "Konkrete Einzelberatung online buchbar – 298 € pro Stunde."],
              ["Einzelansprache & Club Deals", "Diskrete Einzelansprache und Club-Deal-Strukturierung nach gesonderter Absprache."],
            ].map(([t, c]) => (
              <div key={t} className="border border-border bg-card p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-accent">{t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
