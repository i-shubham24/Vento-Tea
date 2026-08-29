import OurStorySection from '../components/OurStorySection';
import FarmerPromise from '../components/FarmerPromise';
import ProcessSection from '../components/ProcessSection';

export default function About() {
  return (
    <div className="pt-8 pb-20 bg-vento-cream">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-vento-forest mb-4">Our Story</h1>
        <div className="w-20 h-1 bg-vento-gold mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover the heritage, passion, and people behind every cup of Vento tea.</p>
      </div>
      
      <OurStorySection />
      <ProcessSection />
      <FarmerPromise />
    </div>
  );
}
