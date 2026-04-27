import { Phone, Mail, MessageCircle } from "lucide-react";

const TopBar = () => (
  <div className="hidden md:block bg-primary text-primary-foreground text-xs">
    <div className="container mx-auto container-px flex h-9 items-center justify-between">
      <div className="flex items-center gap-5 opacity-90">
        <a href="tel:+919892020515" className="flex items-center gap-1.5 hover:text-accent transition-colors">
          <Phone className="h-3.5 w-3.5" /> +91 7711889993
        </a>
        <a href="mailto:salesify.panindia@gmail.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
          <Mail className="h-3.5 w-3.5" /> salesify.panindia@gmail.com
        </a>
      </div>
      <a href="https://wa.me/917711889993" className="flex items-center gap-1.5 text-secondary-foreground bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-full font-medium transition-colors">
        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
      </a>
    </div>
  </div>
);

export default TopBar;
