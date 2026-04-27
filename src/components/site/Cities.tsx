import { MapPin, ArrowUpRight } from "lucide-react";

const cities = ["Mumbai", "Pune", "Thane"];

const Cities = () => (
  <section className="section bg-surface-soft">
    <div className="container mx-auto container-px">
      <div className="max-w-2xl">
        <span className="eyebrow">Service Areas</span>
        <h2 className="mt-2 text-3xl md:text-4xl">Solar Installation Near You</h2>
        <p className="mt-3 text-muted-foreground">On-ground teams across Maharashtra and expanding pan-India.</p>
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {cities.map((c) => (
          <a key={c} href="#contact" className="group bg-card border border-border rounded-xl p-6 flex items-center justify-between hover:border-primary hover:shadow-card transition-all">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-secondary" />
              <div>
                <div className="font-semibold text-primary">Solar in {c}</div>
                <div className="text-xs text-muted-foreground">Residential & Commercial</div>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Cities;
