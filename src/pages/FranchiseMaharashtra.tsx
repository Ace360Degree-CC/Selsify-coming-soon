import { useEffect, useRef, useState } from "react";
import {
  Phone, MessageCircle, ArrowRight, CheckCircle2, TrendingUp, Users,
  Briefcase, Target, HandCoins, GraduationCap, Megaphone, FileText,
  Headphones, Building2, UserCheck, MapPin, Send, Clock,
  Zap, Sun, BadgeCheck, Home, Factory, Network, Store,
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
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27m%20interested%20in%20the%20Solar%20Franchise%20in%20Maharashtra";

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

/* ---------- Reveal on scroll ---------- */
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
  { icon: Zap, value: 9, suffix: "%", label: "Yearly rise in MH electricity tariffs" },
  { icon: Home, value: 35000, suffix: "+", label: "Housing societies across the state" },
  { icon: TrendingUp, value: 45, suffix: "%", label: "YoY rooftop solar growth" },
  { icon: Factory, value: 12, suffix: "+", label: "Major industrial clusters" },
];

const cities = [
  { name: "Mumbai", insight: "Dense society ecosystem, high tariffs and strong rooftop demand from co-op housing." },
  { name: "Pune", insight: "IT growth, premium homes and societies actively shifting to solar." },
  { name: "Thane", insight: "Fast-growing residential belt with large new society projects." },
  { name: "Nashik", insight: "Independent homes, vineyards and SME industries open to solar." },
  { name: "Nagpur", insight: "High solar irradiance and rising commercial rooftop adoption." },
  { name: "Tier 2/3", insight: "Aurangabad, Kolhapur, Solapur — low competition, strong word-of-mouth markets." },
];

const modelSteps = [
  { icon: Megaphone, title: "Generate Local Leads", desc: "Run local outreach with our marketing toolkit." },
  { icon: Users, title: "Connect with Customers", desc: "Meet, understand needs, share proposals — we guide you." },
  { icon: HandCoins, title: "Close Deals", desc: "Senior team supports site survey, design and negotiation." },
  { icon: BadgeCheck, title: "Execution Support", desc: "Selsify handles installation and commissioning end-to-end." },
  { icon: Target, title: "Earn Commission", desc: "Get paid for every successful project in your area." },
];

const benefits = [
  { icon: GraduationCap, title: "Training", desc: "Sales, basic technical know-how and proposal handling." },
  { icon: Megaphone, title: "Marketing Guidance", desc: "Creatives, ads and lead-gen campaigns ready to use." },
  { icon: FileText, title: "Proposal Support", desc: "We prepare quotes, designs and BOQs for your customers." },
  { icon: Target, title: "Closing Assistance", desc: "Senior team joins key calls to help you close." },
  { icon: Headphones, title: "Execution Support", desc: "Full installation handled by Selsify's team." },
];

const useCases = {
  society: {
    icon: Building2,
    title: "Housing Societies (Mumbai/Thane)",
    desc: "Co-op societies looking to cut common-area bills via 20–100 kW rooftop systems. High-ticket deals with repeat referrals.",
  },
  homes: {
    icon: Home,
    title: "Independent Homes (Pune/Nashik)",
    desc: "Bungalows and row houses installing 3–10 kW on-grid systems. Faster decision cycles and word-of-mouth growth.",
  },
  smb: {
    icon: Store,
    title: "Small Businesses",
    desc: "Shops, clinics, schools and showrooms with high day-time loads — strong ROI in 3–4 years.",
  },
  industrial: {
    icon: Factory,
    title: "Industrial Clusters",
    desc: "MIDC zones in Pune, Aurangabad and Nashik — 50–500 kW systems with significant savings.",
  },
};

const audience = {
  local: { icon: MapPin, title: "Local Entrepreneurs", desc: "Use your local network and city knowledge to build a recurring solar business." },
  sales: { icon: UserCheck, title: "Sales Professionals", desc: "Convert your selling skill into commissions on high-ticket solar deals." },
  owner: { icon: Briefcase, title: "Business Owners", desc: "Add solar as a new vertical to your existing business with low overhead." },
  network: { icon: Network, title: "Network-driven Individuals", desc: "Strong community contacts? Earn through referrals and closures." },
};

const faqs = [
  { q: "Do I need technical knowledge?", a: "No. Our team handles design, site survey and installation. You focus on customers — we train you on the basics." },
  { q: "Will I get leads?", a: "You drive local outreach; we support with marketing creatives, scripts and shared leads where possible. Local effort is what makes this work." },
  { q: "How much can I earn?", a: "Earnings depend on closures. Each residential deal is typically 3–10 lakh ticket size with healthy commissions. Society and commercial deals are larger." },
  { q: "Do I need an office?", a: "No office required to start. Many partners begin from home and scale once they have steady deals." },
  { q: "Which cities do you support in Maharashtra?", a: "All of Maharashtra — Mumbai, Pune, Thane, Nashik, Nagpur, Aurangabad and surrounding tier-2/3 towns." },
];

