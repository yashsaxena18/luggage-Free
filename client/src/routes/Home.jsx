import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import SecurityInfo from "../components/SecurityInfo";
import Pricing from "../components/Pricing";
import UseCases from "../components/UseCases";
import ServiceAreas from "../components/ServiceAreas";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <SecurityInfo />
      <Pricing />
      <UseCases />
      <ServiceAreas />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;