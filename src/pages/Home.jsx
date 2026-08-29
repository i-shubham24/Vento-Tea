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
  return (
    <div>
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
