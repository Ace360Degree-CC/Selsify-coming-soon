import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Building2,
  Factory,
  Briefcase,
  ClipboardList,
  Lightbulb,
  Wrench,
  HeartHandshake,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HERO_IMG =
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80";

const timeline = [
  {
    phase: "Phase 1",
    year: "Before 2022",
    title: "Business background",
    text: "Years of hands-on business experience across sales, operations, and customer handling — learning what real execution looks like on ground.",
  },
  {
    phase: "Phase 2",
    year: "2020 – 2022",
    title: "Challenges & learning",
    text: "Faced real market and personal challenges. Understood the gap between what companies promise and what actually gets delivered to customers.",
  },
  {
    phase: "Phase 3",
    year: "2022",
    title: "Shift to solar",
    text: "Started Selsify with one clear focus — deliver solar systems that genuinely work, with proper installation and honest communication.",
  },
  {
    phase: "Phase 4",
    year: "2023 – Now",
    title: "Growth through real work",
    text: "Grew steadily through real installations, repeat customers, and word-of-mouth references — not paid hype.",
  },
];

const offerings = [
  { icon: HomeIcon, title: "Residential Solar", text: "Rooftop solar for homes and villas.", to: "/solar-solutions" },
  { icon: Building2, title: "Housing Society Solar", text: "Common-area and society-wide systems.", to: "/solar-solutions" },
  { icon: Factory, title: "Commercial & Industrial", text: "Solar for shops, offices, and factories.", to: "/solar-solutions" },
  { icon: Briefcase, title: "Solar Franchise", text: "Build a solar business with our support.", to: "/franchise" },
];

const approach = [
  { icon: ClipboardList, title: "Understand", text: "We listen to your usage, property, and goals." },
  { icon: Lightbulb, title: "Suggest", text: "We recommend the right system — no overselling." },
  { icon: Wrench, title: "Execute", text: "Clean installation with proper structure and wiring." },
  { icon: HeartHandshake, title: "Support", text: "Long-term service and after-sales guidance." },
];

const differentiators = [
  { icon: ShieldCheck, title: "Real on-ground experience", text: "Years of practical execution, not just sales pitches." },
  { icon: Wrench, title: "Execution quality", text: "We focus on how it's installed, not just what's installed." },
  { icon: MessageSquare, title: "Clear communication", text: "Honest updates from quote to commissioning." },
  { icon: HeartHandshake, title: "Long-term support", text: "We stay connected after installation." },
];

const realWork = [
  "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1611365892117-bce8a85f5036?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80",
];

const useReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const TimelineItem = ({ item, index }: { item: typeof timeline[number]; index: number }) => {
  const { ref, visible } = useReveal();
  const isLeft = index % 2 === 0;
  return (
    <div ref={ref} className="relative md:grid md:grid-cols-2 md:gap-12 items-center">
      {/* Dot */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-secondary border-4 border-background shadow-md z-10" />
      <div
        className={`pl-8 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"} transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Card className="card-lift">
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
              <span>{item.phase}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{item.year}</span>
            </div>
            <h3 className="mt-2 text-xl">{item.title}</h3>
            <p className="mt-2 text-muted-foreground">{item.text}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const About = () => {
  useEffect(() => {
    document.title = "About Selsify | Real Solar Execution Across India";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Selsify is built on real on-ground experience and practical execution. Learn our story, approach, and vision for accessible solar across India.",
    );
    if (!meta.parentElement) document.head.appendChild(meta);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* SECTION 1: HERO */}
      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Selsify team installing rooftop solar"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 container mx-auto container-px h-full flex flex-col justify-center text-primary-foreground">
          <span className="eyebrow text-secondary">About Us</span>
          <h1 className="mt-3 text-4xl md:text-6xl text-primary-foreground max-w-3xl animate-fade-in">
            About Selsify
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/90 max-w-2xl">
            Built on real experience, practical execution, and a vision to make solar accessible across India.
          </p>
        </div>
      </section>

      {/* SECTION 2: INTRO */}
      <section className="section">
        <div className="container mx-auto container-px max-w-3xl text-center">
          <span className="eyebrow">Who We Are</span>
          <h2 className="mt-2 text-3xl md:text-4xl">More Than Just a Solar Company</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Selsify focuses on delivering solar solutions that actually work on ground — with proper execution,
            clear communication, and long-term reliability. No flashy promises, just honest engineering.
          </p>
        </div>
      </section>

      {/* SECTION 3: FOUNDER STORY TIMELINE */}
      <section className="section bg-surface-soft">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-2 text-3xl md:text-4xl">The Journey Behind Selsify</h2>
            <p className="mt-3 text-muted-foreground">
              A simple story of learning from the ground up — and building something that lasts.
            </p>
          </div>

          <div className="relative mt-12 max-w-5xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
            <div className="space-y-10 md:space-y-16">
              {timeline.map((t, i) => (
                <TimelineItem key={t.phase} item={t} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT WE DO */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">What We Do</span>
            <h2 className="mt-2 text-3xl md:text-4xl">What We Offer</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offerings.map((o) => (
              <Link key={o.title} to={o.to} className="group">
                <Card className="card-lift h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <o.icon className="w-6 h-6" />
                    </div>
                    <h3 className="mt-4 text-lg">{o.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{o.text}</p>
                    <div className="mt-4 inline-flex items-center text-sm font-medium text-secondary">
                      Explore <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR APPROACH */}
      <section className="section bg-surface-soft">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Our Approach</span>
            <h2 className="mt-2 text-3xl md:text-4xl">How We Work</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-4 gap-6 relative">
            {approach.map((a, i) => (
              <div key={a.title} className="relative text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-background border-2 border-secondary text-secondary flex items-center justify-center shadow-sm">
                  <a.icon className="w-7 h-7" />
                </div>
                <div className="mt-2 text-xs font-bold text-accent">STEP {i + 1}</div>
                <h3 className="mt-1 text-lg">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.text}</p>
                {i < approach.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-7 -right-3 w-6 h-6 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY SELSIFY */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Why Selsify</span>
            <h2 className="mt-2 text-3xl md:text-4xl">What Makes Us Different</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentiators.map((d) => (
              <Card key={d.title} className="card-lift">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                    <d.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-4 text-base">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: REAL WORK */}
      <section className="section bg-surface-soft">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Real Work</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Built Through Real Work</h2>
            <p className="mt-3 text-muted-foreground">
              Real installations, real teams, real outcomes — no stock visuals.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {realWork.map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg aspect-[4/3] group">
                <img
                  src={src}
                  alt={`Selsify installation ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 8: VISION */}
      <section className="section">
        <div className="container mx-auto container-px max-w-3xl text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="eyebrow mt-4 block">Our Vision</span>
          <h2 className="mt-2 text-3xl md:text-4xl">A Practical Solar Future</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            To make solar energy accessible and practical across India — while creating scalable business
            opportunities through franchise growth.
          </p>
        </div>
      </section>

      {/* SECTION 9: BRAND STATEMENT */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto container-px text-center">
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-primary-foreground">
            Built on Trust. <span className="text-secondary">Driven by Execution.</span>
          </p>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="section">
        <div className="container mx-auto container-px max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl">Want to Work With Us or Learn More?</h2>
          <p className="mt-3 text-muted-foreground">
            Talk to our team — for solar enquiries, franchise opportunities, or any general questions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="cta" size="lg">
              <a href="#contact">Contact Us</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+910000000000"><Phone className="mr-2 w-4 h-4" /> Call Now</a>
            </Button>
            <Button asChild size="lg" className="bg-[hsl(var(--whatsapp))] text-[hsl(var(--whatsapp-foreground))] hover:bg-[hsl(var(--whatsapp))]/90">
              <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">We usually respond within 15–30 minutes.</p>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
};

export default About;
