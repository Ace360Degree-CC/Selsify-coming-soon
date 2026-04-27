import logo from "@/assets/salesify-logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

const cols = [
  { title: "Company", links: ["About Us", "Projects", "Contact"] },
  { title: "Solar Solutions", links: ["On-Grid", "Off-Grid", "Hybrid", "Subsidy"] },
  { title: "Services", links: ["Solar for Home", "Solar for Society", "Commercial Solar"] },
  { title: "Locations", links: ["Mumbai", "Pune", "Thane"] },
  { title: "Franchise", links: ["Franchise India", "Franchise Maharashtra"] },
];

const Footer = () => (
  <footer className="bg-foreground text-background/85">
    <div className="container mx-auto container-px py-14 grid lg:grid-cols-6 gap-10">
      <div className="lg:col-span-2">
        <img src={logo} alt="Selsify logo" className="h-12 w-auto bg-background rounded-lg p-1.5" />
        <p className="mt-4 text-sm text-background/70 max-w-xs">
          Salesify Impex Pvt Ltd — practical rooftop solar for homes, societies and businesses across India.
        </p>
        <ul className="mt-5 space-y-2 text-sm">
          <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" /> +91 77118 89993</li>
          {/* <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-secondary" /> salesify.panindia@gmail.com</li> */}
          <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-secondary mt-0.5" /> 147/8A, Gate no 5, Malwani, Malad West</li>
        </ul>
      </div>

      {cols.map((c) => (
        <div key={c.title}>
          <h4 className="text-background font-semibold text-sm uppercase tracking-wider">{c.title}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {c.links.map((l) => (
              <li key={l}><a href="#" className="text-background/70 hover:text-secondary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="border-t border-background/10">
      <div className="container mx-auto container-px py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/60">
        <div>© {new Date().getFullYear()} Salesify Impex Pvt Ltd. All rights reserved.</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-secondary">Privacy Policy</a>
          <a href="#" className="hover:text-secondary">Terms & Conditions</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
