import { useEffect, useMemo, useState } from "react";
import {
  MapPin, Zap, Phone, MessageCircle, ArrowRight, Play, X,
  ClipboardCheck, Wrench, Cable, ShieldCheck, Activity,
  Home, Building, Building2, Factory,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";

const phone = "+919892020515";
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27d%20like%20to%20see%20similar%20projects";

type Category = "Residential" | "Society" | "Commercial";
type SystemType = "On-Grid" | "Hybrid" | "Off-Grid";

interface Project {
  id: number;
  title: string;
  image: string;
  location: string;
  size: string;
  category: Category;
  type: SystemType;
  description: string;
  notes?: string[];
}

const projects: Project[] = [
  {
    id: 1, title: "Rooftop Villa", image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1200&q=80",
    location: "Bandra, Mumbai", size: "8 kW", category: "Residential", type: "Hybrid",
    description: "Hybrid system with lithium battery backup for a 4BHK villa. Powers full home including ACs.",
    notes: ["Tier-1 mono PERC panels", "5 kVA hybrid inverter", "10 kWh lithium battery"],
  },
  {
    id: 2, title: "Co-op Housing Society", image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80",
    location: "Kothrud, Pune", size: "40 kW", category: "Society", type: "On-Grid",
    description: "Common-area solar for a 60-flat society. Powers lifts, lighting and water pumps.",
    notes: ["Net metering approved", "Annual savings ₹4.8L", "Payback in 4 years"],
  },
  {
    id: 3, title: "Retail Showroom", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    location: "Thane West", size: "15 kW", category: "Commercial", type: "On-Grid",
    description: "Rooftop install for a furniture showroom. Reduced monthly bill by 78%.",
  },
  {
    id: 4, title: "Farmhouse Off-Grid", image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
    location: "Karjat", size: "5 kW", category: "Residential", type: "Off-Grid",
    description: "Independent off-grid system for a remote farmhouse with no utility connection.",
    notes: ["Battery bank 600 Ah", "MPPT solar charger", "Backup pump support"],
  },
  {
    id: 5, title: "Industrial Shed", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    location: "MIDC, Pune", size: "100 kW", category: "Commercial", type: "On-Grid",
    description: "Large rooftop install on a manufacturing unit. Significant grid offset for daytime load.",
  },
  {
    id: 6, title: "Tower Society Hybrid", image: "https://images.unsplash.com/photo-1611365892117-bce8a45a5a47?auto=format&fit=crop&w=1200&q=80",
    location: "Powai, Mumbai", size: "60 kW", category: "Society", type: "Hybrid",
    description: "Hybrid system with backup for lifts and emergency lighting during outages.",
  },
  {
    id: 7, title: "Independent Bungalow", image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
    location: "Aundh, Pune", size: "10 kW", category: "Residential", type: "On-Grid",
    description: "Premium rooftop install with rail-mount structure and clean cable management.",
  },
  {
    id: 8, title: "Office Backup", image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1200&q=80",
    location: "Lower Parel, Mumbai", size: "20 kW", category: "Commercial", type: "Hybrid",
    description: "Hybrid setup for a co-working space with critical UPS-grade backup for workstations.",
  },
  {
    id: 9, title: "Remote Hill Cottage", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
    location: "Lonavala", size: "3 kW", category: "Residential", type: "Off-Grid",
    description: "Compact off-grid system for a weekend cottage with intermittent grid availability.",
  },
];

const filters = ["All", "Residential", "Society", "Commercial", "On-Grid", "Hybrid", "Off-Grid"] as const;
type Filter = typeof filters[number];

const heroImg = "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1920&q=80";

const stages = {
  before: {
    title: "Before — Site Inspection",
    desc: "Our engineers visit your property, measure rooftop area, evaluate shadow patterns, and audit your electrical load.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
  },
  during: {
    title: "During — Installation",
    desc: "Certified technicians mount the structure, lay panels, run conduit, and wire the inverter — all to code.",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
  },
  after: {
    title: "After — Final Setup",
    desc: "System is commissioned, tested under load, monitoring is enabled, and you're handed a clean, performing solar plant.",
    image: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1200&q=80",
  },
};

const ProjectsPage = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Solar Projects & Installations | Selsify";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); return m;
    })();
    meta.setAttribute("content", "Real solar installations by Selsify across Mumbai, Pune & Thane. Residential, society and commercial On-Grid, Hybrid & Off-Grid projects.");
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = window.location.origin + "/projects";
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter(
      (p) => p.category === filter || p.type === filter
    );
  }, [filter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Solar installation rooftop" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[hsl(var(--primary))]/75" />
        <div className="relative text-center text-white px-4 max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Our Solar Installations</h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">Real projects. Real execution. Real results.</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--primary))] mb-3">Built on Ground Experience</h2>
          <p className="text-muted-foreground">
            We focus on real execution — proper installation, strong structure, and long-term performance.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="pb-14 md:pb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-8">Our Work</h2>

          {/* Filter bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto -mx-4 px-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-[hsl(var(--primary))] text-white shadow-elevated"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpen(p)}
                className="group text-left bg-background rounded-2xl overflow-hidden border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.size} ${p.type} solar in ${p.location}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-[hsl(var(--primary))] text-xs font-bold">{p.size}</span>
                    <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--secondary))] text-white text-xs font-bold">{p.type}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/95 via-[hsl(var(--primary))]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-sm font-semibold">View details →</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[hsl(var(--primary))]">{p.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5" /> {p.location}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No projects match this filter yet.</p>
          )}
        </div>
      </section>

      {/* BEFORE / DURING / AFTER */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">Installation Process</h2>
          <Tabs defaultValue="before" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="before" className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white">Before</TabsTrigger>
              <TabsTrigger value="during" className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white">During</TabsTrigger>
              <TabsTrigger value="after" className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white">After</TabsTrigger>
            </TabsList>
            {(Object.keys(stages) as (keyof typeof stages)[]).map((k) => {
              const s = stages[k];
              return (
                <TabsContent key={k} value={k} className="mt-6">
                  <Card className="overflow-hidden grid md:grid-cols-2 gap-0">
                    <img src={s.image} alt={s.title} loading="lazy" className="w-full h-64 md:h-full object-cover" />
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--primary))]">{s.title}</h3>
                      <p className="text-muted-foreground mt-3">{s.desc}</p>
                    </div>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* EXECUTION QUALITY */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-12">How We Execute</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: ClipboardCheck, t: "Site survey" },
              { icon: Wrench, t: "Strong mounting" },
              { icon: Cable, t: "Clean wiring" },
              { icon: ShieldCheck, t: "Safety practices" },
              { icon: Activity, t: "Performance-focused" },
            ].map((x, i) => (
              <Card key={i} className="p-5 text-center hover:shadow-elevated hover:-translate-y-1 transition-all">
                <div className="h-12 w-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center mx-auto mb-3">
                  <x.icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <div className="font-semibold text-sm">{x.t}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT TYPES */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-12">What We Work On</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Home, t: "Residential rooftops" },
              { icon: Building, t: "Housing societies" },
              { icon: Building2, t: "Shops & offices" },
              { icon: Factory, t: "Industrial setups" },
            ].map((x, i) => (
              <Card key={i} className="p-6 text-center group hover:shadow-elevated hover:-translate-y-1 transition-all cursor-default">
                <x.icon className="h-10 w-10 text-[hsl(var(--secondary))] mx-auto mb-3 transition-transform group-hover:scale-110" />
                <div className="font-bold text-[hsl(var(--primary))]">{x.t}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STATEMENT */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--primary))] mb-3">
            Execution Matters More Than Claims
          </h2>
          <p className="text-muted-foreground">
            A good solar system is not just about panels — it's about how it is installed.
          </p>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">See Our Work in Action</h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {[
              { thumb: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1200&q=80", url: "https://www.youtube.com/embed/xKxrkht7CpY" },
              { thumb: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80", url: "https://www.youtube.com/embed/1kUE0BZtTRc" },
            ].map((v, i) => (
              <button
                key={i}
                onClick={() => setVideo(v.url)}
                className="relative group rounded-2xl overflow-hidden aspect-video"
              >
                <img src={v.thumb} alt="Installation video" loading="lazy" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-7 w-7 text-[hsl(var(--primary))] ml-1" fill="currentColor" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-[hsl(var(--primary))] text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Planning to Install Solar?</h2>
          <p className="text-white/80 mb-8">Let us evaluate your requirement and suggest the right solution.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-white">
              Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href={`tel:${phone}`}>
              <Button size="lg" className="bg-white text-[hsl(var(--primary))] hover:bg-white/90">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </Button>
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />

      {/* PROJECT MODAL */}
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {open && (
            <div>
              <DialogTitle className="sr-only">{open.title}</DialogTitle>
              <img src={open.image} alt={open.title} className="w-full h-64 md:h-80 object-cover" />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--primary))] text-white text-xs font-bold">{open.size}</span>
                  <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--secondary))] text-white text-xs font-bold">{open.type}</span>
                  <span className="px-2.5 py-1 rounded-full bg-muted text-xs font-semibold">{open.category}</span>
                </div>
                <h3 className="text-2xl font-bold text-[hsl(var(--primary))]">{open.title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" /> {open.location}
                  <span className="mx-2">·</span>
                  <Zap className="h-4 w-4" /> {open.size} {open.type}
                </div>
                <p className="text-muted-foreground mt-4">{open.description}</p>
                {open.notes && (
                  <ul className="mt-4 space-y-1.5">
                    {open.notes.map((n) => (
                      <li key={n} className="text-sm flex items-start gap-2">
                        <span className="text-[hsl(var(--secondary))] mt-1">●</span>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-3 mt-6">
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-white">
                      <MessageCircle className="mr-2 h-4 w-4" /> Enquire Similar
                    </Button>
                  </a>
                  <a href={`tel:${phone}`}>
                    <Button variant="outline">
                      <Phone className="mr-2 h-4 w-4" /> Call
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* VIDEO MODAL */}
      <Dialog open={!!video} onOpenChange={(v) => !v && setVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-0">
          <DialogTitle className="sr-only">Installation video</DialogTitle>
          {video && (
            <div className="aspect-video">
              <iframe
                src={`${video}?autoplay=1`}
                title="Installation video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
