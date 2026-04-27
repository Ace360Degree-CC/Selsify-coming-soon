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
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Banknote,
  FileCheck2,
  Wrench,
  Search,
  Wallet,
  Clock,
  Settings2,
  AlertTriangle,
  Home,
  Building2,
  Factory,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import hero from "@/assets/solar-subsidy-hero.jpg";

const WHATSAPP =
  "https://wa.me/919892020515?text=I%20want%20to%20understand%20solar%20subsidy%20options";
const PHONE = "tel:+919892020515";

const whatIsCards = [
  {
    icon: Banknote,
    title: "Government Support",
    desc: "A direct financial benefit from the central government to encourage rooftop solar adoption.",
  },
  {
    icon: Wallet,
    title: "Reduces Upfront Cost",
    desc: "Lowers your initial investment, making solar more accessible for first-time buyers.",
  },
  {
    icon: Home,
    title: "Mostly for Residential",
    desc: "Designed primarily for individual homeowners — not commercial or industrial use.",
  },
];

const eligibleList = [
  { icon: Home, label: "Individual homeowners with own rooftop" },
  { icon: Home, label: "Residential properties (independent houses)" },
  { icon: Home, label: "Housing societies (group housing — limited scheme)" },
];

const notEligibleList = [
  { icon: Building2, label: "Commercial buildings & offices" },
  { icon: Factory, label: "Industrial facilities" },
  { icon: Building2, label: "Rented properties without owner consent" },
];

const steps = [
  {
    icon: FileCheck2,
    title: "Apply through approved channel",
    desc: "Register on the national portal and select an empanelled vendor.",
  },
  {
    icon: Wrench,
    title: "Install system as per guidelines",
    desc: "Only approved panels, inverters, and meters can be used.",
  },
  {
    icon: Search,
    title: "Inspection & net-meter installation",
    desc: "DISCOM officials inspect and certify the installation.",
  },
  {
    icon: Banknote,
    title: "Subsidy credited to your account",
    desc: "After approval, the subsidy amount is transferred directly to your bank.",
  },
];

const benefits = [
  {
    icon: Wallet,
    title: "Lower Upfront Cost",
    desc: "Reduces initial investment significantly for eligible homeowners.",
  },
  {
    icon: ShieldCheck,
    title: "Government-Backed",
    desc: "Officially regulated process with transparent eligibility rules.",
  },
  {
    icon: Sparkles,
    title: "Encourages Solar Adoption",
    desc: "Helps India shift toward clean energy — and helps you join early.",
  },
];

const limitations = [
  {
    icon: Clock,
    title: "Longer Approval Time",
    desc: "Processing, inspection and disbursal can take several weeks to months.",
  },
  {
    icon: Settings2,
    title: "Limited Flexibility",
    desc: "System size, design and brand choices are restricted by the scheme.",
  },
  {
    icon: AlertTriangle,
    title: "Restricted Components",
    desc: "Only specific empanelled brands and DCR panels are allowed.",
  },
  {
    icon: Clock,
    title: "Delayed Installation",
    desc: "Vendor queues and paperwork often slow down the start of work.",
  },
];

const compareRows = [
  { factor: "Cost", subsidy: "Lower", non: "Slightly higher" },
  { factor: "Time", subsidy: "Slower", non: "Faster" },
  { factor: "Flexibility", subsidy: "Limited", non: "High" },
  { factor: "Performance", subsidy: "Standard", non: "Better options" },
  { factor: "Brand Choice", subsidy: "Restricted list", non: "Open market" },
];

const faqs = [
  {
    q: "How much subsidy is available?",
    a: "Subsidy amounts vary by system size and current government policy. For residential rooftop systems up to 3 kW, a higher per-kW rate typically applies, with reduced rates for systems between 3–10 kW. Exact figures change with scheme updates — we share the latest applicable amount during your free consultation.",
  },
  {
    q: "How long does the subsidy process take?",
    a: "End-to-end, the process generally takes 6–12 weeks: application, vendor allocation, installation, inspection, and finally subsidy credit. Non-subsidy installations can typically be completed in 2–4 weeks.",
  },
  {
    q: "Is taking subsidy mandatory?",
    a: "No. Subsidy is optional. Many homeowners choose non-subsidy systems for faster installation, better components, and design flexibility — especially if they want a hybrid system or premium panels.",
  },
  {
    q: "Can I claim subsidy if I already installed solar?",
    a: "No. Subsidy must be applied for before installation through the approved channel. Retroactive claims are not accepted.",
  },
];

