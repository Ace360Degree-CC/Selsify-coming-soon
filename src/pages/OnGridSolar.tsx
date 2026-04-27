import { useEffect, useMemo, useState } from "react";
import {
  Sun, Zap, Plug, Gauge, IndianRupee, Phone, MessageCircle,
  CheckCircle2, ShieldCheck, Wrench, HeartHandshake, ArrowRight,
  Home, Building2, Building, Leaf, Settings, BadgePercent, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";

const heroImg = "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1400&q=80";
const projectImgs = [
  { src: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=900&q=80", caption: "Residential Rooftop — Mumbai" },
  { src: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80", caption: "Commercial Install — Pune" },
  { src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80", caption: "Society Rooftop — Thane" },
  { src: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=80", caption: "Worker Installation" },
  { src: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=900&q=80", caption: "5kW Home System" },
  { src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80", caption: "Industrial Setup" },
];

const phone = "+919892020515";
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27m%20interested%20in%20an%20On-Grid%20solar%20system";

const steps = [
  { icon: Sun, title: "Solar panels generate electricity", desc: "DC power from sunlight on your rooftop." },
  { icon: Zap, title: "Inverter converts power", desc: "DC is converted into usable AC current." },
  { icon: Plug, title: "Electricity used instantly", desc: "Your home or business runs on solar first." },
  { icon: Gauge, title: "Extra power goes to grid", desc: "Net meter records every unit exported." },
  { icon: IndianRupee, title: "Bill gets reduced", desc: "Exported units offset your monthly bill." },
];

const benefits = [
  { icon: BadgePercent, title: "Save up to 80%", desc: "Slash monthly electricity bills significantly." },
  { icon: ShieldCheck, title: "No battery cost", desc: "Lower upfront investment, faster payback." },
  { icon: Gauge, title: "Net metering", desc: "Earn credits for surplus power you export." },
  { icon: Wrench, title: "Low maintenance", desc: "Just periodic cleaning — no moving parts." },
  { icon: Clock, title: "25+ year lifespan", desc: "Tier-1 panels with long performance warranty." },
];

const audience = {
  home: {
    icon: Home,
    title: "Homeowners",
    desc: "Perfect for independent houses and villas with rooftop space. Reduce your monthly bill from day one.",
    fit: "Best for 2–10 kW systems",
  },
  society: {
    icon: Building,
    title: "Societies",
    desc: "Common-area lighting, lifts and water pumps run on solar — lower maintenance charges for residents.",
    fit: "Best for 10–50 kW systems",
  },
  business: {
    icon: Building2,
    title: "Businesses",
    desc: "Offices, shops, warehouses and factories cut operating costs with predictable energy expenses.",
    fit: "Best for 10 kW – 1 MW systems",
  },
};

export default function OnGridSolar() {
  const [kw, setKw] = useState<number[]>([3]);
  const [isSubsidy, setIsSubsidy] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const size = kw[0];
  const perKw = isSubsidy ? 55000 : 60000;
  const cost = useMemo(() => Math.round(size * perKw), [size, perKw]);
  const monthlyUnits = size * 120;
  const savings = Math.round(monthlyUnits * 9);

  useEffect(() => {
    document.title = "On-Grid Solar System | Selsify";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); return m;
    })();
    meta.setAttribute("content", "On-Grid Solar System by Selsify — reduce your electricity bill up to 80% with net metering. Get free consultation.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-muted/30">
        <div className="container-px mx-auto grid lg:grid-cols-2 gap-10 py-14 md:py-20 items-center">
          <div className="animate-fade-in">
            <span className="eyebrow">On-Grid Solar</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
              On-Grid Solar System for Homes &amp; Businesses
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              Reduce your electricity bills by up to 80% with a reliable, grid-connected solar system.
            </p>
            <ul className="mt-6 space-y-2">
              {["No batteries", "Lower cost", "Long-term savings"].map((t, i) => (
                <li
                  key={t}
                  className="flex items-center gap-2 text-foreground/90 animate-fade-in"
                  style={{ animationDelay: `${(i + 1) * 120}ms`, animationFillMode: "backwards" }}
                >
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <a href="#calculator">Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={wa} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Now
                </a>
              </Button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-3 bg-primary/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
            <img
              src={heroImg}
              alt="On-grid solar installation on rooftop"
              loading="eager"
              className="relative w-full h-[320px] md:h-[460px] object-cover rounded-2xl shadow-elevated transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </section>

      {/* WHAT IS ON-GRID */}
      <section className="section container-px mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow">Explainer</span>
          <h2 className="mt-2 text-2xl md:text-4xl">What is an On-Grid Solar System?</h2>
          <p className="mt-3 text-muted-foreground">
            A simple, low-maintenance system connected to your local electricity grid.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-8">
          <Accordion type="single" collapsible defaultValue="i0" className="space-y-3">
            {[
              { icon: Plug, title: "Connected to electricity grid", body: "Your solar system stays in sync with your utility supply for seamless power." },
              { icon: Sun, title: "Uses solar power first", desc: "", body: "During the day your appliances run directly on free solar energy." },
              { icon: Gauge, title: "Sends excess to grid", body: "Surplus units are exported and credited via net metering." },
              { icon: ShieldCheck, title: "No storage required", body: "No batteries means lower cost, less maintenance and longer system life." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`i${i}`} className="border rounded-lg px-4 bg-card">
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-3 text-left">
                    <span className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-12">
                  {item.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-muted/40">
        <div className="container-px mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Process</span>
            <h2 className="mt-2 text-2xl md:text-4xl">How It Works</h2>
          </div>

          <div className="mt-10 relative">
            <div className="hidden md:block absolute top-8 left-[8%] right-[8%] h-0.5 bg-border" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {steps.map((s, i) => {
                const active = activeStep === i;
                return (
                  <button
                    key={i}
                    onMouseEnter={() => setActiveStep(i)}
                    onClick={() => setActiveStep(i)}
                    className="relative text-center group focus:outline-none"
                  >
                    <div
                      className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-background ${
                        active ? "border-secondary scale-110 shadow-elevated" : "border-border group-hover:border-primary"
                      }`}
                    >
                      <s.icon className={`h-7 w-7 transition-colors ${active ? "text-secondary" : "text-primary"}`} />
                    </div>
                    <div className="mt-2 text-xs font-semibold text-accent">STEP {i + 1}</div>
                    <div className="mt-1 text-sm font-medium text-foreground">{s.title}</div>
                    <div
                      className={`mt-2 text-xs text-muted-foreground transition-all duration-300 ${
                        active ? "opacity-100 max-h-20" : "opacity-0 md:opacity-60 max-h-20"
                      }`}
                    >
                      {s.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section container-px mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow">Benefits</span>
          <h2 className="mt-2 text-2xl md:text-4xl">Why On-Grid Solar Makes Sense</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map((b) => (
            <Card
              key={b.title}
              className="group p-5 card-lift cursor-default border-border/70"
            >
              <div className="h-11 w-11 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-300">
                {b.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="section bg-primary text-primary-foreground">
        <div className="container-px mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Calculator</span>
            <h2 className="mt-2 text-2xl md:text-4xl text-primary-foreground">Estimate Your Solar Cost</h2>
            <p className="mt-2 text-primary-foreground/80">Slide to choose your system size and see instant estimates.</p>
          </div>

          <div className="mt-10 max-w-3xl mx-auto bg-background text-foreground rounded-2xl p-6 md:p-8 shadow-elevated">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-sm text-muted-foreground">System Size</div>
                <div className="text-3xl md:text-4xl font-bold text-primary">{size} kW</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Monthly Generation</div>
                <div className="text-xl font-semibold">{monthlyUnits} units</div>
              </div>
            </div>

            <div className="mt-6">
              <Slider value={kw} onValueChange={setKw} min={1} max={20} step={1} />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>1 kW</span><span>10 kW</span><span>20 kW+</span>
              </div>
            </div>

            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <div className="text-xs text-muted-foreground">Estimated Cost</div>
                <div className="mt-1 text-2xl font-bold text-primary">₹{cost.toLocaleString("en-IN")}</div>
                <div className="text-xs text-muted-foreground mt-1">*Indicative pricing</div>
              </div>
              <div className="rounded-lg border p-4 bg-secondary/5">
                <div className="text-xs text-muted-foreground">Estimated Monthly Savings</div>
                <div className="mt-1 text-2xl font-bold text-secondary">₹{savings.toLocaleString("en-IN")}</div>
                <div className="text-xs text-muted-foreground mt-1">at ~₹9/unit</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <a href={wa} target="_blank" rel="noreferrer">Get exact pricing <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${phone}`}><Phone className="mr-2 h-4 w-4" /> Call {phone}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="section container-px mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow">Suitability</span>
          <h2 className="mt-2 text-2xl md:text-4xl">Is This Right for You?</h2>
        </div>

        <Tabs defaultValue="home" className="mt-8 max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="home">Homeowners</TabsTrigger>
            <TabsTrigger value="society">Societies</TabsTrigger>
            <TabsTrigger value="business">Businesses</TabsTrigger>
          </TabsList>
          {Object.entries(audience).map(([k, a]) => (
            <TabsContent key={k} value={k} className="mt-6">
              <Card className="p-6 md:p-8 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <a.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl">{a.title}</h3>
                    <p className="mt-2 text-muted-foreground">{a.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-secondary">
                      <CheckCircle2 className="h-4 w-4" /> {a.fit}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* PROJECTS */}
      <section className="section bg-muted/40">
        <div className="container-px mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Trust</span>
            <h2 className="mt-2 text-2xl md:text-4xl">Our Installations</h2>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectImgs.map((p, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl group cursor-pointer">
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-primary-foreground font-medium">{p.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSIDY VS NON-SUBSIDY */}
      <section className="section container-px mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow">Compare</span>
          <h2 className="mt-2 text-2xl md:text-4xl">Subsidy vs Non-Subsidy</h2>
          <p className="mt-2 text-muted-foreground">Toggle to see how each option compares.</p>
        </div>

        <div className="mt-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 p-3 rounded-full border bg-card w-fit mx-auto">
            <span className={`text-sm font-medium px-3 ${!isSubsidy ? "text-primary" : "text-muted-foreground"}`}>
              Non-Subsidy
            </span>
            <Switch checked={isSubsidy} onCheckedChange={setIsSubsidy} />
            <span className={`text-sm font-medium px-3 ${isSubsidy ? "text-primary" : "text-muted-foreground"}`}>
              Subsidy
            </span>
          </div>

          <Card className="mt-6 overflow-hidden">
            {[
              { label: "Cost (per kW)", a: "₹60,000", b: "₹55,000 (after subsidy)" },
              { label: "Installation Time", a: "10–15 days", b: "30–45 days (incl. approvals)" },
              { label: "Performance", a: "Same — Tier-1 panels", b: "Same — DISCOM approved vendors" },
              { label: "Eligibility", a: "Open to all", b: "Residential only (1–10 kW)" },
              { label: "Paperwork", a: "Minimal", b: "Higher — govt. process" },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-2 ${i % 2 ? "bg-muted/40" : ""}`}>
                <div className="p-4 border-r font-medium text-sm">{row.label}</div>
                <div className="p-4 text-sm text-foreground/90 transition-all">
                  {isSubsidy ? row.b : row.a}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* WHY SELSIFY */}
      <section className="section bg-muted/40">
        <div className="container-px mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Why Selsify</span>
            <h2 className="mt-2 text-2xl md:text-4xl">Why Choose Selsify</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Wrench, title: "Real execution experience", desc: "Hands-on installation across India." },
              { icon: ShieldCheck, title: "Clean installation", desc: "Tidy cabling and safety-first work." },
              { icon: BadgePercent, title: "Transparent pricing", desc: "No hidden costs, clear quotes." },
              { icon: HeartHandshake, title: "Long-term support", desc: "AMC and on-call assistance." },
            ].map((b, i) => (
              <Card key={i} className="p-5 card-lift">
                <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container-px mx-auto">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center shadow-elevated">
            <h2 className="text-2xl md:text-4xl text-primary-foreground">
              Start Saving on Electricity Today
            </h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">
              Get a personalised quote for your rooftop in minutes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <a href={`tel:${phone}`}><Phone className="mr-2 h-4 w-4" /> Call Now</a>
              </Button>
              <Button size="lg" className="bg-background text-primary hover:bg-background/90" asChild>
                <a href="#calculator">Get Free Quote</a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <a href={wa} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-primary-foreground/80">
              <Clock className="h-4 w-4" />
              We usually respond within 15–30 minutes
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
}
