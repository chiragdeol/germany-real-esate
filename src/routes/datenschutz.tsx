import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

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
          <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground space-y-8 text-base leading-relaxed">
            
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="font-display text-xl font-bold text-foreground mt-4 mb-2">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
              <h3 className="font-display text-xl font-bold text-foreground mt-4 mb-2">Datenerfassung auf unserer Website</h3>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="font-display text-xl font-bold text-foreground mt-4 mb-2">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <p className="mt-3">
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <h3 className="font-display text-xl font-bold text-foreground mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist der Betreiber (siehe Kontaktdaten im Impressum).
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Ihre Rechte bezüglich Ihrer Daten</h2>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Datenerfassung und Analyse-Tools</h2>
              <h3 className="font-display text-xl font-bold text-foreground mt-4 mb-2">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
              </p>
              <h3 className="font-display text-xl font-bold text-foreground mt-4 mb-2">Kontaktformular und Whitepaper-Download</h3>
              <p>
                Wenn Sie uns per Kontaktformular oder über die Whitepaper-Anforderung Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
