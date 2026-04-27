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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
} from "lucide-react";
import hero from "@/assets/blog-solar-price-hero.jpg";

const WHATSAPP = "https://wa.me/919892020515?text=I%20want%20to%20know%20my%20exact%20solar%20cost";
const PHONE = "tel:+919892020515";

const components = [
  { icon: Sun, name: "Solar Panels", share: 50, desc: "The biggest cost. Mono PERC or N-type TOPCon panels typically make up half the system cost." },
  { icon: Zap, name: "Inverter", share: 15, desc: "Converts DC to AC. String or hybrid inverters from brands like Growatt, Deye or Sungrow." },
  { icon: Wrench, name: "Mounting Structure", share: 12, desc: "Galvanised iron or aluminium structure rated for high wind speeds and 25-year life." },
  { icon: Cable, name: "Wiring & Safety", share: 10, desc: "DC/AC cables, MC4 connectors, surge protection, earthing and lightning arrestors." },
  { icon: HardHat, name: "Installation & Net Metering", share: 13, desc: "Skilled labour, transport, scaffolding, DISCOM liaison and net-meter approvals." },
];

const sysTypes = {
  "On-Grid": {
    price: "₹45,000 – ₹55,000 / kW",
    use: "Best for homes & businesses with stable grid. Highest savings, no batteries.",
    note: "Recommended for 90% of Indian rooftops.",
  },
  "Off-Grid": {
    price: "₹85,000 – ₹1,10,000 / kW",
    use: "For locations with unreliable or no grid power. Includes battery backup.",
    note: "Higher cost due to lithium / lead-acid batteries.",
  },
  Hybrid: {
    price: "₹70,000 – ₹95,000 / kW",
    use: "Best of both — grid export plus battery backup for power cuts.",
    note: "Ideal where outages are frequent but grid exists.",
  },
} as const;

type SysKey = keyof typeof sysTypes;

