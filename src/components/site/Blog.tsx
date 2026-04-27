import { Button } from "@/components/ui/button";
import img1 from "@/assets/install-2.jpeg";
import img2 from "@/assets/install-3.jpeg";
import img3 from "@/assets/install-7.jpeg";

const blogs = [
  { img: img1, tag: "Pricing", title: "Solar Panel Price in India (2025 Guide)", excerpt: "Latest panel prices, brand comparisons and what affects cost." },
  { img: img2, tag: "Sizing", title: "5kW Solar System Cost & Output", excerpt: "Real numbers for a 5kW residential system — savings & payback." },
  { img: img3, tag: "Compare", title: "On-Grid vs Off-Grid Solar", excerpt: "Which system fits your property? A practical comparison." },
];

const Blog = () => (
  <section id="blog" className="section">
    <div className="container mx-auto container-px">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div className="max-w-2xl">
          <span className="eyebrow">Resources</span>
          <h2 className="mt-2 text-3xl md:text-4xl">Learn About Solar</h2>
        </div>
        <Button asChild variant="outlinePrimary"><a href="#blog">View All Articles</a></Button>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {blogs.map((b, i) => (
          <article key={i} className="bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-shadow">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={b.img} alt={b.title} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">{b.tag}</span>
              <h3 className="mt-2 text-lg leading-snug">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
              <a href="#blog" className="mt-3 inline-block text-sm font-semibold text-secondary hover:text-secondary-hover">Read article →</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
