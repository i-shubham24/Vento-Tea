import SEO from '../components/SEO';
import CinematicHero from '../components/CinematicHero';
import Marquee from '../components/Marquee';
import Categories from '../components/Categories';
import TrustStrip from '../components/TrustStrip';
import ProductCatalog from '../components/ProductCatalog';
import WeeklyOffers from '../components/WeeklyOffers';
import SupplyChainTimeline from '../components/SupplyChainTimeline';
import ProcessSection from '../components/ProcessSection';
import ComparisonChart from '../components/ComparisonChart';
import OurStorySection from '../components/OurStorySection';
import BrewingGuide from '../components/BrewingGuide';
import ReviewCarousel from '../components/ReviewCarousel';
import FarmerPromise from '../components/FarmerPromise';
import FAQ from '../components/FAQ';
import DeliveryBanner from '../components/DeliveryBanner';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TeaHouse",
    "name": "Vento Tea",
    "image": "https://teawebsite-b65ea.web.app/images/web/logo.png",
    "@id": "https://ventotea.com",
    "url": "https://ventotea.com",
    "telephone": "+919876543210",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vento Tea HQ",
      "addressLocality": "New Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "description": "Vento Tea is India's premier local tea business offering authentic Assam and Darjeeling blends, delivered fresh to your door."
  };

  return (
    <div>
      <SEO 
        title="Home" 
        schema={localBusinessSchema}
      />
      <CinematicHero />
      <Marquee />

      <ScrollReveal>
        <Categories />
      </ScrollReveal>
      
      <ScrollReveal>
        <div className="bg-vento-cream pt-10">
          <div className="text-center mb-[-2rem] relative z-10">
            <h2 className="text-sm tracking-[0.2em] text-vento-gold font-bold uppercase mb-2">Vento Favorites</h2>
          </div>
          <ProductCatalog limit={4} />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <WeeklyOffers />
      </ScrollReveal>

      <ScrollReveal>
        <SupplyChainTimeline />
      </ScrollReveal>

      <ScrollReveal>
        <ProcessSection />
      </ScrollReveal>

      <ScrollReveal>
        <ComparisonChart />
      </ScrollReveal>

      <ScrollReveal>
        <OurStorySection />
      </ScrollReveal>

      <ScrollReveal>
        <BrewingGuide />
      </ScrollReveal>

      <ScrollReveal>
        <ReviewCarousel />
      </ScrollReveal>

      <ScrollReveal>
        <FarmerPromise />
      </ScrollReveal>

      <ScrollReveal>
        <FAQ />
      </ScrollReveal>

      <ScrollReveal>
        <TrustStrip />
      </ScrollReveal>

      <ScrollReveal>
        <DeliveryBanner />
      </ScrollReveal>
    </div>
  );
}
