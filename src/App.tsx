import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ComingSoonPage from "./pages/ComingSoon.tsx";
import SolarSolutions from "./pages/SolarSolutions.tsx";
import OnGridSolar from "./pages/OnGridSolar.tsx";
import OffGridSolar from "./pages/OffGridSolar.tsx";
import HybridSolar from "./pages/HybridSolar.tsx";
import SolarForHome from "./pages/SolarForHome.tsx";
import SolarForSociety from "./pages/SolarForSociety.tsx";
import SolarForCommercial from "./pages/SolarForCommercial.tsx";
import ProjectsPage from "./pages/Projects.tsx";
import Franchise from "./pages/Franchise.tsx";
import FranchiseMaharashtra from "./pages/FranchiseMaharashtra.tsx";
import FranchiseIndia from "./pages/FranchiseIndia.tsx";
import SolarMumbai from "./pages/SolarMumbai.tsx";
import SolarPune from "./pages/SolarPune.tsx";
import BlogSolarPriceIndia from "./pages/BlogSolarPriceIndia.tsx";
import Blog5kwSolarCost from "./pages/Blog5kwSolarCost.tsx";
import BlogOnGridVsOffGrid from "./pages/BlogOnGridVsOffGrid.tsx";
import BlogIsSolarWorthIt from "./pages/BlogIsSolarWorthIt.tsx";
import Blog from "./pages/Blog.tsx";
import SolarSubsidy from "./pages/SolarSubsidy.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/solar-solutions" element={<SolarSolutions />} />
          <Route path="/solar-solutions/on-grid" element={<OnGridSolar />} />
          <Route path="/solar-solutions/off-grid" element={<OffGridSolar />} />
          <Route path="/solar-solutions/hybrid" element={<HybridSolar />} />
          <Route path="/solar-solutions/home" element={<SolarForHome />} />
          <Route path="/solar-solutions/society" element={<SolarForSociety />} />
          <Route path="/solar-solutions/commercial" element={<SolarForCommercial />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/franchise/maharashtra" element={<FranchiseMaharashtra />} />
          <Route path="/franchise/india" element={<FranchiseIndia />} />
          <Route path="/solar-installation/mumbai" element={<SolarMumbai />} />
          <Route path="/solar-installation/pune" element={<SolarPune />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/solar-panel-price-india" element={<BlogSolarPriceIndia />} />
          <Route path="/blog/5kw-solar-system-cost-india" element={<Blog5kwSolarCost />} />
          <Route path="/blog/on-grid-vs-off-grid-solar" element={<BlogOnGridVsOffGrid />} />
          <Route path="/blog/is-solar-worth-it-india" element={<BlogIsSolarWorthIt />} />
          <Route path="/solar-subsidy-india" element={<SolarSubsidy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
