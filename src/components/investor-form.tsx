import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitLead } from "@/lib/leads";

const schema = z.object({
  name: z.string().trim().min(2, "Required").max(100),
  company: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().min(5, "Required").max(40),
  investorType: z.string().min(1, "Please select"),
  assetClass: z.string().min(1, "Please select"),
  range: z.string().min(1, "Please select"),
  geography: z.string().trim().max(200).optional().or(z.literal("")),
  terms: z.literal(true, { message: "Required" }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function InvestorForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const raw = {
      name: String(f.get("name") ?? ""),
      company: String(f.get("company") ?? ""),
      email: String(f.get("email") ?? ""),
      phone: String(f.get("phone") ?? ""),
      investorType: String(f.get("investorType") ?? ""),
      assetClass: String(f.get("assetClass") ?? ""),
      range: String(f.get("range") ?? ""),
      geography: String(f.get("geography") ?? ""),
      terms,
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fe: Errors = {};
      for (const issue of parsed.error.issues) {
        fe[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setErrors({});
    setLoading(true);
    const res = await submitLead("investor", parsed.data);
    setLoading(false);
    if (res.ok) (e.target as HTMLFormElement).reset();
    if (res.ok) setTerms(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} />
        <Field label="Unternehmen" name="company" error={errors.company} />
        <Field label="E-Mail" name="email" type="email" error={errors.email} />
        <Field label="Telefon" name="phone" type="tel" error={errors.phone} />
      </div>
      <SelectField
        label="Investorentyp"
        name="investorType"
        error={errors.investorType}
        options={[
          "Family Office",
          "Private equity",
          "Pensionskasse",
          "Staatsfonds",
          "Immobilienfonds",
          "Infrastrukturfonds",
          "Bank",
          "Privatperson / HNWI",
          "Sonstige",
        ]}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Anlageschwerpunkt"
          name="assetClass"
          error={errors.assetClass}
          options={[
            "Infrastruktur",
            "Stadtentwicklung",
            "Energie (Wind, Solar, Speicher)",
            "Städtische Einrichtungen (Schulen, Kitas)",
            "Wohnungsbau",
            "Öffentlich-private Partnerschaft",
            "Sonstige",
          ]}
        />
        <SelectField
          label="Investitionsvolumen"
          name="range"
          error={errors.range}
          options={[
            "< 5 Mio. €",
            "5–25 Mio. €",
            "25–100 Mio. €",
            "100–250 Mio. €",
            "250 Mio. €+",
          ]}
        />
      </div>
      <Field
        label="Bevorzugte Region (optional)"
        name="geography"
        placeholder="z. B. Deutschland, DACH, EU"
      />
      <label className="flex items-start gap-3 text-sm">
        <Checkbox checked={terms} onCheckedChange={(v) => setTerms(Boolean(v))} className="mt-1" />
        <span className="text-muted-foreground">
          Ich bin damit einverstanden, von Stadtfinanzen.de kontaktiert zu
          werden und akzeptiere die{" "}
          <a href="#" className="underline">Datenschutzerklärung</a>. Meine
          Daten werden DSGVO-konform verarbeitet.
        </span>
      </label>
      {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}
      <Button type="submit" variant="hero" size="lg" disabled={loading} className="justify-self-start">
        {loading ? "Wird gesendet…" : "Als Investor registrieren"}
      </Button>
    </form>
  );
}

function Field({
  label, name, type = "text", error, placeholder,
}: { label: string; name: string; type?: string; error?: string; placeholder?: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} className="h-11 rounded-sm" />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SelectField({
  label, name, options, error,
}: { label: string; name: string; options: string[]; error?: string }) {
  const [value, setValue] = useState("");
  return (
    <div className="grid gap-2">
      <Label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</Label>
      <input type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="h-11 rounded-sm">
          <SelectValue placeholder="Select…" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>{o}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export { Field as LeadField, SelectField as LeadSelectField };
export const LeadTextarea = ({
  label, name, error,
}: { label: string; name: string; error?: string }) => (
  <div className="grid gap-2">
    <Label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</Label>
    <Textarea name={name} rows={4} className="rounded-sm" />
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);