const works = [
  { src: work1, alt: "Rooftop solar installation Mumbai" },
  { src: work2, alt: "Solar project Pune residential" },
  { src: work3, alt: "Society solar plant Thane" },
  { src: work4, alt: "Commercial solar Maharashtra" },
];

/* ---------- Page ---------- */
const FranchiseMaharashtra = () => {
  useEffect(() => {
    document.title = "Solar Franchise in Maharashtra | Selsify";
    const desc = "Start a solar franchise business in Maharashtra with Selsify. Low investment, high demand, complete training, marketing & execution support.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", desc);
    let l = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!l) { l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); }
    l.href = window.location.href;
  }, []);

  const [activeCity, setActiveCity] = useState(0);
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
            <span className="eyebrow">Franchise · Maharashtra</span>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl leading-tight">
              Solar Franchise in <span className="text-accent">Maharashtra</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              Start your solar business in one of India's fastest-growing energy markets.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["High Demand", "Low Investment", "Local Opportunity"].map((b, i) => (
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
              <img src={heroImg} alt="Selsify solar installation in Maharashtra" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-elevated">
              <div className="text-xs uppercase tracking-wider opacity-90">Operating across</div>
              <div className="text-lg font-bold flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Maharashtra</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MAHARASHTRA */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Market Opportunity</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Why Maharashtra is a Strong Market</h2>
            <p className="mt-3 text-muted-foreground">
              High tariffs, dense urban demand, large society ecosystem and growing commercial rooftops make Maharashtra one of India's top solar markets.
            </p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => <Stat key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* OPPORTUNITY CITIES */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Where Opportunity Exists</span>
            <h2 className="mt-2 text-3xl md:text-4xl">High Potential Cities</h2>
            <p className="mt-3 text-muted-foreground">Tap any city to see why it's a strong market.</p>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-3">
              {cities.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setActiveCity(i)}
                  className={`group text-left rounded-xl border p-4 transition-all ${
                    activeCity === i
                      ? "border-secondary bg-secondary/5 shadow-card"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`h-4 w-4 ${activeCity === i ? "text-secondary" : "text-primary"}`} />
                    <div className="font-semibold text-primary">{c.name}</div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{c.insight}</div>
                </button>
              ))}
            </div>

            <Card className="p-6 border-border/60">
              <div className="flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-wider">
                <BadgeCheck className="h-4 w-4" /> Insight
              </div>
              <h3 className="mt-2 text-2xl">{cities[activeCity].name}</h3>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{cities[activeCity].insight}</p>
              <Button asChild className="mt-5 bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="sm">
                <a href="#apply">Explore this market <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Business Flow</span>
            <h2 className="mt-2 text-3xl md:text-4xl">How This Business Works</h2>
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
            <h2 className="mt-2 text-3xl md:text-4xl">Support You Get</h2>
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

      {/* LOCAL USE CASES */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Local Use Cases</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Where This Works in Maharashtra</h2>
          </div>

          <Tabs defaultValue="society" className="mt-8">
            <TabsList className="flex-wrap h-auto bg-muted p-1">
              <TabsTrigger value="society">Housing Societies</TabsTrigger>
              <TabsTrigger value="homes">Independent Homes</TabsTrigger>
              <TabsTrigger value="smb">Small Businesses</TabsTrigger>
              <TabsTrigger value="industrial">Industrial Clusters</TabsTrigger>
            </TabsList>
            {(Object.keys(useCases) as Array<keyof typeof useCases>).map((k) => {
              const u = useCases[k];
              return (
                <TabsContent key={k} value={k} className="mt-6">
                  <Card className="p-6 md:p-8 border-border/60">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <u.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl">{u.title}</h3>
                        <p className="mt-2 text-muted-foreground">{u.desc}</p>
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
              {["No office required to start", "Low operating cost", "All training & marketing included"].map((p) => (
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
              Generate qualified leads in your city, our team helps you close, and you earn commission on every successful installation. Repeat customers and society referrals compound your income.
            </p>
          </Card>
        </div>
      </section>

      {/* REAL WORK */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Trust Builder</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Real Work in Maharashtra</h2>
            <p className="mt-3 text-muted-foreground">A glimpse of installations executed across the state.</p>
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

      {/* WHO SHOULD APPLY */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Filter</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Who is This For?</h2>
          </div>
          <Tabs defaultValue="local" className="mt-8">
            <TabsList className="flex-wrap h-auto bg-background border border-border p-1">
              <TabsTrigger value="local">Local Entrepreneurs</TabsTrigger>
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
            <h2 className="mt-2 text-3xl md:text-4xl">Apply for Franchise in Maharashtra</h2>
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
                  <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Pune" maxLength={50} required />
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
            <h2 className="mt-2 text-3xl md:text-4xl">Start Your Solar Business in Maharashtra</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Take the first step toward building your own business in a fast-growing local industry.
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

export default FranchiseMaharashtra;
