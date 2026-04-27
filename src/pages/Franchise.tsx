import { useEffect, useState } from "react";
import {
  Phone, MessageCircle, ArrowRight, CheckCircle2, TrendingUp, Users,
  Briefcase, Target, HandCoins, GraduationCap, Megaphone, FileText,
  Headphones, Sparkles, Building2, UserCheck, MapPin, Send, Clock,
  Zap, Sun, BadgeCheck,
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
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27m%20interested%20in%20the%20Solar%20Franchise%20opportunity";

const stats = [
  { icon: TrendingUp, value: 40, suffix: "%", label: "Annual rise in solar adoption" },
  { icon: Zap, value: 8, suffix: "%", label: "Yearly electricity cost increase" },
  { icon: Sun, value: 500, suffix: "GW", label: "India's 2030 renewable target" },
];

const modelSteps = [
  { icon: Megaphone, title: "Generate Leads", desc: "Use our marketing toolkit and local outreach to find interested customers." },
  { icon: Users, title: "Connect with Customers", desc: "Meet, understand needs, and share proposals — we guide you end-to-end." },
  { icon: HandCoins, title: "Close Deals", desc: "Our team supports site survey, design and final negotiation." },
  { icon: BadgeCheck, title: "Earn Commission", desc: "Get paid for every successful installation in your area." },
];

const partnerBenefits = [
  { icon: GraduationCap, title: "Training", desc: "Sales process, basic technical know-how and proposal handling." },
  { icon: Megaphone, title: "Marketing Support", desc: "Creatives, social posts and lead-gen campaigns ready to use." },
  { icon: FileText, title: "Proposal Assistance", desc: "We prepare quotes, designs and BOQs for your customers." },
  { icon: Target, title: "Closing Support", desc: "Senior team joins key calls to help you close confidently." },
  { icon: Headphones, title: "Ongoing Guidance", desc: "Dedicated partner manager for day-to-day support." },
];

const audience = {
  entrepreneur: {
    icon: Briefcase,
    title: "Entrepreneurs",
    desc: "Start a future-ready business in a high-growth industry without building a product or team from scratch. Plug into Selsify's execution engine.",
  },
  sales: {
    icon: UserCheck,
    title: "Sales Professionals",
    desc: "Use your selling skills in a high-ticket category with strong commissions. We handle delivery — you focus on closing.",
  },
  business: {
    icon: Building2,
    title: "Business Owners",
    desc: "Add solar as a new revenue stream alongside your existing business. Leverage your network for quick wins.",
  },
  individual: {
    icon: MapPin,
    title: "Individuals (Tier 2/3)",
    desc: "Solar demand is rising fastest in smaller cities. Be the first trusted partner in your town.",
  },
};

const realWork = [
  { src: work1, caption: "Residential rooftop install" },
  { src: work2, caption: "Society project" },
  { src: work3, caption: "Commercial setup" },
  { src: work4, caption: "Onsite execution" },
];

const faqs = [
  { q: "Do I need technical knowledge?", a: "No. We handle all technical work — site survey, design, installation and commissioning. You focus on customers." },
  { q: "Will I get leads?", a: "We provide marketing support and digital lead-gen tools, but local outreach and your network play a big role too." },
  { q: "How much can I earn?", a: "Earnings depend on the number of deals closed. Each installation gives a healthy commission. Top partners close multiple projects monthly." },
  { q: "What's the investment?", a: "A one-time fee of ₹50,000 – ₹55,000 covers onboarding, training, marketing kit and partner support." },
  { q: "Is there an exclusive territory?", a: "Yes, we typically assign a defined city/area to each partner to avoid overlap." },
];

const useAnimatedCounter = (target: number, run: boolean, duration = 1500) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
};

const StatCard = ({ icon: Icon, value, suffix, label, run }: any) => {
  const v = useAnimatedCounter(value, run);
  return (
    <Card className="p-6 text-center border-2 hover:border-secondary transition-colors">
      <div className="mx-auto h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-4xl font-bold text-primary">{v}{suffix}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </Card>
  );
};

