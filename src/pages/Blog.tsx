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
import { Input } from "@/components/ui/input";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  Search,
  Zap,
  Battery,
  Sparkles,
  Building2,
  BookOpen,
} from "lucide-react";
import priceHero from "@/assets/blog-solar-price-hero.jpg";
import fivekwHero from "@/assets/blog-5kw-hero.jpg";
import ongridHero from "@/assets/blog-ongrid-vs-offgrid-hero.jpg";
import worthItHero from "@/assets/blog-is-solar-worth-it-hero.jpg";

const WHATSAPP = "https://wa.me/919892020515?text=I%20have%20questions%20about%20solar";
const PHONE = "tel:+919892020515";

type Category = "All" | "Pricing" | "System Types" | "Guides" | "Decision Making";

interface Post {
  title: string;
  desc: string;
  to: string;
  img: string;
  read: string;
  category: Exclude<Category, "All">;
  featured?: boolean;
}

const posts: Post[] = [
  {
    title: "Solar Panel Price in India",
    desc: "Understand real solar costs in 2026 — per-kW pricing, what drives variation, and what fair pricing looks like.",
    to: "/blog/solar-panel-price-india",
    img: priceHero,
    read: "8 min read",
    category: "Pricing",
    featured: true,
  },
  {
    title: "5kW Solar System Cost in India",
    desc: "Cost breakdown, monthly savings, and whether 5kW is the right system size for your home.",
    to: "/blog/5kw-solar-system-cost-india",
    img: fivekwHero,
    read: "9 min read",
    category: "Pricing",
    featured: true,
  },
  {
    title: "On-Grid vs Off-Grid Solar",
    desc: "Compare both systems side-by-side and find out which one fits your home or business.",
    to: "/blog/on-grid-vs-off-grid-solar",
    img: ongridHero,
    read: "7 min read",
    category: "System Types",
    featured: true,
  },
  {
    title: "Is Solar Worth It in India?",
    desc: "Honest guide to savings, ROI and long-term value — including when solar isn't the right call.",
    to: "/blog/is-solar-worth-it-india",
    img: worthItHero,
    read: "8 min read",
    category: "Decision Making",
  },
];

const categories: Category[] = ["All", "Pricing", "System Types", "Guides", "Decision Making"];

const solutions = [
  { title: "On-Grid Solar", desc: "Lowest cost, best ROI for cities.", to: "/solar-solutions/on-grid", icon: Zap },
  { title: "Hybrid Solar", desc: "Grid savings + battery backup.", to: "/solar-solutions/hybrid", icon: Battery },
  { title: "Solar Installation in Mumbai", desc: "Local team, fast install, trusted execution.", to: "/solar-installation/mumbai", icon: Building2 },
];

