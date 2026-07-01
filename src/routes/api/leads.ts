import { createFileRoute } from "@tanstack/react-router";
import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve("data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Ensure data directory and file exist
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
        initLeadsFile();
        try {
          const lead = await request.json();
          const raw = fs.readFileSync(LEADS_FILE, "utf8");
          const leads = JSON.parse(raw);
          
          const newLead = {
            id: Math.random().toString(36).substring(2, 9),
            ...lead,
            submittedAt: new Date().toISOString(),
          };
          
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
