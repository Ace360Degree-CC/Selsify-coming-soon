import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/salesify-logo.png";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "On-Grid", href: "#solutions" },
  { label: "Off-Grid", href: "#solutions" },
  { label: "Hybrid", href: "#solutions" },
  { label: "Subsidy", href: "#solutions" },
  { label: "Projects", href: "#projects" },
  { label: "Franchise", href: "#franchise" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto container-px flex h-20 md:h-24 items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img src={logo} alt="Selsify rooftop solar" className="h-14 md:h-16 w-auto transition-transform group-hover:scale-105" />
          <span className="sr-only">Selsify</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="nav-link">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="cta" size="sm">
            <a href="#contact">Get Free Quote</a>
          </Button>
        </div>

        <button className="lg:hidden text-primary p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto container-px py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="text-sm font-medium py-1.5 text-foreground/80">
                {n.label}
              </a>
            ))}
            <Button asChild variant="cta" className="mt-2">
              <a href="#contact">Get Free Quote</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