const Blog = () => {
  const [cat, setCat] = useState<Category>("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = "Solar Guides & Insights | Blog – Selsify";
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
      "Practical solar guides on pricing, system types and decision-making. Learn before you invest — clear, jargon-free articles by Selsify."
    );
    meta("keywords", "solar blog India, solar guides, rooftop solar articles, solar cost guides, solar system comparison");
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", window.location.origin + "/blog");
  }, []);

  const featured = posts.filter((p) => p.featured);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchQ = !term || p.title.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term);
      return matchCat && matchQ;
    });
  }, [cat, q]);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-b from-surface-soft to-background border-b border-border">
        <div className="container mx-auto container-px py-12 md:py-20 max-w-4xl text-center">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20" variant="outline">
            <BookOpen className="h-3 w-3 mr-1" /> Selsify Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Solar Guides &amp; Insights
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Simple, practical content to help you understand solar systems, pricing, and the right choices.
          </p>

          {/* SEARCH */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles..."
              className="pl-11 h-12 bg-card"
            />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="container mx-auto container-px max-w-3xl py-10 text-center">
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Whether you're exploring solar for the first time or comparing options, these articles are designed
          to give you clear and useful information — without technical confusion.
        </p>
      </section>

      {/* MAIN GRID */}
      <div className="container mx-auto container-px max-w-7xl pb-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          <div>
            {/* FEATURED */}
            <section>
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">Featured Articles</h2>
                <Sparkles className="h-5 w-5 text-secondary hidden sm:block" />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {featured.map((p) => (
                  <Link key={p.title} to={p.to} className="group">
                    <Card className="overflow-hidden h-full hover:border-secondary/40 hover:shadow-card transition-all">
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={p.img}
                          alt={p.title}
                          loading="lazy"
                          width={1600}
                          height={1000}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <Badge variant="outline" className="text-xs">{p.category}</Badge>
                        <h3 className="mt-3 text-lg font-semibold text-primary group-hover:text-secondary transition-colors leading-snug">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                        <div className="mt-4 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{p.read}</span>
                          <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                            Read More <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* CATEGORY FILTER */}
            <section className="mt-14">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Browse by Topic</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      cat === c
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:border-secondary/40 hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </section>

            {/* ALL ARTICLES */}
            <section className="mt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                {cat === "All" ? "All Articles" : cat}
                <span className="ml-2 text-base text-muted-foreground font-normal">({filtered.length})</span>
              </h2>
              {filtered.length === 0 ? (
                <Card className="mt-6 p-10 text-center">
                  <p className="text-muted-foreground">No articles match your search.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setQ(""); setCat("All"); }}>
                    Reset
                  </Button>
                </Card>
              ) : (
                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                  {filtered.map((p) => (
                    <Link key={p.title} to={p.to} className="group">
                      <Card className="overflow-hidden h-full hover:border-secondary/40 hover:shadow-card transition-all flex sm:flex-col">
                        <div className="w-32 sm:w-full sm:aspect-[16/9] shrink-0 overflow-hidden bg-muted">
                          <img
                            src={p.img}
                            alt={p.title}
                            loading="lazy"
                            width={1600}
                            height={900}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 sm:p-5 flex-1">
                          <Badge variant="outline" className="text-xs">{p.category}</Badge>
                          <h3 className="mt-2 font-semibold text-primary group-hover:text-secondary transition-colors leading-snug">
                            {p.title}
                          </h3>
                          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                            Read More <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* INTERNAL LINK PUSH */}
            <section className="mt-14">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Explore Solar Solutions</h2>
              <p className="mt-2 text-muted-foreground">Ready to move from reading to action? Start here.</p>
              <div className="mt-5 grid sm:grid-cols-3 gap-4">
                {solutions.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link key={s.title} to={s.to} className="group">
                      <Card className="p-5 h-full hover:border-secondary/40 hover:shadow-card transition-all">
                        <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-secondary" />
                        </div>
                        <h3 className="mt-4 font-semibold text-primary group-hover:text-secondary transition-colors">
                          {s.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                        <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                          Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* CTA */}
            <section className="mt-14">
              <Card className="p-8 md:p-10 text-center border-2 border-secondary/30 bg-gradient-to-br from-surface-soft to-background">
                <h2 className="text-2xl md:text-3xl font-bold text-primary">Still Have Questions About Solar?</h2>
                <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                  Get clarity based on your actual usage — not generic advice.
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
                </div>
              </Card>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Popular Articles</h3>
              <ul className="mt-4 space-y-4">
                {posts.slice(0, 4).map((p) => (
                  <li key={p.title}>
                    <Link to={p.to} className="group flex gap-3 items-start">
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        width={120}
                        height={80}
                        className="w-16 h-16 rounded-md object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground group-hover:text-secondary transition-colors leading-snug">
                          {p.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{p.read}</div>
                      </div>
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
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Topics</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.filter((c) => c !== "All").map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted/50 text-foreground hover:bg-secondary/10 hover:text-secondary transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
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

export default Blog;
