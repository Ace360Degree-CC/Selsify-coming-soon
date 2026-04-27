import { useEffect, useMemo, useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import { z } from "zod";
import logo from "@/assets/salesify-logo.png";
import heroImg from "@/assets/hero-banner.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const PHONE = "+917711889993";
const WA = "https://wa.me/917711889993";
// const EMAIL = "salesify.panindia@gmail.com";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{10,15}$/, "Enter a valid phone number"),
  city: z.string().trim().max(60).optional(),
  requirement: z.enum(["home", "business", "franchise"], {
    required_error: "Select a requirement",
  }),
});

const useCountdown = (target: Date) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="min-w-[64px] md:min-w-[88px] rounded-lg bg-primary text-primary-foreground py-3 md:py-4 px-3 shadow-card">
      <div className="text-2xl md:text-4xl font-bold tabular-nums text-center">
        {String(value).padStart(2, "0")}
      </div>
    </div>
    <span className="mt-2 text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
  </div>
);

const ComingSoon = () => {
  // Launch ~30 days from now
  const target = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d;
  }, []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    requirement: "" as "" | "home" | "business" | "franchise",
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(form);
    if (!result.success) {
      toast({
        title: "Please check the form",
        description: result.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const reqLabel =
      form.requirement === "home"
        ? "Solar for Home"
        : form.requirement === "business"
          ? "Solar for Business"
          : "Franchise Opportunity";
    const text = encodeURIComponent(
      `Hi Selsify, please call me back.\nName: ${form.name}\nPhone: ${form.phone}${
        form.city ? `\nCity: ${form.city}` : ""
      }\nRequirement: ${reqLabel}`,
    );
    setTimeout(() => {
      window.open(`${WA}?text=${text}`, "_blank", "noopener");
      toast({
        title: "Request sent",
        description: "We'll reach out shortly. Continue on WhatsApp.",
      });
      setForm({ name: "", phone: "", city: "", requirement: "" });
      setSubmitting(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto container-px flex h-20 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Selsify solar" className="h-14 w-auto" />
            <span className="sr-only">Selsify</span>
          </a>
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={`tel:${PHONE}`}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
            >
              <Phone className="h-4 w-4" />
              <span>+91 977118 89993</span>
            </a>
            <Button asChild variant="whatsapp" size="sm">
              <a href={WA} target="_blank" rel="noopener">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Rooftop solar installation"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/90" />
        </div>

        <div className="relative container mx-auto container-px py-16 md:py-24 lg:py-28 text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Launching Soon
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight">
              Website Launching Soon
            </h1>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/90">
              We are building something better to serve your solar needs.
            </p>
            <p className="mt-3 text-sm md:text-base text-primary-foreground/80 max-w-2xl mx-auto">
              Solar solutions for homes, societies, businesses, and franchise
              opportunities across India.
            </p>

            {/* Countdown */}
            <div className="mt-8 flex items-center justify-center gap-3 md:gap-5">
              <TimeBox value={days} label="Days" />
              <TimeBox value={hours} label="Hours" />
              <TimeBox value={minutes} label="Minutes" />
              <TimeBox value={seconds} label="Seconds" />
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild variant="cta" size="lg">
                <a href="#lead">Get Free Consultation</a>
              </Button>
              <Button asChild variant="whatsapp" size="lg">
                <a href={WA} target="_blank" rel="noopener">
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust line */}
      <section className="border-b border-border bg-muted">
        <div className="container mx-auto container-px py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            "Real Installations",
            "Practical Solutions",
            "End-to-End Support",
          ].map((t) => (
            <div
              key={t}
              className="flex items-center justify-center gap-2 text-sm font-medium text-foreground"
            >
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead" className="py-14 md:py-20 bg-background">
        <div className="container mx-auto container-px">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Request a Callback
              </h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Share your details — we'll reach out within one business day.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-card space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  maxLength={80}
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  maxLength={15}
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="10-digit mobile number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City (optional)</Label>
                <Input
                  id="city"
                  maxLength={60}
                  value={form.city}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, city: e.target.value }))
                  }
                  placeholder="e.g. Mumbai"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirement">Requirement</Label>
                <Select
                  value={form.requirement}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      requirement: v as typeof form.requirement,
                    }))
                  }
                >
                  <SelectTrigger id="requirement">
                    <SelectValue placeholder="Select your requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Solar for Home</SelectItem>
                    <SelectItem value="business">Solar for Business</SelectItem>
                    <SelectItem value="franchise">
                      Franchise Opportunity
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Request Callback"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to be contacted via call or WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-primary text-primary-foreground">
        <div className="container mx-auto container-px py-8 grid gap-4 md:grid-cols-3 text-sm">
          <div className="space-y-2">
            {/* <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 hover:text-secondary"
            >
              <Mail className="h-4 w-4" />
              {EMAIL}
            </a> */}
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 hover:text-secondary"
            >
              <Phone className="h-4 w-4" />
              +91 77118 89993
            </a>
          </div>
          <div className="flex items-center gap-2 md:justify-center">
            <MapPin className="h-4 w-4" />
            Mumbai · Pune · Thane
          </div>
          <div className="md:text-right text-primary-foreground/80">
            © {new Date().getFullYear()} Selsify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
