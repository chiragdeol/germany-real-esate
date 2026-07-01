import { toast } from "sonner";

export type LeadType = "investor" | "city";

export async function submitLead(type: LeadType, data: Record<string, unknown>) {
  // Frontend-only placeholder. Persists locally so leads are visible during
  // the demo; replace with a server function that emails the admin and
  // writes to the CRM/database before going live.
  try {
    if (typeof window !== "undefined") {
      const key = `civita_leads_${type}`;
      const existing = JSON.parse(localStorage.getItem(key) ?? "[]");
      existing.push({ ...data, submittedAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
    }
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thank you — we'll be in touch shortly.", {
      description: "A partner will personally review your submission.",
    });
    return { ok: true as const };
  } catch (e) {
    toast.error("Something went wrong. Please try again.");
    return { ok: false as const };
  }
}
