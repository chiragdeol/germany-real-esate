import { toast } from "sonner";

export type LeadType = "investor" | "city" | "chat";

export interface CMSContent {
  hero: {
    title: string;
    subtitle: string;
    stats: Array<{ value: string; label: string }>;
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
}

const DEFAULT_CONTENT: CMSContent = {
  hero: {
    title: "Städtische Projekte mit privaten Investoren finanzieren.",
    subtitle: "Banken · Family Offices · Fondsgesellschaften — national und international. Für Infrastruktur, Schulen, Kindergärten und Quartiere. Persönlich vermittelt, kein automatisches Matching, keine Listing-Fee.",
    stats: [
      { value: "3.000+", label: "Investoren & Banken" },
      { value: "0,5 %", label: "Provision p.a." },
      { value: "0 €", label: "Listing-Fee" },
      { value: "100 %", label: "Persönliche Betreuung" }
    ]
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
  ]
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
