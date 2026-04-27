import { Phone, MessageCircle } from "lucide-react";

const StickyButtons = () => (
  <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3">
    <a
      href="https://wa.me/919892020515"
      aria-label="WhatsApp"
      className="relative h-14 w-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring -z-10" />
      <MessageCircle className="h-6 w-6" />
    </a>
    <a
      href="tel:+919892020515"
      aria-label="Call Now"
      className="relative h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring -z-10" />
      <Phone className="h-6 w-6" />
    </a>
  </div>
);

export default StickyButtons;
