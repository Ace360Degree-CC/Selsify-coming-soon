import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, ArrowRight, Sparkles, Sun } from "lucide-react";
import hero from "@/assets/hero-banner.webp";

const Hero = () => (
  <section className="relative overflow-hidden">
    {/* Background image with ken-burns + overlay */}
    <div className="absolute inset-0 -z-10">
      <img
        src={hero}
        alt="Engineer installing rooftop solar panels"
        className="w-full h-full object-cover animate-ken-burns"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
    </div>

    <div className="container mx-auto container-px py-20 md:py-28 lg:py-36 grid lg:grid-cols-2 gap-10 items-center">
      <div className="animate-fade-up text-primary-foreground">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wider border border-white/20">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Rooftop Solar • Pan India
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-primary-foreground">
          Reduce Your Electricity Bills with{" "}
          <span className="text-shine">Smart Solar Solutions</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-primary-foreground/85 max-w-xl">
          Reliable rooftop solar systems for homes, societies and businesses — engineered, installed and supported end-to-end.
        </p>

        <ul className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
          {["Real Installations", "Fast Execution", "End-to-End Support"].map((t, i) => (
            <li
              key={t}
              className="flex items-center gap-2 text-primary-foreground/95 animate-fade-up"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <CheckCircle2 className="h-4 w-4 text-secondary" /> {t}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="cta" size="lg" className="shadow-elevated hover:scale-105 transition-transform">
            <a href="#contact">Get Free Consultation <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
          <Button asChild variant="whatsapp" size="lg" className="hover:scale-105 transition-transform">
            <a href="https://wa.me/919892020515"><MessageCircle className="mr-1 h-4 w-4" /> WhatsApp Now</a>
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-6 text-xs text-primary-foreground/80">
          {[
            { v: "500+", l: "Installations" },
            { v: "25Y", l: "Panel Warranty" },
            { v: "3-5Y", l: "Payback" },
          ].map((s, i) => (
            <div key={s.l} className="flex items-center gap-6">
              {i > 0 && <div className="h-8 w-px bg-white/25" />}
              <div>
                <span className="text-2xl md:text-3xl font-bold text-accent">{s.v}</span>
                <div>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating info card on the right */}
      <div className="hidden lg:flex justify-end animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <div className="relative">
          <div className="bg-card/95 backdrop-blur rounded-2xl p-6 shadow-elevated border border-white/40 max-w-sm animate-float">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-secondary/15 flex items-center justify-center">
                <Sun className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="font-semibold text-primary">Live Savings Estimate</div>
                <div className="text-xs text-muted-foreground">Based on a 5kW system</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-surface-soft p-3">
                <div className="text-xs text-muted-foreground">Monthly</div>
                <div className="text-xl font-bold text-primary">₹6,500</div>
              </div>
              <div className="rounded-lg bg-surface-soft p-3">
                <div className="text-xs text-muted-foreground">Yearly</div>
                <div className="text-xl font-bold text-primary">₹78,000</div>
              </div>
            </div>
            <a href="#contact" className="mt-5 inline-flex items-center text-sm font-semibold text-secondary hover:gap-2 gap-1 transition-all">
              Get my exact estimate <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="absolute -top-3 -right-3 h-16 w-16 rounded-full bg-accent/90 text-accent-foreground flex items-center justify-center text-center text-[11px] font-bold leading-tight shadow-elevated animate-float" style={{ animationDelay: "1s" }}>
            UPTO<br/>90%<br/>OFF BILLS
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
