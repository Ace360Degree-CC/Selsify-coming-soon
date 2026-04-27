import { useEffect, useMemo, useState } from "react";
import {
  Sun, Zap, BatteryCharging, Lightbulb, Phone, MessageCircle,
  CheckCircle2, ShieldCheck, Wrench, ArrowRight, PowerOff,
  Home, Tractor, MapPin, Briefcase, Battery, Unplug, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";

const heroImg = "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1400&q=80";
const projectImgs = [
  { src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80", caption: "Farmhouse Setup — Nashik" },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80", caption: "Rural Home — Konkan" },
  { src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80", caption: "Remote Site Installation" },
  { src: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=900&q=80", caption: "Small Business Backup" },
];

const phone = "+919892020515";
const wa = "https://wa.me/919892020515?text=Hi%20Selsify%2C%20I%27m%20interested%20in%20an%20Off-Grid%20solar%20system";

const steps = [
  { icon: Sun, title: "Solar panels generate electricity", desc: "Daytime sunlight produces DC power." },
  { icon: Zap, title: "Inverter converts power", desc: "DC is transformed into usable AC current." },
  { icon: BatteryCharging, title: "Batteries store energy", desc: "Excess power is saved for later use." },
  { icon: Lightbulb, title: "Stored power used at night/outage", desc: "Run appliances anytime — fully independent." },
];

const benefits = [
  { icon: Battery, title: "Complete power backup", desc: "Run your home day and night without grid." },
  { icon: Unplug, title: "Works without electricity connection", desc: "Perfect where the grid hasn't reached." },
  { icon: PowerOff, title: "Independence from grid", desc: "No tariffs, no outages, no dependency." },
  { icon: MapPin, title: "Ideal for remote locations", desc: "Farmhouses, hills, villages, remote sites." },
  { icon: ShieldCheck, title: "Reliable during power cuts", desc: "Uninterrupted supply for critical loads." },
];

const audience = {
  cuts: {
    title: "Frequent Power Cuts",
    desc: "If your area faces 4+ hours of daily outages, off-grid keeps essentials running smoothly without depending on inverters or DG sets.",
    fit: "Strong fit",
  },
  nogrid: {
    title: "No Grid Connection",
    desc: "Properties without a sanctioned electricity connection — off-grid is the only practical, clean and silent solution.",
    fit: "Best fit",
  },
  farm: {
    title: "Farmhouse / Rural",
    desc: "Weekend homes, farms and rural houses where reliability matters more than savings — off-grid gives true independence.",
    fit: "Strong fit",
  },
  biz: {
    title: "Small Business Backup",
    desc: "Shops, clinics or workshops needing guaranteed backup for lights, fans, fridge, billing systems and small machines.",
    fit: "Good fit",
  },
};

const useCases = [
  { icon: Tractor, title: "Farmhouses", desc: "Lights, fans, pumps & TV — all day, all night." },
  { icon: Home, title: "Rural Homes", desc: "Reliable power for daily household needs." },
  { icon: MapPin, title: "Remote Sites", desc: "Construction sites, towers, eco-resorts." },
  { icon: Briefcase, title: "Small Setups", desc: "Shops & micro-businesses needing backup." },
];

const appliancesList = [
  { id: "lights", label: "Lights & Fans", watts: 300 },
  { id: "tv", label: "TV + Set-top Box", watts: 150 },
  { id: "fridge", label: "Refrigerator", watts: 200 },
  { id: "ac", label: "1 Ton AC", watts: 1200 },
  { id: "pump", label: "Water Pump", watts: 750 },
  { id: "computer", label: "Computer / Laptop", watts: 200 },
];

const OffGridSolar = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hours, setHours] = useState([6]);
  const [selected, setSelected] = useState<string[]>(["lights", "tv", "fridge"]);
  const [isOffGridView, setIsOffGridView] = useState(false);

  useEffect(() => {
    document.title = "Off-Grid Solar System in India | Selsify";
    const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "Off-grid solar systems by Selsify — battery backup, complete power independence and reliable installations for homes, farmhouses and remote sites.");
    if (!meta.parentElement) document.head.appendChild(meta);

    const link = document.querySelector('link[rel="canonical"]') || document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", window.location.origin + "/solar-solutions/off-grid");
    if (!link.parentElement) document.head.appendChild(link);
  }, []);

  const totalWatts = useMemo(
    () => selected.reduce((s, id) => s + (appliancesList.find(a => a.id === id)?.watts || 0), 0),
    [selected]
  );
  const batterySize = Math.max(1, Math.round((totalWatts * hours[0]) / 12 / 100) * 100); // Ah @12V approx
  const systemSizeKw = Math.max(1, Math.ceil((totalWatts * 1.3) / 1000));
  const estCost = systemSizeKw * 95000 + batterySize * 12;

  const toggleAppliance = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const compare = isOffGridView
    ? [
        { label: "Grid dependency", val: "None — fully independent" },
        { label: "Battery requirement", val: "Required (essential)" },
        { label: "Upfront cost", val: "Higher (battery cost)" },
        { label: "Backup during outage", val: "Yes — full backup" },
      ]
    : [
        { label: "Grid dependency", val: "Connected to grid" },
        { label: "Battery requirement", val: "Not required" },
        { label: "Upfront cost", val: "Lower" },
        { label: "Backup during outage", val: "No backup" },
      ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative bg-secondary/40 border-b">
        <div className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
              Off-Grid Solar
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
              Off-Grid Solar System for Independent Power
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Generate and store your own electricity with complete independence from the grid.
            </p>
            <ul className="mt-6 space-y-2">
              {["No grid dependency", "Battery backup", "Power during outages"].map((t, i) => (
                <li key={t} className="flex items-center gap-2 text-foreground animate-fade-in" style={{ animationDelay: `${i * 120}ms` }}>
                  <CheckCircle2 className="text-accent" size={20} /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="#calculator">Get Free Consultation <ArrowRight className="ml-1" size={18} /></a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="mr-1" size={18} /> WhatsApp Now</a>
              </Button>
            </div>
          </div>
          <div className="relative group">
            <div className="overflow-hidden rounded-xl shadow-xl border">
              <img
                src={heroImg}
                alt="Off-grid solar installation at a farmhouse"
                loading="eager"
                className="w-full h-[280px] md:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border rounded-lg shadow-lg px-4 py-3 hidden md:block animate-scale-in">
              <p className="text-xs text-muted-foreground">Backup Available</p>
              <p className="text-lg font-bold text-primary">24 / 7 Power</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary text-center">What is an Off-Grid Solar System?</h2>
          <p className="text-center text-muted-foreground mt-3">Tap each point to learn more.</p>
          <Accordion type="single" collapsible className="mt-8" defaultValue="i0">
            {[
              { t: "Works independently of the grid", d: "No connection to the utility — your panels and batteries are the entire power source." },
              { t: "Stores power in batteries", d: "Excess solar energy generated during the day is stored for use whenever needed." },
              { t: "Used anytime — day or night", d: "Run lights, fans, fridge and more even at midnight or during heavy rainfall." },
              { t: "Ideal for no-electricity areas", d: "Perfect where grid is unreliable, expensive or simply unavailable." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`i${i}`} className="border rounded-lg px-4 mb-3 bg-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    {item.t}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-11">{item.d}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 md:py-20 bg-secondary/40 border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-primary text-center">How It Works</h2>
          <p className="text-center text-muted-foreground mt-2">Hover or tap each step.</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const active = activeStep === i;
              return (
                <button
                  key={i}
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(i)}
                  className={`text-left p-5 rounded-xl border transition-all ${active ? "bg-primary text-primary-foreground border-primary shadow-lg -translate-y-1" : "bg-card hover:border-primary/40"}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${active ? "bg-primary-foreground/20" : "bg-primary/10 text-primary"}`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-xs opacity-80 mb-1">Step {i + 1}</p>
                  <p className="font-semibold leading-snug">{s.title}</p>
                  <p className={`text-sm mt-2 ${active ? "opacity-90" : "text-muted-foreground"}`}>{s.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-primary text-center">Why Choose Off-Grid Solar</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Card key={i} className="p-6 hover:-translate-y-1 hover:shadow-xl transition-all border-l-4 border-l-accent group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-primary text-lg">{b.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{b.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-14 md:py-20 bg-secondary/40 border-y">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary text-center">Calculate Your Backup Requirement</h2>
          <p className="text-center text-muted-foreground mt-2">Get an instant indicative estimate based on your needs.</p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="mb-6">
                <Label className="text-base font-semibold text-primary">Backup hours needed</Label>
                <p className="text-sm text-muted-foreground mb-4">How long should the system run without sunlight?</p>
                <Slider value={hours} onValueChange={setHours} min={2} max={24} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>2 hrs</span>
                  <span className="text-primary font-bold text-lg">{hours[0]} hrs</span>
                  <span>24 hrs</span>
                </div>
              </div>
              <div>
                <Label className="text-base font-semibold text-primary">Appliances</Label>
                <p className="text-sm text-muted-foreground mb-3">Select what you want to run on backup.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {appliancesList.map((a) => (
                    <label key={a.id} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${selected.includes(a.id) ? "bg-primary/5 border-primary" : "hover:bg-secondary"}`}>
                      <Checkbox checked={selected.includes(a.id)} onCheckedChange={() => toggleAppliance(a.id)} />
                      <span className="text-sm flex-1">{a.label}</span>
                      <span className="text-xs text-muted-foreground">{a.watts}W</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground flex flex-col">
              <p className="text-sm opacity-80">Estimated requirement</p>
              <div className="mt-4 space-y-5 flex-1">
                <div>
                  <p className="text-xs uppercase opacity-70">Total Load</p>
                  <p className="text-3xl font-bold">{totalWatts.toLocaleString()} W</p>
                </div>
                <div>
                  <p className="text-xs uppercase opacity-70">Suggested Battery</p>
                  <p className="text-3xl font-bold">~ {batterySize} Ah</p>
                  <p className="text-xs opacity-80 mt-1">@ 12V equivalent</p>
                </div>
                <div>
                  <p className="text-xs uppercase opacity-70">Recommended System Size</p>
                  <p className="text-3xl font-bold">{systemSizeKw} kW</p>
                </div>
                <div className="pt-4 border-t border-primary-foreground/20">
                  <p className="text-xs uppercase opacity-70">Indicative Cost</p>
                  <p className="text-2xl font-bold">₹ {estCost.toLocaleString("en-IN")}</p>
                  <p className="text-xs opacity-80 mt-1">Final pricing depends on battery type & site survey.</p>
                </div>
              </div>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground mt-6">
                <a href={wa} target="_blank" rel="noreferrer">Get customised quote <ArrowRight className="ml-1" size={18} /></a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary text-center">Is Off-Grid Right for You?</h2>
          <Tabs defaultValue="cuts" className="mt-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="cuts" className="py-2">Power Cuts</TabsTrigger>
              <TabsTrigger value="nogrid" className="py-2">No Grid</TabsTrigger>
              <TabsTrigger value="farm" className="py-2">Farmhouse</TabsTrigger>
              <TabsTrigger value="biz" className="py-2">Small Business</TabsTrigger>
            </TabsList>
            {Object.entries(audience).map(([k, v]) => (
              <TabsContent key={k} value={k} className="mt-6">
                <Card className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-primary">{v.title}</h3>
                    <span className="text-xs font-semibold bg-accent/15 text-accent px-2 py-1 rounded-full">{v.fit}</span>
                  </div>
                  <p className="text-muted-foreground">{v.desc}</p>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-14 md:py-20 bg-secondary/40 border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-primary text-center">Where Off-Grid Solar Works Best</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map((u, i) => {
              const Icon = u.icon;
              return (
                <Card key={i} className="p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-semibold text-primary">{u.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{u.desc}</p>
                </Card>
              );
            })}
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            {projectImgs.map((p, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg group cursor-pointer">
                <img src={p.src} alt={p.caption} loading="lazy" className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/70 transition-colors flex items-end p-3">
                  <p className="text-primary-foreground text-sm opacity-0 group-hover:opacity-100 transition-opacity font-medium">{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-primary text-center">On-Grid vs Off-Grid</h2>
          <p className="text-center text-muted-foreground mt-2">Toggle to compare both system types.</p>
          <Card className="mt-8 p-6 md:p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className={`font-semibold ${!isOffGridView ? "text-primary" : "text-muted-foreground"}`}>On-Grid</span>
              <Switch checked={isOffGridView} onCheckedChange={setIsOffGridView} />
              <span className={`font-semibold ${isOffGridView ? "text-primary" : "text-muted-foreground"}`}>Off-Grid</span>
            </div>
            <div className="divide-y">
              {compare.map((row, i) => (
                <div key={i} className="grid grid-cols-2 py-3 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-semibold text-primary text-right">{row.val}</span>
                </div>
              ))}
            </div>
            {!isOffGridView && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                Most homes with stable grid power benefit more from On-Grid systems. Switch toggle to see Off-Grid.
              </p>
            )}
          </Card>
        </div>
      </section>

      {/* WHY SELSIFY */}
      <section className="py-14 md:py-20 bg-secondary/40 border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-primary text-center">Why Choose Selsify</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: BatteryCharging, t: "Proper backup sizing", d: "Right-sized batteries — no under or over-spec." },
              { icon: ShieldCheck, t: "Quality batteries", d: "Trusted brands with reliable warranties." },
              { icon: Wrench, t: "Safe installation", d: "Certified electricians, clean wiring, safety first." },
              { icon: Clock, t: "Long-term support", d: "Service partner for years, not a one-time vendor." },
            ].map((x, i) => {
              const Icon = x.icon;
              return (
                <Card key={i} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                  <Icon className="text-accent mb-3" size={26} />
                  <h3 className="font-semibold text-primary">{x.t}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{x.d}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold">Need Power Without Interruption?</h2>
          <p className="mt-4 opacity-90 text-lg">
            We design off-grid systems based on your exact usage and backup needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href={`tel:${phone}`}><Phone className="mr-1" size={18} /> Call Now</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#calculator">Get Free Quote</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href={wa} target="_blank" rel="noreferrer"><MessageCircle className="mr-1" size={18} /> WhatsApp</a>
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-80">Quick response within 15–30 minutes</p>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
};

export default OffGridSolar;
