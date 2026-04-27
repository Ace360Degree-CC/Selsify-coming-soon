import { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone, MessageCircle, ArrowRight, CheckCircle2, TrendingDown, Wallet,
  Sun, Sparkles, Clock, Zap, Shield, BadgeCheck, MapPin, IndianRupee,
  Search, PencilRuler, HardHat, PlugZap, Battery, Grid3x3, Home, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";
import heroImg from "@/assets/pune-solar-hero.jpg";
import work1 from "@/assets/install-1.jpeg";
import work2 from "@/assets/install-2.jpeg";
import work3 from "@/assets/install-3.jpeg";
import work4 from "@/assets/install-7.jpeg";
import work5 from "@/assets/install-4.jpeg";
import work6 from "@/assets/install-2.jpeg";

const phone = "+919892020515";
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27d%20like%20a%20free%20consultation%20for%20Solar%20Installation%20in%20Pune";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

const solarTypes = [
  { icon: Grid3x3, title: "On-Grid Solar", tag: "Recommended", desc: "Best for Pune homes & societies. Lowest cost, highest savings, net-metering enabled.", featured: true },
  { icon: Battery, title: "Off-Grid Solar", tag: "Backup", desc: "Independent power with batteries. Ideal where grid is unreliable.", featured: false },
  { icon: Zap, title: "Hybrid Solar", tag: "Savings + Backup", desc: "Net-metering plus battery backup for power cuts. Best of both.", featured: false },
];

const whyPune = [
  { icon: TrendingDown, t: "High Tariffs", d: "Pune has rising electricity tariffs across MSEDCL — solar saves more here." },
  { icon: Wallet, t: "Strong ROI", d: "Most rooftops payback in 3–4 years with 25-year panel life." },
  { icon: Sun, t: "Ideal Rooftops", d: "Flat terraces and bungalow roofs in Pune are perfect for solar." },
  { icon: Building2, t: "Society Adoption", d: "Bungalows, villas and societies across Pune are going solar fast." },
];

const process = [
  { icon: Search, title: "Site Inspection", desc: "Free rooftop visit and shadow analysis." },
  { icon: PencilRuler, title: "System Design", desc: "Custom design for your usage and rooftop." },
  { icon: HardHat, title: "Installation", desc: "Clean, safe install in 2–4 days." },
  { icon: PlugZap, title: "Activation", desc: "Net-metering & commissioning — start saving." },
];

const works = [
  { src: work1, alt: "Residential rooftop solar Wakad Pune", caption: "5 kW · Wakad" },
  { src: work2, alt: "Society solar project Baner Pune", caption: "Society · Baner" },
  { src: work3, alt: "Bungalow solar Kothrud Pune", caption: "8 kW · Kothrud" },
  { src: work4, alt: "Commercial rooftop solar Hinjewadi", caption: "20 kW · Hinjewadi" },
  { src: work5, alt: "Society solar Aundh", caption: "Society · Aundh" },
  { src: work6, alt: "Home solar Viman Nagar Pune", caption: "6 kW · Viman Nagar" },
];

const whySelsify = [
  { icon: BadgeCheck, t: "Experienced Team", d: "Hundreds of installations across Pune." },
  { icon: Sparkles, t: "Clean Installation", d: "Neat cabling, safe mounting, tidy finish." },
  { icon: Shield, t: "Transparent Pricing", d: "No hidden charges. Honest quotes." },
  { icon: Clock, t: "Local Support", d: "Pune-based team for fast service." },
];

export default function SolarPune() {
  const [view, setView] = useState<"without" | "with">("without");
  const [bill, setBill] = useState(5000);
  const [propType, setPropType] = useState<"home" | "society" | "commercial">("home");
  const [check, setCheck] = useState({ roof: false, shadow: false, usage: false });
  const [subsidy, setSubsidy] = useState<"non" | "sub">("non");

  const calc = useMemo(() => {
    // Pune avg ₹11/unit. Daily kWh = bill/(11*30). System kW = daily/4 (sun hours)
    const units = bill / 11;
    const dailyKwh = units / 30;
    let kw = Math.max(1, Math.round(dailyKwh / 4));
    if (propType === "society") kw = Math.max(kw, 10);
    if (propType === "commercial") kw = Math.max(kw, 15);
    const perKw = kw >= 10 ? 50000 : 55000;
    const cost = kw * perKw;
    const monthlySavings = Math.round(bill * 0.9);
    return { kw, cost, monthlySavings };
  }, [bill, propType]);

  const checks = Object.values(check).filter(Boolean).length;
  const heroR = useReveal<HTMLDivElement>();

  useEffect(() => {
    document.title = "Solar Installation in Pune | Rooftop Solar Company";
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Trusted solar installation in Pune by Selsify. Rooftop solar for homes, societies & businesses. Free site visit, transparent pricing, fast install.");
    setMeta("keywords", "solar installation pune, rooftop solar pune, solar company pune, solar panel pune, on-grid solar pune");
    setMeta("og:title", "Solar Installation in Pune | Selsify", "property");
    setMeta("og:description", "Reduce your electricity bills with reliable rooftop solar solutions in Pune.", "property");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "/solar-installation/pune";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-24 pb-12 md:pt-28 md:pb-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div ref={heroR.ref} className={`transition-all duration-700 ${heroR.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <MapPin className="h-3.5 w-3.5" /> Serving all of Pune
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Solar Installation in <span className="text-primary">Pune</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Reduce your electricity bills with reliable rooftop solar solutions — installed by a local Pune team you can trust.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-xl">
              {[
                { i: Clock, t: "Fast install" },
                { i: BadgeCheck, t: "Trusted execution" },
                { i: Wallet, t: "Long-term savings" },
              ].map((b) => (
                <li key={b.t} className="flex items-center gap-2 rounded-lg bg-card border px-3 py-2 text-sm">
                  <b.i className="h-4 w-4 text-primary" /> {b.t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90" asChild>
                <a href="#calculator"><Sun className="mr-2 h-5 w-5" />Get Free Consultation</a>
              </Button>
              <Button size="lg" variant="outline" className="border-2" asChild>
                <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-5 w-5" />WhatsApp Now</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl rounded-3xl" />
            <img src={heroImg} alt="Rooftop solar installation in Pune" width={1280} height={896} className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-4 -left-4 bg-card border rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[hsl(var(--cta))]" />
              <div>
                <div className="text-xs text-muted-foreground">Pune installs</div>
                <div className="text-sm font-bold">500+ rooftops</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL CONTEXT TOGGLE */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">Why Solar Makes Sense in Pune</h2>
          <p className="mt-3 text-center text-muted-foreground">Tap to compare your situation.</p>
          <div className="mt-8 inline-flex w-full bg-card p-1 rounded-full border shadow-sm">
            {(["without", "with"] as const).map((k) => (
              <button key={k} onClick={() => setView(k)}
                className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${view === k ? (k === "with" ? "bg-[hsl(var(--cta))] text-white" : "bg-primary text-primary-foreground") : "text-muted-foreground"}`}>
                {k === "without" ? "Without Solar" : "With Solar"}
              </button>
            ))}
          </div>
          <Card className="mt-6 p-8">
            {view === "without" ? (
              <ul className="space-y-3 text-foreground">
                <li className="flex gap-2"><span className="text-destructive">●</span> High electricity bills every month</li>
                <li className="flex gap-2"><span className="text-destructive">●</span> Rising tariffs year after year</li>
                <li className="flex gap-2"><span className="text-destructive">●</span> No control over energy costs</li>
              </ul>
            ) : (
              <ul className="space-y-3 text-foreground">
                <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-[hsl(var(--cta))] shrink-0" /> Reduced bills from month one</li>
                <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-[hsl(var(--cta))] shrink-0" /> Long-term savings for 25+ years</li>
                <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-[hsl(var(--cta))] shrink-0" /> Predictable energy costs</li>
              </ul>
            )}
          </Card>
        </div>
      </section>

      {/* SOLAR TYPES */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">Our Solar Solutions</h2>
          <p className="mt-3 text-center text-muted-foreground">Choose the system that fits your property.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {solarTypes.map((s) => (
              <Card key={s.title} className={`p-6 relative transition-all hover:-translate-y-1 hover:shadow-xl ${s.featured ? "border-2 border-[hsl(var(--cta))] bg-[hsl(var(--cta))]/5" : ""}`}>
                {s.featured && <span className="absolute -top-3 left-6 bg-[hsl(var(--cta))] text-white text-xs px-3 py-1 rounded-full font-semibold">Recommended</span>}
                <s.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-bold text-foreground">{s.title}</h3>
                <span className="text-xs text-muted-foreground">{s.tag}</span>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">Estimate Your Solar Cost in Pune</h2>
          <p className="mt-3 text-center text-muted-foreground">Quick estimate — final price after free site visit.</p>
          <Card className="mt-8 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-semibold text-foreground">Monthly Electricity Bill</label>
                <div className="mt-3 flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <input type="number" value={bill} min={500} step={500}
                    onChange={(e) => setBill(Math.max(500, Number(e.target.value) || 0))}
                    className="w-full bg-transparent outline-none text-lg font-semibold" />
                </div>
                <Slider value={[bill]} onValueChange={(v) => setBill(v[0])} min={1000} max={100000} step={500} className="mt-4" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹1K</span><span>₹1L</span>
                </div>

                <label className="mt-6 block text-sm font-semibold text-foreground">Property Type</label>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {([
                    { k: "home", l: "Home", i: Home },
                    { k: "society", l: "Society", i: Building2 },
                    { k: "commercial", l: "Business", i: Zap },
                  ] as const).map((p) => (
                    <button key={p.k} onClick={() => setPropType(p.k)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium flex flex-col items-center gap-1 transition-all ${propType === p.k ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
                      <p.i className="h-5 w-5" /> {p.l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-primary text-primary-foreground rounded-xl p-6 flex flex-col justify-center">
                <div className="text-sm opacity-80">Suggested System Size</div>
                <div className="text-4xl font-bold mt-1">{calc.kw} kW</div>
                <div className="mt-5 text-sm opacity-80">Estimated Cost</div>
                <div className="text-2xl font-bold">₹{(calc.cost / 100000).toFixed(2)} L</div>
                <div className="mt-5 text-sm opacity-80">Monthly Savings</div>
                <div className="text-2xl font-bold text-[hsl(var(--cta))]">₹{calc.monthlySavings.toLocaleString("en-IN")}</div>
                <Button className="mt-6 bg-[hsl(var(--cta))] hover:bg-[hsl(var(--cta))]/90 text-white" asChild>
                  <a href={wa} target="_blank" rel="noreferrer">Get exact pricing <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* WHY MUMBAI */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">Why Install Solar in Pune?</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyPune.map((b) => (
              <Card key={b.t} className="p-6 hover:-translate-y-1 hover:shadow-xl transition-all">
                <b.icon className="h-9 w-9 text-primary" />
                <h3 className="mt-3 font-bold text-foreground">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SUITABILITY CHECK */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">Is Your Property Suitable?</h2>
          <Card className="mt-8 p-6 md:p-8">
            {[
              { k: "roof", l: "Rooftop space available (300+ sq ft)" },
              { k: "shadow", l: "Minimal shadow during the day" },
              { k: "usage", l: "Regular electricity usage" },
            ].map((c) => (
              <label key={c.k} className="flex items-center gap-3 py-3 cursor-pointer border-b last:border-b-0">
                <input type="checkbox" checked={check[c.k as keyof typeof check]}
                  onChange={(e) => setCheck({ ...check, [c.k]: e.target.checked })}
                  className="w-5 h-5 rounded accent-[hsl(var(--cta))]" />
                <span className="text-foreground">{c.l}</span>
              </label>
            ))}
            <div className={`mt-5 p-4 rounded-lg text-center font-semibold ${checks === 3 ? "bg-[hsl(var(--cta))]/10 text-[hsl(var(--cta))]" : checks >= 1 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {checks === 3 ? "✓ Your property is suitable for solar" : checks >= 1 ? "Looking good — let's verify on a site visit" : "Tick the boxes that apply to your property"}
            </div>
          </Card>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">Our Work in Pune</h2>
          <p className="mt-3 text-center text-muted-foreground">Real installations across the city.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {works.map((w, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <button className="group relative overflow-hidden rounded-xl border bg-card text-left">
                    <img src={w.src} alt={w.alt} loading="lazy" className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                      <div className="flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4" />{w.caption}</div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-0 overflow-hidden">
                  <img src={w.src} alt={w.alt} className="w-full h-auto" />
                  <div className="p-4 text-sm font-semibold text-foreground">{w.caption}</div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">How We Install Solar</h2>
          <div className="mt-10 grid md:grid-cols-4 gap-5 relative">
            {process.map((s, i) => (
              <div key={s.title} className="relative">
                <Card className="p-6 h-full text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mt-3 text-xs font-bold text-[hsl(var(--cta))]">STEP {i + 1}</div>
                  <h3 className="mt-1 font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </Card>
                {i < process.length - 1 && <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 h-5 w-5 text-primary/40" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSIDY */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">Solar Subsidy in Pune</h2>
          <p className="mt-3 text-center text-muted-foreground">Subsidy adds time. Non-subsidy is faster and flexible.</p>
          <div className="mt-8 inline-flex w-full bg-card p-1 rounded-full border shadow-sm">
            {(["non", "sub"] as const).map((k) => (
              <button key={k} onClick={() => setSubsidy(k)}
                className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${subsidy === k ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                {k === "non" ? "Non-Subsidy (Faster)" : "Subsidy"}
              </button>
            ))}
          </div>
          <Card className="mt-6 p-8 grid sm:grid-cols-3 gap-5 text-sm">
            {subsidy === "non" ? (
              <>
                <div><div className="font-semibold text-foreground">Timeline</div><div className="text-muted-foreground mt-1">2–4 weeks total</div></div>
                <div><div className="font-semibold text-foreground">Cost</div><div className="text-muted-foreground mt-1">Standard pricing — no waiting</div></div>
                <div><div className="font-semibold text-foreground">Flexibility</div><div className="text-muted-foreground mt-1">Any panel/inverter brand</div></div>
              </>
            ) : (
              <>
                <div><div className="font-semibold text-foreground">Timeline</div><div className="text-muted-foreground mt-1">2–4 months (govt process)</div></div>
                <div><div className="font-semibold text-foreground">Cost</div><div className="text-muted-foreground mt-1">Lower upfront with subsidy</div></div>
                <div><div className="font-semibold text-foreground">Flexibility</div><div className="text-muted-foreground mt-1">Empanelled brands only</div></div>
              </>
            )}
          </Card>
          <div className="mt-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--cta))]" /> Most Pune customers prefer Non-Subsidy for speed.
          </div>
        </div>
      </section>

      {/* WHY SELSIFY */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">Why Choose Selsify</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whySelsify.map((w) => (
              <Card key={w.t} className="p-6">
                <w.icon className="h-9 w-9 text-primary" />
                <h3 className="mt-3 font-bold text-foreground">{w.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Looking for Solar Installation in Pune?</h2>
          <p className="mt-4 text-lg opacity-90">Get a customised solar solution based on your property and usage.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="bg-[hsl(var(--cta))] hover:bg-[hsl(var(--cta))]/90 text-white" asChild>
              <a href={`tel:${phone}`}><Phone className="mr-2 h-5 w-5" />Call Now</a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#calculator">Get Free Quote</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10" asChild>
              <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-5 w-5" />WhatsApp</a>
            </Button>
          </div>
          <div className="mt-5 text-sm opacity-80 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" /> We respond within 15–30 minutes
          </div>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
}
