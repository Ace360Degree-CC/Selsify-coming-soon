import { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone, MessageCircle, ArrowRight, CheckCircle2, TrendingDown, Wallet,
  Factory, Warehouse, Briefcase, Store, Sparkles, Clock, Send, Zap, Shield, BadgeCheck,
  Search, PencilRuler, HardHat, AlertCircle, LineChart, TrendingUp, Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";
import heroImg from "@/assets/commercial-solar-hero.jpg";
import work1 from "@/assets/install-1.jpeg";
import work2 from "@/assets/install-2.jpeg";
import work3 from "@/assets/install-3.jpeg";
import work4 from "@/assets/install-7.jpeg";

const phone = "+919892020515";
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27d%20like%20a%20proposal%20for%20Commercial%20%2F%20Industrial%20Solar";

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

const sectors = [
  { icon: Factory, t: "Factories", d: "High day-time loads — solar matches production hours perfectly." },
  { icon: Warehouse, t: "Warehouses", d: "Massive rooftops monetised into a productive energy asset." },
  { icon: Briefcase, t: "Offices", d: "Cut HVAC and lighting costs — improve operating margin." },
  { icon: Store, t: "Retail Spaces", d: "Stable energy bills protect margin from tariff hikes." },
];

const process = [
  { icon: Search, title: "Site Audit", desc: "Load profile, rooftop and shadow analysis." },
  { icon: PencilRuler, title: "ROI-led Design", desc: "System sized to maximise your savings & ROI." },
  { icon: HardHat, title: "Execution", desc: "Safe, certified installation by trained teams." },
  { icon: Gauge, title: "Performance Support", desc: "Monitoring & on-call support post commissioning." },
];

const works = [
  { src: work1, alt: "Industrial rooftop solar", caption: "150 kW · MIDC" },
  { src: work2, alt: "Factory solar plant", caption: "300 kW · Pune" },
  { src: work3, alt: "Warehouse solar setup", caption: "500 kW · Bhiwandi" },
  { src: work4, alt: "Commercial solar Maharashtra", caption: "200 kW · Nashik" },
];

const benefits = [
  { icon: Wallet, t: "Cost Savings", d: "Cut energy spend by 50–80% from year one." },
  { icon: TrendingUp, t: "Faster ROI", d: "Typical payback in 3–5 years." },
  { icon: TrendingDown, t: "Reduced OPEX", d: "Lower fixed monthly outflow." },
  { icon: Shield, t: "Price Stability", d: "Hedge against future tariff hikes." },
];

const whySelsify = [
  { icon: BadgeCheck, t: "Practical System Design", d: "Engineered for your load profile, not over-sized." },
  { icon: Sparkles, t: "Efficient Execution", d: "On-time delivery with safety compliance." },
  { icon: Wallet, t: "Transparent Pricing", d: "Itemised commercial proposal." },
  { icon: Shield, t: "After-sales Support", d: "Dedicated account manager." },
];

/* ---------- Page ---------- */
const SolarForCommercial = () => {
  useEffect(() => {
    document.title = "Commercial & Industrial Solar | Selsify";
    const desc = "Reduce business operating costs with commercial & industrial rooftop solar. ROI calculator, custom design and execution by Selsify.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", desc);
    let l = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!l) { l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); }
    l.href = window.location.href;
  }, []);

  /* Toggle */
  const [withSolar, setWithSolar] = useState(false);

  /* ROI Calculator */
  const [bill, setBill] = useState("150000");
  const [bizType, setBizType] = useState<"factory" | "warehouse" | "office" | "retail">("factory");
  const offsetByType = { factory: 0.8, warehouse: 0.85, office: 0.7, retail: 0.65 } as const;

  const roi = useMemo(() => {
    const monthly = Math.max(0, Number(bill) || 0);
    const offset = offsetByType[bizType];
    // Tariff approx ₹9/unit, 120 units/kW/month
    const offsetUnits = (monthly * offset) / 9;
    const kw = Math.max(10, Math.min(2000, Math.round(offsetUnits / 120)));
    // Per-kW cost reduces with size
    const perKw = kw >= 100 ? 42000 : kw >= 50 ? 45000 : 48000;
    const cost = kw * perKw;
    const monthlySaving = Math.round(monthly * offset);
    const yearlySaving = monthlySaving * 12;
    const paybackYears = cost > 0 && yearlySaving > 0 ? cost / yearlySaving : 0;
    const lifetime = yearlySaving * 25;
    const roiPct = cost > 0 ? Math.round((lifetime / cost) * 100) : 0;
    return { kw, cost, perKw, monthlySaving, yearlySaving, paybackYears, lifetime, roiPct };
  }, [bill, bizType]);

  /* ROI Graph data — 25 years */
  const graphData = useMemo(() => {
    const years = 15;
    const points: { y: number; cum: number }[] = [];
    let cum = 0;
    for (let y = 1; y <= years; y++) {
      cum += roi.yearlySaving;
      points.push({ y, cum });
    }
    const max = Math.max(roi.cost, points[points.length - 1]?.cum || 1);
    return { years, points, max };
  }, [roi]);

  /* Suitability */
  const [check, setCheck] = useState({ daytime: false, roof: false, bills: false });
  const score = Number(check.daytime) + Number(check.roof) + Number(check.bills);

  const heroReveal = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-muted/40 border-b border-border">
        <div className="container mx-auto container-px py-12 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div ref={heroReveal.ref} className={`transition-all duration-700 ${heroReveal.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="eyebrow">Commercial & Industrial</span>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl leading-tight">
              Solar for <span className="text-accent">Commercial & Industrial</span> Use
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              Reduce operational costs and improve business efficiency with solar.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { i: TrendingDown, t: "Lower costs" },
                { i: TrendingUp, t: "Better margins" },
                { i: Wallet, t: "Long-term savings" },
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
                <a href="#roi">Get Free Consultation <ArrowRight className="ml-1 h-4 w-4" /></a>
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
              <img src={heroImg} alt="Industrial rooftop solar installation" width={1280} height={1024} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-elevated">
              <div className="text-xs uppercase tracking-wider opacity-90">Typical payback</div>
              <div className="text-lg font-bold">3–5 years</div>
            </div>
          </div>
        </div>
      </section>

      {/* COST PROBLEM */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Business Impact</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Rising Electricity Costs Impacting Your Business?</h2>
            <p className="mt-3 text-muted-foreground">Compare your current situation with a solar-powered operation.</p>
          </div>

          <div className="mt-8 inline-flex p-1 rounded-full border border-border bg-muted">
            <button
              onClick={() => setWithSolar(false)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${!withSolar ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}
            >
              Current Situation
            </button>
            <button
              onClick={() => setWithSolar(true)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${withSolar ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              With Solar
            </button>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5">
            <Card className={`p-6 transition-all ${!withSolar ? "border-accent/40" : "border-border/60 opacity-60"}`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">Current</div>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 text-accent" /> Heavy monthly electricity outflow</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 text-accent" /> Tariffs increasing 6–9% every year</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 text-accent" /> Margins squeezed by rising OPEX</li>
              </ul>
            </Card>
            <Card className={`p-6 transition-all ${withSolar ? "border-secondary/50 shadow-card" : "border-border/60 opacity-60"}`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-secondary">With Solar</div>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-secondary" /> 50–80% reduction in energy spend</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-secondary" /> Stable, predictable energy cost</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-secondary" /> Improved margins & cash flow</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* WHERE IT WORKS */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Sectors</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Where Solar Works Best</h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sectors.map((b) => (
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

      {/* ROI CALCULATOR */}
      <section id="roi" className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">ROI Calculator</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Calculate Your Savings</h2>
            <p className="mt-3 text-muted-foreground">Enter your bill and business type — see ROI instantly.</p>
          </div>

          <Card className="mt-8 p-6 md:p-9 border-border/60">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-primary">Monthly electricity bill (₹)</label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={bill}
                    onChange={(e) => setBill(e.target.value.slice(0, 8))}
                    placeholder="e.g. 150000"
                    className="mt-2"
                    min={0}
                  />
                  <div className="mt-1 text-xs text-muted-foreground">Typical commercial: ₹50K–₹10L per month</div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-primary">Business type</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {([
                      { k: "factory", t: "Factory", icon: Factory },
                      { k: "warehouse", t: "Warehouse", icon: Warehouse },
                      { k: "office", t: "Office", icon: Briefcase },
                      { k: "retail", t: "Retail", icon: Store },
                    ] as const).map((o) => {
                      const active = bizType === o.k;
                      return (
                        <button
                          key={o.k}
                          onClick={() => setBizType(o.k)}
                          className={`flex items-center gap-2 rounded-md border px-3 py-2.5 text-sm font-semibold transition-all ${
                            active ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          <o.icon className="h-4 w-4" /> {o.t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg">
                  <a href={wa} target="_blank" rel="noreferrer">
                    Get Detailed Proposal <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Outputs */}
              <div className="rounded-2xl bg-muted/40 border border-border p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-secondary">Estimated for your business</div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Recommended system</div>
                    <div className="text-2xl font-bold text-primary">{roi.kw} kW</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Project cost</div>
                    <div className="text-2xl font-bold text-primary">₹{(roi.cost / 100000).toFixed(1)}L</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Monthly savings</div>
                    <div className="text-2xl font-bold text-secondary">₹{roi.monthlySaving.toLocaleString("en-IN")}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Yearly savings</div>
                    <div className="text-2xl font-bold text-secondary">₹{(roi.yearlySaving / 100000).toFixed(1)}L</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Payback period</div>
                    <div className="text-2xl font-bold text-primary">{roi.paybackYears ? roi.paybackYears.toFixed(1) : "-"} yrs</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">25-yr lifetime ROI</div>
                    <div className="text-2xl font-bold text-primary">{roi.roiPct}%</div>
                  </div>
                </div>
                <div className="mt-5 text-xs text-muted-foreground">
                  Indicative estimate. Final design depends on rooftop, load profile and tariff structure.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Businesses Switch</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Why Businesses Choose Solar</h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <Card key={b.t} className="p-5 group card-lift border-border/60">
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

      {/* SYSTEM TYPE */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Recommendation</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Best System for Commercial Use</h2>
          </div>
          <Card className="mt-8 p-7 md:p-9 border-secondary/40 bg-background relative">
            <div className="absolute -top-3 left-6 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Recommended
            </div>
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <Zap className="h-7 w-7 text-secondary" />
                <h3 className="mt-3 text-2xl">On-Grid Solar</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  Maximum efficiency, lowest per-kW cost and best ROI for businesses with day-time loads. Perfect for factories, warehouses, offices and retail.
                </p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-sm">
                  {["High efficiency, no battery loss", "Lower per-kW cost at scale", "Net-meter benefits", "Maximum savings"].map((p) => (
                    <li key={p} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> {p}</li>
                  ))}
                </ul>
                <div className="mt-4 text-xs text-muted-foreground">Note: Larger systems (100+ kW) reduce per-kW cost significantly.</div>
              </div>
              <div className="rounded-xl bg-muted/40 border border-border p-5 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Per kW (100+ kW)</div>
                <div className="mt-1 text-3xl font-bold text-primary">₹42K</div>
                <div className="text-xs text-muted-foreground">Lower with scale</div>
                <Button asChild size="sm" className="mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full">
                  <a href="/solar-solutions/on-grid">Learn more</a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ROI GRAPH */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">ROI Visual</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Return on Investment</h2>
            <p className="mt-3 text-muted-foreground">Cumulative savings vs your one-time investment over 15 years.</p>
          </div>

          <Card className="mt-8 p-6 md:p-9 border-border/60">
            <div className="flex items-center gap-6 text-xs flex-wrap">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-primary inline-block" /> Investment (₹{(roi.cost / 100000).toFixed(1)}L)</div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-secondary inline-block" /> Cumulative savings</div>
              <div className="ml-auto inline-flex items-center gap-1 text-secondary font-semibold">
                <LineChart className="h-4 w-4" /> Payback in ~{roi.paybackYears.toFixed(1)} years
              </div>
            </div>

            <div className="mt-6">
              <svg viewBox="0 0 600 220" className="w-full h-56">
                {/* grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line key={i} x1="40" x2="590" y1={20 + i * 40} y2={20 + i * 40} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                ))}
                {/* investment line */}
                {(() => {
                  const yInv = 180 - (roi.cost / graphData.max) * 160;
                  return <line x1="40" x2="590" y1={yInv} y2={yInv} stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 4" />;
                })()}
                {/* savings area */}
                <polyline
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  points={graphData.points
                    .map((p, i) => {
                      const x = 40 + (i / (graphData.points.length - 1)) * 550;
                      const y = 180 - (p.cum / graphData.max) * 160;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
                {/* dots */}
                {graphData.points.map((p, i) => {
                  const x = 40 + (i / (graphData.points.length - 1)) * 550;
                  const y = 180 - (p.cum / graphData.max) * 160;
                  return <circle key={i} cx={x} cy={y} r="3" fill="hsl(var(--secondary))" />;
                })}
                {/* x labels */}
                {[1, 5, 10, 15].map((y) => {
                  const x = 40 + ((y - 1) / 14) * 550;
                  return (
                    <text key={y} x={x} y="205" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                      Yr {y}
                    </text>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground">Year 5 savings</div>
                <div className="font-bold text-primary">₹{((roi.yearlySaving * 5) / 100000).toFixed(1)}L</div>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground">Year 10 savings</div>
                <div className="font-bold text-primary">₹{((roi.yearlySaving * 10) / 100000).toFixed(1)}L</div>
              </div>
              <div className="rounded-lg bg-secondary/10 p-3">
                <div className="text-xs text-muted-foreground">Lifetime (25 yrs)</div>
                <div className="font-bold text-secondary">₹{(roi.lifetime / 10000000).toFixed(2)} Cr</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SUITABILITY */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Quick Check</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Is Your Business Suitable?</h2>
          </div>

          <Card className="mt-8 p-6 md:p-8 border-border/60">
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { k: "daytime" as const, t: "Day-time electricity usage", d: "Operations run mostly between 8 AM – 6 PM." },
                { k: "roof" as const, t: "Large rooftop area", d: "5,000+ sq ft of unshaded roof or shed." },
                { k: "bills" as const, t: "High monthly bills", d: "Electricity bill above ₹50,000 per month." },
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
                    <div className="font-semibold text-primary">Your business is ideal for solar 🎉</div>
                    <div className="text-sm text-muted-foreground">Expect the strongest ROI and shortest payback.</div>
                  </div>
                </>
              ) : score >= 1 ? (
                <>
                  <Sparkles className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="font-semibold text-primary">Likely suitable — let's do a free site audit</div>
                    <div className="text-sm text-muted-foreground">We'll confirm load, roof and tariff fit.</div>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-semibold text-primary">Tick what applies to your business</div>
                    <div className="text-sm text-muted-foreground">We'll show suitability instantly.</div>
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
            <h2 className="mt-2 text-3xl md:text-4xl">How We Deliver</h2>
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
            <h2 className="mt-2 text-3xl md:text-4xl">Commercial Installations</h2>
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

      {/* DECISION SUPPORT + WHY SELSIFY */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-8">
          <Card className="p-7 md:p-9 border-secondary/30 bg-background">
            <span className="eyebrow">Smart Decision</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Why Solar is a Smart Business Decision</h2>
            <p className="mt-4 text-muted-foreground">
              Solar moves a recurring monthly expense into a one-time capital asset. It improves margins, removes long-term tariff risk and gives you control over a key operating cost — for 25+ years.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="text-xs text-muted-foreground">Margin lift</div>
                <div className="font-bold text-secondary text-lg">+5–12%</div>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="text-xs text-muted-foreground">Payback</div>
                <div className="font-bold text-primary text-lg">3–5 yrs</div>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="text-xs text-muted-foreground">System life</div>
                <div className="font-bold text-primary text-lg">25+ yrs</div>
              </div>
            </div>
          </Card>

          <Card className="p-7 md:p-9 border-border/60">
            <span className="eyebrow">Why Selsify</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Built for Business</h2>
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
      <section className="section">
        <div className="container mx-auto container-px">
          <Card className="p-8 md:p-12 border-border/60 text-center">
            <span className="eyebrow">Get Started</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Looking to Reduce Business Costs?</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Get a solar solution designed for your operations — sizing, ROI and timeline in one call.
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

export default SolarForCommercial;
