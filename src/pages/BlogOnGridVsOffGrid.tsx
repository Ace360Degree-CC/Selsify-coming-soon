import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";
import TopBar from "@/components/site/TopBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ArrowRight,
  Zap,
  Battery,
  Building2,
  Mountain,
  AlertTriangle,
  PiggyBank,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import hero from "@/assets/blog-ongrid-vs-offgrid-hero.jpg";

const WHATSAPP = "https://wa.me/919892020515?text=Help%20me%20choose%20between%20on-grid%20and%20off-grid%20solar";
const PHONE = "tel:+919892020515";

type Flow = "On-Grid" | "Off-Grid";

const flows: Record<Flow, { steps: { title: string; desc: string }[]; tagline: string }> = {
  "On-Grid": {
    tagline: "Generate → Use → Send extra to grid",
    steps: [
      { title: "Generate", desc: "Panels produce DC power during the day." },
      { title: "Use", desc: "Inverter converts it to AC for your home appliances." },
      { title: "Export", desc: "Excess units flow to the grid — credited via net metering." },
    ],
  },
  "Off-Grid": {
    tagline: "Generate → Store → Use anytime",
    steps: [
      { title: "Generate", desc: "Panels produce DC power during sunlight hours." },
      { title: "Store", desc: "Charge controller routes power into a battery bank." },
      { title: "Use", desc: "Inverter draws from battery 24/7 — no grid required." },
    ],
  },
};

const mistakes = [
  {
    icon: Battery,
    title: "Choosing Off-Grid Without Need",
    desc: "Batteries cost ₹40–60K per kWh and need replacement every 5–8 years. Most urban homes don't need this.",
  },
  {
    icon: PiggyBank,
    title: "Ignoring the Cost Gap",
    desc: "Off-grid is 1.8–2x the cost of on-grid for the same kW. Make sure the backup is actually worth it.",
  },
  {
    icon: AlertTriangle,
    title: "Not Matching to Usage",
    desc: "A daytime-heavy home benefits most from on-grid. A factory with night shifts may need hybrid or off-grid.",
  },
];