const BlogSolarPriceIndia = () => {
  const [sys, setSys] = useState<SysKey>("On-Grid");
  const [subsidy, setSubsidy] = useState<"Subsidy" | "Non-Subsidy">("Non-Subsidy");
  const [hovered, setHovered] = useState<number | null>(null);
  const [check, setCheck] = useState({ roof: false, usage: false, budget: false });

  useEffect(() => {
    document.title = "Solar Panel Price in India 2026 | Real Cost Per kW – Selsify";
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
      "Solar panel price in India (2026): real cost per kW, subsidy vs non-subsidy, system type comparison and ROI. A practical guide by Selsify."
    );
    meta(
      "keywords",
      "solar panel price in India, solar system cost India, rooftop solar price, solar cost per kW, 5kW solar price"
    );
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", window.location.origin + "/blog/solar-panel-price-india");
  }, []);

  const recommended = useMemo(() => {
    const score = Number(check.roof) + Number(check.usage) + Number(check.budget);
    if (score === 0) return null;
    if (check.budget && check.usage) return "On-Grid 3–5 kW system — best ROI for your profile.";
    if (check.roof && !check.budget) return "Start with a 2–3 kW On-Grid system — scale later.";
    if (!check.roof) return "Consider a Hybrid system or shared society installation.";
    return "On-Grid system tailored to your usage — request a free site survey.";
  }, [check]);

  const subsidyData = {
    Subsidy: {
      cost: "₹65,000 – ₹70,000 / kW (then ₹30k–₹78k back)",
      time: "60 – 120 days",
      flex: "Limited brands & capacity (DISCOM-empanelled only)",
    },
    "Non-Subsidy": {
      cost: "₹45,000 – ₹60,000 / kW (final price)",
      time: "10 – 20 days",
      flex: "Any panel/inverter brand, any size, faster install",
    },
  };

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
            <span className="text-foreground">Solar Panel Price in India</span>
          </nav>
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20" variant="outline">
            Pricing Guide · 2026
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
            Solar Panel Price in India: What You Should Actually Expect in 2026
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            A practical guide to understanding real solar costs in India — without the jargon, hype or hidden line items.
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
            alt="Rooftop solar panels installed on an Indian residential building"
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
                If you've searched for solar prices in India recently, you've probably seen quotes ranging
                from <strong>₹40,000 to over ₹1,00,000 per kW</strong>. That gap is confusing — and it's also
                the truth.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                <span className="bg-accent/10 px-1.5 py-0.5 rounded text-accent font-semibold">
                  Solar pricing in India isn't fixed
                </span>
                . It depends on your roof, your usage, the components you choose, and whether you go through
                the subsidy route or not. This guide breaks it all down, plainly.
              </p>
            </section>

            {/* PRICE RANGE BOX */}
            <section className="mt-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">What is the Typical Solar Cost?</h2>
              <Card className="mt-5 p-6 md:p-8 border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                    <IndianRupee className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      ₹45,000 – ₹60,000 <span className="text-lg font-medium text-muted-foreground">per kW</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Typical range for residential rooftop systems (non-subsidy, fully installed).
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> 1–3 kW systems sit at the higher end</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> 5 kW+ systems get better per-kW pricing</li>
                      <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Commercial systems (20 kW+) drop to ₹38–45k per kW</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* WHY VARY */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Why Solar Prices Vary</h2>
              <p className="mt-3 text-muted-foreground">Four factors do most of the work:</p>
              <Accordion type="single" collapsible className="mt-5" defaultValue="design">
                <AccordionItem value="design">
                  <AccordionTrigger>System Design</AccordionTrigger>
                  <AccordionContent>
                    A well-engineered design uses fewer components and gives more output. Cheap designs cut
                    corners on tilt, cable sizing and structure — costing more in lost generation later.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="loc">
                  <AccordionTrigger>Location</AccordionTrigger>
                  <AccordionContent>
                    Mumbai, Pune, Bangalore and metro cities have higher logistics and labour costs than
                    smaller towns. But they also have stronger DISCOM net-metering frameworks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="usage">
                  <AccordionTrigger>Usage Pattern</AccordionTrigger>
                  <AccordionContent>
                    Daytime-heavy users (homes with ACs, offices, factories) get more value per kW than
                    night-heavy users. Your usage decides the right system size.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="comp">
                  <AccordionTrigger>Components & Brands</AccordionTrigger>
                  <AccordionContent>
                    Tier-1 panels (Waaree, Vikram, Adani) and reliable inverters (Growatt, Sungrow, Deye) cost
                    more upfront but last 25+ years. Tier-3 components fail in 5–7 years.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* WHAT YOU PAY FOR */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">What You're Actually Paying For</h2>
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

            {/* SYSTEM TYPE TOGGLE */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Which System Affects Cost?</h2>
              <div className="mt-5 inline-flex rounded-xl border border-border bg-card p-1">
                {(Object.keys(sysTypes) as SysKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setSys(k)}
                    className={`px-4 md:px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                      sys === k ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
              <Card className="mt-4 p-6">
                <div className="text-2xl font-bold text-primary">{sysTypes[sys].price}</div>
                <p className="mt-2 text-muted-foreground">{sysTypes[sys].use}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-secondary font-semibold bg-secondary/10 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {sysTypes[sys].note}
                </div>
              </Card>
            </section>

            {/* PANEL TECH */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Does Panel Type Matter?</h2>
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <Card className="p-6 border-border">
                  <Badge variant="outline">Standard</Badge>
                  <h3 className="mt-3 text-xl font-semibold text-primary">Standard Panels (400–550 W)</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Mono PERC. Reliable, widely available, lower upfront cost. Good fit for most homes.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                      <div className="font-bold text-primary">~21%</div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="text-xs text-muted-foreground">Cost</div>
                      <div className="font-bold text-primary">Lower</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 border-2 border-secondary/40 bg-secondary/5">
                  <Badge className="bg-secondary text-secondary-foreground">High-Watt</Badge>
                  <h3 className="mt-3 text-xl font-semibold text-primary">High-Watt Panels (600 W+)</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    N-type TOPCon. More power per sq.ft — perfect when roof space is tight.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-lg bg-card p-3">
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                      <div className="font-bold text-primary">~23%</div>
                    </div>
                    <div className="rounded-lg bg-card p-3">
                      <div className="text-xs text-muted-foreground">Cost</div>
                      <div className="font-bold text-primary">+8–12%</div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* SUBSIDY */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Subsidy vs Non-Subsidy</h2>
              <div className="mt-5 inline-flex rounded-xl border border-border bg-card p-1">
                {(["Non-Subsidy", "Subsidy"] as const).map((k) => (
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

            {/* INLINE CTA */}
            <section className="mt-12">
              <Card className="p-6 md:p-8 bg-gradient-to-br from-primary to-primary/85 text-primary-foreground border-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">Want to know your exact solar cost?</h3>
                    <p className="mt-1 text-primary-foreground/80 text-sm">
                      Free, no-pressure consultation tailored to your roof and bill.
                    </p>
                  </div>
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shrink-0">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                      Get Free Consultation <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </section>

            {/* ROI */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Is Solar Worth It?</h2>
              <p className="mt-3 text-muted-foreground">
                Short answer: yes — for almost every home with a ₹2,500+ monthly bill.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    <div className="text-sm text-muted-foreground">Bill reduction</div>
                  </div>
                  <div className="mt-2 text-4xl font-bold text-primary">70–80%</div>
                  <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-secondary to-primary" style={{ width: "78%" }} />
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-secondary" />
                    <div className="text-sm text-muted-foreground">Payback period</div>
                  </div>
                  <div className="mt-2 text-4xl font-bold text-primary">3–5 yrs</div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    System lasts 25+ years — that's 20+ years of nearly free electricity.
                  </p>
                </Card>
              </div>
              <Card className="mt-4 p-6">
                <div className="text-sm font-medium text-muted-foreground mb-3">25-year cost comparison (5 kW system)</div>
                <div className="space-y-2.5">
                  {[
                    { label: "Without solar", val: 100, color: "bg-destructive/70", amt: "≈ ₹22 L" },
                    { label: "With solar (subsidy)", val: 28, color: "bg-secondary", amt: "≈ ₹6.2 L" },
                    { label: "With solar (non-subsidy)", val: 35, color: "bg-primary", amt: "≈ ₹7.7 L" },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{r.label}</span>
                        <span className="font-semibold text-foreground">{r.amt}</span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${r.color} transition-all duration-700`} style={{ width: `${r.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* DECISION GUIDE */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">How to Choose the Right System</h2>
              <Card className="mt-5 p-6">
                <div className="space-y-3">
                  {[
                    { key: "roof", label: "I have 200+ sq.ft of unshaded rooftop" },
                    { key: "usage", label: "My monthly bill is ₹2,500 or higher" },
                    { key: "budget", label: "I can invest now (or use a solar loan)" },
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
                {recommended && (
                  <div className="mt-5 p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                    <div className="text-xs font-semibold text-secondary uppercase tracking-wider">Recommended</div>
                    <div className="mt-1 font-medium text-foreground">{recommended}</div>
                  </div>
                )}
              </Card>
            </section>

            {/* FINAL THOUGHTS */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Final Thoughts</h2>
              <div className="mt-4 space-y-4 text-foreground/90 leading-relaxed">
                <p>
                  The cheapest quote rarely turns out cheapest. A solar system is a 25-year asset on your
                  roof — it's worth choosing components, design and an installer you can trust.
                </p>
                <p>
                  Focus on <strong>generation per kW</strong>, warranties, and the team that will service
                  your system in year 7, year 12 and year 20. That's where the real value sits.
                </p>
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="mt-12">
              <Card className="p-8 md:p-10 text-center border-2 border-secondary/30 bg-gradient-to-br from-surface-soft to-background">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">Get Your Exact Solar Cost</h2>
                <p className="mt-2 text-muted-foreground">
                  Tailored to your roof, your bill and your DISCOM. No spam.
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
                  { t: "5kW Solar System Cost & Output", to: "#" },
                  { t: "On-Grid vs Off-Grid Solar", to: "/solar-solutions/on-grid" },
                  { t: "Solar for Housing Societies", to: "/solar-solutions/society" },
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
                Talk to a solar expert in 15 minutes.
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
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Quick Facts</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li className="flex justify-between"><span className="text-muted-foreground">Per kW cost</span><span className="font-semibold">₹45–60k</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Payback</span><span className="font-semibold">3–5 yrs</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">System life</span><span className="font-semibold">25+ yrs</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Bill cut</span><span className="font-semibold">70–80%</span></li>
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

export default BlogSolarPriceIndia;
