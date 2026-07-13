import { toast } from "sonner";
import React from "react";

export type LeadType = "investor" | "city" | "chat";

export interface CMSContent {
  headerScripts?: string;
  hero: {
    title: string;
    subtitle: string;
    videoUrl?: string;
    bgType?: "video" | "image";
    imageUrl?: string;
    stats: Array<{ value: string; label: string }>;
  };
  videos?: {
    cityVideoUrl: string;
    investorVideoUrl: string;
  };
  videoSectionTexts?: {
    cityTitle: string;
    cityCopy: string;
    investorTitle: string;
    investorCopy: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  blog: {
    title: string;
  };
  posts: Array<{
    id: string;
    tag: string;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    read: string;
  }>;
  projectTypesList?: Array<{
    title: string;
    copy: string;
    icon: string;
  }>;
  homepageServices?: Array<{
    title: string;
    copy: string;
    icon: string;
  }>;
  pricingTiers?: Array<{
    title: string;
    copy: string;
  }>;
  about?: {
    title: string;
    introTitle: string;
    introText1: string;
    introText2: string;
    projectTypes: string[];
  };
  homepageHowItWorks?: {
    title: string;
    subtitle: string;
    steps: Array<{ n: string; title: string; copy: string }>;
  };
  homepageWhyUs?: {
    title: string;
    subtitle: string;
    items: Array<{ icon: string; title: string; copy: string }>;
  };
  homepageCta?: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  impressum?: { text: string };
  datenschutz?: { text: string };
  cookies?: { text: string };
}

export const DEFAULT_CONTENT: CMSContent = {
  hero: {
    title: "Wir strukturieren Kapital für komplexe Immobilienprojekte und Akquisitionen",
    subtitle: "Ab 5 Mio. | Mezzanine - Bridge - Fremdkapital. Stadtfinanzen.de begleitet bei der Beschaffung und Strukturierung von Immobilienfinanzierungen. Mit über 20 Jahren Erfahrung im Finanzierungsmarkt und einem europaweiten Netzwerk aus Mezzaninefonds, Banken, Debt-Fonds und Family Offices erschließen wir Kapitalquellen, die klassischen Wegen verschlossen bleiben. Persönliche Beratung, Schnelligkeit und Diskretion sind für uns besonders wichtig.",
    videoUrl: "",
    bgType: "video",
    imageUrl: "",
    stats: [
      { value: "20+", label: "Jahre Erfahrung" },
      { value: "Ab 5M", label: "Finanzierungsvolumen" },
      { value: "0 €", label: "Listing-Fee" },
      { value: "100 %", label: "Persönliche Betreuung" }
    ]
  },
  videos: {
    cityVideoUrl: "",
    investorVideoUrl: ""
  },
  contact: {
    email: "kontakt@stadtfinanzen.de",
    phone: "+49 (0) 30 555 01 20",
    address: "Stadtfinanzen.de, Deutschland"
  },
  blog: {
    title: "Beiträge unserer Partner zum kommunalen Investmentumfeld."
  },
  posts: [
    {
      id: "post-1",
      tag: "Stadtentwicklung",
      title: "Warum mittelgroße deutsche Städte zur nächsten institutionellen Assetklasse werden",
      excerpt: "Mittelstädte in Deutschland liefern auf risikoadjustierter Basis zunehmend bessere Renditen als die Metropolen. Was wir in unserer Pipeline sehen.",
      content: "Die Attraktivität von Mittelstädten (sogenannten B- und C-Standorten) wächst stetig. Während A-Metropolen wie Berlin, München oder Hamburg unter extrem niedrigen Renditen und hoher Regulierung leiden, bieten mittelgroße deutsche Städte ein stabiles wirtschaftliches Fundament mit deutlich attraktiveren Renditechancen.\n\n### Wachsende Nachfrage nach regionaler Infrastruktur\nKommunen abseits der Metropolen stehen vor großen Herausforderungen. Von der Sanierung öffentlicher Schulen bis hin zur Modernisierung von Verkehrswegen und Glasfasernetzen ist der Investitionsbedarf gigantisch. Da klassische Bankkredite durch regulatorische Hürden oft schwer zugänglich sind, gewinnen private Finanzierungspartnerschaften (ÖPP) an Bedeutung.\n\n### Vorteile für institutionelle Investoren:\n1. **Geringere Volatilität**: Die Mietmärkte und Immobilienwerte in mittleren Städten sind historisch stabiler.\n2. **Höhere Renditespreads**: Renditen liegen oft 1,0 bis 2,5 % über denen der Metropolen.\n3. **Partnerschaftliche Kooperation**: Kommunen zeigen sich bei Projektentwicklungen oft kooperativer und flexibler.",
      date: "März 2026",
      read: "6 Min. Lesezeit"
    },
    {
      id: "post-2",
      tag: "Energie & Infrastruktur",
      title: "Geduldiges Kapital für kommunale Erneuerbare",
      excerpt: "Wie langfristige Infrastrukturmandate und EU-Förderinstrumente die Finanzierung der Energiewende auf kommunaler Ebene verändern.",
      content: "Kommunale Energieversorgung ist der Schlüssel zur Energiewende in Deutschland. Windparks, Solaranlagen und Fernwärmenetze erfordern jedoch erhebliche Vorabinvestitionen, die kommunale Haushalte allein nicht tragen können. Hier kommt sogenanntes „geduldiges Kapital“ ins Spiel.\n\n### Was ist geduldiges Kapital?\nGeduldiges Kapital beschreibt langfristig orientierte Investitionen, meist von Pensionskassen, Versicherungsgesellschaften oder Stiftungen. Diese Akteure suchen keine schnellen Spekulationsgewinne, sondern stabile, inflationsgeschützte Erträge über 15 bis 30 Jahre.\n\n### Kommunen profitieren doppelt:\n* **Planungssicherheit**: Langfristige Zinsbindungen und feste Abnahmeverträge schaffen verlässliche Haushaltsposten.\n* **Technologie-Vorsprung**: Investoren finanzieren oft modernste Speichertechnologien (Batterien) und intelligente Stromnetze gleich mit.",
      date: "Februar 2026",
      read: "8 Min. Lesezeit"
    },
    {
      id: "post-3",
      tag: "Öffentlich-private Partnerschaft",
      title: "ÖPP-Strukturen, die wirklich zur Unterschrift führen",
      excerpt: "Ein kompakter Leitfaden für Kämmerer und Stadträte zu Strukturen, die vom MoU bis zur Signatur tragen, ohne Marktvertrauen zu verspielen.",
      content: "Öffentlich-Private Partnerschaften (ÖPP) gelten oft als bürokratisch und schwerfällig. Doch richtig strukturiert sind sie ein mächtiges Werkzeug, um öffentliche Projekte schneller und budgetkonformer umzusetzen.\n\n### Der Weg zum erfolgreichen Vertragsabschluss\nEin häufiger Fehler liegt in mangelhafter Vorbereitung. Eine klare Definition der Risikoverteilung zwischen öffentlicher Hand und privatem Partner ist der wichtigste Baustein.\n\n### Die Phasen einer erfolgreichen ÖPP-Struktur:\n1. **Bedarfsanalyse**: Eindeutige Definition, was gebaut oder betrieben werden soll.\n2. **Letter of Intent (LoI) / MoU**: Frühzeitige Festlegung der Kernpunkte, um das Interesse qualifizierter Investoren zu sichern.\n3. **Transparente Ausschreibung**: Klare Kriterien und zügige Vergabeprozesse.\n4. **Risikoallokation**: Risiken wie Baukostenüberschreitungen sollten bei der Partei liegen, die sie am besten kontrollieren kann (meist dem privaten Baupartner).",
      date: "Januar 2026",
      read: "5 Min. Lesezeit"
    }
  ],
  projectTypesList: [
    { title: "Infrastruktur", copy: "Mittelgroße deutsche Städte haben massiven Nachholbedarf bei Straßen, Brücken, Datacentern und Glasfaser.", icon: "Building2" },
    { title: "Energie & Umwelt", copy: "Finanzierung von Windparks, Solaranlagen, Fernwärmenetzen und Batteriespeichern direkt auf kommunaler Ebene.", icon: "Zap" },
    { title: "Bildung & Soziales", copy: "Neubau und Sanierung von Schulen, Kindergärten und Sportstätten durch langfristiges, geduldiges Kapital.", icon: "GraduationCap" },
    { title: "Quartiere & Wohnungsbau", copy: "Entwicklung neuer Wohngebiete und sozialer Wohnungsbau in Kooperation mit kommunalen Wohnungsgesellschaften.", icon: "Hammer" }
  ],
  homepageServices: [
    { title: "Mezzanine Kapital", copy: "Zur Ergänzung des bestehenden Eigenkapitals, um geforderte Eigenkapitalquoten bei Banken zu erfüllen.", icon: "Layers" },
    { title: "Bridge Finance", copy: "Für schnelle Zwischenfinanzierungen von Grundstücksankäufen bis zur Anschlussfinanzierung.", icon: "Zap" },
    { title: "Fremdkapital", copy: "Senior und Junior Debt, Haircut-Verhandlungen mit Banken und alternativen Kapitalgebern.", icon: "Building2" },
    { title: "Equity / Joint Venture", copy: "Eigenkapital, Preferred Equity, und strategische Joint-Venture Partner zur operativen Absicherung.", icon: "Users" },
    { title: "Debt Advisory", copy: "Strukturierung von Kapitaltranchen bei Neubau, Ankäufen, Revitalisierungen und Bestandsportfolios.", icon: "Compass" }
  ],
  pricingTiers: [
    { title: "Für Kapitalgeber", copy: "Für institutionelle, angemeldete Investoren ist unsere Dienstleistung kostenfrei." },
    { title: "Für Projektentwickler & Kommunen", copy: "Das reine Listing Ihrer Projekte ist kostenfrei. Im Erfolgsfall fällt eine geringe Provision von 0,5 % des eingeworbenen Kapitals pro Jahr an." },
    { title: "Beratungsgespräche", copy: "Konkrete Einzelberatung können Sie online buchen – 298 € pro Stunde." },
    { title: "Einzelansprache & Club Deals", copy: "Diskrete Einzelansprache und Club-Deal-Strukturierung nach gesonderter Absprache." }
  ],
  about: {
    title: "Wie funktioniert es genau?",
    introTitle: "Sie bleiben in Kontrolle",
    introText1: "Sie entscheiden, ob Ihr Projekt mit allen Daten oder anonymisiert gelistet wird und welche Informationen Sie bekannt geben möchten. Wir pflegen alle Angaben ein und warten auf Ihre Freigabe – erst dann wird das Projekt platziert.",
    introText2: "Anfragen von Investoren leiten wir direkt an Sie weiter. Sie entscheiden, mit welchem Investor Sie zusammenarbeiten möchten, und informieren uns, sobald Sie einen Finanzierungspartner gefunden haben oder die Platzierung beenden möchten. Wir nehmen kein Kapital entgegen, sondern stellen Ihnen geeignete Investorenkontakte zur Verfügung.",
    projectTypes: [
      "Infrastruktur: Straßen, Brücken, Datacenter, Häfen, Glasfaser",
      "Stadtentwicklung: neue Wohngebiete & sozialer Wohnungsbau",
      "Energie: Wind, Solar, Batteriespeicher",
      "Städtische Einrichtungen: Schulen, Kindergärten",
      "Öffentlich-private Partnerschaften (ÖPP)",
      "Tourismus, Kultur & öffentliche Mobilität"
    ]
  },
  videoSectionTexts: {
    cityTitle: "Für Projektentwickler & Kommunen",
    cityCopy: "Wie Sie über Stadtfinanzen.de strukturiertes Kapital ansprechen, ohne sensible Details öffentlich preiszugeben.",
    investorTitle: "Für Investoren",
    investorCopy: "Wie institutionelle Investoren frühzeitig Zugang zu kuratierten Off-Market-Projekten in Deutschland und Europa erhalten."
  },
  homepageHowItWorks: {
    title: "So läuft die Zusammenarbeit",
    subtitle: "Ablauf",
    steps: [
      { n: "01", title: "Projektvorstellung", copy: "Sie stellen uns Ihr Projekt und Ihren Kapitalbedarf vor - formlos und vertraulich." },
      { n: "02", title: "Strukturvorschlag und Investorenauswahl", copy: "Wir analysieren Ihre Kapitalstruktur und identifizieren geeignete Investoren aus unserem Netzwerk." },
      { n: "03", title: "Term Sheets und Verhandlungen", copy: "Wir koordinieren die Term-Sheet Phase und begleiten auf Wunsch den gesamten Verhandlungsprozess." },
      { n: "04", title: "Abschluß und Auszahlung", copy: "Sie schließen den Vertrag direkt mit dem Kapitalgeber - wir bleiben bis zum Vertragsabschluß an Ihrer Seite." }
    ]
  },
  homepageWhyUs: {
    title: "Warum Stadtfinanzen.de?",
    subtitle: "Vorteile",
    items: [
      { icon: "ShieldCheck", title: "Direkter Zugang", copy: "Direkter Zugang zu spezialisierten und ausgewählten Finanzierungspartnern." },
      { icon: "Handshake", title: "Volle Unabhängigkeit", copy: "Volle Unabhängigkeit: Wir beraten Sie neutral – Sie entscheiden." },
      { icon: "Building2", title: "Erfahrung", copy: "Über 20 Jahre Erfahrung in der Strukturierung komplexer Finanzierungen." },
      { icon: "Sparkles", title: "Klare Positionierung", copy: "Klare Positionierung: Keine Standardlösungen, keine Privatfinanzierungen." }
    ]
  },
  homepageCta: {
    title: "Bereit für den nächsten Schritt?",
    subtitle: "Kommunale und strukturierte Finanzierung modern, diskret und effizient. Registrieren Sie sich noch heute kostenlos.",
    buttonText: "Projekt einreichen"
  },
  impressum: {
    text: `# Angaben gemäß § 5 TMG

**Stadtfinanzen.de**
Stadtfinanzen.de, Deutschland

E-Mail: kontakt@stadtfinanzen.de
Tel.: +49 (0) 30 555 01 20

## Haftung für Inhalte

Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.

Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.

## Urheberrecht

Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.

## Haftung für Links

Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.

## Widerspruch Werbe-Mails

Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.`
  },
  datenschutz: {
    text: `# 1. Datenschutz auf einen Blick

### Allgemeine Hinweise
Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.

### Datenerfassung auf unserer Website
Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.

# 2. Allgemeine Hinweise und Pflichtinformationen

### Datenschutz
Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.

### Hinweis zur verantwortlichen Stelle
Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist der Betreiber (siehe Kontaktdaten im Impressum).

# 3. Ihre Rechte bezüglich Ihrer Daten

Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.

# 4. Datenerfassung und Analyse-Tools

### Cookies
Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.

### Kontaktformular und Whitepaper-Download
Wenn Sie uns per Kontaktformular oder über die Whitepaper-Anforderung Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.`
  },
  cookies: {
    text: `# 1. Was sind Cookies?

Cookies sind kleine Textdateien, die von einer Website auf Ihrem Computer oder Mobilgerät gespeichert werden, wenn Sie die Website besuchen. Sie ermöglichen es der Website, sich über einen bestimmten Zeitraum hinweg an Ihre Aktionen und Präferenzen (wie Login, Sprache, Schriftgröße und andere Anzeigeeinstellungen) zu erinnern.

# 2. Wie verwenden wir Cookies?

Wir verwenden Cookies, um die Funktion unserer Website zu gewährleisten, die Benutzererfahrung zu verbessern und die Interaktionen auf unserer Website zu analysieren:

* **Notwendige Cookies**: Diese Cookies sind für das Funktionieren der Website unerlässlich (z. B. zur Speicherung von Sicherheits-Token oder Formulardaten).
* **Funktionale Cookies**: Diese Cookies ermöglichen es uns, Ihre bevorzugten Einstellungen zu speichern, z. B. die gewählte Sprache des Übersetzungs-Tools.
* **Analyse-Cookies**: Wir verwenden diese, um auf aggregierter Basis statistische Daten über die Nutzung unserer Website zu erheben.

# 3. Verwaltung von Cookies

Sie können Cookies nach Belieben steuern und/oder löschen. Sie können alle bereits auf Ihrem Computer gespeicherten Cookies löschen und die meisten Browser so einstellen, dass sie das Platzieren von Cookies verhindern. Wenn Sie dies tun, müssen Sie jedoch möglicherweise einige Einstellungen bei jedem Besuch einer Seite manuell anpassen, und einige Dienste und Funktionen funktionieren möglicherweise nicht.`
  },
  headerScripts: ""
};



// HELPER: GET CURRENT CMS CONTENT
export async function getContent(): Promise<CMSContent> {
  try {
    const res = await fetch("/api/content");
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("API getContent failed, falling back to localStorage:", e);
  }

  // Fallback to localStorage
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("civita_cms_content");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        // ignore
      }
    }
  }
  return DEFAULT_CONTENT;
}

