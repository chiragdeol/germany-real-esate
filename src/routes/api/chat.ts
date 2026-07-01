import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the Civita Capital concierge, a calm, professional European investment introduction assistant. Your only job is to qualify visitors as either an INVESTOR or a CITY/MUNICIPALITY and collect the right lead fields conversationally — never all at once.

First ask which describes them: an investor seeking opportunities, or a city/municipality seeking investment.

If INVESTOR, collect (one or two at a time, in this order):
- Full name
- Company / fund
- Email
- Phone (optional)
- Investor type (institutional, family office, fund, private)
- Sector interest (e.g. renewables, real estate, infrastructure)
- Investment range (EUR)
- Preferred geography
- Confirm they accept the privacy terms

If CITY / MUNICIPALITY, collect:
- Municipality name
- Contact person
- Email
- Phone (optional)
- Project type
- Investment size (EUR)
- Financing type (equity, debt, PPP, grant)
- Short description of the project
- Confirm they accept the privacy terms

Rules:
- Be warm, concise, and European in tone. Never pushy.
- Ask follow-ups, paraphrase to confirm.
- Never claim to automatically match parties — explain that a partner will follow up personally within two working days.
- When all required fields are collected, summarize them in a clean markdown list and tell them a partner from Civita Capital will be in touch. End with: "Your inquiry has been recorded."
- Do not invent project listings or financial figures. Do not provide legal or tax advice.`;

type ChatRequestBody = { messages?: unknown };

// -------------------------------------------------------------
// RULE-BASED FALLBACK CHATBOT (Runs if LOVABLE_API_KEY is missing)
// -------------------------------------------------------------
function getMockBotResponse(messages: any[]): string {
  const userMessages = messages.filter((m) => m.role === "user");
  const lastUserMessage = userMessages[userMessages.length - 1];
  const lastUserText = lastUserMessage 
    ? lastUserMessage.parts.map((p: any) => p.text || "").join("").trim().toLowerCase() 
    : "";

  const isInvestorFlow = messages.some(m => m.role === "user" && (
    m.parts.map((p: any) => p.text || "").join("").toLowerCase().includes("investor") || 
    m.parts.map((p: any) => p.text || "").join("").toLowerCase().includes("kapitalgeber") ||
    m.parts.map((p: any) => p.text || "").join("").toLowerCase().includes("anlegen")
  ));
  
  const isCityFlow = messages.some(m => m.role === "user" && (
    m.parts.map((p: any) => p.text || "").join("").toLowerCase().includes("city") || 
    m.parts.map((p: any) => p.text || "").join("").toLowerCase().includes("stadt") || 
    m.parts.map((p: any) => p.text || "").join("").toLowerCase().includes("kommune") || 
    m.parts.map((p: any) => p.text || "").join("").toLowerCase().includes("projekt")
  ));

  if (!isInvestorFlow && !isCityFlow) {
    if (lastUserText.includes("investor") || lastUserText.includes("kapitalgeber") || lastUserText.includes("anlegen")) {
      return "Ausgezeichnet! Registrieren wir Sie als Investor. Wie lautet Ihr vollständiger Name?";
    } else if (lastUserText.includes("city") || lastUserText.includes("stadt") || lastUserText.includes("kommune") || lastUserText.includes("projekt")) {
      return "Sehr gut! Registrieren wir Ihr städtisches Projekt. Wie lautet der Name Ihrer Gemeinde, Stadt oder öffentlichen Einrichtung?";
    } else {
      return "Bitte wählen Sie eine der folgenden Optionen aus, damit ich Ihnen weiterhelfen kann:\n\n- **Investor** (auf der Suche nach Anlagemöglichkeiten)\n- **Stadt / Kommune** (auf der Suche nach Projektfinanzierung)";
    }
  }

  // 1. Investor flow questions
  if (isInvestorFlow) {
    const assistantTexts = messages.filter(m => m.role === "assistant").map(m => m.parts.map((p: any) => p.text || "").join("").toLowerCase());
    
    const askedName = assistantTexts.some(t => t.includes("vollständiger name") || t.includes("wie lautet ihr name"));
    const askedCompany = assistantTexts.some(t => t.includes("unternehmen") || t.includes("firma") || t.includes("institution"));
    const askedEmail = assistantTexts.some(t => t.includes("e-mail-adresse") || t.includes("email"));
    const askedPhone = assistantTexts.some(t => t.includes("telefonnummer"));
    const askedType = assistantTexts.some(t => t.includes("investorentyp"));
    const askedSector = assistantTexts.some(t => t.includes("sektoren"));
    const askedRange = assistantTexts.some(t => t.includes("investitionsvolumen"));
    const askedGeography = assistantTexts.some(t => t.includes("regionen oder geografien"));
    const askedTerms = assistantTexts.some(t => t.includes("datenschutzerklärung"));

    if (!askedName) return "Ausgezeichnet! Registrieren wir Sie als Investor. Wie lautet Ihr vollständiger Name?";
    if (!askedCompany) return "Vielen Dank. Welches Unternehmen, welchen Fonds oder welche Institution vertreten Sie?";
    if (!askedEmail) return "Verstanden. Wie lautet Ihre geschäftliche E-Mail-Adresse?";
    if (!askedPhone) return "Perfekt. Unter welcher Telefonnummer können wir Sie für Rückfragen erreichen (optional, schreiben Sie 'Nein' zum Überspringen)?";
    if (!askedType) return "Welcher Investorentyp beschreibt Sie am besten (z. B. Family Office, Private Equity, Pensionskasse, Bank, Privatperson)?";
    if (!askedSector) return "In welche Sektoren investieren Sie primär (z. B. Erneuerbare Energien, Infrastruktur, Wohnungsbau, Stadtentwicklung)?";
    if (!askedRange) return "Wie hoch ist Ihr typisches Investitionsvolumen (z. B. unter 5 Mio. €, 5-25 Mio. €, 25-100 Mio. €)?";
    if (!askedGeography) return "Welche Regionen oder Geografien bevorzugen Sie (z. B. Deutschland, DACH, EU, International)?";
    if (!askedTerms) return "Sind Sie damit einverstanden, dass wir Sie kontaktieren und Ihre Daten gemäß unserer Datenschutzerklärung verarbeiten? (Antworten Sie mit Ja oder Nein)";

    // Compile summary
    const investorName = getAnswerAfterQuestion(messages, "vollständiger name");
    const investorCompany = getAnswerAfterQuestion(messages, "unternehmen");
    const investorEmail = getAnswerAfterQuestion(messages, "e-mail-adresse");
    const investorPhone = getAnswerAfterQuestion(messages, "telefonnummer");
    const investorType = getAnswerAfterQuestion(messages, "investorentyp");
    const investorSector = getAnswerAfterQuestion(messages, "sektoren");
    const investorRange = getAnswerAfterQuestion(messages, "investitionsvolumen");
    const investorGeo = getAnswerAfterQuestion(messages, "regionen oder geografien");

    return `Vielen Dank für Ihre Angaben! Hier ist eine Zusammenfassung Ihrer Registrierung als Investor:

