import { Button } from "@/components/ui/button";

const About = () => (
  <section className="section bg-surface-soft">
    <div className="container mx-auto container-px max-w-3xl text-center">
      <span className="eyebrow">About Selsify</span>
      <h2 className="mt-2 text-3xl md:text-4xl">Built on real experience and practical execution</h2>
      <p className="mt-4 text-muted-foreground">
        Selsify focuses on delivering solar systems that work reliably over time — designed for Indian conditions, installed by experienced teams,
        and supported end-to-end. No flashy promises, just honest engineering and on-ground execution.
      </p>
      <Button asChild variant="outlinePrimary" className="mt-6"><a href="#contact">Read More</a></Button>
    </div>
  </section>
);

export default About;
