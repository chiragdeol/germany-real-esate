import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Stadtfinanzen.de" },
      { name: "description", content: "Impressum und rechtliche Hinweise von Stadtfinanzen.de" }
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
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
            Impressum
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground space-y-8 text-base leading-relaxed">
            
            {/* Betreiber-Details */}
            <div className="space-y-4 border-b border-border/60 pb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">Angaben gemäß § 5 TMG</h2>
              <p className="font-medium text-foreground">Stadtfinanzen.de</p>
              
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-accent shrink-0" />
                  <span>Stadtfinanzen.de, Deutschland</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <span>E-Mail: kontakt@stadtfinanzen.de</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <span>Tel.: +49 (0) 30 555 01 20</span>
                </div>
              </div>
            </div>

            {/* Haftungsausschluss Disclaimer */}
            <div className="space-y-6 pt-4">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Haftung für Inhalte</h3>
                <p>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
                <p className="mt-3">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Widerspruch Werbe-Mails</h3>
                <p>
                  Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
