import { useEffect, useMemo, useState } from "react";
import {
  Sun, Zap, Battery, Plug, Gauge, Phone, MessageCircle,
  CheckCircle2, ShieldCheck, Wrench, ArrowRight, Home, Building2,
  Building, Settings, Clock, Sparkles, BatteryCharging, Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";

const heroImg = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80";
const projectImgs = [
  { src: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=900&q=80", caption: "Hybrid Villa — Mumbai" },
  { src: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80", caption: "Office Hybrid Setup — Pune" },
  { src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80", caption: "Commercial — Thane" },
  { src: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=900&q=80", caption: "8kW Home Hybrid" },
  { src: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=80", caption: "Battery + Inverter Stack" },
  { src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80", caption: "Society Hybrid Install" },
];

const phone = "+919892020515";
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27m%20interested%20in%20a%20Hybrid%20solar%20system";

const steps = [
  { icon: Sun, title: "Solar generates power", desc: "Panels capture sunlight and produce DC electricity." },
  { icon: Plug, title: "Power used instantly", desc: "Your loads run directly on solar during the day." },
  { icon: BatteryCharging, title: "Extra stored in battery", desc: "Surplus energy charges your battery bank." },
  { icon: Battery, title: "Battery used during outage", desc: "Stored power keeps essentials running 24/7." },
  { icon: Gauge, title: "Grid supports when needed", desc: "Smart inverter pulls from grid only as backup." },
];

const benefits = [
  { icon: Battery, title: "Power backup", desc: "Stay powered during outages without a generator." },
  { icon: Sparkles, title: "Lower electricity bills", desc: "Use solar first, store the rest, pay less." },
  { icon: Activity, title: "Smart energy usage", desc: "Inverter intelligently routes solar, battery & grid." },
  { icon: Settings, title: "Flexible system", desc: "Expandable battery and panel capacity." },
  { icon: ShieldCheck, title: "Reliable during outages", desc: "Critical loads stay live automatically." },
];

const audience = {
  home: {
    icon: Home,
    title: "Homes with Power Cuts",
    desc: "If your area faces frequent outages, hybrid keeps lights, fans, fridge and Wi-Fi running while still cutting your bills.",
    fits: ["Daily outages 1–6 hrs", "Family of 3–6", "3–8kW system size"],
  },
  business: {
    icon: Building2,
    title: "Businesses with Critical Load",
    desc: "Protect POS systems, servers, and refrigeration with seamless backup. Hybrid pays back through savings + uptime.",
    fits: ["Retail / clinics / labs", "Critical load < 10kW", "Backup priority"],
  },
  office: {
    icon: Building,
    title: "Offices",
    desc: "Keep workstations, routers and meeting rooms always on. Reduce diesel usage and operating costs.",
    fits: ["20–100 employees", "Workday backup", "10–25kW range"],
  },
  mixed: {
    icon: Sparkles,
    title: "Backup + Savings",
    desc: "Want both reduced bills AND uninterrupted power? Hybrid is the only system that delivers both at once.",
    fits: ["Best-of-both buyer", "Long-term value", "Premium reliability"],
  },
};

const compareData: Record<string, { grid: string; battery: string; cost: string; backup: string; best: string }> = {
  ongrid: { grid: "Required", battery: "No", cost: "₹55–65k / kW", backup: "None", best: "Bill savings only" },
  offgrid: { grid: "Not needed", battery: "Yes (large)", cost: "₹1.0–1.4L / kW", backup: "Full", best: "Remote / no grid" },
  hybrid: { grid: "Required", battery: "Yes (sized)", cost: "₹85k–1.1L / kW", backup: "Full", best: "Savings + Backup" },
};

const HybridSolar = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hybridShare, setHybridShare] = useState([60]); // slider 0-100 (on-grid → hybrid)
  const [check, setCheck] = useState({ backup: false, outages: false, flexibility: false });
  const [compare, setCompare] = useState<"ongrid" | "offgrid" | "hybrid">("hybrid");

  useEffect(() => {
    document.title = "Hybrid Solar System | Power + Backup | Selsify";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); return m;
    })();
    meta.setAttribute("content", "Hybrid solar systems by Selsify — combine grid savings with battery backup. Smart energy, reliable power, premium installation across Mumbai, Pune & Thane.");
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = window.location.origin + "/solar-solutions/hybrid";
  }, []);

  const slider = hybridShare[0];
  const dyn = useMemo(() => {
    // Interpolate between On-Grid (0) and Hybrid (100)
    const cost = Math.round(60 + (slider / 100) * 35); // ₹k/kW
    const savings = Math.round(70 + (slider / 100) * 15); // %
    const backup = slider < 20 ? "None" : slider < 60 ? "Partial" : "Full";
    const flex = slider < 20 ? "Low" : slider < 60 ? "Medium" : "High";
    return { cost, savings, backup, flex };
  }, [slider]);

  const recommendation = useMemo(() => {
    const score = (check.backup ? 1 : 0) + (check.outages ? 1 : 0) + (check.flexibility ? 1 : 0);
    if (score >= 2) return { label: "Hybrid Solar", color: "text-[hsl(var(--primary))]", desc: "Based on your needs, Hybrid is the right fit — savings plus dependable backup." };
    if (score === 1) return { label: "Hybrid (consider)", color: "text-[hsl(var(--primary))]", desc: "Hybrid will future-proof your setup. On-Grid works if budget is tight." };
    return { label: "On-Grid Solar", color: "text-foreground", desc: "You may not need backup yet — On-Grid gives faster payback." };
  }, [check]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] px-3 py-1 text-xs font-semibold mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Premium Solar Solution
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[hsl(var(--primary))] leading-tight">
              Hybrid Solar System – Power + Backup Together
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get solar savings with battery backup for uninterrupted power.
            </p>
            <ul className="mt-6 space-y-2">
              {["Savings + Backup", "Grid + Battery", "Smart energy usage"].map((t, i) => (
                <li key={t} style={{ animationDelay: `${i * 120}ms` }} className="flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--secondary))]" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-white">
                Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-[hsl(var(--secondary))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/10">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Now
                </Button>
              </a>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 bg-[hsl(var(--primary))]/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <img
              src={heroImg}
              alt="Hybrid solar installation with battery backup"
              loading="eager"
              className="relative rounded-2xl shadow-elevated w-full h-[280px] md:h-[440px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* WHAT IS HYBRID */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-3">
            What is a Hybrid Solar System?
          </h2>
          <p className="text-center text-muted-foreground mb-8">A smart system that blends grid + battery for the best of both worlds.</p>
          <Accordion type="single" collapsible defaultValue="i0" className="bg-background rounded-xl shadow-sm border">
            {[
              { icon: Sun, t: "Combines on-grid + off-grid", d: "Connects to the utility grid AND charges a battery bank — true hybrid behaviour." },
              { icon: BatteryCharging, t: "Stores excess energy in batteries", d: "When solar produces more than you use, the surplus charges your battery first." },
              { icon: Plug, t: "Uses grid when needed", d: "If solar + battery aren't enough, the system seamlessly draws from the grid." },
              { icon: ShieldCheck, t: "Works during outages", d: "Critical loads stay live automatically when the grid fails — no gap, no generator." },
            ].map((it, i) => (
              <AccordionItem key={i} value={`i${i}`} className="px-4">
                <AccordionTrigger className="text-left">
                  <span className="flex items-center gap-3">
                    <it.icon className="h-5 w-5 text-[hsl(var(--secondary))]" />
                    <span className="font-semibold">{it.t}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-8">{it.d}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-12">
            How Hybrid Solar Works
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const active = activeStep === i;
              return (
                <button
                  key={i}
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(i)}
                  className={`group text-left p-5 rounded-xl border transition-all duration-300 ${
                    active ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))] shadow-elevated -translate-y-1" : "bg-background hover:border-[hsl(var(--primary))]/40"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-3 ${active ? "bg-white/15" : "bg-[hsl(var(--primary))]/10"}`}>
                    <Icon className={`h-5 w-5 ${active ? "text-white" : "text-[hsl(var(--primary))]"}`} />
                  </div>
                  <div className={`text-xs font-bold mb-1 ${active ? "text-white/70" : "text-[hsl(var(--secondary))]"}`}>STEP {i + 1}</div>
                  <div className="font-semibold text-sm leading-snug">{s.title}</div>
                  <div className={`text-xs mt-2 ${active ? "text-white/80" : "text-muted-foreground"}`}>{s.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-12">Why Choose Hybrid Solar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Card key={i} className="p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group cursor-default">
                  <div className="h-11 w-11 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-3 group-hover:bg-[hsl(var(--primary))] transition-colors">
                    <Icon className="h-5 w-5 text-[hsl(var(--primary))] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-[hsl(var(--primary))] mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* COST VS VALUE SLIDER */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-3">Cost vs Benefit Comparison</h2>
          <p className="text-center text-muted-foreground mb-10">Drag the slider to see how value scales from On-Grid to Hybrid.</p>
          <Card className="p-6 md:p-10">
            <div className="flex justify-between text-sm font-semibold mb-3">
              <span className={slider < 50 ? "text-[hsl(var(--primary))]" : "text-muted-foreground"}>On-Grid</span>
              <span className={slider >= 50 ? "text-[hsl(var(--primary))]" : "text-muted-foreground"}>Hybrid</span>
            </div>
            <Slider value={hybridShare} onValueChange={setHybridShare} min={0} max={100} step={5} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Cost", value: `₹${dyn.cost}k/kW` },
                { label: "Savings", value: `${dyn.savings}%` },
                { label: "Backup", value: dyn.backup },
                { label: "Flexibility", value: dyn.flex },
              ].map((m) => (
                <div key={m.label} className="text-center p-4 rounded-lg bg-muted/50 transition-all">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{m.label}</div>
                  <div className="text-xl md:text-2xl font-bold text-[hsl(var(--primary))] mt-1">{m.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-white">
                  Get Customised Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">Is Hybrid Solar Right for You?</h2>
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto">
              {Object.entries(audience).map(([k, v]) => (
                <TabsTrigger key={k} value={k} className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white py-3">
                  <v.icon className="h-4 w-4 mr-2" /> <span className="hidden sm:inline">{v.title.split(" ")[0]}</span><span className="sm:hidden">{v.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(audience).map(([k, v]) => (
              <TabsContent key={k} value={k}>
                <Card className="p-6 md:p-8 mt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--primary))] mb-3">{v.title}</h3>
                  <p className="text-muted-foreground mb-5">{v.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {v.fits.map((f) => (
                      <span key={f} className="px-3 py-1 rounded-full bg-[hsl(var(--secondary))]/10 text-[hsl(var(--secondary))] text-sm font-medium">{f}</span>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* DECISION GUIDE */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-3">When Should You Choose Hybrid?</h2>
          <p className="text-center text-muted-foreground mb-10">Tick what applies — we'll tell you the best fit.</p>
          <Card className="p-6 md:p-8">
            <div className="space-y-4">
              {[
                { key: "backup" as const, label: "I need power backup during outages" },
                { key: "outages" as const, label: "My area faces frequent power cuts" },
                { key: "flexibility" as const, label: "I want flexible energy usage day & night" },
              ].map((q) => (
                <label key={q.key} className="flex items-center gap-3 p-4 rounded-lg border hover:border-[hsl(var(--primary))]/40 cursor-pointer transition-colors">
                  <Checkbox
                    checked={check[q.key]}
                    onCheckedChange={(v) => setCheck((s) => ({ ...s, [q.key]: !!v }))}
                  />
                  <span className="font-medium">{q.label}</span>
                </label>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-lg bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20 text-center">
              <div className="text-sm uppercase tracking-wide text-muted-foreground mb-1">Recommended</div>
              <div className={`text-2xl font-bold ${recommendation.color}`}>{recommendation.label}</div>
              <p className="text-sm text-muted-foreground mt-2">{recommendation.desc}</p>
            </div>
          </Card>
        </div>
      </section>

      {/* COMPARISON SWITCH */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">Compare Solar Systems</h2>
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg bg-background border p-1">
              {(["ongrid", "offgrid", "hybrid"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setCompare(k)}
                  className={`px-4 md:px-6 py-2 text-sm font-semibold rounded-md transition-all ${
                    compare === k ? "bg-[hsl(var(--primary))] text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {k === "ongrid" ? "On-Grid" : k === "offgrid" ? "Off-Grid" : "Hybrid"}
                </button>
              ))}
            </div>
          </div>
          <Card className={`p-6 md:p-8 transition-all ${compare === "hybrid" ? "ring-2 ring-[hsl(var(--secondary))]" : ""}`}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              {[
                { l: "Grid connection", v: compareData[compare].grid },
                { l: "Battery", v: compareData[compare].battery },
                { l: "Cost", v: compareData[compare].cost },
                { l: "Backup", v: compareData[compare].backup },
                { l: "Best for", v: compareData[compare].best },
              ].map((r) => (
                <div key={r.l} className="text-center p-3 rounded-lg bg-muted/40">
                  <div className="text-xs uppercase text-muted-foreground">{r.l}</div>
                  <div className="font-bold text-[hsl(var(--primary))] mt-1">{r.v}</div>
                </div>
              ))}
            </div>
            {compare === "hybrid" && (
              <div className="mt-6 text-center text-sm text-[hsl(var(--secondary))] font-semibold animate-fade-in">
                ★ Best value when you need both savings and backup
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-10">Our Installations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projectImgs.map((p, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl group cursor-pointer">
                <img src={p.src} alt={p.caption} loading="lazy" className="w-full h-48 md:h-60 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-semibold text-sm">{p.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SELSIFY */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-[hsl(var(--primary))] text-center mb-12">Why Choose Selsify</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Settings, t: "Proper system design", d: "Sized to your exact load and backup needs." },
              { icon: ShieldCheck, t: "Quality inverter + battery", d: "Lithium options, top-brand hybrid inverters." },
              { icon: Wrench, t: "Clean installation", d: "Neat cabling, safe mounting, code-compliant." },
              { icon: Clock, t: "After-sales support", d: "Real humans, real response times." },
            ].map((x, i) => (
              <Card key={i} className="p-6 hover:shadow-elevated hover:-translate-y-1 transition-all">
                <x.icon className="h-8 w-8 text-[hsl(var(--secondary))] mb-3" />
                <h3 className="font-bold text-[hsl(var(--primary))] mb-1">{x.t}</h3>
                <p className="text-sm text-muted-foreground">{x.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-[hsl(var(--primary))] text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Looking for Savings + Backup?</h2>
          <p className="text-white/80 mb-8">Hybrid solar gives you flexibility and reliability in one system.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`tel:${phone}`}>
              <Button size="lg" className="bg-white text-[hsl(var(--primary))] hover:bg-white/90">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </Button>
            </a>
            <Button size="lg" className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90 text-white">
              Get Free Quote
            </Button>
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </Button>
            </a>
          </div>
          <p className="mt-6 text-sm text-white/70">We respond within 15–30 minutes</p>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
};

export default HybridSolar;
