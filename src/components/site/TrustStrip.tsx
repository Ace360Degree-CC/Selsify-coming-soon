import { ShieldCheck, Wrench, HeadphonesIcon, Briefcase } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Real Installations" },
  { icon: Wrench, label: "High-Efficiency Systems" },
  { icon: HeadphonesIcon, label: "End-to-End Support" },
  { icon: Briefcase, label: "Franchise Opportunity" },
];

const TrustStrip = () => (
  <section className="border-y border-border bg-surface-soft">
    <div className="container mx-auto container-px py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="group flex items-center gap-3 cursor-default">
          <div className="h-10 w-10 rounded-lg bg-primary/8 flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-foreground/85 group-hover:text-primary transition-colors">{label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TrustStrip;