const BlogOnGridVsOffGrid = () => {
  const [flow, setFlow] = useState<Flow>("On-Grid");
  const [priority, setPriority] = useState<"savings" | "backup" | null>(null);

  useEffect(() => {
    document.title = "On-Grid vs Off-Grid Solar: Which is Right for You? | Selsify";
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
      "On-grid vs off-grid solar: simple comparison of cost, working, and use cases. Find out which system fits your home or business with this practical guide by Selsify."
    );
    meta(
      "keywords",
      "on grid vs off grid solar, difference between on grid and off grid solar, which solar system is best, solar system comparison, hybrid solar"
    );
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", window.location.origin + "/blog/on-grid-vs-off-grid-solar");
  }, []);

  const recommendation =
    priority === "savings"
      ? {
          title: "Go with On-Grid",
          msg: "You'll get the best ROI, lowest upfront cost, and 70–80% bill reduction. No batteries to replace.",
          to: "/solar-solutions/on-grid",
          cta: "Explore On-Grid Solar",
        }
      : priority === "backup"
      ? {
          title: "Choose Off-Grid or Hybrid",
          msg: "If outages are frequent, hybrid gives you grid savings + battery backup. Pure off-grid only makes sense in remote areas.",
          to: "/solar-solutions/hybrid",
          cta: "Explore Hybrid Solar",
        }
      : null;

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
            <span className="text-foreground">On-Grid vs Off-Grid Solar</span>
          </nav>
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20" variant="outline">
            Decision Guide · 2026
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
            On-Grid vs Off-Grid Solar: Which One Should You Choose?
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            A simple guide to help you choose the right solar system based on your needs — without the jargon.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><User className="h-4 w-4" /> Selsify Editorial</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Updated April 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 7 min read</span>
          </div>
        </div>
        <div className="container mx-auto container-px max-w-5xl pb-10">
          <img
            src={hero}
            alt="On-grid solar home in a city compared with an off-grid home with batteries"
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
                On-grid or off-grid? It's the most common question we get from homeowners and small businesses
                exploring solar — and most online answers make it more confusing than it needs to be.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                Here's the truth:{" "}
                <span className="bg-accent/10 px-1.5 py-0.5 rounded text-accent font-semibold">
                  it's not about which is better — it's about what fits your situation.
                </span>{" "}
                Both systems work brilliantly when matched to the right use case, and badly when they're not.
              </p>
            </section>

            {/* BASIC DIFFERENCE */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Understanding the Difference</h2>
              <p className="mt-3 text-muted-foreground">The simplest way to think about it:</p>
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <Card className="p-6 border-2 border-secondary/30 bg-secondary/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary/15 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <Badge className="bg-secondary text-secondary-foreground">Most popular</Badge>
                      <h3 className="mt-1 text-xl font-semibold text-primary">On-Grid</h3>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-sm">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Solar + grid (no batteries)</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Lower upfront cost</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Net metering credits</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> No power during outages</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Battery className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Badge variant="outline">Backup-first</Badge>
                      <h3 className="mt-1 text-xl font-semibold text-primary">Off-Grid</h3>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-sm">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Solar + battery storage</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Works independently of grid</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Higher upfront cost</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> 24/7 power, even in outages</li>
                  </ul>
                </Card>
              </div>
            </section>

            {/* HOW THEY WORK */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">How Each System Works</h2>
              <div className="mt-5 inline-flex rounded-xl border border-border bg-card p-1">
                {(Object.keys(flows) as Flow[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setFlow(k)}
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                      flow === k ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
              <Card className="mt-4 p-6">
                <div className="text-sm text-muted-foreground">{flows[flow].tagline}</div>
                <div className="mt-5 grid sm:grid-cols-3 gap-4">
                  {flows[flow].steps.map((s, i) => (
                    <div key={s.title} className="relative rounded-lg border border-border p-4 bg-card">
                      <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold shadow-sm">
                        {i + 1}
                      </div>
                      <h4 className="font-semibold text-primary">{s.title}</h4>
                      <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* COST COMPARISON */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Cost Comparison</h2>
              <p className="mt-3 text-muted-foreground">For the same 5 kW system, all-inclusive:</p>
              <Card className="mt-5 p-6">
                <div className="space-y-5">
                  {[
                    { label: "On-Grid", amt: "₹2.5L – ₹3.0L", val: 50, color: "bg-secondary", note: "Lowest cost — no batteries" },
                    { label: "Hybrid", amt: "₹3.8L – ₹4.5L", val: 78, color: "bg-primary", note: "Balanced — small battery backup" },
                    { label: "Off-Grid", amt: "₹4.5L – ₹5.5L", val: 100, color: "bg-accent", note: "Highest — full battery bank" },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <div>
                          <span className="font-semibold text-foreground">{r.label}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{r.note}</span>
                        </div>
                        <span className="font-bold text-primary">{r.amt}</span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${r.color} transition-all duration-700`} style={{ width: `${r.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* USE CASES TABS */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Where Each System Works Best</h2>
              <Tabs defaultValue="on" className="mt-5">
                <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2">
                  <TabsTrigger value="on">On-Grid fits</TabsTrigger>
                  <TabsTrigger value="off">Off-Grid fits</TabsTrigger>
                </TabsList>
                <TabsContent value="on" className="mt-4">
                  <Card className="p-6">
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { icon: Building2, title: "Cities & towns", desc: "Mumbai, Pune, Bangalore — anywhere with reliable DISCOM supply." },
                        { icon: Zap, title: "Stable electricity", desc: "Outages are short and rare; grid is dependable." },
                        { icon: PiggyBank, title: "Bill reduction goal", desc: "Your priority is cutting your monthly bill, not backup." },
                      ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex flex-col items-start gap-2">
                          <div className="h-10 w-10 rounded-lg bg-secondary/15 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-secondary" />
                          </div>
                          <div className="font-semibold text-primary">{title}</div>
                          <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="off" className="mt-4">
                  <Card className="p-6">
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { icon: Mountain, title: "Remote areas", desc: "Farms, hill stations, sites without a reliable grid connection." },
                        { icon: AlertTriangle, title: "Frequent outages", desc: "Areas with daily 4+ hours of power cuts." },
                        { icon: ShieldCheck, title: "Backup-critical", desc: "Telecom towers, clinics, cold storage — anything outage-sensitive." },
                      ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex flex-col items-start gap-2">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="font-semibold text-primary">{title}</div>
                          <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            {/* DECISION TOOL */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Which One Should You Choose?</h2>
              <p className="mt-3 text-muted-foreground">Pick what matters more to you:</p>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setPriority("savings")}
                  className={`text-left rounded-xl border-2 p-6 transition-all ${
                    priority === "savings"
                      ? "border-secondary bg-secondary/5 shadow-card"
                      : "border-border bg-card hover:border-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary/15 flex items-center justify-center">
                      <PiggyBank className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="font-semibold text-primary">Maximum Savings</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    I want the lowest upfront cost and biggest bill reduction.
                  </p>
                </button>
                <button
                  onClick={() => setPriority("backup")}
                  className={`text-left rounded-xl border-2 p-6 transition-all ${
                    priority === "backup"
                      ? "border-primary bg-primary/5 shadow-card"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-semibold text-primary">Power Backup</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    I need power even when the grid goes down.
                  </p>
                </button>
              </div>
              {recommendation && (
                <Card className="mt-5 p-6 border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-secondary mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wider text-secondary font-semibold">Our recommendation</div>
                      <h3 className="mt-1 text-xl font-bold text-primary">{recommendation.title}</h3>
                      <p className="mt-2 text-sm text-foreground/80">{recommendation.msg}</p>
                      <Button asChild className="mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        <Link to={recommendation.to}>
                          {recommendation.cta} <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </section>

            {/* HYBRID */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">What About Hybrid?</h2>
              <Card className="mt-5 p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-foreground/90 leading-relaxed">
                      Hybrid is the middle path — <strong>grid + battery</strong>. You get net-metering savings
                      during normal days, and battery backup when the grid fails. It costs more than on-grid but
                      far less than full off-grid.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-secondary border-secondary/30">Saves like on-grid</Badge>
                      <Badge variant="outline" className="text-primary border-primary/30">Backs up like off-grid</Badge>
                      <Badge variant="outline" className="text-accent border-accent/30">Higher upfront cost</Badge>
                    </div>
                    <Link to="/solar-solutions/hybrid" className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-secondary hover:text-secondary/80">
                      Read about Hybrid Solar <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            </section>

            {/* COMMON MISTAKES */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">What Most People Get Wrong</h2>
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

            {/* PRACTICAL SUMMARY */}
            <section className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">A Simple Way to Decide</h2>
              <Card className="mt-5 p-6 md:p-8 border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <PiggyBank className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-primary">Want savings?</span>
                      <span className="text-foreground/80"> → Choose <strong>On-Grid</strong>. Lowest cost, fastest payback.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-primary">Need backup?</span>
                      <span className="text-foreground/80"> → Choose <strong>Hybrid</strong> (urban) or <strong>Off-Grid</strong> (remote).</span>
                    </div>
                  </li>
                </ul>
              </Card>
            </section>

            {/* INLINE CTA */}
            <section className="mt-12">
              <Card className="p-6 md:p-8 bg-gradient-to-br from-primary to-primary/85 text-primary-foreground border-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">Still unsure which system is right?</h3>
                    <p className="mt-1 text-primary-foreground/80 text-sm">
                      Free 15-minute call with a solar expert. No pressure.
                    </p>
                  </div>
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shrink-0">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                      Get Expert Advice <ArrowRight className="ml-1 h-4 w-4" />
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
                  Don't pick a system based on what your neighbour installed. Pick it based on{" "}
                  <strong>your usage, your grid reliability, and your budget</strong>.
                </p>
                <p>
                  For most Indian homes in cities, on-grid wins. For homes with frequent outages, hybrid is
                  worth the premium. Pure off-grid only makes sense when there's no grid to connect to.
                </p>
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="mt-12">
              <Card className="p-8 md:p-10 text-center border-2 border-secondary/30 bg-gradient-to-br from-surface-soft to-background">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">Get Help Choosing the Right Solar System</h2>
                <p className="mt-2 text-muted-foreground">
                  Tell us your usage and we'll recommend the right system — no pushy sales.
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
                  { t: "On-Grid Solar Solutions", to: "/solar-solutions/on-grid" },
                  { t: "Off-Grid Solar Solutions", to: "/solar-solutions/off-grid" },
                  { t: "Hybrid Solar Solutions", to: "/solar-solutions/hybrid" },
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
              <h3 className="text-lg font-bold">Talk to Expert</h3>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Get a personalised system recommendation in 15 minutes.
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
                <li className="flex justify-between"><span className="text-muted-foreground">On-Grid cost</span><span className="font-semibold">₹2.5–3 L</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Off-Grid cost</span><span className="font-semibold">₹4.5–5.5 L</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Hybrid cost</span><span className="font-semibold">₹3.8–4.5 L</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Best for cities</span><span className="font-semibold">On-Grid</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Best for backup</span><span className="font-semibold">Hybrid</span></li>
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

export default BlogOnGridVsOffGrid;
