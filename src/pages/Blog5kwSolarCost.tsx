import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";
import TopBar from "@/components/site/TopBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  TrendingUp,
  Zap,
  Wrench,
  Cable,
  HardHat,
  Sun,
  IndianRupee,
  ArrowRight,
  Home,
  AlertTriangle,
  ShieldCheck,
  Eye,
} from "lucide-react";
import hero from "@/assets/blog-5kw-hero.jpg";

const WHATSAPP = "https://wa.me/919892020515?text=I%20want%20to%20know%20my%20exact%205kW%20solar%20cost";
const PHONE = "tel:+919892020515";

const components = [
  { icon: Sun, name: "Solar Panels (10–12 panels)", share: 50, desc: "Around 10–12 panels of 450–550 W. The biggest cost driver — Tier-1 mono PERC or N-type TOPCon panels." },
  { icon: Zap, name: "5 kW Inverter", share: 15, desc: "String or hybrid inverter sized for 5 kW. Brands like Growatt, Sungrow or Deye are popular for homes." },
  { icon: Wrench, name: "Mounting Structure", share: 12, desc: "Galvanised iron or aluminium frame designed for high wind loads and a 25-year service life." },
  { icon: Cable, name: "Wiring & Safety", share: 10, desc: "DC/AC cables, MC4 connectors, surge protection, earthing and lightning arrestors — small line items, big safety impact." },
  { icon: HardHat, name: "Installation & Net Metering", share: 13, desc: "Skilled labour, transport, scaffolding, DISCOM paperwork and net-meter approvals." },
];

const reasons = [
  {
    icon: Home,
    title: "Ideal for Urban Homes",
    short: "Fits 3–4 BHK homes with ₹4K–₹8K bills.",
    long: "A 5 kW system generates roughly 600–650 units per month — enough to offset the bill of most urban homes running ACs, fridge, lights and appliances daily.",
  },
  {
    icon: TrendingUp,
    title: "Balanced Cost vs Savings",
    short: "Best ₹/kWh ratio for homes.",
    long: "Smaller systems (1–3 kW) have higher per-kW cost. 5 kW hits the sweet spot — strong volume discounts on panels and inverters without overshooting your usage.",
  },
  {
    icon: Sun,
    title: "Fits Most Rooftops",
    short: "Needs ~300–350 sq.ft of shadow-free roof.",
    long: "Most independent homes, row houses and bungalows already have this much usable rooftop. No structural changes typically required.",
  },
];

