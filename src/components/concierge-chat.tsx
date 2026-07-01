import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/leads";

const transport = new DefaultChatTransport({ api: "/api/chat" });

function parseLastMessageFields(text: string) {
  const fields: Record<string, string> = {};
  
  const mappings = [
    { key: "name", regex: /-\s*(?:Full\s*)?[Nn]ame\s*:\s*(.*)/i },
    { key: "company", regex: /-\s*(?:Company\s*|\s*[Ff]und\s*):\s*(.*)/i },
    { key: "email", regex: /-\s*[Ee]mail\s*:\s*(.*)/i },
    { key: "phone", regex: /-\s*[Pp]hone\s*:\s*(.*)/i },
    { key: "type", regex: /-\s*(?:Investor\s*Type|User\s*Type|Describe)\s*:\s*(.*)/i },
    { key: "sector", regex: /-\s*(?:Sector\s*interest|Project\s*type)\s*:\s*(.*)/i },
    { key: "range", regex: /-\s*(?:Investment\s*range|Investment\s*size)\s*:\s*(.*)/i },
    { key: "geography", regex: /-\s*(?:Preferred\s*geography|Financing\s*type)\s*:\s*(.*)/i },
  ];
  
  mappings.forEach(({ key, regex }) => {
    const match = text.match(regex);
    if (match && match[1]) {
      fields[key] = match[1].trim();
    }
  });
  
  return fields;
}

export function ConciergeChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasSubmitted = useRef<string | null>(null);

  const { messages, sendMessage, status } = useChat({
    id: "concierge",
    transport,
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello — I'm the Civita Capital concierge. Are you an **investor** seeking opportunities, or a **city / municipality** seeking investment?",
          },
        ],
      },
    ],
  });

  const busy = status === "submitted" || status === "streaming";

  // Watch for qualified lead completion
  useEffect(() => {
    if (messages.length === 0 || status === "streaming" || status === "submitted") return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      const text = lastMessage.parts
        .map((p) => (p.type === "text" ? p.text : ""))
        .join("");

      if (text.includes("Your inquiry has been recorded") && hasSubmitted.current !== lastMessage.id) {
        hasSubmitted.current = lastMessage.id;
        
        // Parse structured fields
        const fields = parseLastMessageFields(text);
        
        // Compile full transcript log
        const transcript = messages.map(m => {
          const mText = m.parts.map(p => p.type === 'text' ? p.text : '').join('');
          return `${m.role === 'user' ? 'Visitor' : 'Concierge'}: ${mText}`;
        }).join('\n');

        const leadData = {
          name: fields.name || "AI Chat Lead",
          company: fields.company || "N/A",
          email: fields.email || "N/A",
          phone: fields.phone || "N/A",
          investorType: fields.type || "N/A",
          range: fields.range || "N/A",
          details: {
            ...fields,
            transcript
          }
        };

        // Submit the qualified lead
        submitLead("chat", leadData);
      }
    }
  }, [messages, status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = input.trim();
    if (!value || busy) return;
    setInput("");
    await sendMessage({ text: value });
  }


  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close concierge" : "Open concierge"}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[560px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <header className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground font-display">
              C
            </div>
            <div>
              <div className="text-sm font-medium">Civita Concierge</div>
              <div className="text-[11px] text-primary-foreground/70">Typically replies instantly</div>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = (m.role as string) === "user";
              return (
                <div key={m.id} className={isUser ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      isUser
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground"
                        : "max-w-[90%] whitespace-pre-wrap text-foreground"
                    }
                  >
                    {text}
                  </div>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="text-xs italic text-muted-foreground">Thinking…</div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your reply…"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent"
              disabled={busy}
            />
            <Button type="submit" size="icon" disabled={busy || !input.trim()} className="rounded-full">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}