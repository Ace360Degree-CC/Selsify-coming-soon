import { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone, MessageCircle, ArrowRight, CheckCircle2, TrendingDown, Wallet,
  Home, Wrench, Sun, Sparkles, Clock, Send, Zap, Shield, BadgeCheck,
  Search, PencilRuler, HardHat, PlugZap, Battery, Grid3x3, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";
import heroImg from "@/assets/home-solar-hero.jpg";
import work1 from "@/assets/install-1.jpeg";
import work2 from "@/assets/install-2.jpeg";
import work3 from "@/assets/install-3.jpeg";
import work4 from "@/assets/install-7.jpeg";

const phone = "+919892020515";
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27d%20like%20a%20free%20consultation%20for%20Solar%20at%20home";

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

const benefits = [
  { icon: TrendingDown, title: "Reduce Bills", desc: "Cut your monthly electricity bill by up to 90% from day one." },
  { icon: Wallet, title: "Long-term Savings", desc: "Save lakhs over 20–25 years — solar pays back in 3–5 years." },
  { icon: Home, title: "Higher Property Value", desc: "Solar-equipped homes sell faster and at a premium." },
  { icon: Wrench, title: "Low Maintenance", desc: "Just occasional cleaning. Panels last 25+ years with warranty." },
];

const process = [
  { icon: Search, title: "Site Inspection", desc: "Free rooftop visit and shadow analysis." },
  { icon: PencilRuler, title: "System Design", desc: "Custom design based on your usage and roof." },
  { icon: HardHat, title: "Installation", desc: "Clean, safe install in 2–3 days." },
  { icon: PlugZap, title: "Activation", desc: "Net-meter, commissioning and you're saving." },
];

const works = [
  { src: work1, alt: "Residential rooftop solar installation", caption: "3 kW · Mumbai" },
  { src: work2, alt: "Bungalow solar project", caption: "5 kW · Pune" },
  { src: work3, alt: "Society solar plant", caption: "10 kW · Thane" },
  { src: work4, alt: "Premium home solar", caption: "8 kW · Nashik" },
];

const whySelsify = [
  { icon: BadgeCheck, t: "Practical Solutions", d: "Right-sized systems — no over-selling." },
  { icon: Sparkles, t: "Clean Installation", d: "Neat cabling, safe mounting, tidy finish." },
  { icon: Wallet, t: "Transparent Pricing", d: "Clear quotes with no hidden charges." },
  { icon: Shield, t: "After-sales Support", d: "We're available when you need help." },
];

/* ---------- Page ---------- */
const SolarForHome = () => {
  useEffect(() => {
    document.title = "Solar for Home | Selsify";
    const desc = "Install rooftop solar at home with Selsify. Reduce electricity bills, get free consultation, custom system sizing and clean installation.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", desc);
    let l = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!l) { l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); }
    l.href = window.location.href;
  }, []);

  /* Toggle */
  const [after, setAfter] = useState(false);

  /* Recommendation */
  const [goal, setGoal] = useState<"savings" | "backup" | null>(null);

  /* Sizing slider */
  const [size, setSize] = useState([5]);
  const sizing = useMemo(() => {
    const kw = size[0];
    const monthlyUnits = Math.round(kw * 120);
    const monthlySaving = Math.round(monthlyUnits * 9);
    const cost = Math.round(kw * 50000);
    let label = "Medium home";
    if (kw <= 3) label = "Small home (1–2 BHK)";
    else if (kw <= 6) label = "Medium home (3–4 BHK)";
    else label = "Large home / bungalow";
    return { kw, monthlyUnits, monthlySaving, cost, label };
  }, [size]);

  /* Suitability */
  const [check, setCheck] = useState({ roof: false, shadow: false, usage: false });
  const score = Number(check.roof) + Number(check.shadow) + Number(check.usage);

  const heroReveal = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-muted/40 border-b border-border">
        <div className="container mx-auto container-px py-12 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div ref={heroReveal.ref} className={`transition-all duration-700 ${heroReveal.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="eyebrow">Residential · Rooftop Solar</span>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl leading-tight">
              Solar for <span className="text-accent">Homes</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              Reduce your electricity bills and take control of your energy costs.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { i: TrendingDown, t: "Lower bills" },
                { i: Wallet, t: "Long-term savings" },
                { i: Wrench, t: "Simple installation" },
              ].map((b, i) => (
                <span
                  key={b.t}
                  className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1.5 text-xs font-semibold text-primary shadow-sm animate-fade-in"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <b.i className="h-3.5 w-3.5 text-secondary" /> {b.t}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <a href="#quote">Get Free Consultation <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={wa} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp Now
                </a>
              </Button>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Quick response within 15–30 minutes
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[5/4] shadow-elevated">
              <img src={heroImg} alt="Indian residential rooftop solar installation" width={1280} height={1024} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-elevated">
              <div className="text-xs uppercase tracking-wider opacity-90">Save up to</div>
              <div className="text-lg font-bold">90% on bills</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM → SOLUTION TOGGLE */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">The Shift</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Tired of Rising Electricity Bills?</h2>
            <p className="mt-3 text-muted-foreground">See what changes when you switch to solar.</p>
          </div>

          <div className="mt-8 inline-flex p-1 rounded-full border border-border bg-muted">
            <button
              onClick={() => setAfter(false)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${!after ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}
            >
              Before Solar
            </button>
            <button
              onClick={() => setAfter(true)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${after ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              After Solar
            </button>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5">
            <Card className={`p-6 transition-all ${!after ? "border-accent/40" : "border-border/60 opacity-60"}`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">Before</div>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 text-accent" /> ₹4,000–₹15,000 monthly bill</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 text-accent" /> Bills rise 8% every year</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 text-accent" /> Full dependency on grid</li>
              </ul>
            </Card>
            <Card className={`p-6 transition-all ${after ? "border-secondary/50 shadow-card" : "border-border/60 opacity-60"}`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-secondary">After</div>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-secondary" /> Up to 90% lower bills</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-secondary" /> Locked-in cost for 25+ years</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-secondary" /> Generate your own electricity</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Benefits</span>
            <h2 className="mt-2 text-3xl md:text-4xl">What Solar Does for Your Home</h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <Card key={b.title} className="p-5 group card-lift border-border/60">
                <div className="h-11 w-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <b.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold text-primary">{b.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{b.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM RECOMMENDATION */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Smart Selector</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Which System is Best for You?</h2>
            <p className="mt-3 text-muted-foreground">Tell us your goal and we'll suggest the right system.</p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setGoal("savings")}
              className={`text-left rounded-2xl border p-6 transition-all ${goal === "savings" ? "border-secondary bg-secondary/5 shadow-card" : "border-border bg-background hover:border-primary/40"}`}
            >
              <Wallet className={`h-6 w-6 ${goal === "savings" ? "text-secondary" : "text-primary"}`} />
              <div className="mt-3 font-semibold text-primary">I want maximum savings</div>
              <div className="text-sm text-muted-foreground mt-1">Lowest cost, highest payback. No backup needed.</div>
            </button>
            <button
              onClick={() => setGoal("backup")}
              className={`text-left rounded-2xl border p-6 transition-all ${goal === "backup" ? "border-secondary bg-secondary/5 shadow-card" : "border-border bg-background hover:border-primary/40"}`}
            >
              <Battery className={`h-6 w-6 ${goal === "backup" ? "text-secondary" : "text-primary"}`} />
              <div className="mt-3 font-semibold text-primary">I want savings + backup</div>
              <div className="text-sm text-muted-foreground mt-1">Power during outages plus long-term savings.</div>
            </button>
          </div>

          {goal && (
            <Card className="mt-6 p-6 md:p-8 border-secondary/40 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                  {goal === "savings" ? <Grid3x3 className="h-6 w-6" /> : <Battery className="h-6 w-6" />}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-secondary">Recommended</div>
                  <h3 className="mt-1 text-2xl">{goal === "savings" ? "On-Grid Solar" : "Hybrid Solar"}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {goal === "savings"
                      ? "Best for cities with reliable power. Send extra power back to the grid and earn credits via net-metering."
                      : "Includes battery backup so your home keeps running during power cuts while you save on bills."}
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      <a href={goal === "savings" ? "/solar-solutions/on-grid" : "/solar-solutions/hybrid"}>
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="#quote">Get a quote</a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* SIZING CALCULATOR */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Calculator</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Find the Right System Size</h2>
            <p className="mt-3 text-muted-foreground">Slide to match your home size.</p>
          </div>

          <Card className="mt-8 p-6 md:p-9 border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{sizing.label}</div>
                <div className="text-3xl md:text-4xl font-bold text-primary mt-1">{sizing.kw} kW</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Estimated cost</div>
                <div className="text-2xl font-bold text-secondary">₹{sizing.cost.toLocaleString("en-IN")}</div>
              </div>
            </div>

            <div className="mt-6">
              <Slider value={size} onValueChange={setSize} min={1} max={10} step={1} />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>1 kW</span><span>5 kW</span><span>10 kW</span>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-muted/50 p-4">
                <Sun className="h-5 w-5 text-accent" />
                <div className="mt-2 text-sm text-muted-foreground">Monthly generation</div>
                <div className="font-bold text-primary text-lg">~{sizing.monthlyUnits} units</div>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <Wallet className="h-5 w-5 text-secondary" />
                <div className="mt-2 text-sm text-muted-foreground">Monthly savings</div>
                <div className="font-bold text-primary text-lg">~₹{sizing.monthlySaving.toLocaleString("en-IN")}</div>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <Zap className="h-5 w-5 text-primary" />
                <div className="mt-2 text-sm text-muted-foreground">Suitable for</div>
                <div className="font-bold text-primary text-lg">{sizing.label}</div>
              </div>
            </div>

            <Button asChild className="mt-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg">
              <a href="#quote">Get Exact Sizing <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </Card>
        </div>
      </section>

      {/* SUITABILITY CHECK */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Quick Check</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Is Your Home Suitable?</h2>
            <p className="mt-3 text-muted-foreground">Tick what applies to you.</p>
          </div>

          <Card className="mt-8 p-6 md:p-8 border-border/60">
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { k: "roof" as const, t: "Rooftop available", d: "Terrace or sloped roof with open space." },
                { k: "shadow" as const, t: "Minimal shadow", d: "Roof gets sun for most of the day." },
                { k: "usage" as const, t: "Regular electricity usage", d: "Monthly bill above ₹2,000." },
              ].map((item) => {
                const active = check[item.k];
                return (
                  <button
                    key={item.k}
                    onClick={() => setCheck({ ...check, [item.k]: !active })}
                    className={`text-left rounded-xl border p-4 transition-all ${active ? "border-secondary bg-secondary/5" : "border-border bg-background hover:border-primary/40"}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-5 w-5 rounded border flex items-center justify-center ${active ? "bg-secondary border-secondary" : "border-border"}`}>
                        {active && <CheckCircle2 className="h-4 w-4 text-secondary-foreground" />}
                      </div>
                      <div className="font-semibold text-primary text-sm">{item.t}</div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.d}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl p-4 border border-border bg-muted/40 flex items-start gap-3">
              {score === 3 ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <div className="font-semibold text-primary">Your home is suitable for solar 🎉</div>
                    <div className="text-sm text-muted-foreground">Let's design the right system for you.</div>
                  </div>
                </>
              ) : score >= 1 ? (
                <>
                  <Sparkles className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="font-semibold text-primary">Likely suitable — let's confirm with a free site visit</div>
                    <div className="text-sm text-muted-foreground">We'll check shadow, roof and load on-site.</div>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-semibold text-primary">Tick the boxes that apply to you</div>
                    <div className="text-sm text-muted-foreground">We'll show your suitability instantly.</div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Process</span>
            <h2 className="mt-2 text-3xl md:text-4xl">How It Works</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-4 gap-4 relative">
            {process.map((s, i) => (
              <div key={s.title} className="relative">
                <Card className="p-5 h-full card-lift border-border/60">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-bold text-accent">0{i + 1}</div>
                  </div>
                  <div className="mt-3 font-semibold text-primary">{s.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
                </Card>
                {i < process.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Real Work</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Residential Installations</h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {works.map((w, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <button className="group rounded-xl overflow-hidden aspect-square relative shadow-card hover:shadow-elevated transition-all">
                    <img src={w.src} alt={w.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/0 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-xs font-semibold text-primary-foreground bg-primary/60 backdrop-blur px-2 py-1 rounded">
                      {w.caption}
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                  <img src={w.src} alt={w.alt} className="w-full h-auto" />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* COST + WHY SELSIFY */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-8">
          <Card className="p-7 md:p-9 border-secondary/30 bg-background">
            <span className="eyebrow">Estimated Cost</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Transparent Pricing</h2>
            <div className="mt-6 flex items-baseline gap-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">₹45K</div>
              <div className="text-lg text-muted-foreground">– ₹55K / kW</div>
            </div>
            <div className="text-sm text-muted-foreground">Per kW installed cost (before subsidy)</div>
            <ul className="mt-6 space-y-3">
              {[
                "Lower per-kW rate for larger systems",
                "Subsidy available for residential rooftop",
                "Final cost depends on usage & roof type",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-secondary" /> {p}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <a href="#quote">Get Exact Pricing <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </Card>

          <Card className="p-7 md:p-9 border-border/60">
            <span className="eyebrow">Why Selsify</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Built on Real Work</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {whySelsify.map((w) => (
                <div key={w.t} className="rounded-xl border border-border bg-muted/40 p-4">
                  <w.icon className="h-5 w-5 text-secondary" />
                  <div className="mt-2 font-semibold text-primary text-sm">{w.t}</div>
                  <div className="text-xs text-muted-foreground">{w.d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="quote" className="section">
        <div className="container mx-auto container-px">
          <Card className="p-8 md:p-12 border-border/60 text-center">
            <span className="eyebrow">Get Started</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Start Saving on Your Electricity Bills</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Get a customised solar solution for your home — sizing, pricing and timeline in one call.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${phone}`}><Phone className="mr-1 h-4 w-4" /> Call Now</a>
              </Button>
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <a href={wa} target="_blank" rel="noreferrer"><Send className="mr-1 h-4 w-4" /> Get Free Quote</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="mr-1 h-4 w-4" /> WhatsApp</a>
              </Button>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Quick response within 15–30 minutes
            </div>
          </Card>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
};

export default SolarForHome;
