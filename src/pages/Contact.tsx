import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  Send,
  Clock,
  Home as HomeIcon,
  Building2,
  Factory,
  Briefcase,
} from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PHONE = "+910000000000";
const WHATSAPP = "910000000000";
const EMAIL = "hello@selsify.in";

const contactSchema = z.object({
  name: z.string().trim().nonempty({ message: "Please enter your name" }).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{7,15}$/u, { message: "Enter a valid phone number" }),
  email: z
    .string()
    .trim()
    .max(255)
    .email({ message: "Invalid email" })
    .optional()
    .or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  requirement: z.string().min(1, { message: "Select a requirement" }),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const requirements = [
  { value: "home", label: "Solar for Home", icon: HomeIcon },
  { value: "society", label: "Solar for Society", icon: Building2 },
  { value: "commercial", label: "Commercial Solar", icon: Factory },
  { value: "franchise", label: "Franchise Opportunity", icon: Briefcase },
];

const cities = ["Mumbai", "Pune", "Thane", "Navi Mumbai", "Nashik", "Across Maharashtra"];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    requirement: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Selsify | Solar & Franchise Enquiries";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Contact Selsify for solar installation, pricing, or franchise enquiries. Call, WhatsApp, or send a request — we respond within 15–30 minutes.",
    );
    if (!meta.parentElement) document.head.appendChild(meta);
  }, []);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitted(true);
    toast.success("Request received! We'll contact you within 15–30 minutes.");
    setForm({ name: "", phone: "", email: "", city: "", requirement: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const quickSelect = (kind: "install" | "pricing" | "franchise") => {
    if (kind === "franchise") {
      update("requirement", "franchise");
    } else {
      update("requirement", "home");
    }
    const text =
      kind === "install"
        ? "Hi Selsify, I'd like to get solar installed."
        : kind === "pricing"
          ? "Hi Selsify, I'd like to check solar pricing."
          : "Hi Selsify, I'm interested in the franchise opportunity.";
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="bg-surface-soft border-b border-border">
        <div className="container mx-auto container-px py-14 md:py-20 text-center max-w-3xl">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-2 text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions about solar or franchise opportunities? We're here to help.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-secondary font-medium">
            <Clock className="w-4 h-4" /> Average response time: 15–30 minutes
          </div>
        </div>
      </section>

      {/* QUICK CONTACT */}
      <section className="section">
        <div className="container mx-auto container-px">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Direct Channels</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Talk to Us Directly</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {/* Call */}
            <a href={`tel:${PHONE}`} className="group">
              <Card className="card-lift h-full">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 text-lg">Call Us</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Speak directly with our team</p>
                  <div className="mt-3 font-semibold text-primary">{PHONE}</div>
                </CardContent>
              </Card>
            </a>

            {/* WhatsApp - highlighted */}
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <Card className="card-lift h-full border-2 border-secondary relative overflow-hidden">
                <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                  Fastest
                </div>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-[hsl(var(--whatsapp))] text-[hsl(var(--whatsapp-foreground))] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 text-lg">WhatsApp</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Instant chat, quick replies</p>
                  <Button
                    variant="cta"
                    size="sm"
                    className="mt-3 pointer-events-none"
                    asChild
                  >
                    <span>Chat Now</span>
                  </Button>
                </CardContent>
              </Card>
            </a>

            {/* Email */}
            <a href={`mailto:${EMAIL}`} className="group">
              <Card className="card-lift h-full">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 text-lg">Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">For detailed enquiries</p>
                  <div className="mt-3 font-semibold text-primary break-all">{EMAIL}</div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* QUICK SELECT */}
      <section className="bg-surface-soft py-12">
        <div className="container mx-auto container-px text-center">
          <h2 className="text-2xl md:text-3xl">What Are You Looking For?</h2>
          <p className="mt-2 text-muted-foreground">Tap an option to get started instantly.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="cta" size="lg" onClick={() => quickSelect("install")}>
              Get Solar Installed
            </Button>
            <Button variant="outline" size="lg" onClick={() => quickSelect("pricing")}>
              Check Pricing
            </Button>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => quickSelect("franchise")}
            >
              Start Franchise
            </Button>
          </div>
        </div>
      </section>

      {/* FORM + SERVICE AREAS */}
      <section className="section">
        <div className="container mx-auto container-px grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <span className="eyebrow">Enquiry Form</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Send Us Your Requirement</h2>
            <p className="mt-2 text-muted-foreground">
              Quick form — only takes a minute. We'll call you back shortly.
            </p>

            <Card className="mt-6">
              <CardContent className="p-6 md:p-8">
                {submitted ? (
                  <div className="py-12 text-center animate-fade-in">
                    <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="mt-4 text-2xl">Request received!</h3>
                    <p className="mt-2 text-muted-foreground">
                      Our team will contact you within 15–30 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-1">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your full name"
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength={15}
                        required
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        maxLength={255}
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="e.g. Mumbai"
                        maxLength={80}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Requirement *</Label>
                      <Select
                        value={form.requirement}
                        onValueChange={(v) => update("requirement", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select what you need" />
                        </SelectTrigger>
                        <SelectContent>
                          {requirements.map((r) => (
                            <SelectItem key={r.value} value={r.value}>
                              {r.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.requirement === "franchise" && (
                        <p className="mt-2 text-xs text-secondary animate-fade-in">
                          Tip: Franchise investment starts at ₹50,000.
                        </p>
                      )}
                      {form.requirement === "commercial" && (
                        <p className="mt-2 text-xs text-secondary animate-fade-in">
                          Tip: Mention your monthly bill for an accurate quote.
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="message">Message (optional)</Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Roof size, monthly bill, or any specific question..."
                        maxLength={1000}
                        rows={4}
                      />
                    </div>
                    <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                      <Button type="submit" variant="cta" size="lg" className="sm:flex-1">
                        <Send className="mr-2 w-4 h-4" /> Request Callback
                      </Button>
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Response within 15–30 minutes
                      </span>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Service areas */}
          <div className="lg:col-span-2">
            <span className="eyebrow">Service Areas</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Where We Operate</h2>
            <p className="mt-2 text-muted-foreground">
              Currently serving Maharashtra — expanding across India.
            </p>
            <Card className="mt-6 overflow-hidden">
              <div className="h-56 w-full">
                <iframe
                  title="Selsify service area map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=72.5%2C18.7%2C73.3%2C19.4&layer=mapnik"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-5">
                <ul className="grid grid-cols-2 gap-2">
                  {cities.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-secondary" /> {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Live support */}
            <Card className="mt-5 bg-primary text-primary-foreground border-primary">
              <CardContent className="p-6">
                <h3 className="text-xl text-primary-foreground">Need Immediate Help?</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  Quick response within minutes.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    className="bg-[hsl(var(--whatsapp))] text-[hsl(var(--whatsapp-foreground))] hover:bg-[hsl(var(--whatsapp))]/90"
                  >
                    <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
                      <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="cta">
                    <a href={`tel:${PHONE}`}>
                      <Phone className="mr-2 w-4 h-4" /> Call
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* TRUST STATEMENT */}
      <section className="bg-surface-soft py-14">
        <div className="container mx-auto container-px text-center max-w-3xl">
          <Sparkles className="mx-auto w-6 h-6 text-accent" />
          <p className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-primary">
            Practical Guidance. Clear Communication. Reliable Execution.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <div className="container mx-auto container-px max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl">Let's Get Started</h2>
          <p className="mt-3 text-muted-foreground">
            Choose your preferred way to connect — we're ready to help.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg">
              <a href={`tel:${PHONE}`}>
                <Phone className="mr-2 w-4 h-4" /> Call Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[hsl(var(--whatsapp))] text-[hsl(var(--whatsapp-foreground))] hover:bg-[hsl(var(--whatsapp))]/90"
            >
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="cta" size="lg">
              <a href="#enquiry-form">
                <Send className="mr-2 w-4 h-4" /> Submit Enquiry
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <StickyButtons />
      <ChatBot />
    </div>
  );
};

export default Contact;
