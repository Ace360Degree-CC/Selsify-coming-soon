import ComingSoon from "@/components/site/ComingSoon";
import StickyButtons from "@/components/site/StickyButtons";
import ChatBot from "@/components/site/ChatBot";

const ComingSoonPage = () => {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Selsify (Salesify Impex Pvt Ltd)",
    description:
      "Rooftop solar installation and solar franchise opportunities across India. Website launching soon.",
    telephone: "+91-98920-20515",
    email: "salesify.panindia@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "147/8A, Gate no 5, Malwani",
      addressLocality: "Malad West, Mumbai",
      addressCountry: "IN",
    },
    areaServed: ["Mumbai", "Pune", "Thane"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <ComingSoon />
      <StickyButtons />
      <ChatBot />
    </>
  );
};

export default ComingSoonPage;
