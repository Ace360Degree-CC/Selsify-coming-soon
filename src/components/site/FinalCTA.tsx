import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, FileText } from "lucide-react";

const FinalCTA = () => (
  <section id="contact" className="section bg-primary text-primary-foreground">
    <div className="container mx-auto container-px text-center max-w-3xl">
      <h2 className="text-3xl md:text-4xl text-primary-foreground">Ready to Switch to Solar?</h2>
      <p className="mt-3 text-primary-foreground/80">Get a customised solar solution designed around your property and consumption.</p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Button asChild variant="cta" size="lg">
          <a href="tel:+919892020515"><Phone className="mr-1 h-4 w-4" /> Call Now</a>
        </Button>
        <Button asChild size="lg" variant="accent">
          <a href="#contact"><FileText className="mr-1 h-4 w-4" /> Get Free Quote</a>
        </Button>
        <Button asChild variant="whatsapp" size="lg">
          <a href="https://wa.me/919892020515"><MessageCircle className="mr-1 h-4 w-4" /> WhatsApp</a>
        </Button>
      </div>
    </div>
  </section>
);

export default FinalCTA;
