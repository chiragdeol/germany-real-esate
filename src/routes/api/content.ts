import { createFileRoute } from "@tanstack/react-router";
import fs from "fs";
import path from "path";
import { getDbPool } from "@/lib/db.server";

const DATA_DIR = path.resolve("data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

const DEFAULT_CONTENT = {
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

export const Route = createFileRoute("/api/content")({
  server: {
    handlers: {
      GET: async () => {
        // Try MySQL first
        const pool = getDbPool();
        if (pool) {
          try {
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
              contact: {
                email: settingsMap.get("contact_email") || DEFAULT_CONTENT.contact.email,
                phone: settingsMap.get("contact_phone") || DEFAULT_CONTENT.contact.phone,
                address: settingsMap.get("contact_address") || DEFAULT_CONTENT.contact.address
              },
              blog: {
                title: settingsMap.get("blog_title") || DEFAULT_CONTENT.blog.title
              },
              posts: posts.length > 0 ? posts : DEFAULT_CONTENT.posts,
              
              // Expanded fields
              projectTypesList: parseJsonField("project_types_list", DEFAULT_CONTENT.projectTypesList),
              homepageServices: parseJsonField("homepage_services", DEFAULT_CONTENT.homepageServices),
              pricingTiers: parseJsonField("pricing_tiers", DEFAULT_CONTENT.pricingTiers),
              about: {
                title: settingsMap.get("about_title") || DEFAULT_CONTENT.about.title,
                introTitle: settingsMap.get("about_intro_title") || DEFAULT_CONTENT.about.introTitle,
                introText1: settingsMap.get("about_intro_text1") || DEFAULT_CONTENT.about.introText1,
                introText2: settingsMap.get("about_intro_text2") || DEFAULT_CONTENT.about.introText2,
                projectTypes: parseJsonField("about_project_types", DEFAULT_CONTENT.about.projectTypes)
              }
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
        // Simple security check using custom header
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
              const saveSetting = async (key: string, value: string) => {
                await pool.query(
                  "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
                  [key, value, value]
                );
              };

              // Save settings
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
              
              // Save expanded settings
              await saveSetting("project_types_list", JSON.stringify(newContent.projectTypesList || []));
              await saveSetting("homepage_services", JSON.stringify(newContent.homepageServices || []));
              await saveSetting("pricing_tiers", JSON.stringify(newContent.pricingTiers || []));
              
              await saveSetting("about_title", newContent.about?.title || "");
              await saveSetting("about_intro_title", newContent.about?.introTitle || "");
              await saveSetting("about_intro_text1", newContent.about?.introText1 || "");
              await saveSetting("about_intro_text2", newContent.about?.introText2 || "");
              await saveSetting("about_project_types", JSON.stringify(newContent.about?.projectTypes || []));

              // Save blog posts
              await pool.query("DELETE FROM blog_posts");
              if (Array.isArray(newContent.posts)) {
                for (const post of newContent.posts) {
                  await pool.query(
                    "INSERT INTO blog_posts (id, tag, title, excerpt, date_text, read_time) VALUES (?, ?, ?, ?, ?, ?)",
                    [post.id, post.tag, post.title, post.excerpt, post.date, post.read]
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
