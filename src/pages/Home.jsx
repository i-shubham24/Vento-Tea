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
import WhyVento from '../components/WhyVento';
import WholesaleBanner from '../components/WholesaleBanner';
import TodaysDeal from '../components/TodaysDeal';
import LivePurchaseToast from '../components/LivePurchaseToast';
import TrustSignals from '../components/TrustSignals';

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
      <LivePurchaseToast />

      <ScrollReveal>
        <Categories />
      </ScrollReveal>
      
      <ScrollReveal>
        <ProductCatalog limit={4} singleImage eager />
      </ScrollReveal>

      <ScrollReveal>
        <TodaysDeal />
      </ScrollReveal>

      <ScrollReveal>
        <WeeklyOffers />
      </ScrollReveal>

      <ScrollReveal>
        <WholesaleBanner />
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
        <WhyVento />
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

      <TrustSignals />

      <ScrollReveal>
        <DeliveryBanner />
      </ScrollReveal>

      <ScrollReveal>
        <TrustStrip />
      </ScrollReveal>
    </div>
  );
}
