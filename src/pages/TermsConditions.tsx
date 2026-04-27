import { useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import TopBar from "@/components/site/TopBar";
import { Mail, Phone } from "lucide-react";

const TermsConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | Selsify Solar";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Selsify Terms & Conditions — guidelines for using our website and information about our solar services.",
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
            Terms & Conditions
          </h1>
          <p className="text-sm text-muted-foreground">
            Effective Date: <span className="font-medium">[Add Date]</span>
          </p>
        </header>

        <article className="space-y-10 text-foreground leading-relaxed">
          <section>
            <p className="text-base md:text-lg">
              By accessing this website, you agree to the following terms and
              conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Use of Website
            </h2>
            <p className="mb-2">
              The content on this website is for general information about our
              solar services and franchise opportunities.
            </p>
            <p>You agree not to misuse the website or its content.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Service Information
            </h2>
            <p className="mb-2">
              All information provided regarding solar systems, pricing, and
              services is indicative and may vary based on actual requirements.
            </p>
            <p>
              Final quotations and specifications will be shared after proper
              assessment.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              No Guarantee of Results
            </h2>
            <p className="mb-2">
              Savings, performance, and returns depend on multiple factors such
              as usage, installation, and external conditions.
            </p>
            <p>We do not guarantee fixed outcomes.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including text, images, and
              branding, belongs to Selsify and may not be copied or reused
              without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Third-Party Links
            </h2>
            <p>
              The website may contain links to third-party platforms. We are
              not responsible for their content or policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Limitation of Liability
            </h2>
            <p>
              Selsify shall not be held liable for any direct or indirect
              damages arising from the use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to update these terms at any time without
              prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
              Contact
            </h2>
            <p className="mb-4 text-muted-foreground">For any queries:</p>
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

export default TermsConditions;