const Franchise = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [tab, setTab] = useState<keyof typeof audience>("entrepreneur");
  const [form, setForm] = useState({ name: "", phone: "", city: "", background: "", interest: "high" });

  useEffect(() => {
    document.title = "Solar Franchise Opportunity | Selsify";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Start your solar business with Selsify. Low investment, complete training, marketing & closing support. Apply for franchise today.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = window.location.origin + "/franchise";

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setStatsVisible(true));
    }, { threshold: 0.3 });
    const el = document.getElementById("franchise-stats");
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.length > 100) return toast.error("Please enter a valid name");
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) return toast.error("Please enter a valid phone number");
    if (!form.city.trim() || form.city.length > 60) return toast.error("Please enter your city");
    toast.success("Application received! We'll call you within 15–30 minutes.");
    setForm({ name: "", phone: "", city: "", background: "", interest: "high" });
  };

  const Aud = audience[tab];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto container-px grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">Business Opportunity</span>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold text-primary leading-tight">
              Start Your Solar Business with Selsify
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Build a profitable solar business without technical complexity.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Low Investment", "High Demand", "Complete Support"].map((b, i) => (
                <span
                  key={b}
                  className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/30 animate-fade-in"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <CheckCircle2 className="inline h-4 w-4 mr-1" />{b}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="lg">
                <a href="#apply">Apply for Franchise <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={wa} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Talk to Us
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[5/4] shadow-elevated group">
              <img src={heroImg} alt="Selsify solar franchise team on installation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-xl px-4 py-3 shadow-elevated">
              <div className="text-xs uppercase tracking-wider opacity-90">Franchise</div>
              <div className="text-lg font-bold">Pan India</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SOLAR BUSINESS */}
      <section id="franchise-stats" className="section">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Market Opportunity</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Why Solar is a Growing Opportunity</h2>
            <p className="mt-3 text-muted-foreground">Rising bills, government push and customer awareness are creating demand like never before.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {stats.map((s) => <StatCard key={s.label} {...s} run={statsVisible} />)}
          </div>
        </div>
      </section>

      {/* FRANCHISE MODEL */}
      <section className="section bg-muted/30">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Business Model</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">How Our Franchise Model Works</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-4 gap-4 relative">
            {modelSteps.map((s, i) => (
              <div key={s.title} className="relative">
                <Card className="p-6 h-full hover:shadow-elevated transition-all hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <span className="text-3xl font-bold text-muted-foreground/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </Card>
                {i < modelSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 h-6 w-6 text-secondary z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Partner Benefits</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">What You Get as a Franchise Partner</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnerBenefits.map((b) => (
              <Card key={b.title} className="p-6 group hover:border-secondary border-2 transition-all hover:shadow-elevated">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-primary">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EARNING MODEL */}
      <section className="section bg-muted/30">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Earnings</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">How You Earn</h2>
            <p className="mt-3 text-muted-foreground">A simple, transparent commission structure on every installation.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Megaphone, title: "Generate Leads", desc: "Reach out via your network + our marketing kit." },
              { icon: HandCoins, title: "Convert Deals", desc: "We support pricing, design and closing." },
              { icon: Sparkles, title: "Earn Commission", desc: "Healthy payout per successful installation." },
            ].map((s, i) => (
              <Card key={s.title} className="p-6 text-center border-2">
                <div className="mx-auto h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <s.icon className="h-7 w-7" />
                </div>
                <div className="mt-2 text-xs font-semibold text-secondary">STEP {i + 1}</div>
                <h3 className="mt-1 font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="max-w-3xl mx-auto rounded-2xl border-2 border-secondary bg-secondary/5 p-8 md:p-10 shadow-elevated">
            <div className="text-center">
              <span className="eyebrow">Investment & Setup</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">A Realistic, Low-Risk Start</h2>
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-background p-5 border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">One-time Fee</div>
                <div className="mt-2 text-2xl font-bold text-primary">₹50,000 – ₹55,000</div>
              </div>
              <div className="rounded-xl bg-background p-5 border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Setup</div>
                <div className="mt-2 text-2xl font-bold text-primary">No Heavy Setup</div>
              </div>
              <div className="rounded-xl bg-background p-5 border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Operations</div>
                <div className="mt-2 text-2xl font-bold text-primary">Low Cost</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="cta" size="lg">
                <a href="#apply">Apply Now <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHO CAN APPLY */}
      <section className="section bg-muted/30">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Right Fit</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Who is This For?</h2>
          </div>
          <div className="mt-8 max-w-4xl mx-auto">
            <Tabs value={tab} onValueChange={(v) => setTab(v as keyof typeof audience)}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-transparent">
                {Object.entries(audience).map(([k, v]) => (
                  <TabsTrigger key={k} value={k} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                    {v.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(audience).map(([k, v]) => (
                <TabsContent key={k} value={k} className="mt-6">
                  <Card className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                        <v.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{v.title}</h3>
                        <p className="mt-2 text-muted-foreground">{v.desc}</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* REAL WORK */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Trust</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Real Work. Real Execution.</h2>
            <p className="mt-3 text-muted-foreground">You're partnering with a team that delivers on the ground.</p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {realWork.map((w, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <button className="relative rounded-xl overflow-hidden aspect-square group">
                    <img src={w.src} alt={w.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-left text-primary-foreground bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-sm font-medium">{w.caption}</div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0">
                  <img src={w.src} alt={w.caption} className="w-full h-auto" />
                  <div className="p-4 text-sm text-muted-foreground">{w.caption}</div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-muted/30">
        <div className="container mx-auto container-px max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-primary">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="section">
        <div className="container mx-auto container-px max-w-2xl">
          <div className="text-center">
            <span className="eyebrow">Apply</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Apply for Franchise</h2>
            <p className="mt-3 text-muted-foreground">Fill the short form — our team will reach out within 15–30 minutes.</p>
          </div>
          <Card className="mt-8 p-6 md:p-8">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} placeholder="Your full name" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary">Phone *</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={15} placeholder="10-digit mobile" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-primary">City *</label>
                <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} maxLength={60} placeholder="City you want to operate in" required />
              </div>
              <div>
                <label className="text-sm font-medium text-primary">Background (optional)</label>
                <Textarea value={form.background} onChange={(e) => setForm({ ...form, background: e.target.value.slice(0, 500) })} placeholder="Briefly tell us about yourself" rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium text-primary">Interest level</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { v: "exploring", l: "Just exploring" },
                    { v: "serious", l: "Serious" },
                    { v: "high", l: "Ready to start" },
                  ].map((o) => (
                    <button
                      type="button"
                      key={o.v}
                      onClick={() => setForm({ ...form, interest: o.v })}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                        form.interest === o.v
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:border-primary"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" variant="cta" size="lg" className="w-full">
                <Send className="mr-2 h-4 w-4" /> Submit Application
              </Button>
              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" /> We respond within 15–30 minutes
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section bg-primary text-primary-foreground">
        <div className="container mx-auto container-px text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Start Your Solar Business Today</h2>
          <p className="mt-3 text-primary-foreground/80">Take the first step towards building your own business in a growing industry.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild variant="cta" size="lg">
              <a href="#apply">Apply Now <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={`tel:${phone}`}><Phone className="mr-2 h-4 w-4" /> Call Now</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground hover:text-primary">
              <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">We usually respond within 15–30 minutes</p>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
};

export default Franchise;
