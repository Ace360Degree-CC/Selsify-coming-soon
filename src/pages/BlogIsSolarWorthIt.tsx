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
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Lock,
  Sun,
  Zap,
  AlertTriangle,
  Sparkles,
  IndianRupee,
} from "lucide-react";
import hero from "@/assets/blog-is-solar-worth-it-hero.jpg";

const WHATSAPP = "https://wa.me/919892020515?text=Is%20solar%20worth%20it%20for%20my%20home%3F";
const PHONE = "tel:+919892020515";

const valueCards = [
  {
    icon: Lock,
    title: "Predictable Costs",
    short: "Lock today's rate for 25 years.",
    long: "Once installed, your energy cost barely changes. No annual tariff hike surprises, no inflation creep on your biggest utility bill.",
  },
  {
    icon: ShieldCheck,
    title: "Protection from Price Rise",
    short: "DISCOM tariffs go up 4–6% every year.",
    long: "Over 25 years, that compounds to 3x your current bill. Solar shields you from that — every unit you self-generate stays free.",
  },
  {
    icon: Sun,
    title: "Energy Independence",
    short: "Your roof becomes your power plant.",
    long: "You stop being a passive consumer. With hybrid systems, you also gain backup against outages — a huge plus during summer load-shedding.",
  },
];

const reasons = [
  {
    icon: TrendingUp,
    title: "Rising Electricity Costs",
    desc: "DISCOM tariffs in India rose ~25% in the last 5 years. The trend is one-way.",
  },
  {
    icon: Zap,
    title: "Better Technology",
    desc: "Panel efficiency is up 30% in 6 years. Costs have dropped 40%+ in the same period.",
  },
  {
    icon: Sparkles,
    title: "Increased Awareness",
    desc: "PM Surya Ghar pushed solar mainstream. Net metering is now standard across most states.",
  },
];

const notIdeal = [
  {
    icon: IndianRupee,
    title: "Very Low Usage",
    desc: "If your monthly bill is under ₹1,500, payback stretches beyond 7 years. Wait until usage grows.",
  },
  {
    icon: Lock,
    title: "Limited Rooftop Space",
    desc: "Less than 100 sq.ft of usable roof? You can fit only 1–2 kW — generation may not justify the install.",
  },
  {
    icon: AlertTriangle,
    title: "Heavy Shadow",
    desc: "Tall trees, overhead tanks or neighbouring buildings cutting sun for 4+ hours kill output. Best to defer.",
  },
];

