import { createFileRoute } from "@tanstack/react-router";
import fs from "fs";
import path from "path";
import { getDbPool } from "@/lib/db.server";

const DATA_DIR = path.resolve("data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Ensure data directory and file exist (for JSON fallback)
function initLeadsFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, "[]", "utf8");
    }
  } catch (error) {
    console.error("Failed to initialize leads file:", error);
  }
}

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Simple security check using custom header
        const authHeader = request.headers.get("x-admin-token");
        if (authHeader !== "admin-secret-token") {
          return new Response("Unauthorized", { status: 401 });
        }

        // Try MySQL first
        const pool = getDbPool();
        if (pool) {
          try {
            const [rows] = await pool.query("SELECT * FROM leads ORDER BY submitted_at DESC");
            const formattedLeads = (rows as any[]).map(row => {
              // Parse details field if stored as string or object
              let parsedDetails = {};
              if (row.details) {
                try {
                  parsedDetails = typeof row.details === "string" ? JSON.parse(row.details) : row.details;
                } catch (e) {
                  // ignore
                }
              }
              return {
                id: row.id,
                type: row.type,
                submittedAt: row.submitted_at,
                data: {
                  name: row.name,
                  company: row.company,
                  email: row.email,
                  phone: row.phone,
                  investorType: row.investor_type,
                  range: row.investment_range,
                  ...parsedDetails
                }
              };
            });
            return new Response(JSON.stringify(formattedLeads), {
              headers: { "content-type": "application/json" },
            });
          } catch (error) {
            console.error("MySQL query failed, falling back to JSON file:", error);
          }
        }

        // JSON Fallback
        initLeadsFile();
        try {
          const raw = fs.readFileSync(LEADS_FILE, "utf8");
          return new Response(raw, {
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          return new Response("[]", {
            headers: { "content-type": "application/json" },
          });
        }
      },
      POST: async ({ request }) => {
        try {
          const payload = await request.json();
          const { type, data } = payload;
          
          const newLead = {
            id: Math.random().toString(36).substring(2, 9),
            type,
            submittedAt: new Date().toISOString(),
            data,
          };

          // Try MySQL first
          const pool = getDbPool();
          if (pool) {
            try {
              const query = `
                INSERT INTO leads (id, type, name, company, email, phone, investor_type, investment_range, details, submitted_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;
              const values = [
                newLead.id,
                newLead.type,
                data.name || "N/A",
                data.company || null,
                data.email || "N/A",
                data.phone || null,
                data.investorType || null,
                data.range || null,
                JSON.stringify(data),
                new Date()
              ];
              await pool.query(query, values);
              
              return new Response(JSON.stringify({ ok: true, lead: newLead }), {
                headers: { "content-type": "application/json" },
              });
            } catch (error) {
              console.error("MySQL save failed, falling back to JSON file:", error);
            }
          }

          // JSON Fallback
          initLeadsFile();
          const raw = fs.readFileSync(LEADS_FILE, "utf8");
          const leads = JSON.parse(raw);
          leads.push(newLead);
          fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
          
          return new Response(JSON.stringify({ ok: true, lead: newLead }), {
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          console.error("Failed to save lead:", error);
          return new Response(JSON.stringify({ ok: false, error: String(error) }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
