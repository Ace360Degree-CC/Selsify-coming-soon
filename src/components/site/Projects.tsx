import { Button } from "@/components/ui/button";
import img1 from "@/assets/install-1.jpeg";
import img2 from "@/assets/install-2.jpeg";
import img3 from "@/assets/install-3.jpeg";
import img4 from "@/assets/install-4.jpeg";
import img7 from "@/assets/install-7.jpeg";

const projects = [
  { img: img1, caption: "5kW Residential – Bengaluru" },
  { img: img2, caption: "8kW Society Rooftop – Bengaluru" },
  { img: img4, caption: "3kW Residential – Malvani, Mumbai" },
  { img: img3, caption: "10kW Society – Bengaluru" },
  { img: img7, caption: "Structure Install – Mumbai" },
  { img: img2, caption: "Commercial Rooftop – Pune" },
];

const Projects = () => (
  <section id="projects" className="section">
    <div className="container mx-auto container-px">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div className="max-w-2xl">
          <span className="eyebrow">Our Work</span>
          <h2 className="mt-2 text-3xl md:text-4xl">Our Installations</h2>
          <p className="mt-3 text-muted-foreground">Real projects, real rooftops — see the systems we’ve delivered on the ground.</p>
        </div>
        <Button asChild variant="outlinePrimary"><a href="#contact">View All Projects</a></Button>
      </div>

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <figure key={i} className="group relative rounded-xl overflow-hidden border border-border shadow-card">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.img} alt={p.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent text-primary-foreground p-4 text-sm font-medium">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