- **Name**: ${investorName}
- **Company**: ${investorCompany}
- **Email**: ${investorEmail}
- **Phone**: ${investorPhone}
- **Investor Type**: ${investorType}
- **Sector interest**: ${investorSector}
- **Investment range**: ${investorRange}
- **Preferred geography**: ${investorGeo}

Ein Partner von Civita Capital wird Ihre Angaben prüfen und sich innerhalb von zwei Werktagen persönlich mit Ihnen in Verbindung setzen.

Your inquiry has been recorded.`;
  }

  // 2. City flow questions
  if (isCityFlow) {
    const assistantTexts = messages.filter(m => m.role === "assistant").map(m => m.parts.map((p: any) => p.text || "").join("").toLowerCase());
    
    const askedName = assistantTexts.some(t => t.includes("name ihrer gemeinde") || t.includes("stadt") || t.includes("kommune"));
    const askedContact = assistantTexts.some(t => t.includes("zuständige kontaktperson") || t.includes("ansprechpartner"));
    const askedEmail = assistantTexts.some(t => t.includes("offizielle e-mail-adresse") || t.includes("email"));
    const askedPhone = assistantTexts.some(t => t.includes("telefonnummer"));
    const askedProject = assistantTexts.some(t => t.includes("art von projekt"));
    const askedSize = assistantTexts.some(t => t.includes("geschätzte investitionsvolumen"));
    const askedFinancing = assistantTexts.some(t => t.includes("finanzierungsart"));
    const askedDescription = assistantTexts.some(t => t.includes("kurze beschreibung"));
    const askedTerms = assistantTexts.some(t => t.includes("datenschutzerklärung"));

    if (!askedName) return "Sehr gut! Registrieren wir Ihr städtisches Projekt. Wie lautet der Name Ihrer Gemeinde, Stadt oder öffentlichen Einrichtung?";
    if (!askedContact) return "Vielen Dank. Wer ist die zuständige Kontaktperson für dieses Vorhaben?";
    if (!askedEmail) return "Wie lautet die offizielle E-Mail-Adresse für die Kontaktaufnahme?";
    if (!askedPhone) return "Unter welcher Telefonnummer können wir Sie erreichen (optional, 'Nein' zum Überspringen)?";
    if (!askedProject) return "Um welche Art von Projekt handelt es sich (z. B. Schulbau, Windpark, Kitabau, Quartiersentwicklung)?";
    if (!askedSize) return "Wie hoch ist das geschätzte Investitionsvolumen für dieses Projekt (in EUR)?";
    if (!askedFinancing) return "Welche Finanzierungsart wird angestrebt (z. B. Eigenkapital, Fremdkapital, ÖPP, Zuschuss)?";
    if (!askedDescription) return "Bitte geben Sie uns eine kurze Beschreibung des Projekts (2-3 Sätze):";
    if (!askedTerms) return "Sind Sie damit einverstanden, dass wir Sie kontaktieren und Ihre Daten gemäß unserer Datenschutzerklärung verarbeiten? (Antworten Sie mit Ja oder Nein)";

    // Compile summary
    const cityName = getAnswerAfterQuestion(messages, "name ihrer gemeinde");
    const cityContact = getAnswerAfterQuestion(messages, "zuständige kontaktperson");
    const cityEmail = getAnswerAfterQuestion(messages, "e-mail-adresse");
    const cityPhone = getAnswerAfterQuestion(messages, "telefonnummer");
    const cityProject = getAnswerAfterQuestion(messages, "art von projekt");
    const citySize = getAnswerAfterQuestion(messages, "geschätzte investitionsvolumen");
    const cityFinancing = getAnswerAfterQuestion(messages, "finanzierungsart");
    const cityDesc = getAnswerAfterQuestion(messages, "kurze beschreibung");

    return `Vielen Dank für Ihre Angaben! Hier ist eine Zusammenfassung Ihres städtischen Projekts:

