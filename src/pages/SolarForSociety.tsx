import { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone, MessageCircle, ArrowRight, CheckCircle2, TrendingDown, Wallet,
  Building2, Wrench, Sun, Sparkles, Clock, Send, Zap, Shield, BadgeCheck,
  Search, PencilRuler, HardHat, PlugZap, AlertCircle, ArrowUpDown, Lightbulb,
  Droplets, Car, FileCheck, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";
import heroImg from "@/assets/society-solar-hero.jpg";
import work1 from "@/assets/install-1.jpeg";
import work2 from "@/assets/install-2.jpeg";
import work3 from "@/assets/install-3.jpeg";
import work4 from "@/assets/install-7.jpeg";

const phone = "+919892020515";
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27d%20like%20a%20proposal%20for%20Solar%20for%20our%20Housing%20Society";

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

const usageAreas = [
  { icon: ArrowUpDown, t: "Lift Operations", d: "Power lifts that run all day — one of the biggest common loads." },
  { icon: Lightbulb, t: "Common Area Lighting", d: "Lobbies, staircases, corridors and outdoor lights." },
  { icon: Droplets, t: "Water Pumps", d: "Daily borewell and overhead tank pumping consumes major units." },
  { icon: Car, t: "Parking & Security", d: "Basement lights, security cabin, CCTV systems." },
];

const process = [
  { icon: FileCheck, title: "Society Approval", desc: "We help with committee proposal & AGM material." },
  { icon: Search, title: "Site Evaluation", desc: "Free terrace survey, shadow & load analysis." },
  { icon: PencilRuler, title: "System Design", desc: "Custom-sized for your common-area load." },
  { icon: HardHat, title: "Installation", desc: "Clean, safe install with minimal disruption." },
];

const works = [
  { src: work1, alt: "Society rooftop solar Mumbai", caption: "30 kW · Mumbai" },
  { src: work2, alt: "Housing society solar Pune", caption: "50 kW · Pune" },
  { src: work3, alt: "Society solar plant Thane", caption: "75 kW · Thane" },
  { src: work4, alt: "Apartment complex solar", caption: "100 kW · Nashik" },
];

const benefits = [
  { icon: Wallet, t: "Lower Maintenance", d: "Cut common electricity by 60–90%." },
  { icon: TrendingDown, t: "Long-term Savings", d: "Predictable bills for 25+ years." },
  { icon: Building2, t: "Better Terrace Use", d: "Convert idle terrace into a saving asset." },
  { icon: BadgeCheck, t: "Higher Property Value", d: "Solar-ready societies attract buyers." },
];

const whySelsify = [
  { icon: Users, t: "Society Project Experience", d: "We've handled committee approvals end-to-end." },
  { icon: Sparkles, t: "Clean Installation", d: "Neat cabling, safe mounting, tidy finish." },
  { icon: Wallet, t: "Transparent Pricing", d: "Itemised quote — no hidden charges." },
  { icon: Shield, t: "Approval Support", d: "We help you present to the committee." },
];

/* ---------- Page ---------- */
const SolarForSociety = () => {
  useEffect(() => {
    document.title = "Solar for Housing Societies | Selsify";
    const desc = "Cut common electricity costs for your housing society with rooftop solar. Free proposal, savings calculator and committee support by Selsify.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", desc);
    let l = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!l) { l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); }
    l.href = window.location.href;
  }, []);

  /* Toggle */
  const [after, setAfter] = useState(false);

  /* Calculator */
  const [flats, setFlats] = useState([60]);
  const [bill, setBill] = useState("40000");
  const calc = useMemo(() => {
    const monthly = Math.max(0, Number(bill) || 0);
    const f = flats[0];
    // Estimate kW required: ~80% offset of monthly bill at ₹9/unit, 120 units/kW/month
    const offsetUnits = (monthly * 0.85) / 9;
    const kw = Math.max(5, Math.min(500, Math.round(offsetUnits / 120)));
    const monthlySaving = Math.round(monthly * 0.85);
    const yearlySaving = monthlySaving * 12;
    const cost = kw * 48000;
    const paybackYears = cost > 0 && yearlySaving > 0 ? (cost / yearlySaving) : 0;
    const perFlatYearly = f > 0 ? Math.round(yearlySaving / f) : 0;
    return { kw, monthlySaving, yearlySaving, cost, paybackYears, perFlatYearly, flats: f };
  }, [flats, bill]);

  /* Suitability */
  const [check, setCheck] = useState({ terrace: false, usage: false, approval: false });
  const score = Number(check.terrace) + Number(check.usage) + Number(check.approval);

  const heroReveal = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-muted/40 border-b border-border">
        <div className="container mx-auto container-px py-12 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div ref={heroReveal.ref} className={`transition-all duration-700 ${heroReveal.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="eyebrow">Housing Societies · Rooftop Solar</span>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl leading-tight">
              Solar for <span className="text-accent">Housing Societies</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              Reduce common electricity costs and lower maintenance expenses with rooftop solar.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { i: Wallet, t: "Lower maintenance" },
                { i: Users, t: "Shared savings" },
                { i: Zap, t: "Efficient energy" },
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
                <a href="#calculator">Get Free Consultation <ArrowRight className="ml-1 h-4 w-4" /></a>
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
              <img src={heroImg} alt="Housing society with rooftop solar installation" width={1280} height={1024} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-elevated">
              <div className="text-xs uppercase tracking-wider opacity-90">Common-area savings</div>
              <div className="text-lg font-bold">Up to 90%</div>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">The Shift</span>
            <h2 className="mt-2 text-3xl md:text-4xl">High Society Electricity Costs?</h2>
            <p className="mt-3 text-muted-foreground">See how solar changes the picture for your committee.</p>
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
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 text-accent" /> Rising maintenance charges every year</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 text-accent" /> Heavy common-area electricity burden</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 text-accent" /> Idle, unused terrace space</li>
              </ul>
            </Card>
            <Card className={`p-6 transition-all ${after ? "border-secondary/50 shadow-card" : "border-border/60 opacity-60"}`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-secondary">After</div>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-secondary" /> 60–90% reduction in common bills</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-secondary" /> Direct savings shared by all flats</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-secondary" /> Productive use of terrace</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* WHERE SOLAR IS USED */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Use Cases</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Where Solar Works in a Society</h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {usageAreas.map((b) => (
              <Card key={b.t} className="p-5 group card-lift border-border/60">
                <div className="h-11 w-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <b.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold text-primary">{b.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{b.d}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SAVINGS CALCULATOR */}
      <section id="calculator" className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Savings Calculator</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Estimate Society Savings</h2>
            <p className="mt-3 text-muted-foreground">Enter your numbers — see savings instantly.</p>
          </div>

          <Card className="mt-8 p-6 md:p-9 border-border/60">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm">
                    <label className="font-semibold text-primary">Number of flats</label>
                    <span className="font-bold text-primary">{flats[0]}</span>
                  </div>
                  <Slider value={flats} onValueChange={setFlats} min={10} max={300} step={5} className="mt-3" />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>10</span><span>150</span><span>300</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-primary">Monthly common electricity bill (₹)</label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={bill}
                    onChange={(e) => setBill(e.target.value.slice(0, 7))}
                    placeholder="e.g. 40000"
                    className="mt-2"
                    min={0}
                  />
                  <div className="mt-1 text-xs text-muted-foreground">Average for mid-size societies: ₹25,000–₹80,000</div>
                </div>

                <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg">
                  <a href={wa} target="_blank" rel="noreferrer">
                    Get Detailed Proposal <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Outputs */}
              <div className="rounded-2xl bg-muted/40 border border-border p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-secondary">Estimated for your society</div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Recommended system</div>
                    <div className="text-2xl font-bold text-primary">{calc.kw} kW</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Project cost</div>
                    <div className="text-2xl font-bold text-primary">₹{(calc.cost / 100000).toFixed(1)}L</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Monthly savings</div>
                    <div className="text-2xl font-bold text-secondary">₹{calc.monthlySaving.toLocaleString("en-IN")}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Yearly savings</div>
                    <div className="text-2xl font-bold text-secondary">₹{(calc.yearlySaving / 100000).toFixed(1)}L</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Payback period</div>
                    <div className="text-2xl font-bold text-primary">{calc.paybackYears ? calc.paybackYears.toFixed(1) : "-"} yrs</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Per flat / year</div>
                    <div className="text-2xl font-bold text-primary">₹{calc.perFlatYearly.toLocaleString("en-IN")}</div>
                  </div>
                </div>
                <div className="mt-5 text-xs text-muted-foreground">
                  Indicative estimate. Final design depends on terrace area, shadow and committee preferences.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SYSTEM TYPE */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Recommendation</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Best System for Societies</h2>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <Card className="p-7 border-secondary/50 bg-background relative">
              <div className="absolute -top-3 left-6 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Recommended
              </div>
              <Zap className="h-7 w-7 text-secondary" />
              <h3 className="mt-3 text-2xl">On-Grid Solar</h3>
              <p className="mt-2 text-muted-foreground text-sm">Best for societies with reliable grid power — maximum savings, no batteries.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["No battery cost or replacement", "Net-meter credits for excess power", "Lower per-kW cost", "Continuous, reliable usage"].map((p) => (
                  <li key={p} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> {p}</li>
                ))}
              </ul>
              <Button asChild className="mt-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <a href="/solar-solutions/on-grid">Learn more <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
            </Card>

            <Card className="p-7 border-border/60">
              <Shield className="h-7 w-7 text-primary" />
              <h3 className="mt-3 text-2xl">Hybrid Solar (Optional)</h3>
              <p className="mt-2 text-muted-foreground text-sm">If your society needs backup for lifts, pumps or security during outages.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Battery backup for critical loads", "Higher upfront cost", "Useful in outage-prone areas", "Savings + power security"].map((p) => (
                  <li key={p} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> {p}</li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-6">
                <a href="/solar-solutions/hybrid">Learn more <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
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

      {/* SUITABILITY */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Quick Check</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Is Your Society Suitable?</h2>
          </div>

          <Card className="mt-8 p-6 md:p-8 border-border/60">
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { k: "terrace" as const, t: "Terrace space available", d: "Open terrace area without water tanks covering it." },
                { k: "usage" as const, t: "Regular common usage", d: "Lifts, pumps, lights running daily." },
                { k: "approval" as const, t: "Committee approval possible", d: "Active committee open to proposals." },
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
                    <div className="font-semibold text-primary">Your society is suitable for solar 🎉</div>
                    <div className="text-sm text-muted-foreground">We'll prepare a committee-ready proposal for you.</div>
                  </div>
                </>
              ) : score >= 1 ? (
                <>
                  <Sparkles className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="font-semibold text-primary">Likely suitable — let's confirm with a free site visit</div>
                    <div className="text-sm text-muted-foreground">We'll evaluate your terrace and load profile.</div>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-semibold text-primary">Tick what applies to your society</div>
                    <div className="text-sm text-muted-foreground">We'll tell you instantly if you're a fit.</div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Real Work</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Society Installations</h2>
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

      {/* BENEFITS */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Group Value</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Why Societies Choose Solar</h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <Card key={b.t} className="p-5 card-lift border-border/60">
                <div className="h-11 w-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                  <b.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold text-primary">{b.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{b.d}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DECISION SUPPORT */}
      <section className="section">
        <div className="container mx-auto container-px">
          <Card className="p-7 md:p-10 border-secondary/30 bg-background">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="eyebrow">Committee Help</span>
                <h2 className="mt-2 text-3xl md:text-4xl">Planning to Propose Solar to Your Society?</h2>
                <p className="mt-3 text-muted-foreground">
                  We'll prepare a clean, simple proposal you can present in your AGM — savings estimate, payback, design and pricing in one document.
                </p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-sm">
                  {[
                    "Plain-language explanation",
                    "Visual savings summary",
                    "Per-flat benefit breakdown",
                    "Site & design plan",
                  ].map((p) => (
                    <li key={p} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> {p}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg">
                    <a href={wa} target="_blank" rel="noreferrer">Get proposal for your society <ArrowRight className="ml-1 h-4 w-4" /></a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={`tel:${phone}`}><Phone className="mr-1 h-4 w-4" /> Talk to expert</a>
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl bg-muted/40 border border-border p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-secondary">Committee snapshot</div>
                <div className="mt-3 space-y-3 text-sm">
                  {[
                    { t: "Reduced common bills", v: "60–90%" },
                    { t: "Typical payback", v: "4–5 years" },
                    { t: "System life", v: "25+ years" },
                    { t: "Maintenance", v: "Minimal" },
                  ].map((r) => (
                    <div key={r.t} className="flex justify-between border-b border-border pb-2 last:border-0">
                      <span className="text-muted-foreground">{r.t}</span>
                      <span className="font-semibold text-primary">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* WHY SELSIFY */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Selsify</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Why Choose Selsify</h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whySelsify.map((w) => (
              <Card key={w.t} className="p-5 border-border/60 card-lift">
                <w.icon className="h-6 w-6 text-secondary" />
                <div className="mt-3 font-semibold text-primary">{w.t}</div>
                <div className="text-sm text-muted-foreground">{w.d}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container mx-auto container-px">
          <Card className="p-8 md:p-12 border-border/60 text-center">
            <span className="eyebrow">Get Started</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Reduce Your Society Maintenance Costs</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Get a customised solar plan for your society — sizing, savings and committee proposal in one call.
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

export default SolarForSociety;