const Blog5kwSolarCost = () => {
  const [bill, setBill] = useState<number[]>([6000]);
  const [subsidy, setSubsidy] = useState<"With Subsidy" | "Without Subsidy">("Without Subsidy");
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [check, setCheck] = useState({ bill: false, usage: false, roof: false });

  useEffect(() => {
    document.title = "5kW Solar System Cost in India 2026 | Price, Savings & ROI – Selsify";
    const meta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    meta(
      "description",
      "5kW solar system cost in India (2026): real pricing ₹2.5–3.2 lakh, monthly savings, payback period and whether 5kW is right for your home. Practical guide by Selsify."
    );
    meta(
      "keywords",
      "5kW solar system cost in India, 5kW solar price, rooftop solar 5kW price, solar system for home India, 5 kw solar panel price"
    );
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", window.location.origin + "/blog/5kw-solar-system-cost-india");
  }, []);

  // Savings calculator
  const savings = useMemo(() => {
    const monthly = Math.min(Math.round(bill[0] * 0.85), 6500);
    const annual = monthly * 12;
    // Approx investment
    const invest = subsidy === "With Subsidy" ? 215000 : 285000;
    const paybackYears = +(invest / annual).toFixed(1);
    return { monthly, annual, paybackYears, invest };
  }, [bill, subsidy]);

  const verdict = useMemo(() => {
    const score = Number(check.bill) + Number(check.usage) + Number(check.roof);
    if (score === 0) return null;
    if (score === 3) return { ok: true, msg: "5kW is a great fit for your home — strong savings and quick payback." };
    if (check.bill && !check.roof) return { ok: false, msg: "5kW suits your bill, but limited roof space — consider high-watt panels or a 3kW system." };
    if (!check.bill && check.usage) return { ok: false, msg: "Your usage is moderate — a 3kW system may be more cost-effective." };
    return { ok: true, msg: "5kW could work — book a free site survey to confirm system size." };
  }, [check]);

  const subsidyData = {
    "With Subsidy": {
      cost: "₹3.2L upfront, ₹78,000 back",
      time: "60 – 120 days",
      flex: "DISCOM-empanelled brands & sizes only",
    },
    "Without Subsidy": {
      cost: "₹2.5L – ₹3.2L (final price)",
      time: "10 – 20 days",
      flex: "Any panel/inverter brand, custom design",
    },
  } as const;

  const mistakes = [
    {
      icon: IndianRupee,
      title: "Only Comparing Price",
      desc: "Two ₹2.7L quotes can be wildly different — one uses Tier-1 panels & a 10-year inverter warranty, the other doesn't.",
    },
    {
      icon: HardHat,
      title: "Ignoring Installation Quality",
      desc: "Bad mounting, undersized cables and shoddy earthing reduce generation by 15–25% — and shorten panel life.",
    },
    {
      icon: ShieldCheck,
      title: "Not Checking After-Sales",
      desc: "Solar is a 25-year asset. Ask who services your system in year 7, year 12 and year 20 — before you buy.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-b from-surface-soft to-background border-b border-border">
        <div className="container mx-auto container-px py-10 md:py-16 max-w-4xl">
          <nav className="text-xs text-muted-foreground mb-6 flex gap-2 items-center">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span>Blog</span>
            <span>/</span>
            <span className="text-foreground">5kW Solar System Cost in India</span>
          </nav>
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20" variant="outline">
            Pricing Guide · 2026
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
            5kW Solar System Cost in India: Is It the Right Investment for Your Home?
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            A practical guide to pricing, savings, and whether 5kW is the right system size for your home.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><User className="h-4 w-4" /> Selsify Editorial</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Updated April 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 9 min read</span>
          </div>
        </div>
        <div className="container mx-auto container-px max-w-5xl pb-10">
          <img
            src={hero}
            alt="5kW rooftop solar system installed on an Indian home"
            width={1600}
            height={900}
            className="w-full rounded-2xl shadow-elevated object-cover aspect-[16/9]"
          />
        </div>
      </section>

      {/* MAIN GRID */}
      <div className="container mx-auto container-px py-12 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* ARTICLE */}
          <article className="max-w-3xl">
            {/* INTRO */}
            <section className="prose-block">
              <p className="text-lg leading-relaxed text-foreground/90">
                If you've started exploring solar for your home, you've probably noticed that <strong>5kW</strong>
                {" "}comes up everywhere. It's the size most installers recommend, the size most subsidy
                calculators default to, and the size most homeowners eventually choose.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                There's a reason for that.{" "}
                <span className="bg-accent/10 px-1.5 py-0.5 rounded text-accent font-semibold">
                  5kW sits in the sweet spot between affordability and savings
                </span>
                {" "}— big enough to wipe out most of a typical home's bill, small enough to stay within a
                comfortable budget.
              </p>
            </section>

            {/* COST RANGE BOX */}
            <section className="mt-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">What Does a 5kW System Cost?</h2>
              <Card className="mt-5 p-6 md:p-8 border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                    <IndianRupee className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      ₹2.5L – ₹3.2L <span className="text-lg font-medium text-muted-foreground">all-inclusive</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Typical price for a fully installed 5kW residential rooftop system (non-subsidy route).
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Includes panels, inverter, structure, wiring, installation</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Net-metering & DISCOM paperwork covered</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> ₹78,000 subsidy available via PM Surya Ghar (eligible homes)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* WHY POPULAR */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Why 5kW is the Most Popular Choice</h2>
              <p className="mt-3 text-muted-foreground">Tap any card to see why.</p>
              <div className="mt-5 grid sm:grid-cols-3 gap-4">
                {reasons.map((r, i) => {
                  const Icon = r.icon;
                  const open = expanded === i;
                  return (
                    <Card
                      key={r.title}
                      onMouseEnter={() => setExpanded(i)}
                      onMouseLeave={() => setExpanded(null)}
                      onClick={() => setExpanded(open ? null : i)}
                      className={`p-5 cursor-pointer transition-all ${
                        open ? "border-secondary shadow-card -translate-y-1" : "hover:border-secondary/40"
                      }`}
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mt-4 font-semibold text-primary">{r.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{r.short}</p>
                      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="text-xs text-foreground/80 leading-relaxed border-t border-border pt-3">{r.long}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* COST BREAKDOWN */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">What Goes Into the Cost?</h2>
              <p className="mt-3 text-muted-foreground">Hover or tap each component to see what it does.</p>
              <div className="mt-6 space-y-3">
                {components.map((c, i) => {
                  const Icon = c.icon;
                  const active = hovered === i;
                  return (
                    <div
                      key={c.name}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setHovered(active ? null : i)}
                      className={`group cursor-pointer rounded-xl border p-4 transition-all ${
                        active ? "border-secondary bg-secondary/5 shadow-card" : "border-border bg-card hover:border-secondary/40"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center gap-3">
                            <span className="font-semibold text-foreground">{c.name}</span>
                            <span className="text-sm font-bold text-secondary">{c.share}%</span>
                          </div>
                          <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-500"
                              style={{ width: `${c.share}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={`grid transition-all duration-300 ${active ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="text-sm text-muted-foreground pl-14">{c.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SAVINGS CALCULATOR */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">How Much Can You Save?</h2>
              <p className="mt-3 text-muted-foreground">Drag the slider to match your monthly bill.</p>
              <Card className="mt-5 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Monthly Electricity Bill</div>
                    <div className="text-3xl font-bold text-primary mt-1">₹{bill[0].toLocaleString("en-IN")}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">5kW System</Badge>
                </div>
                <Slider
                  value={bill}
                  onValueChange={setBill}
                  min={2000}
                  max={12000}
                  step={500}
                  className="mt-6"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>₹2K</span>
                  <span>₹12K</span>
                </div>

                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-lg bg-secondary/5 border border-secondary/20 p-4">
                    <div className="text-xs text-muted-foreground">Monthly savings</div>
                    <div className="mt-1 text-2xl font-bold text-secondary">
                      ₹{savings.monthly.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <div className="text-xs text-muted-foreground">Annual savings</div>
                    <div className="mt-1 text-2xl font-bold text-primary">
                      ₹{savings.annual.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/40 border border-border p-4">
                    <div className="text-xs text-muted-foreground">Payback period</div>
                    <div className="mt-1 text-2xl font-bold text-primary">
                      {savings.paybackYears} yrs
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Estimates based on a 5kW system generating ~600 units/month at ₹8/unit. Actual savings depend on your DISCOM, roof orientation and usage.
                </p>
                <div className="mt-5">
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                      Get exact savings <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </section>

            {/* SUBSIDY */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Subsidy vs Faster Installation</h2>
              <p className="mt-3 text-muted-foreground">
                The PM Surya Ghar subsidy gives you up to ₹78,000 back — but it adds time and limits choice. Compare both routes:
              </p>
              <div className="mt-5 inline-flex rounded-xl border border-border bg-card p-1">
                {(["Without Subsidy", "With Subsidy"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setSubsidy(k)}
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                      subsidy === k ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
              <Card className="mt-4 p-6">
                <dl className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Cost</dt>
                    <dd className="mt-1 font-semibold text-primary">{subsidyData[subsidy].cost}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Timeline</dt>
                    <dd className="mt-1 font-semibold text-primary">{subsidyData[subsidy].time}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">Flexibility</dt>
                    <dd className="mt-1 font-semibold text-primary">{subsidyData[subsidy].flex}</dd>
                  </div>
                </dl>
              </Card>
            </section>

            {/* DECISION TOOL */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Is 5kW Enough for Your Home?</h2>
              <Card className="mt-5 p-6">
                <div className="space-y-3">
                  {[
                    { key: "bill", label: "My monthly electricity bill is ₹4,000 – ₹8,000" },
                    { key: "usage", label: "We run ACs, fridge and 2+ daily appliances" },
                    { key: "roof", label: "I have ~300+ sq.ft of unshaded rooftop" },
                  ].map((q) => (
                    <label key={q.key} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        checked={check[q.key as keyof typeof check]}
                        onCheckedChange={(v) =>
                          setCheck((s) => ({ ...s, [q.key]: Boolean(v) }))
                        }
                      />
                      <span className="text-sm text-foreground">{q.label}</span>
                    </label>
                  ))}
                </div>
                {verdict && (
                  <div className={`mt-5 p-4 rounded-lg border ${
                    verdict.ok ? "bg-secondary/10 border-secondary/30" : "bg-accent/10 border-accent/30"
                  }`}>
                    <div className={`text-xs font-semibold uppercase tracking-wider ${
                      verdict.ok ? "text-secondary" : "text-accent"
                    }`}>
                      {verdict.ok ? "Good fit" : "Tailor your size"}
                    </div>
                    <div className="mt-1 font-medium text-foreground">{verdict.msg}</div>
                  </div>
                )}
              </Card>
            </section>

            {/* COMMON MISTAKES */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">What Most People Overlook</h2>
              <p className="mt-3 text-muted-foreground">
                The three mistakes we see homeowners make again and again:
              </p>
              <div className="mt-5 grid md:grid-cols-3 gap-4">
                {mistakes.map((m) => {
                  const Icon = m.icon;
                  return (
                    <Card key={m.title} className="p-5">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="mt-4 font-semibold text-primary flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-accent" /> {m.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* INLINE CTA */}
            <section className="mt-12">
              <Card className="p-6 md:p-8 bg-gradient-to-br from-primary to-primary/85 text-primary-foreground border-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">Want to know your exact 5kW cost?</h3>
                    <p className="mt-1 text-primary-foreground/80 text-sm">
                      Free, no-pressure estimate based on your roof and bill.
                    </p>
                  </div>
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shrink-0">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                      Get Free Estimate <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </section>

            {/* ROI VISUAL */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Return on Investment</h2>
              <p className="mt-3 text-muted-foreground">
                A 5kW system pays for itself in <strong>3–5 years</strong>. After that, every unit is essentially free for the next 20+ years.
              </p>
              <Card className="mt-5 p-6">
                <div className="text-sm font-medium text-muted-foreground mb-3">Cumulative cash flow over 25 years</div>
                <div className="space-y-2.5">
                  {[
                    { label: "Year 1 — Investment", val: 100, color: "bg-destructive/70", amt: "−₹2.85 L" },
                    { label: "Year 5 — Break-even", val: 0, color: "bg-muted", amt: "₹0" },
                    { label: "Year 10 — In profit", val: 45, color: "bg-secondary/60", amt: "+₹3.5 L" },
                    { label: "Year 25 — Total returns", val: 100, color: "bg-secondary", amt: "+₹15 L" },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{r.label}</span>
                        <span className="font-semibold text-foreground">{r.amt}</span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${r.color} transition-all duration-700`} style={{ width: `${Math.max(r.val, 4)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-secondary font-semibold bg-secondary/10 px-3 py-2 rounded-full w-fit">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Break-even between year 3–5, then 20+ years of free power
                </div>
              </Card>
            </section>

            {/* FINAL THOUGHTS */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Final Thoughts</h2>
              <div className="mt-4 space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  A 5kW system is the right answer for most Indian homes — but only if it's the <strong>right
                  5kW system</strong>. The cheapest quote almost never wins over 25 years.
                </p>
                <p>
                  Ask about generation per kW, panel and inverter warranties, and the team that will service
                  your system a decade from now. That's where real value sits.
                </p>
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="mt-12">
              <Card className="p-8 md:p-10 text-center border-2 border-secondary/30 bg-gradient-to-br from-surface-soft to-background">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">Thinking of Installing a 5kW Solar System?</h2>
                <p className="mt-2 text-muted-foreground">
                  Get a customised 5kW design and quote for your home. No spam.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Link to="/contact">Get Free Quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={PHONE}><Phone className="mr-1 h-4 w-4" /> Call Now</a>
                  </Button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">⚡ Quick response within 15–30 minutes</p>
              </Card>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Related Reads</h3>
              <ul className="mt-4 space-y-4">
                {[
                  { t: "Solar Panel Price in India", to: "/blog/solar-panel-price-india" },
                  { t: "On-Grid vs Off-Grid Solar", to: "/solar-solutions/on-grid" },
                  { t: "Solar for Home", to: "/solar-solutions/home" },
                  { t: "Solar Installation in Mumbai", to: "/solar-installation/mumbai" },
                ].map((b) => (
                  <li key={b.t}>
                    <Link to={b.to} className="group flex items-start gap-2 text-sm text-foreground hover:text-secondary transition-colors">
                      <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground group-hover:text-secondary transition-colors" />
                      <span>{b.t}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary to-primary/85 text-primary-foreground border-0">
              <h3 className="text-lg font-bold">Get Free Consultation</h3>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Talk to a 5kW solar expert in 15 minutes.
              </p>
              <Button asChild className="mt-4 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp Now
                </a>
              </Button>
              <Button asChild variant="outline" className="mt-2 w-full bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href={PHONE}><Phone className="mr-1 h-4 w-4" /> Call Now</a>
              </Button>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">5kW Quick Facts</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li className="flex justify-between"><span className="text-muted-foreground">Cost</span><span className="font-semibold">₹2.5–3.2 L</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Generation</span><span className="font-semibold">~600 u/mo</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Roof needed</span><span className="font-semibold">~300 sq.ft</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Payback</span><span className="font-semibold">3–5 yrs</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Subsidy</span><span className="font-semibold">₹78,000</span></li>
              </ul>
            </Card>
          </aside>
        </div>
      </div>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
};

export default Blog5kwSolarCost;
