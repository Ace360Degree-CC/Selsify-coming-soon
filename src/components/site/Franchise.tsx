import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import img from "@/assets/install-4.jpeg";

const Franchise = () => (
  <section id="franchise" className="section">
    <div className="container mx-auto container-px grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span className="eyebrow">Business Opportunity</span>
        <h2 className="mt-2 text-3xl md:text-4xl">Start Your Solar Business</h2>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Build your own solar business with complete support and low investment — products, training, leads and marketing covered.
        </p>

        <ul className="mt-6 space-y-3">
          {[
            { t: "Low entry cost", d: "Start with a minimal investment and scale with demand." },
            { t: "High demand", d: "Solar adoption is accelerating across Indian cities and tier-2 towns." },
            { t: "Full support", d: "No technical background required — we handle design & execution." },
          ].map((p) => (
            <li key={p.t} className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-primary">{p.t}</div>
                <div className="text-sm text-muted-foreground">{p.d}</div>
              </div>
            </li>
          ))}
        </ul>

        <Button asChild variant="cta" size="lg" className="mt-8">
          <a href="#contact">Explore Franchise <ArrowRight className="ml-1 h-4 w-4" /></a>
        </Button>
      </div>

      <div className="relative">
        <div className="rounded-2xl overflow-hidden aspect-[5/4] shadow-elevated">
          <img src={img} alt="Solar franchise installation team on site" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-xl px-4 py-3 shadow-elevated">
          <div className="text-xs uppercase tracking-wider opacity-90">Franchise</div>
          <div className="text-lg font-bold">Pan India</div>
        </div>
      </div>
    </div>
  </section>
);

export default Franchise;
