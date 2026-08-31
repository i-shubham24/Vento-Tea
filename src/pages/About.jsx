import SEO from '../components/SEO';
import OurStorySection from '../components/OurStorySection';
import FarmerPromise from '../components/FarmerPromise';
import ProcessSection from '../components/ProcessSection';
import GardenMap from '../components/GardenMap';
import ScrollReveal from '../components/ScrollReveal';
import PageBanner from '../components/PageBanner';
import HeritageTimeline from '../components/HeritageTimeline';
import NewsletterBanner from '../components/NewsletterBanner';

export default function About() {
  return (
    <div className="pb-0 bg-vento-cream">
      <SEO title="Our Story" description="Learn about the heritage of Vento Tea and our commitment to local farmers." keywords="about vento tea, tea estate history" />
      <PageBanner
        eyebrow="Since the first flush"
        title="Our Story"
        subtitle="A journey from the misty hills of Assam to your daily cup."
        imagePath="/brand/media_1787991645006.jpg"
      />
        
      <ScrollReveal>
        <OurStorySection hideCta />
      </ScrollReveal>

      <HeritageTimeline />

      <ScrollReveal>
        <GardenMap />
      </ScrollReveal>

      <ScrollReveal>
        <ProcessSection />
      </ScrollReveal>

      <ScrollReveal>
        <FarmerPromise />
      </ScrollReveal>

      <NewsletterBanner />
    </div>
  );
}
