import { Sun, BatteryCharging, Zap, Receipt, ArrowRight } from "lucide-react";

const items = [
  { icon: Sun, title: "On-Grid Solar", desc: "Reduce bills with net metering and grid-tied systems." },
  { icon: BatteryCharging, title: "Off-Grid Solar", desc: "Reliable power backup for critical loads and remote sites." },
  { icon: Zap, title: "Hybrid Solar", desc: "Best of both — savings during the day, backup at night." },
  { icon: Receipt, title: "Solar Subsidy", desc: "Understand central & state subsidy options and eligibility." },
];

const Solutions = () => (
  <section id="solutions" className="section">
    <div className="container mx-auto container-px">
      <div className="max-w-2xl">
        <span className="eyebrow">Core Offerings</span>
        <h2 className="mt-2 text-3xl md:text-4xl">Our Solar Solutions</h2>
        <p className="mt-3 text-muted-foreground">Pick the right system for your property — we handle design, install and support.</p>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map(({ icon: Icon, title, desc }) => (
          <a key={title} href="#contact" className="group relative bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all">
            <div className="h-12 w-12 rounded-lg bg-primary/8 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
              Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Solutions;
