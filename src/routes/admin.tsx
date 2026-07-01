import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut, 
  Search, 
  Plus, 
  Trash2, 
  Save, 
  KeyRound,
  Eye,
  Globe,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Play,
  Layers,
  Zap,
  GraduationCap,
  Hammer,
  Compass,
  Sparkles,
  ChevronRight,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getLeads, getContent, saveContent, type LeadType, type CMSContent } from "@/lib/leads";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Stadtfinanzen.de" },
      { name: "robots", content: "noindex, nofollow" }
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [adminToken, setAdminToken] = useState("");
  
  // Dashboard states
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "cms">("dashboard");
  const [cmsSection, setCmsSection] = useState<"hero" | "media" | "projects" | "services" | "pricing" | "about" | "contact" | "blog">("hero");
  const [leads, setLeads] = useState<any[]>([]);
  const [cmsContent, setCmsContent] = useState<CMSContent | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter
  const [leadsSearch, setLeadsSearch] = useState("");
  const [leadsFilter, setLeadsFilter] = useState<LeadType | "all">("all");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  
  // Authentication check on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("civita_admin_token");
    if (savedToken === "admin-secret-token") {
      setIsAuthenticated(true);
      setAdminToken(savedToken);
    }
  }, []);

  // Fetch leads and CMS content
  useEffect(() => {
    if (!isAuthenticated) return;
    
    async function loadData() {
      setLoading(true);
      try {
        const fetchedLeads = await getLeads(adminToken);
        const fetchedContent = await getContent();
        
        // Ensure sub-objects have array initializers
        if (!fetchedContent.projectTypesList) fetchedContent.projectTypesList = [];
        if (!fetchedContent.homepageServices) fetchedContent.homepageServices = [];
        if (!fetchedContent.pricingTiers) fetchedContent.pricingTiers = [];
        if (!fetchedContent.about) {
          fetchedContent.about = {
            title: "",
            introTitle: "",
            introText1: "",
            introText2: "",
            projectTypes: []
          };
        }
        
        setLeads(fetchedLeads);
        setCmsContent(fetchedContent);
      } catch (err) {
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [isAuthenticated, adminToken]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      const token = "admin-secret-token";
      localStorage.setItem("civita_admin_token", token);
      setAdminToken(token);
      setIsAuthenticated(true);
      toast.success("Successfully logged in.");
    } else {
      toast.error("Invalid password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("civita_admin_token");
    setIsAuthenticated(false);
    setAdminToken("");
    toast.success("Logged out.");
  };

  // CMS functions
  const handleSaveCMS = async () => {
    if (!cmsContent) return;
    const ok = await saveContent(cmsContent, adminToken);
    if (ok) {
      const updated = await getContent();
      setCmsContent(updated);
    }
  };

  // Stats calculation
  const totalLeads = leads.length;
  const investorLeadsCount = leads.filter(l => l.type === "investor").length;
  const cityLeadsCount = leads.filter(l => l.type === "city").length;
  const chatLeadsCount = leads.filter(l => l.type === "chat").length;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
              <KeyRound className="h-6 w-6" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
              Admin Portal
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please sign in to access leads and website content editor.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Password
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (default: admin)"
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesType = leadsFilter === "all" || lead.type === leadsFilter;
    const searchLower = leadsSearch.toLowerCase();
    
    const name = (lead.data?.name || "").toLowerCase();
    const company = (lead.data?.company || "").toLowerCase();
    const email = (lead.data?.email || "").toLowerCase();
    const phone = (lead.data?.phone || "").toLowerCase();
    
    const matchesSearch = 
      name.includes(searchLower) || 
      company.includes(searchLower) || 
      email.includes(searchLower) || 
      phone.includes(searchLower);
      
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground">Stadtfinanzen.de</h1>
            <p className="text-sm text-muted-foreground">Lead Control Center & CMS Administrator</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 cursor-pointer">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 border-b border-border/60 py-4 mb-8 overflow-x-auto">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "leads", label: "Leads Submissions", icon: Users },
            { id: "cms", label: "Visual CMS Panel", icon: FileText },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id as any);
                  setSelectedLead(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md border transition-all cursor-pointer ${
                  activeTab === t.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex h-60 items-center justify-center">
            <div className="text-sm text-muted-foreground animate-pulse">Loading dashboard content...</div>
          </div>
        ) : (
          <div className="grid gap-8">
            {/* 1. DASHBOARD TAB */}
            {activeTab === "dashboard" && (
              <div className="grid gap-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Total Leads", val: totalLeads, desc: "Total submissions & chats", color: "text-primary bg-primary/10" },
                    { label: "Investor Leads", val: investorLeadsCount, desc: "Via Investor Registration", color: "text-accent bg-accent/10" },
                    { label: "City Leads", val: cityLeadsCount, desc: "Via City Project Form", color: "text-green-600 bg-green-50" },
                    { label: "AI Concierge Leads", val: chatLeadsCount, desc: "Form & AI Chat Leads", color: "text-purple-600 bg-purple-50" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-border bg-card p-6 shadow-card">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-muted-foreground">{s.label}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.color}`}>Active</span>
                      </div>
                      <div className="mt-4 font-display text-4xl font-bold">{s.val}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-display text-xl font-bold mb-4">Recent Submissions</h3>
                  {leads.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-6 text-center">No leads recorded yet.</p>
                  ) : (
                    <div className="divide-y divide-border">
                      {leads.slice(0, 5).map((l) => (
                        <div key={l.id} className="flex justify-between items-center py-4">
                          <div>
                            <span className="font-medium text-foreground">{l.data?.name || "No Name"}</span>
                            <span className="ml-2 text-xs uppercase tracking-wider text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                              {l.type}
                            </span>
                            <div className="text-xs text-muted-foreground mt-1">
                              {l.data?.company || "N/A"} · {l.data?.email || "N/A"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">
                              {new Date(l.submittedAt).toLocaleDateString("de-DE", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </div>
                            <button
                              onClick={() => {
                                setSelectedLead(l);
                                setActiveTab("leads");
                              }}
                              className="text-xs text-accent font-medium mt-1 hover:underline cursor-pointer flex items-center gap-1 ml-auto"
                            >
                              <Eye className="h-3.5 w-3.5" /> Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. LEADS TAB */}
            {activeTab === "leads" && (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <div className="rounded-xl border border-border bg-card p-4 shadow-card flex flex-col gap-4 sm:flex-row items-center justify-between">
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={leadsSearch}
                        onChange={(e) => setLeadsSearch(e.target.value)}
                        placeholder="Search leads by name, email..."
                        className="pl-9 h-10 text-sm"
                      />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      {(["all", "investor", "city", "chat"] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setLeadsFilter(f)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-md border capitalize cursor-pointer transition-colors ${
                            leadsFilter === f
                              ? "bg-accent/10 border-accent text-accent"
                              : "bg-background border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {f === "all" ? "All" : f === "chat" ? "AI / Form Chat" : f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-muted/40 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          <tr>
                            <th className="px-6 py-3">Lead / Company</th>
                            <th className="px-6 py-3">Contact</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Submitted At</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {filteredLeads.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                                No leads match your filters.
                              </td>
                            </tr>
                          ) : (
                            filteredLeads.map((lead) => (
                              <tr
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className={`hover:bg-muted/20 cursor-pointer transition-colors ${
                                  selectedLead?.id === lead.id ? "bg-accent/5" : ""
                                }`}
                              >
                                <td className="px-6 py-4">
                                  <div className="font-semibold text-foreground">{lead.data?.name}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">{lead.data?.company || "N/A"}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-foreground">{lead.data?.email}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">{lead.data?.phone || "N/A"}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                                    lead.type === "investor" 
                                      ? "bg-accent/10 text-accent" 
                                      : lead.type === "city" 
                                      ? "bg-green-50 text-green-600" 
                                      : "bg-purple-50 text-purple-600"
                                  }`}>
                                    {lead.type === "chat" ? "AI / Form Chat" : lead.type}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-muted-foreground">
                                  {new Date(lead.submittedAt).toLocaleDateString("de-DE", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-card h-fit">
                  {selectedLead ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <h3 className="font-display text-xl font-bold">Lead Details</h3>
                        <span className="text-xs uppercase tracking-wider px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          ID: {selectedLead.id}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Name</label>
                          <div className="font-medium text-foreground text-base mt-0.5">{selectedLead.data?.name}</div>
                        </div>

                        {selectedLead.data?.company && (
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Company / Organisation</label>
                            <div className="font-medium text-foreground text-sm mt-0.5">{selectedLead.data?.company}</div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Email</label>
                            <div className="text-sm mt-0.5 break-all select-all font-medium text-foreground">{selectedLead.data?.email}</div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Phone</label>
                            <div className="text-sm mt-0.5 select-all font-medium text-foreground">{selectedLead.data?.phone || "N/A"}</div>
                          </div>
                        </div>

                        {selectedLead.type === "investor" && (
                          <div className="border-t border-border pt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Investor Type</label>
                                <div className="text-sm font-medium mt-0.5">{selectedLead.data?.investorType || "N/A"}</div>
                              </div>
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Asset Class</label>
                                <div className="text-sm font-medium mt-0.5">{selectedLead.data?.assetClass || "N/A"}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Volume Range</label>
                                <div className="text-sm font-medium mt-0.5">{selectedLead.data?.range || "N/A"}</div>
                              </div>
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Preferred Geography</label>
                                <div className="text-sm font-medium mt-0.5">{selectedLead.data?.geography || "N/A"}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedLead.type === "city" && (
                          <div className="border-t border-border pt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Financing Type</label>
                                <div className="text-sm font-medium mt-0.5">{selectedLead.data?.financingType || "N/A"}</div>
                              </div>
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Project Size</label>
                                <div className="text-sm font-medium mt-0.5">{selectedLead.data?.range || "N/A"}</div>
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Project Description</label>
                              <div className="text-sm text-foreground bg-muted/40 rounded-md p-3 mt-1 leading-relaxed whitespace-pre-wrap">
                                {selectedLead.data?.description || "N/A"}
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedLead.type === "chat" && (
                          <div className="border-t border-border pt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">User Type / Path</label>
                                <div className="text-sm font-medium mt-0.5 capitalize">{selectedLead.data?.investorType || "N/A"}</div>
                              </div>
                              <div>
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Message / range</label>
                                <div className="text-sm font-medium mt-0.5">{selectedLead.data?.message || selectedLead.data?.range || "N/A"}</div>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" /> Chat Details & Transcripts
                              </label>
                              <div className="text-xs font-mono text-foreground bg-muted/50 border rounded-lg p-3 mt-1 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                                {selectedLead.data?.details?.transcript || "N/A"}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="h-8 w-8 mx-auto opacity-40 mb-2" />
                      <p className="text-sm font-medium">Select a lead from the table to view full submission fields.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. CMS TAB */}
            {activeTab === "cms" && cmsContent && (
              <div className="grid gap-6 md:grid-cols-[240px_1fr]">
                {/* CMS Sidebar Navigation */}
                <div className="flex flex-col gap-1 border-r border-border/80 pr-4 h-fit">
                  {[
                    { id: "hero", label: "Hero & Metrics", icon: Globe },
                    { id: "media", label: "Background Media", icon: ImageIcon },
                    { id: "projects", label: "Projekttypen Cards", icon: Hammer },
                    { id: "services", label: "Leistungen Cards", icon: Compass },
                    { id: "pricing", label: "Preise (Pricing)", icon: Sparkles },
                    { id: "about", label: "Über Uns Page", icon: FileText },
                    { id: "contact", label: "Kontakt Details", icon: Phone },
                    { id: "blog", label: "Blog Articles", icon: FileText }
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setCmsSection(s.id as any)}
                        className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md border text-left cursor-pointer transition-colors ${
                          cmsSection === s.id
                            ? "bg-accent/15 border-accent text-accent"
                            : "bg-background border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5" /> {s.label}
                        </span>
                        <ChevronRight className="h-3 w-3 opacity-60" />
                      </button>
                    );
                  })}

                  <div className="mt-8 border-t border-border pt-4">
                    <Button onClick={handleSaveCMS} className="w-full gap-2 cursor-pointer flex items-center justify-center h-10 font-bold text-xs">
                      <Save className="h-4 w-4" /> Save changes
                    </Button>
                  </div>
                </div>

                {/* CMS Form Editor Area */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6">
                  
                  {/* Hero Settings */}
                  {cmsSection === "hero" && (
                    <div className="space-y-4">
                      <h3 className="font-display text-lg font-bold border-b pb-2">Hero & Statistics</h3>
                      
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Hero Title</label>
                        <Textarea
                          value={cmsContent.hero.title}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            updated.hero.title = e.target.value;
                            setCmsContent(updated);
                          }}
                          rows={2}
                          className="font-medium"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Hero Subtitle</label>
                        <Textarea
                          value={cmsContent.hero.subtitle}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            updated.hero.subtitle = e.target.value;
                            setCmsContent(updated);
                          }}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Metric stats cards (4 items)</label>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {cmsContent.hero.stats.map((stat, i) => (
                            <div key={i} className="border border-border/80 bg-muted/20 p-3 rounded-lg flex gap-2">
                              <Input
                                value={stat.value}
                                onChange={(e) => {
                                  const updated = { ...cmsContent };
                                  updated.hero.stats[i].value = e.target.value;
                                  setCmsContent(updated);
                                }}
                                placeholder="Value"
                                className="w-1/3 text-xs h-8"
                              />
                              <Input
                                value={stat.label}
                                onChange={(e) => {
                                  const updated = { ...cmsContent };
                                  updated.hero.stats[i].label = e.target.value;
                                  setCmsContent(updated);
                                }}
                                placeholder="Label"
                                className="w-2/3 text-xs h-8"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Background Media */}
                  {cmsSection === "media" && (
                    <div className="space-y-4">
                      <h3 className="font-display text-lg font-bold border-b pb-2">Background media configuration</h3>
                      
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Background Media Type</label>
                        <select
                          value={cmsContent.hero.bgType || "video"}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            updated.hero.bgType = e.target.value as any;
                            setCmsContent(updated);
                          }}
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                        >
                          <option value="video">Explanatory Video (Loops in Background)</option>
                          <option value="image">Custom Background Image</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Background Image URL (Loads if Image Selected)</label>
                        <Input
                          value={cmsContent.hero.imageUrl || ""}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            updated.hero.imageUrl = e.target.value;
                            setCmsContent(updated);
                          }}
                          placeholder="e.g. https://images.unsplash.com/photo-..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Background Video URL (Loads if Video Selected)</label>
                        <Input
                          value={cmsContent.hero.videoUrl || ""}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            updated.hero.videoUrl = e.target.value;
                            setCmsContent(updated);
                          }}
                          placeholder="e.g. Direct MP4 link"
                        />
                      </div>
                    </div>
                  )}

                  {/* Projekttypen Cards */}
                  {cmsSection === "projects" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-display text-lg font-bold">Homepage Project Types List</h3>
                        <Button
                          size="xs"
                          variant="accent"
                          className="font-bold text-xs"
                          onClick={() => {
                            const updated = { ...cmsContent };
                            if (!updated.projectTypesList) updated.projectTypesList = [];
                            updated.projectTypesList.push({
                              title: "Neue Kategorie",
                              copy: "Kurze Beschreibung des Projekttyps...",
                              icon: "Building2"
                            });
                            setCmsContent(updated);
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add Type
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {(cmsContent.projectTypesList || []).map((item, index) => (
                          <div key={index} className="relative p-4 border rounded-xl bg-muted/10 space-y-3">
                            <button
                              onClick={() => {
                                const updated = { ...cmsContent };
                                updated.projectTypesList?.splice(index, 1);
                                setCmsContent(updated);
                              }}
                              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Title</label>
                                <Input
                                  value={item.title}
                                  onChange={(e) => {
                                    const updated = { ...cmsContent };
                                    if (updated.projectTypesList) updated.projectTypesList[index].title = e.target.value;
                                    setCmsContent(updated);
                                  }}
                                  className="h-8 text-xs font-semibold"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Icon Name</label>
                                <select
                                  value={item.icon}
                                  onChange={(e) => {
                                    const updated = { ...cmsContent };
                                    if (updated.projectTypesList) updated.projectTypesList[index].icon = e.target.value;
                                    setCmsContent(updated);
                                  }}
                                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-accent"
                                >
                                  {["Building2", "Zap", "GraduationCap", "Hammer", "Compass", "Layers", "Users", "ShieldCheck", "Handshake", "Sparkles"].map((icon) => (
                                    <option key={icon} value={icon}>{icon}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Copy / Description</label>
                              <Textarea
                                value={item.copy}
                                onChange={(e) => {
                                  const updated = { ...cmsContent };
                                  if (updated.projectTypesList) updated.projectTypesList[index].copy = e.target.value;
                                  setCmsContent(updated);
                                }}
                                rows={2}
                                className="text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services Cards */}
                  {cmsSection === "services" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-display text-lg font-bold">Homepage Services List</h3>
                        <Button
                          size="xs"
                          variant="accent"
                          className="font-bold text-xs"
                          onClick={() => {
                            const updated = { ...cmsContent };
                            if (!updated.homepageServices) updated.homepageServices = [];
                            updated.homepageServices.push({
                              title: "Neue Leistung",
                              copy: "Kurze Beschreibung der Leistung...",
                              icon: "Compass"
                            });
                            setCmsContent(updated);
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add Service
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {(cmsContent.homepageServices || []).map((item, index) => (
                          <div key={index} className="relative p-4 border rounded-xl bg-muted/10 space-y-3">
                            <button
                              onClick={() => {
                                const updated = { ...cmsContent };
                                updated.homepageServices?.splice(index, 1);
                                setCmsContent(updated);
                              }}
                              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Service Title</label>
                                <Input
                                  value={item.title}
                                  onChange={(e) => {
                                    const updated = { ...cmsContent };
                                    if (updated.homepageServices) updated.homepageServices[index].title = e.target.value;
                                    setCmsContent(updated);
                                  }}
                                  className="h-8 text-xs font-semibold"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Icon Name</label>
                                <select
                                  value={item.icon}
                                  onChange={(e) => {
                                    const updated = { ...cmsContent };
                                    if (updated.homepageServices) updated.homepageServices[index].icon = e.target.value;
                                    setCmsContent(updated);
                                  }}
                                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-accent"
                                >
                                  {["Compass", "Layers", "Users", "Building2", "Zap", "GraduationCap", "Hammer", "ShieldCheck", "Handshake", "Sparkles"].map((icon) => (
                                    <option key={icon} value={icon}>{icon}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Description Copy</label>
                              <Textarea
                                value={item.copy}
                                onChange={(e) => {
                                  const updated = { ...cmsContent };
                                  if (updated.homepageServices) updated.homepageServices[index].copy = e.target.value;
                                  setCmsContent(updated);
                                }}
                                rows={2}
                                className="text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing Tiers */}
                  {cmsSection === "pricing" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-display text-lg font-bold">Website Pricing Tiers</h3>
                        <Button
                          size="xs"
                          variant="accent"
                          className="font-bold text-xs"
                          onClick={() => {
                            const updated = { ...cmsContent };
                            if (!updated.pricingTiers) updated.pricingTiers = [];
                            updated.pricingTiers.push({
                              title: "Neues Preismodell",
                              copy: "Preismodell Beschreibung..."
                            });
                            setCmsContent(updated);
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add Tier
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {(cmsContent.pricingTiers || []).map((item, index) => (
                          <div key={index} className="relative p-4 border rounded-xl bg-muted/10 space-y-3">
                            <button
                              onClick={() => {
                                const updated = { ...cmsContent };
                                updated.pricingTiers?.splice(index, 1);
                                setCmsContent(updated);
                              }}
                              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Tier Title</label>
                              <Input
                                value={item.title}
                                onChange={(e) => {
                                  const updated = { ...cmsContent };
                                  if (updated.pricingTiers) updated.pricingTiers[index].title = e.target.value;
                                  setCmsContent(updated);
                                }}
                                className="h-8 text-xs font-semibold"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Copy description</label>
                              <Textarea
                                value={item.copy}
                                onChange={(e) => {
                                  const updated = { ...cmsContent };
                                  if (updated.pricingTiers) updated.pricingTiers[index].copy = e.target.value;
                                  setCmsContent(updated);
                                }}
                                rows={2}
                                className="text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* About Page */}
                  {cmsSection === "about" && cmsContent.about && (
                    <div className="space-y-4">
                      <h3 className="font-display text-lg font-bold border-b pb-2">Leistungen & Preise (About Page) CMS</h3>
                      
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Page Main Title</label>
                        <Input
                          value={cmsContent.about.title}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            if (updated.about) updated.about.title = e.target.value;
                            setCmsContent(updated);
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Intro Title ("Sie bleiben in Kontrolle")</label>
                        <Input
                          value={cmsContent.about.introTitle}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            if (updated.about) updated.about.introTitle = e.target.value;
                            setCmsContent(updated);
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Intro Paragraph 1</label>
                        <Textarea
                          value={cmsContent.about.introText1}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            if (updated.about) updated.about.introText1 = e.target.value;
                            setCmsContent(updated);
                          }}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Intro Paragraph 2</label>
                        <Textarea
                          value={cmsContent.about.introText2}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            if (updated.about) updated.about.introText2 = e.target.value;
                            setCmsContent(updated);
                          }}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center border-b pb-1">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Projekttypen Checklist Bullet points</label>
                          <Button
                            size="xs"
                            variant="outline"
                            className="h-6 text-[10px] px-2 cursor-pointer"
                            onClick={() => {
                              const updated = { ...cmsContent };
                              if (updated.about) {
                                if (!updated.about.projectTypes) updated.about.projectTypes = [];
                                updated.about.projectTypes.push("Neuer Listeneintrag");
                              }
                              setCmsContent(updated);
                            }}
                          >
                            + Add Bullet
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {(cmsContent.about.projectTypes || []).map((bullet, i) => (
                            <div key={i} className="flex gap-2 items-center">
                              <Input
                                value={bullet}
                                onChange={(e) => {
                                  const updated = { ...cmsContent };
                                  if (updated.about?.projectTypes) {
                                    updated.about.projectTypes[i] = e.target.value;
                                  }
                                  setCmsContent(updated);
                                }}
                                className="h-8 text-xs flex-1"
                              />
                              <button
                                onClick={() => {
                                  const updated = { ...cmsContent };
                                  updated.about?.projectTypes.splice(i, 1);
                                  setCmsContent(updated);
                                }}
                                className="text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact details */}
                  {cmsSection === "contact" && (
                    <div className="space-y-4">
                      <h3 className="font-display text-lg font-bold border-b pb-2">Global Contact Fields</h3>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 opacity-60" /> Email Address
                          </label>
                          <Input
                            value={cmsContent.contact.email}
                            onChange={(e) => {
                              const updated = { ...cmsContent };
                              updated.contact.email = e.target.value;
                              setCmsContent(updated);
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 opacity-60" /> Phone Number
                          </label>
                          <Input
                            value={cmsContent.contact.phone}
                            onChange={(e) => {
                              const updated = { ...cmsContent };
                              updated.contact.phone = e.target.value;
                              setCmsContent(updated);
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 opacity-60" /> Location Address
                        </label>
                        <Input
                          value={cmsContent.contact.address}
                          onChange={(e) => {
                            const updated = { ...cmsContent };
                            updated.contact.address = e.target.value;
                            setCmsContent(updated);
                          }}
                        />
                      </div>

                      <h3 className="font-display text-lg font-bold border-b pt-4 pb-2">Explanatory Video Popup Links</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Explanatory Video 1 (Cities)</label>
                          <Input
                            value={cmsContent.videos?.cityVideoUrl || ""}
                            onChange={(e) => {
                              const updated = { ...cmsContent };
                              if (!updated.videos) updated.videos = { cityVideoUrl: "", investorVideoUrl: "" };
                              updated.videos.cityVideoUrl = e.target.value;
                              setCmsContent(updated);
                            }}
                            placeholder="e.g. YouTube Embed Link"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Explanatory Video 2 (Investors)</label>
                          <Input
                            value={cmsContent.videos?.investorVideoUrl || ""}
                            onChange={(e) => {
                              const updated = { ...cmsContent };
                              if (!updated.videos) updated.videos = { cityVideoUrl: "", investorVideoUrl: "" };
                              updated.videos.investorVideoUrl = e.target.value;
                              setCmsContent(updated);
                            }}
                            placeholder="e.g. YouTube Embed Link"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Blog articles list */}
                  {cmsSection === "blog" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-display text-lg font-bold flex items-center gap-2">
                          <FileText className="h-5 w-5" /> Manage Blog Articles
                        </h3>
                        <Button
                          size="xs"
                          variant="accent"
                          className="font-bold text-xs"
                          onClick={() => {
                            const updated = { ...cmsContent };
                            const newId = `post-${Date.now()}`;
                            updated.posts.push({
                              id: newId,
                              tag: "Kategorie",
                              title: "Neuer Blog-Titel",
                              excerpt: "Zusammenfassung des Artikels...",
                              date: new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" }),
                              read: "5 Min. Lesezeit"
                            });
                            setCmsContent(updated);
                            toast.info("Added draft. Save to apply.");
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Add Article
                        </Button>
                      </div>

                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                        {cmsContent.posts.map((post, index) => (
                          <div key={post.id} className="relative p-4 border border-border bg-muted/10 rounded-xl space-y-3">
                            <button
                              onClick={() => {
                                const updated = { ...cmsContent };
                                updated.posts.splice(index, 1);
                                setCmsContent(updated);
                                toast.warning("Deleted draft. Save to apply.");
                              }}
                              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <div className="grid gap-3 sm:grid-cols-3">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Category Tag</label>
                                <Input
                                  value={post.tag}
                                  onChange={(e) => {
                                    const updated = { ...cmsContent };
                                    updated.posts[index].tag = e.target.value;
                                    setCmsContent(updated);
                                  }}
                                  className="h-8 text-xs font-semibold"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Publish Date</label>
                                <Input
                                  value={post.date}
                                  onChange={(e) => {
                                    const updated = { ...cmsContent };
                                    updated.posts[index].date = e.target.value;
                                    setCmsContent(updated);
                                  }}
                                  className="h-8 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Read Time</label>
                                <Input
                                  value={post.read}
                                  onChange={(e) => {
                                    const updated = { ...cmsContent };
                                    updated.posts[index].read = e.target.value;
                                    setCmsContent(updated);
                                  }}
                                  className="h-8 text-xs"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Title</label>
                              <Input
                                value={post.title}
                                onChange={(e) => {
                                  const updated = { ...cmsContent };
                                  updated.posts[index].title = e.target.value;
                                  setCmsContent(updated);
                                }}
                                className="font-semibold text-xs h-8"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Excerpt Summary</label>
                              <Textarea
                                value={post.excerpt}
                                onChange={(e) => {
                                  const updated = { ...cmsContent };
                                  updated.posts[index].excerpt = e.target.value;
                                  setCmsContent(updated);
                                }}
                                rows={2}
                                className="text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
