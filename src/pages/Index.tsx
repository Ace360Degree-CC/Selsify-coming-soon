import TopBar from "@/components/site/TopBar";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import Solutions from "@/components/site/Solutions";
import UseCases from "@/components/site/UseCases";
import Projects from "@/components/site/Projects";
import WhySolar from "@/components/site/WhySolar";
import Franchise from "@/components/site/Franchise";
import Cities from "@/components/site/Cities";
import Blog from "@/components/site/Blog";
import About from "@/components/site/About";
import FinalCTA from "@/components/site/FinalCTA";
import Footer from "@/components/site/Footer";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";

const Index = () => {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Selsify (Salesify Impex Pvt Ltd)",
    description: "Rooftop solar installation and solar franchise opportunities across India.",
    telephone: "+91-98920-20515",
    email: "salesify.panindia@gmail.com",
    address: { "@type": "PostalAddress", streetAddress: "147/8A, Gate no 5, Malwani", addressLocality: "Malad West, Mumbai", addressCountry: "IN" },
    areaServed: ["Mumbai", "Pune", "Thane"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <TopBar />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Solutions />
        <UseCases />
        <Projects />
        <WhySolar />
        <Franchise />
        <Cities />
        <Blog />
        <About />
        <FinalCTA />
      </main>
      <Footer />
      <StickyButtons />
      <ChatBot />
    </>
  );
};

export default Index;
