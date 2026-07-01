import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Handshake, ShieldCheck, Sparkles, Play, Zap, GraduationCap, Hammer, Compass, Layers, Users, X } from "lucide-react";
import heroCity from "@/assets/hero-city.jpg";
import videoInvestors from "@/assets/video-investors.jpg";
import videoCities from "@/assets/video-cities.jpg";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import { Button } from "@/components/ui/button";
import { getContent, type CMSContent } from "@/lib/leads";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stadtfinanzen.de — Städtische Projekte mit privaten Investoren finanzieren" },
      {
        name: "description",
        content:
          "Wir verbinden Städte, Kommunen und staatliche Einrichtungen mit Banken, Family Offices und Fondsgesellschaften — national und international.",
      },
      { property: "og:title", content: "Stadtfinanzen.de — Städtische Projekte mit privaten Investoren finanzieren" },
      {
        property: "og:description",
        content:
          "Infrastruktur, Schulen, Kindergärten, Quartiere — persönlich vermittelt, kein automatisches Matching.",
      },
    ],
  }),
  component: HomePage,
});

function getEmbedUrl(url: string): { type: "iframe" | "video"; url: string } {
  if (!url) return { type: "video", url: "" };
  
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0] || "";
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split(/[&#]/)[0] || "";
    } else if (url.includes("embed/")) {
      videoId = url.split("embed/")[1]?.split(/[?#]/)[0] || "";
    }
    return { type: "iframe", url: `https://www.youtube.com/embed/${videoId}?autoplay=1` };
  }
  
  if (url.includes("vimeo.com")) {
    const videoId = url.split("vimeo.com/")[1]?.split(/[?#]/)[0] || "";
    return { type: "iframe", url: `https://player.vimeo.com/video/${videoId}?autoplay=1` };
  }
  
  return { type: "video", url };
}

function HomePage() {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    getContent().then(setContent);
  }, []);

  return (
    <>
      <Hero content={content} />
      <ProjectTypes />
      <HowItWorks />
      <WhyUs />
      <Services />
      <Pricing />
      <Videos content={content} onPlay={setPlayingVideoUrl} />
      <CTASection />

      {playingVideoUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
            <button
              onClick={() => setPlayingVideoUrl(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full bg-black">
              {getEmbedUrl(playingVideoUrl).type === "iframe" ? (
                <iframe
                  src={getEmbedUrl(playingVideoUrl).url}
                  title="Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <video
                  src={getEmbedUrl(playingVideoUrl).url}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Hero({ content }: { content: CMSContent | null }) {
  const titleText = content?.hero.title || "Städtische Projekte mit privaten Investoren finanzieren.";
  const titleParts = titleText.split("privaten Investoren");
  
  const subtitleText = content?.hero.subtitle || "Banken · Family Offices · Fondsgesellschaften — national und international. Für Infrastruktur, Schulen, Kindergärten und Quartiere. Persönlich vermittelt, kein automatisches Matching, keine Listing-Fee.";
  
  const stats = content?.hero.stats || [
    { value: "3.000+", label: "Investoren & Banken" },
    { value: "0,5 %", label: "Provision p.a." },
    { value: "0 €", label: "Listing-Fee" },
    { value: "100 %", label: "Persönliche Betreuung" }
  ];

  return (
    <section className="relative isolate overflow-hidden">
      <video
        src={content?.hero.videoUrl || heroVideo.url}
        key={content?.hero.videoUrl || heroVideo.url}
        poster={heroCity}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-primary/70" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-28 md:py-40 text-primary-foreground">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
            <Sparkles className="h-3 w-3 text-accent" /> National & International
          </div>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            {titleParts.length > 1 ? (
              <>
                {titleParts[0]}
                <span className="text-accent">privaten Investoren</span>
                {titleParts[1]}
              </>
            ) : (
              titleText
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed">
            {subtitleText}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact" hash="investor">
                Als Investor registrieren <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/contact" hash="city">Projekt einreichen</Link>
            </Button>
          </div>
        </div>
        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-12 gap-y-6 border-t border-primary-foreground/15 pt-10 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i}>
              <dt className="font-display text-3xl text-accent">{stat.value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.15em] text-primary-foreground/70">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Formular ausfüllen", copy: "Stellen Sie Ihr Projekt über unser Kontaktformular kurz vor – auch anonymisiert möglich." },
    { n: "02", title: "Inhalte freigeben", copy: "Wir pflegen Ihre Angaben ein. Veröffentlicht wird erst nach Ihrer ausdrücklichen Freigabe." },
    { n: "03", title: "Anfragen erhalten", copy: "Investorenanfragen leiten wir direkt an Sie weiter. Sie entscheiden, mit wem Sie sprechen." },
    { n: "04", title: "Direkt verhandeln", copy: "Sie verhandeln Konditionen direkt mit dem Investor. Wir begleiten Sie bei der Finanzierung." },
  ];
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Wie geht´s?" title="In vier Schritten zur Finanzierung." />
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-foreground/15 pt-6">
              <div className="font-display text-5xl text-accent">{s.n}</div>
              <h3 className="mt-4 text-xl text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { Icon: ShieldCheck, title: "Sie behalten die Kontrolle", copy: "Sie bestimmen, welche Informationen Sie bekannt geben – auf Wunsch auch vollständig anonym." },
    { Icon: Handshake, title: "Kein automatisches Matching", copy: "Wir leiten Investoren direkt und persönlich an Sie weiter – keine Algorithmen, kein Massenversand." },
    { Icon: Building2, title: "Keine Listing-Fee", copy: "Das Einstellen Ihres Projekts ist kostenfrei. Eine geringe Provision fällt nur im Erfolgsfall an." },
    { Icon: Sparkles, title: "Persönliche Betreuung", copy: "Ein fester Ansprechpartner begleitet Sie von der Anfrage bis zur Finanzierungszusage." },
  ];
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Ihre Vorteile" title="Hier finden Sie Investoren." />
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Diese Plattform bietet Städten, Kommunen und staatlichen Einrichtungen
          die Möglichkeit, Projekte direkt über privatwirtschaftliche Investoren
          zu finanzieren.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {items.map(({ Icon, title, copy }) => (
            <div key={title} className="flex gap-5 border-t border-border pt-6">
              <Icon className="h-6 w-6 shrink-0 text-accent" />
              <div>
                <h3 className="text-lg text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectTypes() {
  const items = [
    { Icon: Hammer, title: "Infrastruktur", copy: "Straßenbau, Brückenbau, Datacenter, Flughäfen, Häfen, Bahnhöfe, Einkaufsstraßen, Glasfaser." },
    { Icon: Layers, title: "Stadtentwicklung", copy: "Neue Wohngebiete, sozialer Wohnungsbau, Quartiersentwicklung." },
    { Icon: Zap, title: "Energie", copy: "Wind, Solar, Batteriespeicher und weitere Erzeugungs- und Speicherprojekte." },
    { Icon: GraduationCap, title: "Städtische Einrichtungen", copy: "Schulen, Kindergärten und soziale Einrichtungen." },
  ];
  return (
    <section className="border-b border-border bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Projekttypen" title="Diese Projekte können Sie platzieren." />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, copy }) => (
            <div key={title} className="bg-card p-6 shadow-[var(--shadow-card)]">
              <Icon className="h-8 w-8 text-accent" />
              <h3 className="mt-5 font-display text-xl text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-sm text-muted-foreground">
          <strong className="text-foreground">Erstklassige Opportunitäten für institutionelle Investoren.</strong>{" "}
          Als Fondsgesellschaft, Private Equity oder Family Office finden Sie
          hier eine sorgfältige Auswahl. Stadtfinanzen.de ist kein Anbieter der
          Finanzierungen – Sie verhandeln Konditionen direkt mit der jeweiligen
          Stadt oder Kommune. Wir stellen ausschließlich den Kontakt her.
        </p>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { Icon: Compass, title: "Projektberatung", copy: "Unsere Experten besprechen Ihr Projekt mit Ihnen und entwickeln die passende Strategie, um Investoren anzuziehen." },
    { Icon: Layers, title: "Strukturierte Finanzierung", copy: "Meist gibt es mehrere Finanzierungsmöglichkeiten. Wir beraten Sie bei der optimalen Strukturierung." },
    { Icon: Users, title: "Investoren-Matching", copy: "Mit Zugang zu weit über 3.000 Investoren und Banken. Auch ohne öffentliche Platzierung „matchen“ wir Sie manuell mit passenden Investoren." },
  ];
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Unsere Leistungen" title="Sie möchten mehr oder brauchen weitere Unterstützung?" />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {items.map(({ Icon, title, copy }) => (
            <div key={title} className="border-t border-border pt-6">
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-display text-xl text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { title: "Für Kapitalgeber", copy: "Für institutionelle, angemeldete Investoren ist unsere Dienstleistung kostenfrei." },
    { title: "Für Städte & Gemeinden", copy: "Das reine Listing Ihrer Projekte ist kostenfrei. Im Erfolgsfall fällt eine geringe Provision von 0,5 % des eingeworbenen Kapitals pro Jahr an." },
    { title: "Beratungsgespräche", copy: "Konkrete Einzelberatung können Sie online buchen – 298 € pro Stunde." },
    { title: "Einzelansprache & Club Deals", copy: "Diskrete Einzelansprache ausgewählter Investoren und Club-Deal-Strukturierung nach gesonderter Absprache." },
  ];
  return (
    <section className="border-y border-border bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Unsere Preise" title="Transparent und erfolgsorientiert." />
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Für Kapitalsuchende erheben wir lediglich eine kleine Provision in
          Höhe von 0,5 % des eingeworbenen Kapitals pro Jahr.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <div key={t.title} className="bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="text-xs uppercase tracking-[0.2em] text-accent">{t.title}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Videos({ content, onPlay }: { content: CMSContent | null; onPlay: (url: string) => void }) {
  const items = [
    { 
      img: videoCities, 
      title: "Für Städte & Kommunen", 
      copy: "Wie Sie über Stadtfinanzen.de seriöses Kapital ansprechen, ohne sensible Details öffentlich preiszugeben.",
      url: content?.videos?.cityVideoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    { 
      img: videoInvestors, 
      title: "Für Investoren", 
      copy: "Wie institutionelle Investoren frühzeitig Zugang zu kuratierten Off-Market-Projekten in Deutschland und Europa erhalten.",
      url: content?.videos?.investorVideoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
  ];
  return (
    <section className="border-y border-border bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Erklärvideos" title="In zwei Minuten verstehen, wie es funktioniert." />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((v) => (
            <div 
              key={v.title} 
              onClick={() => onPlay(v.url)}
              className="group relative overflow-hidden bg-card shadow-[var(--shadow-card)] cursor-pointer hover:scale-[1.01] transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={v.img} alt={v.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 grid place-items-center bg-primary/40 transition-colors group-hover:bg-primary/30">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg">
                    <Play className="h-6 w-6 translate-x-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-[2fr_1fr] md:items-end">
        <div>
          <h2 className="font-display text-4xl md:text-5xl">Lassen Sie uns sprechen.</h2>
          <p className="mt-4 max-w-xl text-primary-foreground/75">
            Ob Sie als Stadt ein Projekt platzieren möchten oder als Investor
            Kapital zu allokieren haben – wir freuen uns auf Ihre Nachricht.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button asChild variant="hero" size="lg"><Link to="/contact" hash="investor">Für Investoren</Link></Button>
          <Button asChild variant="heroOutline" size="lg"><Link to="/contact" hash="city">Für Städte</Link></Button>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</div>
      <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">{title}</h2>
    </div>
  );
}
