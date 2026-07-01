import { toast } from "sonner";

export type LeadType = "investor" | "city" | "chat";

export interface CMSContent {
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
}

const DEFAULT_CONTENT: CMSContent = {
  hero: {
    title: "Städtische Projekte mit privaten Investoren finanzieren.",
    subtitle: "Banken · Family Offices · Fondsgesellschaften — national und international. Für Infrastruktur, Schulen, Kindergärten und Quartiere. Persönlich vermittelt, kein automatisches Matching, keine Listing-Fee.",
    videoUrl: "",
    bgType: "video",
    imageUrl: "",
    stats: [
      { value: "3.000+", label: "Investoren & Banken" },
      { value: "0,5 %", label: "Provision p.a." },
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
      date: "März 2026",
      read: "6 Min. Lesezeit"
    },
    {
      id: "post-2",
      tag: "Energie & Infrastruktur",
      title: "Geduldiges Kapital für kommunale Erneuerbare",
      excerpt: "Wie langfristige Infrastrukturmandate und EU-Förderinstrumente die Finanzierung der Energiewende auf kommunaler Ebene verändern.",
      date: "Februar 2026",
      read: "8 Min. Lesezeit"
    },
    {
      id: "post-3",
      tag: "Öffentlich-private Partnerschaft",
      title: "ÖPP-Strukturen, die wirklich zur Unterschrift führen",
      excerpt: "Ein kompakter Leitfaden für Kämmerer und Stadträte zu Strukturen, die vom MoU bis zur Signatur tragen, ohne Marktvertrauen zu verspielen.",
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
    { title: "Projektberatung", copy: "Unsere Experten besprechen Ihr Projekt mit Ihnen und entwickeln die passende Strategie, um Investoren anzuziehen.", icon: "Compass" },
    { title: "Strukturierte Finanzierung", copy: "Meist gibt es mehrere Finanzierungsmöglichkeiten. Wir beraten Sie bei der optimalen Strukturierung.", icon: "Layers" },
    { title: "Investoren-Matching", copy: "Mit Zugang zu weit über 3.000 Investoren und Banken. Auch ohne öffentliche Platzierung „matchen“ wir Sie manuell mit passenden Investoren.", icon: "Users" }
  ],
  pricingTiers: [
    { title: "Für Kapitalgeber", copy: "Für institutionelle, angemeldete Investoren ist unsere Dienstleistung kostenfrei." },
    { title: "Für Städte & Gemeinden", copy: "Das reine Listing Ihrer Projekte ist kostenfrei. Im Erfolgsfall fällt eine geringe Provision von 0,5 % des eingeworbenen Kapitals pro Jahr an." },
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
  }
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
