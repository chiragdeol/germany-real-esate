import { createFileRoute } from "@tanstack/react-router";
import fs from "fs";
import path from "path";
import { getDbPool } from "@/lib/db.server";

const DATA_DIR = path.resolve("data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

const DEFAULT_CONTENT = {
  headerScripts: "",
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
  videoSectionTexts: {
    cityTitle: "Für Städte & Kommunen",
    cityCopy: "Wie Sie über Stadtfinanzen.de seriöses Kapital ansprechen, ohne sensible Details öffentlich preiszugeben.",
    investorTitle: "Für Investoren",
    investorCopy: "Wie institutionelle Investoren frühzeitig Zugang zu kuratierten Off-Market-Projekten in Deutschland und Europa erhalten."
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
      content: "Die Attraktivität von Mittelstädten (sogenannten B- und C-Standorten) wächst stetig. Während A-Metropolen wie Berlin, München oder Hamburg unter extrem niedrigen Renditen und hoher Regulierung leiden, bieten mittelgroße deutsche Städte ein stabile wirtschaftliches Fundament mit deutlich attraktiveren Renditechancen.\n\n### Wachsende Nachfrage nach regionaler Infrastruktur\nKommunen abseits der Metropolen stehen vor großen Herausforderungen. Von der Sanierung öffentlicher Schulen bis hin zur Modernisierung von Verkehrswegen und Glasfasernetzen ist der Investitionsbedarf gigantisch. Da klassische Bankkredite durch regulatorische Hürden oft schwer zugänglich sind, gewinnen private Finanzierungspartnerschaften (ÖPP) an Bedeutung.\n\n### Vorteile für institutionelle Investoren:\n1. **Geringere Volatilität**: Die Mietmärkte und Immobilienwerte in mittleren Städten sind historisch stabiler.\n2. **Höhere Renditespreads**: Renditen liegen oft 1,0 bis 2,5 % über denen der Metropolen.\n3. **Partnerschaftliche Kooperation**: Kommunen zeigen sich bei Projektentwicklungen oft kooperativer und flexibler.",
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
  },
  homepageHowItWorks: {
    title: "In vier Schritten zur Finanzierung.",
    subtitle: "Wie geht´s?",
    steps: [
      { n: "01", title: "Formular ausfüllen", copy: "Stellen Sie Ihr Projekt über unser Kontaktformular kurz vor – auch anonymisiert möglich." },
      { n: "02", title: "Inhalte freigeben", copy: "Wir pflegen Ihre Angaben ein. Veröffentlicht wird erst nach Ihrer ausdrücklichen Freigabe." },
      { n: "03", title: "Anfragen erhalten", copy: "Investorenanfragen leiten wir direkt an Sie weiter. Sie entscheiden, mit wem Sie sprechen." },
      { n: "04", title: "Direkt verhandeln", copy: "Sie verhandeln Konditionen direkt mit dem Investor. Wir begleiten Sie bei der Finanzierung." }
    ]
  },
  homepageWhyUs: {
    title: "Hier finden Sie Investoren.",
    subtitle: "Ihre Vorteile",
    items: [
      { icon: "ShieldCheck", title: "Sie behalten die Kontrolle", copy: "Sie bestimmen, welche Informationen Sie bekannt geben – auf Wunsch auch vollständig anonym." },
      { icon: "Handshake", title: "Kein automatisches Matching", copy: "Wir leiten Investoren direkt und persönlich an Sie weiter – keine Algorithmen, kein Massenversand." },
      { icon: "Building2", title: "Keine Listing-Fee", copy: "Das Einstellen Ihres Projekts ist kostenfrei. Eine geringe Provision fällt nur im Erfolgsfall an." },
      { icon: "Sparkles", title: "Persönliche Betreuung", copy: "Ein fester Ansprechpartner begleitet Sie von der Anfrage bis zur Finanzierungszusage." }
    ]
  },
  homepageCta: {
    title: "Bereit für den nächsten Schritt?",
    subtitle: "Kommunale Finanzierung modern, diskret und effizient. Registrieren Sie sich noch heute kostenlos.",
    buttonText: "Projekt einreichen"
  }
};

function initContentFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CONTENT_FILE)) {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), "utf8");
    }
  } catch (error) {
    console.error("Failed to initialize content file:", error);
  }
}