- **Municipality**: ${cityName}
- **Contact person**: ${cityContact}
- **Email**: ${cityEmail}
- **Phone**: ${cityPhone}
- **Project type**: ${cityProject}
- **Investment size**: ${citySize}
- **Financing type**: ${cityFinancing}
- **Description**: ${cityDesc}

Ein Partner von Civita Capital wird Ihr Projekt prüfen und sich innerhalb von zwei Werktagen persönlich mit Ihnen in Verbindung setzen.

Your inquiry has been recorded.`;
  }

  return "Bitte wählen Sie eine der folgenden Optionen aus, damit ich Ihnen weiterhelfen kann:\n\n- **Investor** (auf der Suche nach Anlagemöglichkeiten)\n- **Stadt / Kommune** (auf der Suche nach Projektfinanzierung)";
}

function getAnswerAfterQuestion(messages: any[], questionKeyword: string): string {
  for (let i = 0; i < messages.length - 1; i++) {
    const msg = messages[i];
    if (msg.role === "assistant") {
      const text = msg.parts.map((p: any) => p.text || "").join("").toLowerCase();
      if (text.includes(questionKeyword)) {
        const nextMsg = messages.slice(i + 1).find(m => m.role === "user");
        if (nextMsg) {
          return nextMsg.parts.map((p: any) => p.text || "").join("").trim();
        }
      }
    }
  }
  return "N/A";
}

function createMockStreamResponse(text: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const chunkSize = 4;
      for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 10)); // simulated streaming latency
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-vercel-ai-stream": "true",
    },
  });
}

// -------------------------------------------------------------
// CHAT ENDPOINT ROUTE
// -------------------------------------------------------------
export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        
        // If API key is missing, run in Mock Fail-safe mode
        if (!key) {
          const reply = getMockBotResponse(messages);
          return createMockStreamResponse(reply);
        }

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});