const SolarSubsidy = () => {
  const [eligibilityTab, setEligibilityTab] = useState<"eligible" | "not">(
    "eligible",
  );
  const [view, setView] = useState<"subsidy" | "non">("non");
  const [priority, setPriority] = useState<"cost" | "speed" | null>(null);

  useEffect(() => {
    document.title = "Solar Subsidy in India – Eligibility, Process & Comparison | Selsify";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Solar subsidy in India explained simply: eligibility, process, benefits, limitations, and a clear subsidy vs non-subsidy comparison to help you decide.",
    );
    if (!meta.parentElement) document.head.appendChild(meta);

    const canonicalHref = `${window.location.origin}/solar-subsidy-india`;
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;
  }, []);

  const recommendation = useMemo(() => {
    if (priority === "cost")
      return {
        title: "Subsidy may suit you",
        desc: "If lower upfront cost is your top priority and you can wait a few weeks longer for installation, the subsidy route makes sense.",
        tone: "primary",
      };
    if (priority === "speed")
      return {
        title: "Non-Subsidy is likely better",
        desc: "If you want faster installation, premium components, design flexibility, and hybrid options — a non-subsidy system fits you better.",
        tone: "cta",
      };
    return null;
  }, [priority]);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/15">
                Solar Subsidy Guide • India
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
                Solar Subsidy in India –{" "}
                <span className="text-primary">What You Should Know</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Understand subsidy options, eligibility, and whether it's the
                right choice for you — explained simply, without sales pressure.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Now
                  </a>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-cta" />
                Honest comparison • No hidden agenda
              </div>
            </div>
            <div className="relative">
              <img
                src={hero}
                alt="Residential rooftop solar installation in India eligible for subsidy"
                width={1280}
                height={896}
                className="w-full h-auto rounded-2xl shadow-elevated object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS SUBSIDY */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              What is Solar Subsidy?
            </h2>
            <p className="text-muted-foreground">
              In simple terms — financial help from the government to make
              rooftop solar more affordable for Indian homes.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {whatIsCards.map((c) => (
              <Card key={c.title} className="p-6 hover:shadow-elevated transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY TABS */}
      <section className="py-14 md:py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Who Can Apply?</h2>
            <p className="text-muted-foreground">
              Subsidy is targeted at specific user types. Check your category below.
            </p>
          </div>
          <div className="inline-flex rounded-lg border bg-background p-1 mb-6">
            <button
              onClick={() => setEligibilityTab("eligible")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                eligibilityTab === "eligible"
                  ? "bg-cta text-cta-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CheckCircle2 className="inline h-4 w-4 mr-1" /> Eligible
            </button>
            <button
              onClick={() => setEligibilityTab("not")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                eligibilityTab === "not"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <XCircle className="inline h-4 w-4 mr-1" /> Not Eligible
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {(eligibilityTab === "eligible" ? eligibleList : notEligibleList).map(
              (item, i) => (
                <Card
                  key={i}
                  className={`p-5 flex items-start gap-3 ${
                    eligibilityTab === "eligible"
                      ? "border-cta/30 bg-cta/5"
                      : "border-muted bg-muted/30"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                      eligibilityTab === "eligible"
                        ? "bg-cta/15 text-cta"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium pt-1.5">{item.label}</p>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - TIMELINE */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              How the Subsidy Process Works
            </h2>
            <p className="text-muted-foreground">
              A simple 4-step flow — from application to subsidy credit.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-border" />
            <div className="grid gap-6 md:grid-cols-4">
              {steps.map((s, i) => (
                <div key={s.title} className="relative">
                  <div className="relative z-10 mx-auto h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-elevated">
                    {i + 1}
                  </div>
                  <Card className="mt-4 p-5 text-center h-full">
                    <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-14 md:py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">Benefits of Subsidy</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((b) => (
              <Card key={b.title} className="p-6 border-cta/20">
                <div className="h-12 w-12 rounded-xl bg-cta/10 text-cta flex items-center justify-center mb-4">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LIMITATIONS */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Things to Consider</h2>
            <p className="text-muted-foreground">
              Subsidy isn't always the better choice. Here's what most companies
              don't tell you upfront.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {limitations.map((l) => (
              <Card key={l.title} className="p-5 border-l-4 border-l-accent">
                <l.icon className="h-6 w-6 text-accent mb-3" />
                <h3 className="font-semibold mb-1">{l.title}</h3>
                <p className="text-sm text-muted-foreground">{l.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSIDY VS NON-SUBSIDY */}
      <section className="py-14 md:py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Subsidy vs Non-Subsidy
            </h2>
            <p className="text-muted-foreground">
              Toggle below to see how each option performs across key factors.
            </p>
          </div>

          <div className="inline-flex rounded-lg border bg-background p-1 mb-6">
            <button
              onClick={() => setView("subsidy")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === "subsidy"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              With Subsidy
            </button>
            <button
              onClick={() => setView("non")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === "non" ? "bg-cta text-cta-foreground" : "text-muted-foreground"
              }`}
            >
              Non-Subsidy
            </button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="text-left p-4 font-semibold">Factor</th>
                    <th
                      className={`text-left p-4 font-semibold ${
                        view === "subsidy" ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      With Subsidy
                    </th>
                    <th
                      className={`text-left p-4 font-semibold ${
                        view === "non" ? "bg-cta/10 text-cta" : ""
                      }`}
                    >
                      Non-Subsidy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((r, i) => (
                    <tr key={r.factor} className={i % 2 ? "bg-muted/20" : ""}>
                      <td className="p-4 font-medium">{r.factor}</td>
                      <td
                        className={`p-4 ${
                          view === "subsidy" ? "bg-primary/5 font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {r.subsidy}
                      </td>
                      <td
                        className={`p-4 ${
                          view === "non" ? "bg-cta/5 font-medium text-cta" : "text-muted-foreground"
                        }`}
                      >
                        {r.non}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-cta" />
            Most informed homeowners choose Non-Subsidy for speed and flexibility — but the right answer depends on your priorities.
          </p>
        </div>
      </section>

      {/* DECISION TOOL */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-3">
                What Should You Choose?
              </h2>
              <p className="text-muted-foreground">
                Answer one question — get a clear suggestion.
              </p>
            </div>
            <Card className="p-6 md:p-8">
              <p className="font-semibold mb-5 text-center">
                What matters more to you?
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <button
                  onClick={() => setPriority("cost")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    priority === "cost"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <Wallet className="h-6 w-6 text-primary mb-2" />
                  <p className="font-semibold mb-1">Lower upfront cost</p>
                  <p className="text-sm text-muted-foreground">
                    I'm okay waiting longer to save more initially.
                  </p>
                </button>
                <button
                  onClick={() => setPriority("speed")}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    priority === "speed"
                      ? "border-cta bg-cta/5"
                      : "border-border hover:border-cta/40"
                  }`}
                >
                  <Sparkles className="h-6 w-6 text-cta mb-2" />
                  <p className="font-semibold mb-1">Faster + better system</p>
                  <p className="text-sm text-muted-foreground">
                    I want premium components and quick installation.
                  </p>
                </button>
              </div>

              {recommendation && (
                <div
                  className={`mt-6 p-5 rounded-xl border-2 ${
                    recommendation.tone === "cta"
                      ? "border-cta bg-cta/5"
                      : "border-primary bg-primary/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className={`h-6 w-6 shrink-0 ${
                        recommendation.tone === "cta" ? "text-cta" : "text-primary"
                      }`}
                    />
                    <div>
                      <p className="font-semibold mb-1">{recommendation.title}</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {recommendation.desc}
                      </p>
                      <Button asChild size="sm" className="bg-cta text-cta-foreground hover:bg-cta/90">
                        <a href={WHATSAPP} target="_blank" rel="noreferrer">
                          Get personalised guidance
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="py-14 md:py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                How We Help You Decide
              </h2>
              <p className="text-muted-foreground mb-6">
                We don't push subsidy or non-subsidy. We compare both honestly
                for your specific home and electricity usage.
              </p>
              <ul className="space-y-3">
                {[
                  "Compare both options side-by-side for your bill",
                  "Explain real differences in cost, time and components",
                  "Suggest the best fit — not the most profitable for us",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cta shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-6 bg-background">
              <h3 className="font-semibold text-lg mb-4">Related Reads</h3>
              <div className="space-y-3">
                <Link
                  to="/blog/solar-panel-price-india"
                  className="block p-3 rounded-lg hover:bg-muted/60 transition-colors"
                >
                  <p className="font-medium text-sm">Solar Panel Price in India</p>
                  <p className="text-xs text-muted-foreground">
                    Real costs and pricing factors
                  </p>
                </Link>
                <Link
                  to="/blog/5kw-solar-system-cost-india"
                  className="block p-3 rounded-lg hover:bg-muted/60 transition-colors"
                >
                  <p className="font-medium text-sm">5kW Solar System Cost</p>
                  <p className="text-xs text-muted-foreground">
                    Cost breakdown for typical homes
                  </p>
                </Link>
                <Link
                  to="/blog/is-solar-worth-it-india"
                  className="block p-3 rounded-lg hover:bg-muted/60 transition-colors"
                >
                  <p className="font-medium text-sm">Is Solar Worth It?</p>
                  <p className="text-xs text-muted-foreground">
                    ROI and long-term value
                  </p>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-7 w-7 text-primary" />
            <h2 className="text-2xl md:text-4xl font-bold">Frequently Asked</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Not Sure Which Option is Right?
          </h2>
          <p className="text-primary-foreground/85 mb-8">
            Get clear guidance based on your property and usage — subsidy or
            non-subsidy, we'll show you both.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-5">
            <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
              <a href={PHONE}>
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                Get Free Quote
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </a>
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/75 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            We respond within 15–30 minutes
          </p>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
};

export default SolarSubsidy;