async function runMigrations(pool: any) {
  try {
    // Check if the 'content' column exists in 'blog_posts' table
    const [cols] = await pool.query("SHOW COLUMNS FROM blog_posts LIKE 'content'");
    if ((cols as any[]).length === 0) {
      await pool.query("ALTER TABLE blog_posts ADD COLUMN content LONGTEXT NOT NULL DEFAULT ''");
      console.log("MySQL migration: Added content column to blog_posts table successfully.");
    }
  } catch (err) {
    console.error("MySQL migration check failed:", err);
  }
}

export const Route = createFileRoute("/api/content")({
  server: {
    handlers: {
      GET: async () => {
        // Try MySQL first
        const pool = getDbPool();
        if (pool) {
          try {
            // Run migrations check first
            await runMigrations(pool);

            // Fetch all settings
            const [settingsRows] = await pool.query("SELECT * FROM site_settings");
            const settingsMap = new Map((settingsRows as any[]).map(row => [row.setting_key, row.setting_value]));
            
            // Fetch all blog posts
            const [postsRows] = await pool.query("SELECT * FROM blog_posts ORDER BY created_at DESC");
            const posts = (postsRows as any[]).map(row => ({
              id: row.id,
              tag: row.tag,
              title: row.title,
              excerpt: row.excerpt,
              content: row.content || "",
              date: row.date_text,
              read: row.read_time
            }));

            // Helpers to parse JSON fields safely
            const parseJsonField = (key: string, fallback: any) => {
              const raw = settingsMap.get(key);
              if (!raw) return fallback;
              try {
                return JSON.parse(raw);
              } catch (e) {
                return fallback;
              }
            };

            const dbContent = {
              headerScripts: settingsMap.get("header_scripts") || "",
              hero: {
                title: settingsMap.get("hero_title") || DEFAULT_CONTENT.hero.title,
                subtitle: settingsMap.get("hero_subtitle") || DEFAULT_CONTENT.hero.subtitle,
                videoUrl: settingsMap.get("hero_video_url") || "",
                bgType: settingsMap.get("hero_bg_type") || "video",
                imageUrl: settingsMap.get("hero_image_url") || "",
                stats: parseJsonField("hero_stats", DEFAULT_CONTENT.hero.stats)
              },
              videos: {
                cityVideoUrl: settingsMap.get("video_city_url") || "",
                investorVideoUrl: settingsMap.get("video_investor_url") || ""
              },
              videoSectionTexts: parseJsonField("video_section_texts", DEFAULT_CONTENT.videoSectionTexts),
              contact: {
                email: settingsMap.get("contact_email") || DEFAULT_CONTENT.contact.email,
                phone: settingsMap.get("contact_phone") || DEFAULT_CONTENT.contact.phone,
                address: settingsMap.get("contact_address") || DEFAULT_CONTENT.contact.address
              },
              blog: {
                title: settingsMap.get("blog_title") || DEFAULT_CONTENT.blog.title
              },
              posts: posts.length > 0 ? posts : DEFAULT_CONTENT.posts,
              
              projectTypesList: parseJsonField("project_types_list", DEFAULT_CONTENT.projectTypesList),
              homepageServices: parseJsonField("homepage_services", DEFAULT_CONTENT.homepageServices),
              pricingTiers: parseJsonField("pricing_tiers", DEFAULT_CONTENT.pricingTiers),
              about: {
                title: settingsMap.get("about_title") || DEFAULT_CONTENT.about.title,
                introTitle: settingsMap.get("about_intro_title") || DEFAULT_CONTENT.about.introTitle,
                introText1: settingsMap.get("about_intro_text1") || DEFAULT_CONTENT.about.introText1,
                introText2: settingsMap.get("about_intro_text2") || DEFAULT_CONTENT.about.introText2,
                projectTypes: parseJsonField("about_project_types", DEFAULT_CONTENT.about.projectTypes)
              },
              
              // New layout sections
              homepageHowItWorks: parseJsonField("homepage_how_it_works", DEFAULT_CONTENT.homepageHowItWorks),
              homepageWhyUs: parseJsonField("homepage_why_us", DEFAULT_CONTENT.homepageWhyUs),
              homepageCta: parseJsonField("homepage_cta", DEFAULT_CONTENT.homepageCta)
            };

            return new Response(JSON.stringify(dbContent), {
              headers: { "content-type": "application/json" },
            });
          } catch (error) {
            console.error("MySQL query failed, falling back to JSON file:", error);
          }
        }

        // JSON Fallback
        initContentFile();
        try {
          const raw = fs.readFileSync(CONTENT_FILE, "utf8");
          return new Response(raw, {
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          return new Response(JSON.stringify(DEFAULT_CONTENT), {
            headers: { "content-type": "application/json" },
          });
        }
      },
      POST: async ({ request }) => {
        const authHeader = request.headers.get("x-admin-token");
        if (authHeader !== "admin-secret-token") {
          return new Response("Unauthorized", { status: 401 });
        }

        try {
          const newContent = await request.json();

          // Try MySQL first
          const pool = getDbPool();
          if (pool) {
            try {
              // Run migrations check first
              await runMigrations(pool);

              const saveSetting = async (key: string, value: string) => {
                await pool.query(
                  "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
                  [key, value, value]
                );
              };

              // Save settings
              await saveSetting("header_scripts", newContent.headerScripts || "");
              await saveSetting("hero_title", newContent.hero.title || "");
              await saveSetting("hero_subtitle", newContent.hero.subtitle || "");
              await saveSetting("hero_video_url", newContent.hero.videoUrl || "");
              await saveSetting("hero_bg_type", newContent.hero.bgType || "video");
              await saveSetting("hero_image_url", newContent.hero.imageUrl || "");
              await saveSetting("video_city_url", newContent.videos?.cityVideoUrl || "");
              await saveSetting("video_investor_url", newContent.videos?.investorVideoUrl || "");
              await saveSetting("contact_email", newContent.contact.email || "");
              await saveSetting("contact_phone", newContent.contact.phone || "");
              await saveSetting("contact_address", newContent.contact.address || "");
              await saveSetting("blog_title", newContent.blog.title || "");
              await saveSetting("hero_stats", JSON.stringify(newContent.hero.stats || []));
              
              await saveSetting("project_types_list", JSON.stringify(newContent.projectTypesList || []));
              await saveSetting("homepage_services", JSON.stringify(newContent.homepageServices || []));
              await saveSetting("pricing_tiers", JSON.stringify(newContent.pricingTiers || []));
              
              await saveSetting("about_title", newContent.about?.title || "");
              await saveSetting("about_intro_title", newContent.about?.introTitle || "");
              await saveSetting("about_intro_text1", newContent.about?.introText1 || "");
              await saveSetting("about_intro_text2", newContent.about?.introText2 || "");
              await saveSetting("about_project_types", JSON.stringify(newContent.about?.projectTypes || []));

              // New CMS layout sections
              await saveSetting("video_section_texts", JSON.stringify(newContent.videoSectionTexts || {}));
              await saveSetting("homepage_how_it_works", JSON.stringify(newContent.homepageHowItWorks || {}));
              await saveSetting("homepage_why_us", JSON.stringify(newContent.homepageWhyUs || {}));
              await saveSetting("homepage_cta", JSON.stringify(newContent.homepageCta || {}));

              // Save blog posts
              await pool.query("DELETE FROM blog_posts");
              if (Array.isArray(newContent.posts)) {
                for (const post of newContent.posts) {
                  await pool.query(
                    "INSERT INTO blog_posts (id, tag, title, excerpt, content, date_text, read_time) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [post.id, post.tag, post.title, post.excerpt, post.content || "", post.date, post.read]
                  );
                }
              }

              return new Response(JSON.stringify({ ok: true }), {
                headers: { "content-type": "application/json" },
              });
            } catch (error) {
              console.error("MySQL content save failed, falling back to JSON file:", error);
            }
          }

          // JSON Fallback
          initContentFile();
          fs.writeFileSync(CONTENT_FILE, JSON.stringify(newContent, null, 2), "utf8");
          
          return new Response(JSON.stringify({ ok: true }), {
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          console.error("Failed to save content:", error);
          return new Response(JSON.stringify({ ok: false, error: String(error) }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
