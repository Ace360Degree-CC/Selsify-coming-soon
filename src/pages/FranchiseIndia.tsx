import { useEffect, useRef, useState } from "react";
import {
  Phone, MessageCircle, ArrowRight, CheckCircle2, TrendingUp, Users,
  Briefcase, Target, HandCoins, GraduationCap, Megaphone, FileText,
  Headphones, Building2, UserCheck, MapPin, Send, Clock,
  Zap, Sun, BadgeCheck, Home, Factory, Network, Rocket, Globe2, Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";
import heroImg from "@/assets/install-4.jpeg";
import work1 from "@/assets/install-1.jpeg";
import work2 from "@/assets/install-2.jpeg";
import work3 from "@/assets/install-3.jpeg";
import work4 from "@/assets/install-7.jpeg";

const phone = "+919892020515";
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27m%20interested%20in%20the%20Solar%20Franchise%20opportunity%20in%20India";

/* ---------- Animated counter ---------- */
function useCounter(target: number, duration = 1400, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function Stat({ icon: Icon, value, suffix, label }: { icon: any; value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const n = useCounter(value, 1400, seen);
  return (
    <Card ref={ref as any} className="p-6 card-lift border-border/60">
      <div className="h-11 w-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-3">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-primary">
        {n}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </Card>
  );
}

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

/* ---------- Data ---------- */
const stats = [
  { icon: Zap, value: 8, suffix: "%", label: "Annual rise in electricity tariffs" },
  { icon: TrendingUp, value: 40, suffix: "%", label: "YoY rooftop solar growth" },
  { icon: Sun, value: 500, suffix: "GW", label: "India's 2030 renewable target" },
  { icon: Landmark, value: 78, suffix: "%", label: "Subsidy-backed residential demand" },
];

const regions = [
  { key: "metro", icon: Building2, name: "Metro Cities", insight: "Mumbai, Delhi, Bengaluru, Hyderabad — high tariffs, dense societies and large commercial rooftops drive premium ticket sizes." },
  { key: "tier2", icon: Home, name: "Tier 2 Cities", insight: "Pune, Jaipur, Lucknow, Indore, Surat — rapidly growing residential adoption with subsidy awareness and lower competition." },
  { key: "tier3", icon: Globe2, name: "Tier 3 Markets", insight: "Smaller towns and semi-urban belts — strong word-of-mouth, low CAC and high closure rates for 3–10 kW systems." },
];

const modelSteps = [
  { icon: Megaphone, title: "Generate Leads", desc: "Local outreach + our marketing toolkit." },
  { icon: Users, title: "Connect with Customers", desc: "Meet, understand needs, share proposals." },
  { icon: HandCoins, title: "Close Deals", desc: "Senior team supports survey, design and negotiation." },
  { icon: BadgeCheck, title: "Execution Handled", desc: "Selsify installs and commissions end-to-end." },
  { icon: Target, title: "Earn Commission", desc: "Get paid on every successful project." },
];

const benefits = [
  { icon: GraduationCap, title: "Training", desc: "Sales process, basic technical know-how and proposal handling." },
  { icon: Megaphone, title: "Marketing Guidance", desc: "Creatives, ads and lead-gen campaigns ready to use." },
  { icon: FileText, title: "Proposal Support", desc: "We prepare quotes, designs and BOQs for your customers." },
  { icon: Target, title: "Closing Assistance", desc: "Senior team joins key calls to help you close." },
  { icon: Headphones, title: "Execution Support", desc: "Full installation handled by Selsify's team." },
];

const scale = {
  start: {
    icon: Rocket,
    title: "Start Small",
    desc: "Begin solo from home with one focused city. Close 1–2 deals a month while learning the playbook — minimal cost, maximum learning.",
    points: ["No office needed", "Run from your phone", "Use Selsify creatives"],
  },
  grow: {
    icon: TrendingUp,
    title: "Grow Locally",
    desc: "Add a small team or freelancers, target societies and SMEs in your city. Build referrals and recurring AMC pipelines.",
    points: ["Hire 1–2 sales reps", "Target societies & SMEs", "Build referral engine"],
  },
  expand: {
    icon: Globe2,
    title: "Expand to Multiple Cities",
    desc: "Replicate the model across nearby districts and tier-2/3 markets — go from a partner to a regional business with Selsify execution backing you.",
    points: ["Multi-city operations", "Regional team buildout", "Higher commission slabs"],
  },
};

const audience = {
  entrepreneur: { icon: Briefcase, title: "Entrepreneurs", desc: "Plug into a high-growth industry without building product, supply chain or installation team from scratch." },
  sales: { icon: UserCheck, title: "Sales Professionals", desc: "Convert your selling skill into commissions on high-ticket solar deals — residential, society and commercial." },
  owner: { icon: Building2, title: "Business Owners", desc: "Add solar as a new revenue stream to your existing electrical, real estate or service business." },
  network: { icon: Network, title: "Network-driven Individuals", desc: "Strong community contacts? Earn through referrals, society introductions and warm closures." },
};

const faqs = [
  { q: "Do I need technical knowledge?", a: "No. Our team handles design, site survey and installation. You focus on customers — we train you on the basics." },
  { q: "Will I get leads?", a: "You drive local outreach; we support with marketing creatives, scripts and shared leads where possible. Local effort is what makes this work." },
  { q: "How much can I earn?", a: "Earnings depend on closures. Each residential deal is typically 3–10 lakh ticket size with healthy commissions. Society and commercial deals are larger." },
  { q: "Which cities do you support?", a: "Pan India — metros, tier-2 and tier-3 markets. Execution is handled by Selsify's network." },
  { q: "Do I need an office?", a: "No. Most partners start from home and only scale infrastructure once revenue is steady." },
];

const works = [
  { src: work1, alt: "Residential rooftop solar installation" },
  { src: work2, alt: "Commercial solar project" },
  { src: work3, alt: "Society solar plant" },
  { src: work4, alt: "Industrial solar installation" },
];

/* ---------- Page ---------- */
const FranchiseIndia = () => {
  useEffect(() => {
    document.title = "Solar Franchise in India | Selsify";
    const desc = "Start a solar franchise business across India with Selsify. Low investment, training, marketing and end-to-end execution support.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", desc);
    let l = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!l) { l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); }
    l.href = window.location.href;
  }, []);

  const [activeRegion, setActiveRegion] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", city: "", background: "", interest: "high" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.length > 80) return toast.error("Please enter your name");
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) return toast.error("Please enter a valid phone number");
    if (!form.city.trim()) return toast.error("Please enter your city");
    toast.success("Application received! Our team will reach out within 15–30 minutes.");
    setForm({ name: "", phone: "", city: "", background: "", interest: "high" });
  };

  const heroReveal = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-muted/40 border-b border-border">
        <div className="container mx-auto container-px py-12 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div ref={heroReveal.ref} className={`transition-all duration-700 ${heroReveal.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="eyebrow">Franchise · Pan India</span>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl leading-tight">
              Start Your Solar Business <span className="text-accent">Across India</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              Build a scalable business in one of India's fastest-growing industries.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["High Demand", "Low Investment", "Scalable Opportunity"].map((b, i) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1.5 text-xs font-semibold text-primary shadow-sm animate-fade-in"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary" /> {b}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <a href="#apply">Apply for Franchise <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={wa} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-1 h-4 w-4" /> Talk to Us
                </a>
              </Button>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Quick response within 15–30 minutes
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[5/4] shadow-elevated">
              <img src={heroImg} alt="Selsify solar installation across India" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-elevated">
              <div className="text-xs uppercase tracking-wider opacity-90">Operating across</div>
              <div className="text-lg font-bold flex items-center gap-1.5"><Globe2 className="h-4 w-4" /> India</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SOLAR */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Market Insight</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Why Solar is the Future</h2>
            <p className="mt-3 text-muted-foreground">
              Rising tariffs, government push and untapped tier-2/3 markets make solar one of India's strongest long-term business opportunities.
            </p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => <Stat key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* INDIA OPPORTUNITY */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Opportunity Map</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Opportunity Across India</h2>
            <p className="mt-3 text-muted-foreground">Tap a region to see why it's a strong market.</p>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-3">
              {regions.map((r, i) => (
                <button
                  key={r.key}
                  onClick={() => setActiveRegion(i)}
                  className={`group text-left rounded-xl border p-5 transition-all ${
                    activeRegion === i
                      ? "border-secondary bg-secondary/5 shadow-card"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <r.icon className={`h-5 w-5 ${activeRegion === i ? "text-secondary" : "text-primary"}`} />
                    <div className="font-semibold text-primary">{r.name}</div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.insight}</div>
                </button>
              ))}
            </div>

            <Card className="p-6 border-border/60">
              <div className="flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-wider">
                <BadgeCheck className="h-4 w-4" /> Insight
              </div>
              <h3 className="mt-2 text-2xl">{regions[activeRegion].name}</h3>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{regions[activeRegion].insight}</p>
              <Button asChild className="mt-5 bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="sm">
                <a href="#apply">Explore this market <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FRANCHISE MODEL */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Business Flow</span>
            <h2 className="mt-2 text-3xl md:text-4xl">How the Business Works</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-5 gap-4 relative">
            {modelSteps.map((s, i) => (
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
                {i < modelSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Partner Support</span>
            <h2 className="mt-2 text-3xl md:text-4xl">What You Get as a Partner</h2>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
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

      {/* SCALABILITY */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Growth Path</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Build & Scale Your Business</h2>
          </div>

          <Tabs defaultValue="start" className="mt-8">
            <TabsList className="flex-wrap h-auto bg-muted p-1">
              <TabsTrigger value="start">Start Small</TabsTrigger>
              <TabsTrigger value="grow">Grow Locally</TabsTrigger>
              <TabsTrigger value="expand">Expand Cities</TabsTrigger>
            </TabsList>
            {(Object.keys(scale) as Array<keyof typeof scale>).map((k) => {
              const s = scale[k];
              return (
                <TabsContent key={k} value={k} className="mt-6">
                  <Card className="p-6 md:p-8 border-border/60">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <s.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl">{s.title}</h3>
                        <p className="mt-2 text-muted-foreground">{s.desc}</p>
                        <ul className="mt-4 grid sm:grid-cols-3 gap-2">
                          {s.points.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-secondary" /> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* INVESTMENT + EARNING */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-8">
          <Card className="p-7 md:p-9 border-secondary/30 bg-background relative overflow-hidden">
            <span className="eyebrow">Investment & Setup</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Start Lean. Scale Smart.</h2>
            <div className="mt-6 flex items-baseline gap-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">₹50,000</div>
              <div className="text-lg text-muted-foreground">– ₹55,000</div>
            </div>
            <div className="text-sm text-muted-foreground">One-time franchise fee</div>
            <ul className="mt-6 space-y-3">
              {["Low operational cost", "No heavy infrastructure", "All training & marketing included"].map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-secondary" /> {p}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-7 md:p-9 border-border/60">
            <span className="eyebrow">Earning Model</span>
            <h2 className="mt-2 text-3xl md:text-4xl">How You Earn</h2>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Megaphone, t: "Lead" },
                { icon: HandCoins, t: "Deal" },
                { icon: BadgeCheck, t: "Commission" },
              ].map((x, i) => (
                <div key={x.t} className="relative">
                  <div className="rounded-xl border border-border bg-muted/40 py-5">
                    <x.icon className="h-6 w-6 mx-auto text-primary" />
                    <div className="mt-2 font-semibold text-primary">{x.t}</div>
                  </div>
                  {i < 2 && <ArrowRight className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Generate qualified leads in your city, our team helps you close, and you earn commission on every successful installation. Repeat customers and referrals compound your income.
            </p>
          </Card>
        </div>
      </section>

      {/* REAL EXECUTION */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Trust Builder</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Real Work. Real Execution.</h2>
            <p className="mt-3 text-muted-foreground">A glimpse of installations executed across India.</p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {works.map((w, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <button className="group rounded-xl overflow-hidden aspect-square relative shadow-card hover:shadow-elevated transition-all">
                    <img src={w.src} alt={w.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors" />
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

      {/* WHO CAN APPLY */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Filter</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Who is This For?</h2>
          </div>
          <Tabs defaultValue="entrepreneur" className="mt-8">
            <TabsList className="flex-wrap h-auto bg-background border border-border p-1">
              <TabsTrigger value="entrepreneur">Entrepreneurs</TabsTrigger>
              <TabsTrigger value="sales">Sales Professionals</TabsTrigger>
              <TabsTrigger value="owner">Business Owners</TabsTrigger>
              <TabsTrigger value="network">Network-driven</TabsTrigger>
            </TabsList>
            {(Object.keys(audience) as Array<keyof typeof audience>).map((k) => {
              const a = audience[k];
              return (
                <TabsContent key={k} value={k} className="mt-6">
                  <Card className="p-6 md:p-8 border-border/60">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                        <a.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl">{a.title}</h3>
                        <p className="mt-2 text-muted-foreground">{a.desc}</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container mx-auto container-px max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="section bg-muted/40">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-10">
          <div>
            <span className="eyebrow">Apply</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Apply for Solar Franchise</h2>
            <p className="mt-3 text-muted-foreground">
              Share your details and our team will reach out to walk you through the model, investment and next steps.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "End-to-end training and onboarding",
                "Marketing & proposal support",
                "Execution handled by Selsify team",
                "Dedicated partner manager",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-secondary" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Quick response within 15–30 minutes
            </div>
          </div>

          <Card className="p-6 md:p-8 border-border/60">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary">Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" maxLength={80} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary">Phone</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" maxLength={15} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary">City</label>
                  <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Bengaluru" maxLength={50} required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-primary">Background <span className="text-muted-foreground font-normal">(optional)</span></label>
                <Textarea value={form.background} onChange={(e) => setForm({ ...form, background: e.target.value })} placeholder="Briefly tell us about your work / business" rows={3} maxLength={500} />
              </div>
              <div>
                <label className="text-sm font-medium text-primary">Interest Level</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {["explore", "serious", "high"].map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setForm({ ...form, interest: lvl })}
                      className={`text-xs font-semibold py-2 rounded-md border capitalize transition-all ${
                        form.interest === lvl
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {lvl === "high" ? "Ready to start" : lvl}
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Send className="mr-2 h-4 w-4" /> Submit Application
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container mx-auto container-px">
          <Card className="p-8 md:p-12 border-border/60 text-center">
            <span className="eyebrow">Get Started</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Start Your Solar Business Today</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Take the first step toward building your own business in a growing industry.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <a href="#apply">Apply Now <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${phone}`}><Phone className="mr-1 h-4 w-4" /> Call Now</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="mr-1 h-4 w-4" /> WhatsApp</a>
              </Button>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> We usually respond within 15–30 minutes
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

export default FranchiseIndia;
