import { Home, Building2, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  { icon: Home, title: "Solar for Home", desc: "Cut your monthly electricity bill with rooftop solar designed for Indian homes." },
  { icon: Building2, title: "Solar for Housing Societies", desc: "Power common areas and lifts with shared rooftop solar systems." },
  { icon: Factory, title: "Commercial & Industrial", desc: "Lower OPEX and improve sustainability metrics with C&I solar." },
];

const UseCases = () => (
  <section className="section bg-surface-soft">
    <div className="container mx-auto container-px">
      <div className="max-w-2xl">
        <span className="eyebrow">Use Cases</span>
        <h2 className="mt-2 text-3xl md:text-4xl">Solar Solutions for Every Requirement</h2>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-card rounded-xl p-6 border border-border shadow-card">
            <Icon className="h-8 w-8 text-accent" />
            <h3 className="mt-4 text-lg">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            <Button asChild variant="outlinePrimary" size="sm" className="mt-5">
              <a href="#contact">Get Quote</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCases;
