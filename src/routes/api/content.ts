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
    videoUrl: "", // Hero video link
    stats: [
      { value: "3.000+", label: "Investoren & Banken" },
      { value: "0,5 %", label: "Provision p.a." },
      { value: "0 €", label: "Listing-Fee" },
      { value: "100 %", label: "Persönliche Betreuung" }
    ]
  },
  videos: {
    cityVideoUrl: "", // Explanatory video for cities
    investorVideoUrl: "", // Explanatory video for investors
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

            // Reconstruct JSON from DB values
            const heroStatsRaw = settingsMap.get("hero_stats");
            let stats = DEFAULT_CONTENT.hero.stats;
            if (heroStatsRaw) {
              try {
                stats = JSON.parse(heroStatsRaw);
              } catch (e) {
                // ignore
              }
            }

            const dbContent = {
              hero: {
                title: settingsMap.get("hero_title") || DEFAULT_CONTENT.hero.title,
                subtitle: settingsMap.get("hero_subtitle") || DEFAULT_CONTENT.hero.subtitle,
                videoUrl: settingsMap.get("hero_video_url") || "",
                stats
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
              posts
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
              // Helper to insert settings
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
              await saveSetting("video_city_url", newContent.videos?.cityVideoUrl || "");
              await saveSetting("video_investor_url", newContent.videos?.investorVideoUrl || "");
              await saveSetting("contact_email", newContent.contact.email || "");
              await saveSetting("contact_phone", newContent.contact.phone || "");
              await saveSetting("contact_address", newContent.contact.address || "");
              await saveSetting("blog_title", newContent.blog.title || "");
              await saveSetting("hero_stats", JSON.stringify(newContent.hero.stats || []));

              // Save blog posts (clear and reload in a transaction-like sequence)
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
