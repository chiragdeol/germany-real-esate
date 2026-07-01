import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Supported languages
const LANGUAGES = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
];

export function LanguageTranslator() {
  const [lang, setLang] = useState("de");

  useEffect(() => {
    // 1. Define global callback for Google Translate initialization
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "de",
            includedLanguages: "de,en,es,fr,it",
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };

      // Create hidden target div in the DOM
      if (!document.getElementById("google_translate_element")) {
        const div = document.createElement("div");
        div.id = "google_translate_element";
        div.style.display = "none";
        document.body.appendChild(div);
      }

      // Load Google Translate script dynamically
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // Read the current language from googtrans cookie set by Google Translate
    const checkTransCookie = () => {
      const match = document.cookie.match(/googtrans=\/de\/([a-z]{2})/);
      if (match && match[1]) {
        setLang(match[1]);
      } else {
        setLang("de");
      }
    };

    checkTransCookie();
    const interval = setInterval(checkTransCookie, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang);
    
    // Set googtrans cookie (standard for Google Translate)
    const domain = window.location.hostname.replace('www', '');
    document.cookie = `googtrans=/de/${newLang}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/de/${newLang}; path=/;`; // local fallback
    
    // Change value in Google Translate's hidden dropdown and dispatch change event
    const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = newLang;
      selectEl.dispatchEvent(new Event("change"));
    } else {
      // Fallback: Reload page to let the cookie take effect
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center">
      <Select value={lang} onValueChange={handleLanguageChange}>
        <SelectTrigger className="h-8 w-[110px] border-border/40 bg-background/50 text-xs gap-1 cursor-pointer">
          <Globe className="h-3.5 w-3.5 opacity-60 shrink-0" />
          <SelectValue placeholder="Sprache" />
        </SelectTrigger>
        <SelectContent align="end">
          {LANGUAGES.map((l) => (
            <SelectItem key={l.code} value={l.code} className="text-xs">
              {l.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