// HELPER: SAVE CMS CONTENT
export async function saveContent(content: CMSContent, token: string): Promise<boolean> {
  try {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify(content),
    });
    if (res.ok) {
      toast.success("Content saved successfully (Server Database).");
      return true;
    }
  } catch (e) {
    console.warn("API saveContent failed, falling back to localStorage:", e);
  }

  // Fallback to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("civita_cms_content", JSON.stringify(content));
    toast.success("Content saved successfully (Browser LocalStorage).");
    return true;
  }
  return false;
}

// HELPER: SUBMIT LEAD
export async function submitLead(type: LeadType, data: Record<string, unknown>): Promise<{ ok: boolean }> {
  const payload = {
    type,
    data,
  };

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      // Also save locally for convenience
      if (typeof window !== "undefined") {
        const key = `civita_leads_${type}`;
        const existing = JSON.parse(localStorage.getItem(key) ?? "[]");
        existing.push({ ...data, submittedAt: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(existing));
      }
      
      toast.success("Thank you — we'll be in touch shortly.", {
        description: "A partner will personally review your submission.",
      });
      return { ok: true };
    }
  } catch (e) {
    console.warn("API submitLead failed, falling back to localStorage:", e);
  }

  // Fallback to localStorage
  try {
    if (typeof window !== "undefined") {
      const key = `civita_leads_${type}`;
      const existing = JSON.parse(localStorage.getItem(key) ?? "[]");
      existing.push({ ...data, submittedAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
    }
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thank you — we'll be in touch shortly.", {
      description: "A partner will personally review your submission (Saved in LocalStorage).",
    });
    return { ok: true };
  } catch (e) {
    toast.error("Something went wrong. Please try again.");
    return { ok: false };
  }
}

// HELPER: GET LEADS (ADMIN ONLY)
export async function getLeads(token: string): Promise<Array<{ id: string; type: LeadType; data: Record<string, unknown>; submittedAt: string }>> {
  try {
    const res = await fetch("/api/leads", {
      headers: {
        "x-admin-token": token,
      },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("API getLeads failed, falling back to localStorage:", e);
  }

  // Fallback to localStorage (merge all local lead types)
  const leads: any[] = [];
  if (typeof window !== "undefined") {
    const types: LeadType[] = ["investor", "city", "chat"];
    types.forEach((type) => {
      const key = `civita_leads_${type}`;
      const items = JSON.parse(localStorage.getItem(key) ?? "[]");
      items.forEach((item: any, index: number) => {
        const { submittedAt, ...data } = item;
        leads.push({
          id: `local-${type}-${index}`,
          type,
          data,
          submittedAt: submittedAt || new Date().toISOString(),
        });
      });
    });
  }

  // Sort newest first
  return leads.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}
