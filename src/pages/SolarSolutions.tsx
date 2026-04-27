import { Sun, BatteryCharging, Zap, Receipt, ArrowRight, Phone, MessageCircle, CheckCircle2, ShieldCheck, Wrench, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";

const heroImg = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80";
const installImgs = [
  "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=900&q=80",
];

const cards = [
  {
    icon: Sun,
    title: "On-Grid Solar System",
    desc: "Best for reducing electricity bills using net metering.",
    points: ["No battery required", "Lower cost", "High efficiency"],
    cta: "Explore On-Grid",
  },
  {
    icon: BatteryCharging,
    title: "Off-Grid Solar System",
    desc: "Ideal for areas with power cuts or no grid connection.",
    points: ["Battery backup", "Independent system", "Suitable for remote areas"],
    cta: "Explore Off-Grid",
  },
  {
    icon: Zap,
    title: "Hybrid Solar System",
    desc: "Combination of savings and backup.",
    points: ["Grid + battery", "Flexible usage", "Backup support"],
    cta: "Explore Hybrid",
  },
  {
    icon: Receipt,
    title: "Solar Subsidy",
    desc: "Understand government subsidy options and eligibility.",
    points: ["Lower upfront cost", "Process-based system", "Residential use"],
    cta: "Learn About Subsidy",
  },
];

const choose = [
  { label: "Want to reduce bills", value: "On-Grid" },
  { label: "Need backup", value: "Off-Grid / Hybrid" },
  { label: "Want both savings & backup", value: "Hybrid" },
  { label: "Looking for subsidy", value: "Subsidy System" },
];

const why = [
  { icon: Wrench, title: "Real on-ground experience", desc: "Hundreds of rooftops installed across India." },
  { icon: ShieldCheck, title: "Proper system design", desc: "Right sizing based on your usage and roof." },
  { icon: CheckCircle2, title: "Clean installation", desc: "Neat cabling, safe mounting, tidy finish." },
  { icon: HeartHandshake, title: "Long-term support", desc: "Maintenance and service after installation." },
];

const SolarSolutions = () => {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Solar Installation",
    provider: {
      "@type": "LocalBusiness",
      name: "Selsify (Salesify Impex Pvt Ltd)",
      telephone: "+91-98920-20515",
    },
    areaServed: "India",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar Solutions",
      itemListElement: cards.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title, description: c.desc },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <title>Solar Solutions — On-Grid, Off-Grid, Hybrid & Subsidy | Selsify</title>
      <meta name="description" content="Explore Selsify's solar solutions — On-Grid, Off-Grid, Hybrid systems and Government Subsidy options for homes and businesses across India." />
      <link rel="canonical" href="/solar-solutions" />

      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Rooftop solar installation" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="relative container mx-auto container-px py-20 md:py-28 text-primary-foreground">
          <span className="eyebrow text-secondary">Solar Solutions</span>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl text-primary-foreground max-w-3xl">
            Solar Solutions for Every Requirement
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-primary-foreground/85">
            Choose the right solar system based on your usage, budget, and power needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="cta" size="lg">
              <a href="#contact">Get Free Consultation</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground hover:text-primary">
              <a href="https://wa.me/919892020515"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Now</a>
            </Button>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container mx-auto container-px max-w-3xl text-center">
          <span className="eyebrow">Overview</span>
          <h2 className="mt-2 text-3xl md:text-4xl">Right system for your requirement</h2>
          <p className="mt-4 text-muted-foreground">
            We offer different types of solar systems based on your requirement — whether your goal is saving on
            electricity bills, getting backup, or both. Our team helps you choose the right system based on your
            usage and property.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Solar Types</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Pick the system that fits you</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {cards.map(({ icon: Icon, title, desc, points, cta }) => (
              <div key={title} className="group bg-card rounded-2xl p-7 md:p-8 border border-border shadow-card card-lift">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl md:text-2xl">{title}</h3>
                <p className="mt-2 text-muted-foreground">{desc}</p>
                <ul className="mt-5 space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-6 inline-flex items-center text-sm font-semibold text-secondary group/cta">
                  {cta} <ArrowRight className="ml-1 h-4 w-4 group-hover/cta:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO CHOOSE */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="eyebrow">Decision Guide</span>
              <h2 className="mt-2 text-3xl md:text-4xl">Which Solar System is Right for You?</h2>
              <p className="mt-3 text-muted-foreground">A quick guide to help you decide based on your priority.</p>
              <Button asChild variant="cta" size="lg" className="mt-6">
                <a href="#contact">Get Expert Guidance</a>
              </Button>
            </div>
            <div className="bg-card rounded-2xl border border-border shadow-card divide-y divide-border">
              {choose.map((c) => (
                <div key={c.label} className="flex items-center justify-between p-5">
                  <span className="text-foreground/80">{c.label}</span>
                  <span className="font-semibold text-primary">→ {c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY SELSIFY */}
      <section className="section bg-muted/40">
        <div className="container mx-auto container-px">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Us</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Why Choose Selsify</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {why.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card rounded-xl p-6 border border-border shadow-card card-lift">
                <div className="h-11 w-11 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="max-w-2xl">
              <span className="eyebrow">Projects</span>
              <h2 className="mt-2 text-3xl md:text-4xl">Our Installations</h2>
              <p className="mt-3 text-muted-foreground">Real rooftops. Real homes. Real savings.</p>
            </div>
            <Button asChild variant="outline">
              <a href="/#projects">View All Projects</a>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {installImgs.map((src, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl aspect-[4/3] border border-border">
                <img src={src} alt={`Solar installation ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="section bg-primary text-primary-foreground">
        <div className="container mx-auto container-px text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl text-primary-foreground">Not Sure Which System to Choose?</h2>
          <p className="mt-3 text-primary-foreground/85">Get guidance based on your usage and property.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild variant="cta" size="lg">
              <a href="tel:+919892020515"><Phone className="mr-2 h-5 w-5" /> Call Now</a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#contact">Get Free Quote</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground hover:text-primary">
              <a href="https://wa.me/919892020515"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </>
  );
};

export default SolarSolutions;