const BlogIsSolarWorthIt = () => {
  const [bill, setBill] = useState<number[]>([5000]);
  const [subsidy, setSubsidy] = useState<"With Subsidy" | "Without Subsidy">("Without Subsidy");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [check, setCheck] = useState({ usage: false, roof: false, design: false });

  useEffect(() => {
    document.title = "Is Solar Worth It in India 2026? Honest Cost & Savings Guide – Selsify";
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
      "Is solar worth it in India? Honest 2026 guide on real savings, payback, reliability and when solar makes sense — plus when it doesn't. By Selsify."
    );
    meta(
      "keywords",
      "is solar worth it in India, solar savings India, solar investment India, rooftop solar benefits, solar payback India"
    );
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", window.location.origin + "/blog/is-solar-worth-it-india");
  }, []);

  const savings = useMemo(() => {
    const monthly = Math.min(Math.round(bill[0] * 0.78), 7500);
    const annual = monthly * 12;
    const reduction = Math.min(80, Math.round((monthly / Math.max(bill[0], 1)) * 100));
    const lifetime = annual * 25;
    return { monthly, annual, reduction, lifetime };
  }, [bill]);

  const verdict = useMemo(() => {
    const score = Number(check.usage) + Number(check.roof) + Number(check.design);
    if (score === 0) return null;
    if (score === 3) return { ok: true, msg: "Solar is clearly worth it for you — strong savings, fast payback, low risk." };
    if (score === 2) return { ok: true, msg: "Solar is likely worth it — a free site survey will confirm the right size." };
    return { ok: false, msg: "Solar may still work, but the case isn't slam-dunk. Talk to an expert before committing." };
  }, [check]);

  const subsidyData = {
    "With Subsidy": {
      cost: "₹3.2L upfront → ₹78,000 back",
      time: "60 – 120 days",
      flex: "DISCOM-empanelled brands & sizes only",
    },
    "Without Subsidy": {
      cost: "₹2.5L – ₹3.0L (final)",
      time: "10 – 20 days",
      flex: "Any brand, custom design, faster install",
    },
  } as const;

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
            <span className="text-foreground">Is Solar Worth It in India</span>
          </nav>
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20" variant="outline">
            Honest Guide · 2026
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
            Is Solar Worth It in India? A Practical Look Before You Decide
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            A real-world view of costs, savings and long-term value — including when solar isn't the right call.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><User className="h-4 w-4" /> Selsify Editorial</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Updated April 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 min read</span>
          </div>
        </div>
        <div className="container mx-auto container-px max-w-5xl pb-10">
          <img
            src={hero}
            alt="Indian family on rooftop with solar panels at golden hour"
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
            <section>
              <p className="text-lg leading-relaxed text-foreground/90">
                Every week, someone asks us the same question: "Is solar actually worth it, or is it hype?"
                It's a fair question. Solar is a serious investment — ₹2 to ₹4 lakh for a home, much more for a
                business. You deserve an honest answer.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                So here's our take —{" "}
                <span className="bg-accent/10 px-1.5 py-0.5 rounded text-accent font-semibold">
                  not just in theory, but in real life.
                </span>{" "}
                Where solar shines, where it stumbles, and how to know which side you fall on.
              </p>
            </section>

            {/* WHY NOW */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Why More People Are Choosing Solar</h2>
              <div className="mt-5 grid sm:grid-cols-3 gap-4">
                {reasons.map((r) => {
                  const Icon = r.icon;
                  return (
                    <Card key={r.title} className="p-5">
                      <div className="h-10 w-10 rounded-lg bg-secondary/15 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-secondary" />
                      </div>
                      <h3 className="mt-4 font-semibold text-primary">{r.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* VALUE CARDS */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">What Solar Actually Gives You</h2>
              <p className="mt-3 text-muted-foreground">Hover or tap any card to expand.</p>
              <div className="mt-5 grid sm:grid-cols-3 gap-4">
                {valueCards.map((v, i) => {
                  const Icon = v.icon;
                  const open = expanded === i;
                  return (
                    <Card
                      key={v.title}
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
                      <h3 className="mt-4 font-semibold text-primary">{v.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{v.short}</p>
                      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="text-xs text-foreground/80 leading-relaxed border-t border-border pt-3">{v.long}</p>
                        </div>
                      </div>
                    </Card>
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
                  <Badge variant="outline" className="text-xs">~{savings.reduction}% reduction</Badge>
                </div>
                <Slider
                  value={bill}
                  onValueChange={setBill}
                  min={1500}
                  max={15000}
                  step={500}
                  className="mt-6"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>₹1.5K</span>
                  <span>₹15K</span>
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
                    <div className="text-xs text-muted-foreground">25-yr lifetime savings</div>
                    <div className="mt-1 text-2xl font-bold text-primary">
                      ₹{(savings.lifetime / 100000).toFixed(1)}L+
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Estimates based on a right-sized system at ~₹8/unit. Actual savings depend on your DISCOM, usage and roof.
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

            {/* EXPENSE VS INVESTMENT */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Expense vs Investment</h2>
              <p className="mt-3 text-muted-foreground">
                The biggest mindset shift: solar isn't a bill — it's an asset that pays you back.
              </p>
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <Card className="p-6 border-border">
                  <Badge variant="outline" className="text-destructive border-destructive/30">Without Solar</Badge>
                  <h3 className="mt-3 font-semibold text-primary">Monthly expense, forever</h3>
                  <div className="mt-5 space-y-2">
                    {[60, 65, 70, 78, 86, 95].map((v, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs w-14 text-muted-foreground">Yr {(i + 1) * 5}</span>
                        <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-destructive/70" style={{ width: `${v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Bill keeps rising 4–6% every year. By year 25, you've paid ₹20–25L just for electricity.
                  </p>
                </Card>
                <Card className="p-6 border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent">
                  <Badge className="bg-secondary text-secondary-foreground">With Solar</Badge>
                  <h3 className="mt-3 font-semibold text-primary">One-time investment → free power</h3>
                  <div className="mt-5 space-y-2">
                    {[100, 25, 12, 8, 6, 5].map((v, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs w-14 text-muted-foreground">Yr {(i + 1) * 5}</span>
                        <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-secondary" style={{ width: `${v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    One ₹2.8L investment → 25 years of near-free electricity. Net gain: ₹15L+.
                  </p>
                </Card>
              </div>
            </section>

            {/* RELIABILITY */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Does Solar Work Reliably?</h2>
              <p className="mt-3 text-muted-foreground">Short answer: yes — when installed properly.</p>
              <div className="mt-5 grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Clock, label: "Lifespan", val: "25+ yrs", desc: "Tier-1 panels carry 25-year linear performance warranties." },
                  { icon: Sparkles, label: "Maintenance", val: "Minimal", desc: "Quarterly cleaning. No moving parts. Inverter check once a year." },
                  { icon: TrendingUp, label: "Performance", val: "85% @ Yr 25", desc: "Panels degrade ~0.5%/year — still highly productive in year 25." },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <Card key={s.label} className="p-5">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-secondary" />
                        <div className="text-sm text-muted-foreground">{s.label}</div>
                      </div>
                      <div className="mt-2 text-2xl font-bold text-primary">{s.val}</div>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* WHEN NOT IDEAL */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">When Solar May Not Be Ideal</h2>
              <p className="mt-3 text-muted-foreground">
                We'd rather you say no for the right reason than yes for the wrong one. Solar may not fit if:
              </p>
              <div className="mt-5 grid md:grid-cols-3 gap-4">
                {notIdeal.map((m) => {
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

            {/* SUBSIDY */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Is Solar Worth It Without Subsidy?</h2>
              <p className="mt-3 text-muted-foreground">
                Honest answer: <strong>yes</strong>. Subsidy helps, but value comes from generation — not the discount.
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
                <div className="mt-5 inline-flex items-center gap-2 text-xs text-secondary font-semibold bg-secondary/10 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Choose for value, not for the discount
                </div>
              </Card>
            </section>

            {/* DECISION FRAMEWORK */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">When is Solar Truly Worth It?</h2>
              <Card className="mt-5 p-6">
                <div className="space-y-3">
                  {[
                    { key: "usage", label: "My monthly bill is ₹2,500 or higher" },
                    { key: "roof", label: "I have 200+ sq.ft of unshaded rooftop" },
                    { key: "design", label: "I'm willing to invest in a properly designed system" },
                  ].map((q) => (
                    <label key={q.key} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        checked={check[q.key as keyof typeof check]}
                        onCheckedChange={(v) => setCheck((s) => ({ ...s, [q.key]: Boolean(v) }))}
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
                      {verdict.ok ? "Verdict" : "Worth a closer look"}
                    </div>
                    <div className="mt-1 font-medium text-foreground">{verdict.msg}</div>
                  </div>
                )}
              </Card>
            </section>

            {/* INLINE CTA */}
            <section className="mt-12">
              <Card className="p-6 md:p-8 bg-gradient-to-br from-primary to-primary/85 text-primary-foreground border-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">Want to know if solar is worth it for your property?</h3>
                    <p className="mt-1 text-primary-foreground/80 text-sm">
                      Free site assessment with honest payback numbers — no sales pressure.
                    </p>
                  </div>
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shrink-0">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                      Get Free Assessment <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </section>

            {/* FINAL THOUGHTS */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Final Thoughts</h2>
              <div className="mt-4 space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  Solar is worth it for the vast majority of Indian homes and businesses with a real bill and a
                  real roof. But "worth it" isn't automatic — it depends on <strong>proper sizing, quality
                  components, and clean installation</strong>.
                </p>
                <p>
                  Pick the right partner, plan it well, and your roof becomes one of the best investments
                  you'll ever make. Pick the wrong one, and you'll spend the next 25 years regretting it.
                </p>
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="mt-12">
              <Card className="p-8 md:p-10 text-center border-2 border-secondary/30 bg-gradient-to-br from-surface-soft to-background">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">Find Out If Solar is Worth It for You</h2>
                <p className="mt-2 text-muted-foreground">
                  Free consultation, honest numbers, no spam. We'll tell you if you shouldn't go solar too.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Link to="/contact">Get Free Consultation</Link>
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
                  { t: "5kW Solar System Cost", to: "/blog/5kw-solar-system-cost-india" },
                  { t: "On-Grid vs Off-Grid Solar", to: "/blog/on-grid-vs-off-grid-solar" },
                  { t: "Solar for Home", to: "/solar-solutions/home" },
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
              <h3 className="text-lg font-bold">Check Your Savings</h3>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Get a personalised payback estimate in 15 minutes.
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
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">At a Glance</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li className="flex justify-between"><span className="text-muted-foreground">Bill cut</span><span className="font-semibold">70–80%</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Payback</span><span className="font-semibold">3–5 yrs</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Lifespan</span><span className="font-semibold">25+ yrs</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Maintenance</span><span className="font-semibold">Minimal</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Lifetime savings</span><span className="font-semibold">₹15L+</span></li>
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

export default BlogIsSolarWorthIt;
