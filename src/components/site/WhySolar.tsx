import { TrendingDown, PiggyBank, Wrench, Leaf } from "lucide-react";
import img from "@/assets/solar-field.jpg";

const points = [
  { icon: TrendingDown, title: "Reduce electricity bills", desc: "Cut bills by up to 90% with the right system." },
  { icon: PiggyBank, title: "Long-term savings", desc: "25 years of generation, payback in 3–5 years." },
  { icon: Wrench, title: "Low maintenance", desc: "Minimal upkeep — just periodic cleaning." },
  { icon: Leaf, title: "Sustainable energy", desc: "Reduce your carbon footprint with clean power." },
];

const WhySolar = () => (
  <section className="section bg-primary text-primary-foreground">
    <div className="container mx-auto container-px grid lg:grid-cols-2 gap-12 items-center">
      <div className="rounded-xl overflow-hidden shadow-elevated aspect-[4/3] group">
        <img src={img} alt="Large-scale solar panel field at sunset" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div>
        <span className="eyebrow">Why Solar</span>
        <h2 className="mt-2 text-3xl md:text-4xl text-primary-foreground">Why Switch to Solar?</h2>
        <p className="mt-3 text-primary-foreground/80 max-w-xl">Solar isn’t just clean — it’s the most predictable way to control your energy costs over the next two decades.</p>

        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-primary-foreground/75">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhySolar;
