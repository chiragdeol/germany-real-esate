import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { InvestorForm } from "@/components/investor-form";
import { CityForm } from "@/components/city-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakt — Stadtfinanzen.de" },
      { name: "description", content: "Als Investor registrieren oder Ihr Projekt einreichen. Jede Anfrage wird persönlich geprüft." },
      { property: "og:title", content: "Kontakt — Stadtfinanzen.de" },
      { property: "og:description", content: "Wir freuen uns über weitere Informationen zu Ihrem Vorhaben oder Ihrer Suche." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const initial =
    typeof window !== "undefined" && window.location.hash === "#city"
      ? "city"
      : "investor";
  const [tab, setTab] = useState<"investor" | "city">(initial);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-accent">Kontakt</div>
          <h1 className="mt-4 font-display text-5xl text-foreground md:text-6xl">
            Let's get in touch.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Wir freuen uns sehr über weitere Informationen zu Ihrem Vorhaben
            oder Ihrer Suche. Jede Anfrage wird persönlich und vertraulich
            geprüft – DSGVO-konform.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex gap-2 border-b border-border">
              <TabButton active={tab === "investor"} onClick={() => setTab("investor")}>
                Für Investoren
              </TabButton>
              <TabButton active={tab === "city"} onClick={() => setTab("city")}>
                Für Städte / Kommunen
              </TabButton>
            </div>
            <div className="mt-10">
              {tab === "investor" ? <InvestorForm /> : <CityForm />}
            </div>
          </div>

          <aside className="space-y-8 lg:border-l lg:border-border lg:pl-10">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent">Kontakt</div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-foreground" /> Stadtfinanzen.de, Deutschland</li>
                <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-foreground" /> kontakt@stadtfinanzen.de</li>
                <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-foreground" /> +49 (0) 30 555 01 20</li>
              </ul>
            </div>
            <div className="rounded-sm border border-border bg-secondary/40 p-5 text-xs text-muted-foreground">
              Herzlichen Dank – wir melden uns umgehend bei Ihnen! Bei
              vertraulichen Mandaten vermerken Sie bitte „vertraulich“ in Ihrer
              Nachricht; wir nehmen dann über einen sicheren Kanal Kontakt auf.
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function TabButton({
  active, children, onClick,
}: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "relative -mb-px px-5 py-3 text-sm font-medium transition-colors " +
        (active
          ? "border-b-2 border-accent text-foreground"
          : "border-b-2 border-transparent text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
