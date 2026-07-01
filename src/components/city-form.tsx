import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LeadField, LeadSelectField, LeadTextarea } from "@/components/investor-form";
import { submitLead } from "@/lib/leads";

const schema = z.object({
  municipality: z.string().trim().min(2).max(160),
  contact: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(40),
  projectType: z.string().min(1),
  size: z.string().min(1),
  financing: z.string().min(1),
  description: z.string().trim().min(20, "Please give us at least a short paragraph").max(2000),
  terms: z.literal(true, { message: "Required" }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function CityForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const raw = {
      municipality: String(f.get("municipality") ?? ""),
      contact: String(f.get("contact") ?? ""),
      email: String(f.get("email") ?? ""),
      phone: String(f.get("phone") ?? ""),
      projectType: String(f.get("projectType") ?? ""),
      size: String(f.get("size") ?? ""),
      financing: String(f.get("financing") ?? ""),
      description: String(f.get("description") ?? ""),
      terms,
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fe: Errors = {};
      for (const i of parsed.error.issues) fe[i.path[0] as keyof Errors] = i.message;
      setErrors(fe);
      return;
    }
    setErrors({});
    setLoading(true);
    const res = await submitLead("city", parsed.data);
    setLoading(false);
    if (res.ok) {
      (e.target as HTMLFormElement).reset();
      setTerms(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <LeadField label="Stadt / Kommune" name="municipality" error={errors.municipality} />
        <LeadField label="Ansprechpartner" name="contact" error={errors.contact} />
        <LeadField label="E-Mail" name="email" type="email" error={errors.email} />
        <LeadField label="Telefon" name="phone" type="tel" error={errors.phone} />
      </div>
      <LeadSelectField
        label="Projekttyp"
        name="projectType"
        error={errors.projectType}
        options={[
          "Infrastruktur (Straße, Brücke, Glasfaser …)",
          "Stadtentwicklung / Quartier",
          "Sozialer Wohnungsbau",
          "Energie (Wind, Solar, Speicher)",
          "Schulen / Kindergärten",
          "Soziale Einrichtungen",
          "Tourismus & Kultur",
          "Mobilität / ÖPNV",
          "Sonstiges",
        ]}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <LeadSelectField
          label="Benötigtes Investitionsvolumen"
          name="size"
          error={errors.size}
          options={["< 5 Mio. €", "5–25 Mio. €", "25–100 Mio. €", "100–250 Mio. €", "250 Mio. €+"]}
        />
        <LeadSelectField
          label="Bevorzugte Finanzierungsform"
          name="financing"
          error={errors.financing}
          options={[
            "Eigenkapital",
            "Fremdkapital",
            "Öffentlich-private Partnerschaft",
            "Konzession",
            "Förderung + Co-Investment",
            "Offen / zu besprechen",
          ]}
        />
      </div>
      <LeadTextarea label="Projektbeschreibung" name="description" error={errors.description} />
      <label className="flex items-start gap-3 text-sm">
        <Checkbox checked={terms} onCheckedChange={(v) => setTerms(Boolean(v))} className="mt-1" />
        <span className="text-muted-foreground">
          Ich bin berechtigt, diese Informationen weiterzugeben, und stimme
          der DSGVO-konformen Verarbeitung zur Vermittlung von Investoren zu.
        </span>
      </label>
      {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}
      <Button type="submit" variant="hero" size="lg" disabled={loading} className="justify-self-start">
        {loading ? "Wird gesendet…" : "Projekt einreichen"}
      </Button>
    </form>
  );
}
