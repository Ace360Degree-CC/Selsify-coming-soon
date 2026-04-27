import { useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import TopBar from "@/components/site/TopBar";
import { Mail, Phone } from "lucide-react";

const sections = [
  { id: "information", label: "Information We Collect" },
  { id: "usage", label: "How We Use It" },
  { id: "protection", label: "Data Protection" },
  { id: "contact", label: "Contact" },
];

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Selsify Solar";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Selsify Privacy Policy — how we collect, use, and protect your personal information when you interact with our solar services.",
    );
    if (!meta.parentElement) document.head.appendChild(meta);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <header className="mb-10 pb-6 border-b">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Effective Date: <span className="font-medium">[Add Date]</span>
          </p>
        </header>

        {/* Anchor nav */}
        <nav aria-label="On this page" className="mb-10 p-4 bg-muted/40 rounded-lg">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2 font-semibold">
            On this page
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-cta hover:underline underline-offset-4"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="prose-content space-y-10 text-foreground leading-relaxed">
          <section>
            <p className="text-base md:text-lg">
              At <strong>Selsify</strong>, we value your privacy and are
              committed to protecting your personal information.
            </p>
          </section>

          <section id="information" className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Information We Collect
            </h2>
            <p className="mb-3 text-muted-foreground">
              We may collect the following information when you interact with
              our website:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>City / Location</li>
              <li>Any details shared through forms or WhatsApp</li>
            </ul>
          </section>

          <section id="usage" className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              How We Use Your Information
            </h2>
            <p className="mb-3 text-muted-foreground">Your information is used to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Respond to your enquiries</li>
              <li>Provide solar consultation and services</li>
              <li>Share relevant updates or offers</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section id="protection" className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Data Protection
            </h2>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Third-Party Sharing
            </h2>
            <p>
              We do not sell or share your personal information with third
              parties, except when required for service delivery or legal
              compliance.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Cookies
            </h2>
            <p>
              Our website may use cookies to enhance user experience and
              analyse website performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Your Consent
            </h2>
            <p>By using our website, you consent to this privacy policy.</p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Contact Us
            </h2>
            <p className="mb-4 text-muted-foreground">
              If you have any questions regarding this policy, you can reach us at:
            </p>
            <div className="space-y-2">
              <a
                href="mailto:info@selsify.com"
                className="flex items-center gap-3 text-cta hover:underline"
              >
                <Mail className="h-4 w-4" />
                info@selsify.com
              </a>
              <a
                href="tel:+919892020515"
                className="flex items-center gap-3 text-cta hover:underline"
              >
                <Phone className="h-4 w-4" />
                +91 98920 20515
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <StickyButtons />
    </div>
  );
};

export default PrivacyPolicy;
